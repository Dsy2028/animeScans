import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { config as dotenvConfig } from 'dotenv';

const values = ['Wrong', '2-Step', 'keep', 'Verification', "changed", "find", "Step", "email", "Check", "check", "2", "sent", "valid", "locked", "Type", "Open", "verify", "Verify"];
puppeteer.use(StealthPlugin());

dotenvConfig();



  let prevContent = '';

  async function checkUpdate(){
    const browser = await puppeteer.launch({
        headless: false,
        args: [
          '--no-sandbox',
          '--disable-gpu',
          '--enable-webgl',
          '--window-size=800,800'
        ]
      });
      const loginUrl = "https://order.habitburger.com/register";
      const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36';
      const page = await browser.newPage();
      await page.setUserAgent(ua);
      await page.goto(loginUrl, { waitUntil: 'networkidle2' });

      const currentContent = await page.content();

      if(prevContent !== currentContent) {
        prevContent = currentContent;
        console.log('Content updated');
        await page.screenshot({ path: 'example.png' });
      } else {
            console.log('Content not updated');
        }
    }

;


