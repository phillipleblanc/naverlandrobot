import express from "express"

import { getUnits } from "./naver.js"
import { KnownBuildings, KnownBuildingsMap } from "./buildings.js"

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

app.get("/buildings", (_req: express.Request, res: express.Response) => {
  res.status(200).json(
    KnownBuildings.map((building) => {
      return { id: building.id, name: building.name }
    })
  )
})

app.get(
  "/buildings/:building",
  (req: express.Request, res: express.Response) => {
    const buildingId = req.params.building

    const building = KnownBuildingsMap.get(buildingId)

    if (building) {
      res.status(200).json({ id: building.id, name: building.name })
    } else {
      res.sendStatus(404)
    }
  }
)

app.get(
  "/buildings/:building/units",
  async (req: express.Request, res: express.Response) => {
    const buildingId = req.params.building
    const building = KnownBuildingsMap.get(buildingId)

    if (!building) {
      res.sendStatus(404)
      return
    }

    const result = await getUnits(building, false)
    res.status(200).json(result)
  }
)

app.get(
  "/buildings/:building/units/weolse",
  async (req: express.Request, res: express.Response) => {
    const buildingId = req.params.building
    const building = KnownBuildingsMap.get(buildingId)

    if (!building) {
      res.sendStatus(404)
      return
    }

    const result = await getUnits(building, true)
    res.status(200).json(result)
  }
)

app.listen(port, () => {
  console.log(`naverlandrobot listening at http://localhost:${port}`)
})
