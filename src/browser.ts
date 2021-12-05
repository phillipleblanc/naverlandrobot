import puppeteer from "puppeteer"

export async function queryPage(
  url: string,
  query: string,
  preprocess: (page: puppeteer.Page) => Promise<void> = async (
    _p: puppeteer.Page
  ) => {}
) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "networkidle0" })

  await preprocess(page)

  let results = await page.evaluate(query)

  await browser.close()

  return results
}
