import {defineComponent} from 'vue'

import {MessageCard} from '../components/message/Card'
import { ListView } from '../components/listview/ListView'
import a1 from '../assets/a1.jpg'
import a2 from '../assets/a2.png'


export const MessagesExample = () => {

  const list = [{
    avatar : a1,
    name : "张三",
    short : "你好啊！",
    time : "1分钟前",
    unread : 0
  }, {
    avatar : a2,
    name : "李四",
    short : "在做什么？",
    time : "1分钟前",
    unread : 10
  }]


  return <ListView>
    {list.map( (userMessage, i) => {
      return <MessageCard key={i} {...userMessage} />
    })}
  </ListView>

}