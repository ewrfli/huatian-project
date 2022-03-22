import {defineComponent} from 'vue'
import {Flex} from '../layout/Flex'
import classes from './card.module.scss'
import {Avatar} from '../widgets/Avatar'

export const MessageCard = defineComponent({
  props : {
    avatar : {
      type : String,
      required : true
    },
    name : {
      type : String,
      required : true
    },
    short : {
      type : String,
      required : true
    },
    time : {
      type : String,
      required : true
    },
    unread : {
      type : Number
    }
  },
  setup(props){
    return () => {
      return <Flex type="row" class={classes['user-message']}>
        <Avatar url={props.avatar} style={{
          marginRight : '20px'
        }} />
        <Flex type="column" class={classes['middle-box']}>
          <div class={classes.username}>{props.name}</div>
          <div class={classes.short}>{props.short}</div>
        </Flex>
        <Flex type="column" class={classes.right} align="flex-end">
          <div class={classes.time}>{props.time}</div>
          <Unread num={props.unread} />
        </Flex>
      </Flex>
    }
  }
}) 

const Unread = ({num} : {num? : number}) => {
  if(!num) {
    return null
  }
  return <div class={classes.unread}>
    {num}
  </div>
}

