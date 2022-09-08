import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllCountries,
  filterByContinent,
  filterByActivity,
  sort,
  setCurrentPage,
 

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
  const [order, setOrder] = useState('') //lo uso para que se me reenderice el comp con los filtros apl
  const currentPage = useSelector((state) => state.currentPage)

  useEffect(() => {
  // console.log(countries)
    dispatch(getAllCountries())
    
  }, [])


  //---------------------- USO DE ESTADOS LOCALES PARA EL PAGINADO -----------------------------

  const [countriesPerPage, SetcountriesPerPage] =useState(9); // en la primer pag q muestre 9 

  const pages = (pageNum) => { //para el render
    dispatch(setCurrentPage(pageNum))
  }

  var lastIdx = currentPage===1 ? currentPage * countriesPerPage:currentPage * countriesPerPage-1 // en la primera página, lastIdx = 1 * 9 = 9
  var firstIdx = lastIdx - countriesPerPage // en la primera página, firstIdx = 9 - 9 = 0
  var currentCountries = countries.slice(firstIdx, lastIdx) // en la primera página, currentCharacters = countries.slice(0,9)
//slice tomo del array lo q quiero 



  useEffect(()=> {
    if (currentPage===1){
      SetcountriesPerPage(9)
    }else{
      SetcountriesPerPage(10)
    }
  },[currentPage])
 

  //---------------------------- FILTRO POR CONTINENTE --------------------------------------

  function handleContinentFilter(e) {
    e.preventDefault()
    //console.log(countries)
    dispatch(filterByContinent(e.target.value))
    //prop de valor del elemento DOM. cuando ejec el evento lo capturo y yo neceso entrar a la prop donde tiene el value y ese es el "target"
   dispatch(setCurrentPage(1))
   
  }


  //---------------------------- FILTRO POR ACTIVIDAD ----------------------------------

  function handleActivityFilter(e) {
    e.preventDefault()
    dispatch(filterByActivity(e.target.value))
    dispatch(setCurrentPage(1))
  }



  //---------------------- ORDENAR POR NOMBRE Y POBLACION ----------------------------

  function handleSort(e) {
    e.preventDefault() //evita q no recargue la pag!!
    dispatch(sort(e.target.value))
  
  setOrder(`Ordenado ${e.target.value}`);
    dispatch(setCurrentPage(1))
  }


//-------------------  FUNCT QUE AL TOCAR "RELOAD COUNTRIES" ME MUESTRA LOS PAISES SIN FILTRO-------------------

  function handleClick(e) {
    e.preventDefault()
    dispatch(getAllCountries())
  }



  //------------------------ EL FAMOSO RENDERIZADO ----------------------------------
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
        totalAmount={countries.length}
        pageNumber={pages}
        amountPerPage={currentCountries.length}
      />
    </div>
  )
}