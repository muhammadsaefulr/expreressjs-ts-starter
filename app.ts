import express from 'express'
import router from './routes/mainRoutes'

const app = express()

app.use(express.json());  
app.use('/api', router)

app.listen(8000, () => {
    console.log("Successfully Startig  At port 8000")
});