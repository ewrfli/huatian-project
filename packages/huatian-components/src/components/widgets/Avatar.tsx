import {StyleValue} from 'vue'
import classes from './widgets.module.scss'

export const Avatar = ({
  url,
  size = 'medium',
  style 
}: {
  url: string
  size?: "small" | "medium" | "larget",
  style? : StyleValue 
}) => {
  return (
    <img
      class={`${classes.avatar} ${classes[size]}`}
      src={url}
      alt=""
      style={style}
    />
  )
}

