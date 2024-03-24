import {z, ZodType} from 'zod'

export class userValidator{
    static readonly userSchema = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string()
    })

    static readonly userAuth = z.object({
        email: z.string().email(),
        password: z.string()
    })
}
