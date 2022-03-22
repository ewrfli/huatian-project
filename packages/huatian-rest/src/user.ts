import { xfetch } from "./xfetch"
import { UserJSON } from '@huatian/domain'

export const get = async () => {
  const url = `${import.meta.env.VITE_HOST}/user`
  return xfetch(url) as Promise<UserJSON>
}
