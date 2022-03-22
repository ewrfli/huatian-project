import type { User } from "@huatian/domain";
import type { Request } from "express";

export type AuthorizedRequest = Request & {
  user: User 
}
