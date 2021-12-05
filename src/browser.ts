import puppeteer from "puppeteer"

export async function queryPage(url: string, query: string) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "networkidle0" })
  let results = await page.evaluate(query)

  await browser.close()

  return results
}
