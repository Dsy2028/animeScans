import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { config as dotenvConfig } from 'dotenv';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import scan from './models/site.model.js';




const values = ['Wrong', '2-Step', 'keep', 'Verification', "changed", "find", "Step", "email", "Check", "check", "2", "sent", "valid", "locked", "Type", "Open", "verify", "Verify"];
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin());
dotenvConfig();


  export const  scanSite = async (req,res) => {
   async function getLatestChapter(urls) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-gpu',
          '--enable-webgl',
          '--window-size=800,800'
        ]
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
           // await page.waitForTimeout(1000);
          }
    }else{
    for (let i = 0; i < 15; i++) {
        await page.keyboard.press('Tab');
       // await page.waitForTimeout(1000);
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
      results.push({ chapter, headingText });    
    }
    await browser.close();
    return results;
  
}

// Use the function
const url = ["https://ww4.readkingdom.com/manga/kingdom/", "https://ww10.readonepiece.com/"];
getLatestChapter(url).then(async results => {
    for (const result of results) {
      console.log(`The latest chapter is: ${result.chapter}`);
      console.log(`The heading text is: ${result.headingText}`);

      // Fetch the previous chapter information from the database
      const previousChapter = await scan.findOne({ chapter: result.chapter });

      // Check if the latest chapter is the same as the previous fetch
      if (previousChapter && previousChapter.headingText === result.headingText) {
        console.log('The latest chapter is the same as the previous fetch');
      } else {
        console.log('The latest chapter is different from the previous fetch');

        // Delete the previous chapter information
        if (previousChapter) {
          await scan.deleteOne({ chapter: result.chapter });
        }

        // Save the latest chapter information
        const newChapter = new scan({ chapter: result.chapter, headingText: result.headingText });
        await newChapter.save();
      }
    }

    res.status(200).send(results);
  });
}

