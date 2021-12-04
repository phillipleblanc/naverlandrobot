import puppeteer from "puppeteer"
import { Building } from "./buildings.js"

export async function getUnits(building: Building, filterToWeolse: boolean) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(building.naverLink)
  let results = await page.evaluate(building.unitsQuery)

  if (filterToWeolse) {
    results = results.filter((item: any) => item.contractType === "월세")
  }

  await browser.close()

  return results
}
