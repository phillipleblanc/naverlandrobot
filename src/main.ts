import express from "express"

import { getUnits } from "./naver.js"
import { getBuildingFromId } from "./buildings.js"
import { parseKoreanWon } from "./won.js"

const app = express()
const port = process.env.PORT || 8000

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  return next()
})
app.get("/health", async (_req: express.Request, res: express.Response) => {
  res.status(200).send("ok\n")
})

app.get(
  "/buildings/:building",
  async (req: express.Request, res: express.Response) => {
    const buildingId = parseInt(req.params.building)

    if (!buildingId) {
      res.sendStatus(400)
      return
    }

    const building = await getBuildingFromId(buildingId)

    if (!building) {
      res.sendStatus(404)
      return
    }

    res.status(200).json({ id: buildingId, name: building.name })
  }
)

type Unit = {
  contractType: string
  price: string
  unitType: string
  unitSpec: string
}

app.get(
  "/buildings/:building/units",
  async (req: express.Request, res: express.Response) => {
    const buildingId = parseInt(req.params.building)

    if (!buildingId) {
      res.sendStatus(400)
      return
    }

    const building = await getBuildingFromId(buildingId)

    if (!building) {
      res.sendStatus(404)
      return
    }

    let units: Unit[] = await getUnits(building, false)
    const contractType = req.query.contractType

    if (contractType) {
      units = units.filter((unit) => unit.contractType === contractType)
    }

    const priceFilter = req.query.price
    if (priceFilter) {
      const price = parseKoreanWon(priceFilter as string)
      units = units.filter((unit) => parseKoreanWon(unit.price) <= price)
    }

    res.status(200).json({ num: units.length, units })
  }
)

app.listen(port, () => {
  console.log(`naverlandrobot listening at http://localhost:${port}`)
})
