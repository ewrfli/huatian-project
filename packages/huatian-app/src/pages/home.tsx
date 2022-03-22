import { Tabs } from "@huatian/components"
import {Discovery} from '../components/Discovery'
import { Match } from "../components/Match"
import { Friends } from '../components/Friends'

const { Tab } = Tabs

const MenuItem = ({
  isActive,
  title,
}: {
  isActive: boolean
  title: string
}) => {
  return (
    <>
      <span style={{ color: isActive ? "blue" : "grey" }}>
        {title}
      </span>
    </>
  )
}

export const Home = () => {
  return (
    <>
      <Tabs scrollBehavior="body">
        <Tab
          renderMenu={({ isActive }) => {
            return (
              <MenuItem isActive={isActive} title="发现" />
            )
          }}
        >

          <Discovery />
        </Tab>
        <Tab
          renderMenu={({ isActive }) => {
            return (
              <MenuItem isActive={isActive} title="社交" />
            )
          }}
        >
          <Match />
        </Tab>
        <Tab
          renderMenu={({ isActive }) => {
            return (
              <MenuItem isActive={isActive} title="消息" />
            )
          }}
        >
          <Friends />
        </Tab>
      </Tabs>
    </>
  )
}
