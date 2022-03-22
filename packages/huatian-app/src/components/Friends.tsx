import { ref, defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { MessageCard, ListView } from '@huatian/components'
import { ChatContext } from '../context/ChatContext'
import { ChatSession } from '@huatian/domain'


export const Friends = defineComponent({
  setup() {
    const chatContext = new ChatContext()

    const list = ref<ChatSession[]>([])
    chatContext.createSessions().then((sessions) => {
      list.value = sessions
    })

    return () => (
      <ListView>
        {list.value.map((session, i) => {
          const lastRev = session.lastReceivedMessage() 
          const short = lastRev ? lastRev.message : ''
          return (
            <RouterLink key={i} to={`/chat/${session.getReceiver().getId()}`}>
              <MessageCard
                avatar={session.getReceiver().getAvatar()}
                name={session.getReceiver().getName()}
                short={short}
                unread={session.unread()}
                time={"今天"}
              />
            </RouterLink>
          )
        })}
      </ListView>
    )
  },
})