import chrome from '@sparticuz/chromium'
import { PuppeteerLaunchOptions } from 'puppeteer-core'

const execPath = 'C:\\Program Files (x86)\\Google\\ChromeSetup.exe'

export async function getOptions (isDev: boolean): Promise<PuppeteerLaunchOptions> {
  if (isDev) {
    return {
      args: [],
      executablePath: execPath,
      headless: 'new'
    }
  }

  return {
    args: chrome.args,
    executablePath: await chrome.executablePath(),
    headless: chrome.headless
  }
}
