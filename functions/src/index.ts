import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';

const isDebug = process.env.NODE_ENV !== 'production';

async function createScreenshot() {
  const browser = await puppeteer.launch(
    isDebug
      ? {}
      : {
          headless: true,
          args: ['--no-sandbox'],
        },
  );

  const page = await browser.newPage();

  await page.goto('https://github.com/angular/angular-ja/graphs/contributors');

  await page.waitForResponse(
    'https://github.com/angular/angular-ja/graphs/contributors-data',
  );
  const screenshotTarget = await page.waitForSelector('#contributors');

  const screenshot = await screenshotTarget.screenshot({ type: 'png' });
  return await browser.close().then(() => screenshot);
}

export const createContributorsImage = functions
  .runWith({
    timeoutSeconds: 12,
    memory: '1GB',
  })
  .https.onRequest((request, response) => {
    createScreenshot()
      .then(image => {
        response.setHeader('Content-Type', 'image/png');
        response.status(200).send(image);
      })
      .catch(err => {
        console.error(err);
        response.status(500).send(err);
      });
  });
