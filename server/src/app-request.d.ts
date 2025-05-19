import * as express from "express";
import { User } from "./types/base.types";



export interface CustomRequest extends express.Request {
  user?: User
}
