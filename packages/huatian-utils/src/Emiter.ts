
type EventHandler = (...args : any[]) => void

export class Emiter<EventType extends string | number> {

  private topics = new Map<EventType, EventHandler[]>()


  private getTopic(type : EventType) : EventHandler[]{
    if(!this.topics.has(type)) {
      this.topics.set(type, [])
    }
    return this.topics.get(type)
  }

  on(type : EventType, handler : EventHandler) {
    const handlers = this.getTopic(type)
    handlers.push(handler)

    return () => {
      return handlers.filter(x => x !== handler)
    }

  }

  emit(type : EventType, ...args : any[]) {

    const handlers = this.getTopic(type)
    handlers.forEach(handler => {
      handler(...args)
    })
  }

}

