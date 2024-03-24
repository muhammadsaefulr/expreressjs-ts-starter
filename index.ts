import { errorMiddleware } from "./middleware/middleware";

const app = require('./app');

app.use(errorMiddleware)

const dotenv = require('dotenv');
dotenv.config();

app.listen(8000, () => {
    console.log("Successfully Startig  At port 8000")
});