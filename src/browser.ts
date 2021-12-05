import puppeteer from "puppeteer"

async function defaultPreprocess() {
  // The default function does nothing
}

export async function queryPage(
  url: string,
  query: string,
  preprocess: (page: puppeteer.Page) => Promise<void> = defaultPreprocess
) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "networkidle0" })

  await preprocess(page)

  const results = await page.evaluate(query)

  await browser.close()

  return results
}
