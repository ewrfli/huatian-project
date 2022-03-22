import { ChatSession, ChatSessionRepo, ChatSessionTopics, User } from "@huatian/domain"
import * as rest from "@huatian/rest"

export class ChatContext {
  private sessions: ChatSession[] = []
  constructor() {}

  async currentUser() {
    return User.fromJSON(await rest.user.get())
  }

  async createSessions() {
    const friends = (await rest.friend.get()).map(
      (user) => {
        return User.fromJSON(user)
      }
    )

    const currentUser = await this.currentUser()

    this.sessions = friends.map((friend) => {
      return new ChatSession(currentUser, friend)
    })
    return this.sessions
  }

  async getSession(receiverId : number){
    await this.createSessions()
    const chatSession = this.sessions.find(
      (x) => x.getReceiver().getId() === receiverId
    ) 

    async function loadMessage(){
      const chatList = await rest.message.get(receiverId)
      chatSession?.hydrateMessage(chatList)
    }

    loadMessage()

    chatSession?.on(ChatSessionTopics.ChatMsgToSend, (msg: string) => {
      rest.message.post(receiverId, msg)
    })

    setInterval(async () => {
      loadMessage()
    }, 1000)

    return chatSession!


  }


}
