import { ZodType } from "zod";

export class validate {
    static validate<T>(schema: ZodType, data: T): T{
        return schema.parse(data)
    }
}