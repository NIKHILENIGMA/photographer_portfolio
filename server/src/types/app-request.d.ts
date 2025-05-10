import { Request } from "express";
import { User } from "../../generated/prisma";

export interface AppRequest extends Request {
    user?: User;
}