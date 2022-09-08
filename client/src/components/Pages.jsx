import React from 'react'
import styles from './Pages.module.css'

export default function Pages({  totalAmount, pageNumber  }) {
  const pageNumbers = []
  const maxPage=  1+Math.ceil((totalAmount-9)/10);
  //

  // for (let i=0; i <= Math.ceil(totalAmount/10); i++) { //redondeo todos mis paises por la cantidad de paises x pag
  //   pageNumbers.push(i+1) AAAAA NO FUNCIONAAAAA 
  // }
  for (let i=0; i < maxPage; i++) { //redondeo todos mis paises por la cantidad de paises x pag
    pageNumbers.push(i+1)
    }

  return (
    <nav className={styles.numBar}>
      <div className={styles.numContainer}>
        {pageNumbers &&
          pageNumbers.map((num) => {
            return (
              <a
                key={num}
                className={styles.number}
                onClick={() => pageNumber(num)} > {num} </a>
            )
          })}
      </div>
    </nav>
  )
}