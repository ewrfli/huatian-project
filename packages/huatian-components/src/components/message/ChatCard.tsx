import {defineComponent, PropType} from 'vue'
import {Avatar} from '../widgets/Avatar'
import {Flex} from '../layout/Flex'
import classes from './card.module.scss'


export type ChatCardProps = {
  type? : "receive" | "send",
  avatar : string,
  content : string
}

export const ChatCard = defineComponent({
  props : {
    type : {
      type : String as PropType<"receive" | "send">,
      required : true,
      default : "receive"
    },
    avatar : {
      type : String,
      required : true
    },
    content : {
      type : String,
      required : true
    }

  },
  setup(props){
    return () => {

      const avatar = <Avatar url={props.avatar} size={"small"} />
      const content = <Content content={props.content} />



      function renderMessage(){
        switch(props.type) {
          case 'receive':
            return [avatar, content]
          case 'send':
            return [content, avatar]
        }
      }

      return (
        <Flex
          align='center'
          class={`${classes["chat-card"]} ${
            classes[props.type]
          }`}
        >
          {renderMessage()}
        </Flex>
      )

    }
  }
}) 

const Content = ({content} : {
  content : String
}) => {
  return <div class={classes.content}>{content}</div>
}