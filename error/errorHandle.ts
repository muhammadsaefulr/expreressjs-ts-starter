import {Request, Response} from 'express'

class ErrorHandle {
    static handle(err: Error, res: Response) {
        console.error("Error: ", err)
        res.status(500).json({message: "Internal Server Error !"})
    }
}

export default ErrorHandle