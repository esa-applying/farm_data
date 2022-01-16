import express from 'express'
import 'dotenv/config'
import apiController from "./apiController.js";

const app = express()
const PORT = process.env.PORT || 5000

const apiRouter = express.Router()

apiRouter.get('/metrics/:metric', async (request, response) =>
    apiController.getMetric(request, response))


apiRouter.get('/', async (request, response) =>
    apiController.getEntries(request, response)
)

app.use('/api/farm_data', apiRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
