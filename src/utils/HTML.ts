import { render } from 'ejs'
import puppeteer from 'puppeteer'

export type ScreenshotOptions = {
    html: string,
    timeout?: number
}

export async function renderTemplate (template: string): Promise<string> {
    const data = {
        event:{
            name: "Event's name",
            date: 'day/month/year',
            workload: 3
        },
        user: {
            name: "attendee's name"
        }
    }
    return render(template, data)
}

export async function screenshotFromHtml ({ html, timeout = 2000 }: ScreenshotOptions) {
    const browser = await puppeteer.launch({
      headless: !process.env.DEBUG_HEADFULL,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    })
  
    const page = await browser.newPage()
  
    // Set viewport to something big
    // Prevents Carbon from cutting off lines
    await page.setViewport({
      width: 2560,
      height: 1080,
      deviceScaleFactor: 2
    })
  
    page.setContent(html)

    const buffer = await page.screenshot({
      encoding: 'binary'
    })
  
    // Wait some more as `waitUntil: 'load'` or `waitUntil: 'networkidle0'
    // is not always enough, see https://goo.gl/eTuogd
    await page.waitFor(timeout)
    // Close browser
    await browser.close()
  
    return buffer.toString('base64');
}

