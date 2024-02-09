import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { config as dotenvConfig } from 'dotenv';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import scan from './models/site.model.js';
import notifications from './models/email.model.js';
import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';
import cron from 'node-cron';
dotenv.config();
console.log('render reading')
const mailjet = Mailjet.apiConnect(process.env.MAIL_API, process.env.MAIL_SECRET)

const values = ['Wrong', '2-Step', 'keep', 'Verification', "changed", "find", "Step", "email", "Check", "check", "2", "sent", "valid", "locked", "Type", "Open", "verify", "Verify"];
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin());


let sendResult;
  export const  scanSite = async (req,res) => {
   async function getLatestChapter(urls) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-gpu',
          '--enable-webgl',
          '--window-size=800,800',
          '--disable-setuid-sandbox'
        ],
        executablePath: await puppeteer.executablePath(),
      });
      const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36';
      const results = []; 
      for (const url of urls) {
      const page = await browser.newPage();
      await page.setUserAgent(ua);
      await page.goto(url, { waitUntil: 'networkidle2' });
    // Extract the latest chapter from url 
    if(url === urls[1]){
        for (let i = 0; i < 27; i++) {
            await page.keyboard.press('Tab');
          }
    }else if (url === urls[2]){
        for (let i = 0; i < 21; i++) {
            await page.keyboard.press('Tab');
          }
    }
    else if (url === urls[3]){
      for (let i = 0; i < 23; i++) {
          await page.keyboard.press('Tab');
        }
  }
  else if (url === urls[4]){
    for (let i = 0; i < 27; i++) {
        await page.keyboard.press('Tab');
      }
}
    else{
    for (let i = 0; i < 15; i++) {
        await page.keyboard.press('Tab');
      }
    }
    
      // Press Enter to "click" the button
      await Promise.all([
        page.waitForNavigation(),
        page.keyboard.press('Enter'),
      ]);
      // Get the URL of the new page
      const url1 = page.url();
      const chapterNumberFromUrl = url1.split('/')
      let chapter = chapterNumberFromUrl.splice(chapterNumberFromUrl.length - 2, 1)[0];
      //chapter.pop()
      
    
      // get the heading text of the new page
      const headingText = await page.evaluate(() => {
        return document.querySelector('h1').textContent;
      });
      results.push({ chapter, url1});    
    }
    await browser.close();
    return results;
  
}

// Use the function
const url = ["https://ww4.readkingdom.com/manga/kingdom/", "https://ww10.readonepiece.com/","https://ww3.readvinlandsaga.com/","https://ww3.readjujutsukaisen.com/","https://ww8.dbsmanga.com/"];
getLatestChapter(url).then(async results => {
    for (const result of results) {
      // Fetch the previous chapter information from the database
      const previousChapter = await scan.findOne({ chapter: result.chapter });
      // Check if the latest chapter is the same as the previous fetch
      if (previousChapter && previousChapter.url === result.url1) {
      } else {

        // Delete the previous chapter information
        if (previousChapter) {
          await scan.deleteOne({ chapter: result.chapter });
        }
        if(previousChapter === "chromewebdata" ){
          await scan.deleteOne({ chapter: result.chapter})
        }
        // Save the latest chapter information
        const newChapter = new scan({ chapter: result.chapter, url: result.url1 });
        
        await newChapter.save();
      }
    }
    const all = await notifications.find();
    all.map((email) => {
      const resultUrls = results.map(result => `<a href="${result.url1}">${result.chapter}</a>`).join('<br />'); //TODO: allow user to choose what manga they want to receive notifications for
      const request = mailjet.post('send', {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "htooe220@gmail.com",
                "Name": "htooe220@gmail.com"
              },
              "To": [
                {
                  "Email": email.email,
                  "Name": email.email
                }
              ],
              "Subject": "Signed up for notifications",
              "TextPart": `Hello ${email.email}!`,
              "HTMLPart": `<h3>New scans or chapters are out!</h3><br />${resultUrls}`
            }
          ]
        })   
      request
        .then((result) => {
          //  console.log(result.body)
          res.status(200).json({success: "Succesfully sent notification"})
        })
        .catch((err) => {
          console.log(err.statusCode)
        });
    })
    res.status(200).send(results);
  });
}

// run scan every hour in any day and any

cron.schedule('*/10 * * * *', async () => {
  await scanSite();
});


