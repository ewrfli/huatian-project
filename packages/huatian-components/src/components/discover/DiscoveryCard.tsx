import { defineComponent } from "vue"
import { Flex } from '../layout/Flex'
import { Avatar } from "../widgets/Avatar"
import Icons from '../Icons'
import classes from './discovery-card.module.scss'

export type DiscoveryCardProps = {
  title: string
  content: string
  cover: string
  avatar: string
}

export const DiscoveryCard = defineComponent({
  props : {
    title : {
      type : String,
      required : true
    },
    content : {
      type : String,
      required : true
    },
    cover : {
      type : String,
      required : true
    },
    avatar : {
      type : String,
      required : true
    }
  },
  setup(props){
    const { title, content, cover, avatar } = props

    return () => {
      return <Flex type="column" class={classes['discovery-card']}>
        <Flex type="row">
          <Flex type="column" flex={1}>
            <h2 class={classes.title}>{title}</h2>
            <p class={classes.content}>{content}</p>
          </Flex>
          <img class={classes.cover} src={cover} alt="" />
        </Flex>
        <Flex type="row" justify="space-between" align="center">
          <Avatar url={avatar} size="small" />
          <ActionPanel />
        </Flex>
      </Flex>

    }
  }
}) 

const ActionPanel = () => {
  return <div class={classes['action-panel']}>
    <Icons.Agree size="small" class={classes.icon} />
    <Icons.Chat size='small' class={classes.icon} />
  </div>
}