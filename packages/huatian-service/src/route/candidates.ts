import { Repository } from "@huatian/domain";
import { AuthorizedRequest } from "./route.type";

export const get = (req: AuthorizedRequest) => {

  const relationRepo = Repository.relationShipRepo()

  const users = [...Repository.userRepo().getAll()]
    .filter(x => x.getId() !== req.user.getId())
    .filter(x => !relationRepo.isFriend(req.user, x))
    .slice(0, 10)
    .map(x => x.toJSON())
  return users

}