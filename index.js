import express from 'express'
import cors from 'cors'
import rootRouter from './src/routes/rootRouter.js'

const app = express()
app.use(express.json())
app.use(cors())

app.listen(8080)


app.use(rootRouter)