import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllCountries,
  filterByContinent,
  filterByActivity,
  sort,
 
} from '../actions'

import { Link } from 'react-router-dom'
import { Country } from './Country'
import Pages from './Pages'
import styles from './Home.module.css'
import Navbar from './Navbar'
import Error from './Error'

export default function Home() {

//el useDispatch hace q desde mi comp funcional pueda usar el dispatch ya q no se puede usar en cualq comp y se usa para q mi store global se encargue
//como? recibe la accion hecha con el dispatch, ejecuta ess accion, la guarda en un "contenedor", y mi useSelector importa ese contenedor
  const dispatch = useDispatch()
  const countries = useSelector((state) => state.countries) //toma el estado actual como arg y devuelve los datos q queremos

  useEffect(() => {
    dispatch(getAllCountries())
    
  }, [dispatch])


// ------------------ USO DE ESTADO PARA EL ORDENAMIENTO POR NOMBRE Y POBLACION------------

  const [order, setOrder] = useState('')


  //---------------------- USO DE ESTADOS LOCALES PARA EL PAGINADO -----------------------------

  const [currentPage, setCurrentPage] = useState(1) // empiezo en la pag 1
  const [countriesPerPage, SetcountriesPerPage] =useState(9); // en la primer pag q muestre 9 

  const pages = (pageNum) => {
    setCurrentPage(pageNum)
  }
 

  //---------------------------- FILTRO POR CONTINENTE --------------------------------------

  function handleContinentFilter(e) {
    dispatch(filterByContinent(e.target.value))
    //prop de valor del elemento DOM. cuando ejec el evento lo capturo y yo neceso entrar a la prop donde tiene el value y ese es el "target"
  }

  //---------------------------- FILTRO POR ACTIVIDAD ----------------------------------

  function handleActivityFilter(e) {
    dispatch(filterByActivity(e.target.value))
  }

  //---------------------- ORDENAR POR NOMBRE Y POBLACION ----------------------------

  function handleSort(e) {
    e.preventDefault() //evita q no recargue la pag!!
    dispatch(sort(e.target.value))
  
    setOrder(e.target.value)
  }

  /* ------------------------LOGICA DEL PAGINADO--------------------------------
  Lógica: en cada pag, voy tomando del array de países (importado del estado global en la constante countries)
  una slice que vaya desde firstIdx hasta lastIdx, sin incluir este último.
  */
  var lastIdx = currentPage * countriesPerPage // en la primera página, lastIdx = 1 * 9 = 9
  var firstIdx = lastIdx - countriesPerPage // en la primera página, firstIdx = 9 - 9 = 0
  var currentCountries = countries.slice(firstIdx, lastIdx) // en la primera página, currentCharacters = countries.slice(0,9)

  useEffect(()=> {
    if (currentPage===1){
      SetcountriesPerPage(9)
    }else{
      SetcountriesPerPage(10)
    }
  },[currentPage])

//-------------------  FUNCT QUE AL TOCAR "RELOAD COUNTRIES" ME MUESTRA LOS PAISES -------------------

  function handleClick(e) {
    e.preventDefault()
    dispatch(getAllCountries())
  }

  //------------------------ EL FAMOSO RETURN Y LO QUE VEMOS ----------------------------------
  return (
    <div className={styles.container}>
      
      <Navbar
        sort={handleSort}
        contFilter={handleContinentFilter}
        actFilter={handleActivityFilter}
      />

      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={(e) => handleClick(e)}>
          Reload countries
        </button>

        <button className={styles.btn}>
          <Link className={styles.link} to='/activities'>
            Add Activity
          </Link>
        </button>
      </div>

    
{/* //-------------------------- LO QUE VEMOS DE LOS PAISES ------------------------- */}

      <div className={styles.countryContainer}>
        {currentCountries.length ? (
          currentCountries.map((c) => (
            <Country
              name={c.name}
              flag={c.flag}
              id={c.id}
              key={c.id}
              continent={c.continents}
            />
          ))
        ) : (
          <Error text={'No countries found. Please try again'} />
        )}
      </div>

      <Pages
        amountPerPage={countriesPerPage}
        totalAmount={countries.length}
        pageNumber={pages}
      />
    </div>
  )
}