import { Repository } from "@huatian/domain";
import { AuthorizedRequest } from "./route.type";

export const post = (req: AuthorizedRequest) => {
  const fromId = req.user.getId()
  const receiverId = req.body.to
  const msg = req.body.msg

  const from = Repository.userRepo().getByID(fromId)
  const to = Repository.userRepo().getByID(receiverId)

  const session = Repository.chatSessionRepo().getSession(from, to)
  const sessionTo = Repository.chatSessionRepo().getSession(to, from)
  session.send(msg)
  sessionTo.receive(msg)
  return 'ok'
}


export const get = (req: AuthorizedRequest) => {
  const fromId = req.user.getId()
  const receiverId = req.query.to as string
  const from = Repository.userRepo().getByID(fromId)
  const to = Repository.userRepo().getByID(receiverId)
  const session = Repository.chatSessionRepo().getSession(from, to)
  return session.getChatRecords()
}