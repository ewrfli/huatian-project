import {defineComponent, ref } from 'vue'
import {
  CardStack,
  SocialCardProps,
} from "@huatian/components"
import * as rest from '@huatian/rest'

async function mockData(){

  const candidates = await rest.candidates.get()
  return candidates.map((x:any) => {
      return {
        id: x.id,
        img: x.avatar
      }
    })
}



function useCandidates(){
  const data = ref<SocialCardProps[]>([])
  const ver = ref(0)

  mockData().then((list) => {
    data.value = data.value.concat(list)
    ver.value ++
  })

  return {
    async likeOrDislike(id : number, like: boolean) {
      if(like) {
        await rest.friend.put(id)
      }
      data.value = data.value.filter(x => x.id !== id)
      ver.value ++
    },
    list : data,
    ver
  }
}



export const Match = defineComponent({
  setup(){

    const {list, likeOrDislike, ver} = useCandidates()
    return () => {
      console.log('render', ver.value)
      return <div>
        <CardStack key={ver.value} onConfirm={(card, like) => {
          likeOrDislike(card.id, like)
        }} list={list.value} />
      </div>
    }
  }
})

