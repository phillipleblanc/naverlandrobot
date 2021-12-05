import { queryPage } from "./browser.js"
import { Building } from "./buildings.js"

export async function getUnits(building: Building, filterToWeolse: boolean) {
  let results = await queryPage(building.naverLink, building.unitsQuery)

  if (filterToWeolse) {
    results = results.filter((item: any) => item.contractType === "월세")
  }

  return results
}
