import { Repository, UserRepo } from "."
import { User } from "./User"

export class RelationRepo {

  private relations : Map<number, Set<number>> = new Map()

  public addToFriend(a: User, b: User) {
    const linkToA = this.relations.get(a.getId())
    if(!linkToA) {
      this.relations.set(a.getId(), new Set())
    }
    this.relations.get(a.getId()).add(b.getId())
  }
  
  public addRelation(a: User, b: User) {
    this.addToFriend(a, b)
    this.addToFriend(b, a)
  }

  public friends(a: User){
    const friendsInId = this.relations.get(a.getId())
    if(!friendsInId) {
      return []
    }
    return [...friendsInId.values()].map((x) =>
      Repository.userRepo().getByID(x)
    )
  }

  public isFriend(a: User, b: User) {
    const friendsInId = this.relations.get(a.getId()) || new Set()
    return friendsInId.has(b.getId())
  }
}

