import { defineComponent, ref } from 'vue'
import { ChatCardProps, ChatBox } from '@huatian/components'
import {ChatRecord, ChatSession, User} from '@huatian/domain'
import { useRoute } from 'vue-router'
import a1 from '../assets/p1.png'
import a2 from '../assets/p2.png'
import { ChatContext } from '../context/ChatContext'

const list : ChatCardProps[] = [
  {
    avatar : a1,
    type : 'receive',
    content : "你好!今天有时间吗？"
  },
  {
    avatar : a2,
    type : 'send',
    content : "有时间？怎么了？"
  },
  {
    avatar : a1,
    type : 'receive',
    content : "出来玩啊！"
  }
]



function useChatSession(){
  const route = useRoute()
  const receiverId = parseInt(route.params.id as string)
  const chatContexnt = new ChatContext()
  const list = ref<ChatCardProps[]>([])
  const session = ref<ChatSession | null>(null)
  chatContexnt.getSession(receiverId)
    .then(chatSession => {
      session.value = chatSession
      list.value = chatSession.getChatList()
      chatSession.on(
        ChatSession.Topics.ChatListChanged,
        () => {
          list.value = chatSession.getChatList()
        }
      )
    })
  return {list, session}
}
export const Chat = defineComponent({
  setup(){

    const {list, session} = useChatSession()
    
    return () => {
      if (!session.value) {
        return null
      }
      return (
        <ChatBox
          list={list.value}
          onMessageEnter={(message) => {
            session.value!.send(message)
          }}
        />
      )
    }
  }
})

Chat.route = {
  path : '/chat/:id'
}