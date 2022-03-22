import { Page } from "../components/Page"
import { Tabs } from "../components/tabs"

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
export const TabsExample01 = () => {
  return (
    <div>
      <h2>Tabs示例</h2>
      <Tabs scrollBehavior="body">
        <Tab
          renderMenu={({ isActive }) => {
            return (
              <MenuItem isActive={isActive} title="首页" />
            )
          }}
        >
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
          <h2>你好！首页!</h2>
        </Tab>
        <Tab
          renderMenu={({ isActive }) => {
            return (
              <MenuItem isActive={isActive} title="发现" />
            )
          }}
        >
          <h2>你好！发现!</h2>
        </Tab>
        <Tab
          renderMenu={({ isActive }) => {
            return (
              <MenuItem isActive={isActive} title="我的" />
            )
          }}
        >
          <div>
            <h2>你好！我的!</h2>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
