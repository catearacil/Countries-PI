import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

export default function LandingPage() {
  return (
    <div className={styles.container}>

      <div className={styles.textContainer}>
        <h1 className={styles.title}>Discover amazing places</h1>
      
        <Link to='/countries'>
          <button className={styles.btn}>Click me!</button>
        </Link>
        
        <p className={styles.footer}>Travel Agency Website</p>
      </div>

    </div>
  )
}