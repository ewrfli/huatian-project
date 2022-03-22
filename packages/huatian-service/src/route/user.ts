import { Repository } from "@huatian/domain";
import { AuthorizedRequest } from "./route.type";

export const get = (req: AuthorizedRequest) => {
  const user = Repository.userRepo().getByID(req.user.getId())
  return user.toJSON()
}