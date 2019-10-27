import { render } from 'ejs'
import * as puppeteer from 'puppeteer-core'

export async function renderTemplate (template: string): Promise<string> {
    const data = {
        event:{
            name: "Event's name",
            date: 'day/month/year',
            workload: 3
        },
        user: {
            name: "Ateendee's name"
        }
    }
    return render(template, data)
  }

export async function screenShotFrom (html: string): Promise<string> {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage();
    await page.setContent(html);
    const base64 = await page.screenshot();
    await page.close();
    await browser.close();

    return base64
}