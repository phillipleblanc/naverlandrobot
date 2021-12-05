import { queryPage } from "./browser.js"
import { queryBuildingName, queryUnits } from "./queries.js"

export interface Building {
  id: number
  name: string
  naverLink: string
  unitsQuery: string
}

export async function getBuildingFromId(
  id: number
): Promise<Building | undefined> {
  const naverLink = `https://new.land.naver.com/complexes/${id}`
  const buildingName = await queryPage(naverLink, queryBuildingName)

  if (!buildingName) {
    return undefined
  }

  return {
    id: id,
    name: buildingName,
    naverLink: naverLink,
    unitsQuery: queryUnits,
  }
}
