import React from 'react'
import styles from './index.css'

const EdgeToolTips = ({ x, y }) => {
  return (
    <div className={styles.edgeTooltips} style={{ top: `${y}px`, left: `${x}px` }}>
      <div className={styles.edgeTitle}>
        <p className={styles.tooltipsCommon}>Edge ----</p>      
      </div>
    </div>
  )
}

export default EdgeToolTips
