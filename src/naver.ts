import puppeteer from "puppeteer"
import { queryPage } from "./browser.js"
import { Building } from "./buildings.js"

export async function getUnits(building: Building, filterToWeolse: boolean) {
  let results = await queryPage(
    building.naverLink,
    building.unitsQuery,
    async (page: puppeteer.Page) => {
      for (let i = 0; i < 3; i++) {
        await page.evaluate(
          "document.querySelector('#articleListArea > .item:last-child')?.scrollIntoView()"
        )
        await page.waitForTimeout(500)
      }
    }
  )

  if (filterToWeolse) {
    results = results.filter((item: any) => item.contractType === "월세")
  }

  return results
}
