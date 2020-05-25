import React from 'react'
import { Menu, Icon } from 'antd'
import 'antd/es/menu/style/css'
// const { SubMenu } = Menu

const NodeContextMenu = ({ node: string, x = -300, y = 0 }) => {
  return <Menu style={{ width: 256, position: 'absolute', left: x, top: y }} mode="vertical">
    <Menu.Item key="9">Option 9</Menu.Item>
    <Menu.Item key="10">Option 10</Menu.Item>
    <Menu.Item key="11">Option 11</Menu.Item>
    <Menu.Item key="12">Option 12</Menu.Item>
  </Menu>
}

export default NodeContextMenu