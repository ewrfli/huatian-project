import { xfetch } from "./xfetch"
import { UserJSON } from '@huatian/domain'

export const put = async (uid: number) => {
  const url = `${import.meta.env.VITE_HOST}/friend/${uid}`
  return xfetch(url, {
    method : 'PUT'
  })
}


export const get = async () => {
  const url = `${import.meta.env.VITE_HOST}/friend`
  return xfetch(url) as Promise<UserJSON[]>
}
