import express from 'express'
import router from './routes/mainRoutes'

const app = express()

app.use(express.json());  
app.use('/api', router)

module.exports = app