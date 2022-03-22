import { Repository, User } from "@huatian/domain";
import { Request } from "express";
import { AuthorizedRequest } from "./route.type";

export const put = (req: AuthorizedRequest) => {
  const uid = req.params.uid
  const to = Repository.userRepo().getByID(uid)
  req.user.addRelation(to)
}

export const getForAdmin = (req: Request) => {
  const uid = req.params.uid
  const user = Repository.userRepo().getByID(uid)
  return Repository.relationShipRepo().friends(
    user
  ).map(x => x.toJSON())
}

export const get = (req: AuthorizedRequest) => {
  const user = Repository.userRepo().getByID(req.user.getId())
  return Repository.relationShipRepo().friends(
    user
  ).map(x => x.toJSON())
}