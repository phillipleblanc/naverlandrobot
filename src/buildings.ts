import { obeliskQueryUnits } from "./queries.js"

export interface Building {
  id: string
  name: string
  naverLink: string
  unitsQuery: string
}

const Obelisk: Building = {
  id: "obelisk",
  name: "Hanwha Obelisk",
  naverLink:
    "https://new.land.naver.com/complexes/12240?ms=37.539953,126.945308,17&a=APT:ABYG:JGC&e=RETAIL&articleNo=2132027944",
  unitsQuery: obeliskQueryUnits,
}

export const KnownBuildings = [Obelisk]
export const KnownBuildingsMap: Map<string, Building> = new Map<
  string,
  Building
>([["obelisk", Obelisk]])
