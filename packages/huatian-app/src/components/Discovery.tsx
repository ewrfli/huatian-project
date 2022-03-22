import {defineComponent, ref } from 'vue'
import * as rest from '@huatian/rest'
import {
  DiscoveryCard,
  DiscoveryCardProps,
  ListView
} from "@huatian/components"

async function mockDataDiscoverList(){
  const list = await rest.discovery.get()
  return list
}

function useDiscoveryList() {
  const data = ref<DiscoveryCardProps[] | null>(null)

  async function load(){
    const list = await mockDataDiscoverList()
    if (data.value === null) {
      data.value = []
    }
    data.value = data.value?.concat(list)
  }
  load()

  return { list : data, loadMore: load }
}

export const Discovery = defineComponent({
  setup() {
    const { list, loadMore } = useDiscoveryList()

    return () => {
      return (
        <ListView onBottom={loadMore}>
          {list.value === null && <div>Loading...</div>}
          {list.value &&
            list.value.map((x, i) => {
              return <DiscoveryCard key={i} {...x} />
            })}
        </ListView>
      )
    }
  },
})