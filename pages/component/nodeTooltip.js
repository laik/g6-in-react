import React from 'react'
// import { Timeline, Select } from 'antd'
import 'antd/es/timeline/style/css'
import styles from './index.css'

// const { Option } = Select;

// function onChange(value) {
//   console.log(`selected ${value}`);
// }

// function onBlur() {
//   console.log('blur');
// }

// function onFocus() {
//   console.log('focus');
// }

// function onSearch(val) {
//   console.log('search:', val);
// }
const NodeToolTips = ({ x,y }) => {
  return (
    <div className={styles.nodeTooltips} style={{ top: `20px`, left: `20px`}}>
      日志输出
    </div>
  )
}

export default NodeToolTips
