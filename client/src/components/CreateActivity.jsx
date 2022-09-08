
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getAllCountries, createActivity } from '../actions'
import styles from './CreateActivity.module.css'

export default function CreateActivity() {
  const dispatch = useDispatch()
  const history = useHistory()
  const countries = useSelector((state) => state.allCountries)

  const [errors, setErrors] = useState({});

  const [details, setDetails] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: [],
    
  })


  function validate(details) {
    let errors = {};
    if (!(/^[a-zA-Z]{4,20}$/.test(details.name))) {
      //  alert("Missing add the name" + " " + "(Introduce the name)")
      errors.name = "Please, enter a name with more than 4 characters.";

    } else if (!['Summer', 'Fall','Winter', 'Spring'].includes(details.season)) {
      // alert("Missing add the season" + " " + "(Introduce the season)")
      errors.season = "Please, we need a valid season";

    } else if (!(/^[1-5]}*$/.test(details.duration))) {
      // alert("Missing add the duration" + " " + "(Introduce the duration)")
      errors.duration = "Please, we need the duration of numbers <5";

    } else if (!(/^[1-5]}*$/.test(details.difficulty))) {
      // alert("Missing add the difficulty" + " " + "(Introduce the difficulty)")
      errors.difficulty = "Please, we need the difficulty ";

    } else if (countries.length<5) {
    // alert("Missing add the difficulty" + " " + "(Introduce the difficulty)")
    errors.countries = "Max 6 country";
  }
  
    return errors;
  }
  

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])


  function handleChange(e) { //detecta cuando alguien agrega o borra algo del input
    if(e.target.name==='duration'){
      setDetails({
        ...details,
        duration: `${e.target.value} hs`
      })
    }
    setDetails({
      ...details,
      [e.target.name]: e.target.value, //le cambia el valor x lo que se esta escribiendo
    });
    setErrors(
      validate({
        ...details,
        [e.target.name]: e.target.value,
      })
    );
  }


  function handleSelect(e) {
    if(details.countries.length===6){
      setErrors({countries:"Max 6 country"})
    }else{
    setDetails({
      ...details,
      countries: [...details.countries, e.target.value],
    })}
  }

  function handleSubmit(e) {
    e.preventDefault() //no pierdo los datos
    if( !details.name || !details.difficulty || !details.duration || !details.season || countries.length===0){

    alert('Complete all form')

    }else if(Object.keys(errors).length>0){

      alert("Don't' create an activity with errors")

   }else{
    dispatch(createActivity(details))
    setDetails({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: [],
    })
    history.push('./countries')
    alert('Activity created!')
   } 
  }

  function handleDelete(e){
    setDetails({
      ...details,
      countries: details.countries.filter((c)=> c!== e)
    })
  }

 
  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* mi hermoso controlador que si no lo llenan no podes navegar en nueva pag */}
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}> 
          <h1 className={styles.title}>Add Touristic Activity</h1>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              className={styles.input}
              onChange={(e) => handleChange(e)} //tenemos el evento q "activa" y dice que queremos que ahora en este ej Name sea igual al valor agregado en el input
              
            />
             {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='duration'>
              Duration (hs):
            </label>
            <input
              type='number'
              id='duration'
              name='duration'
              className={styles.input}
              onChange={(e) => handleChange(e)}
              
            />
             {errors.duration && <p className={styles.error}>{errors.duration}</p>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='difficulty'>
              Difficulty:
            </label>
            <select //lista desplegable
              id='difficulty'
              name='difficulty'
              className={styles.input}
              onChange={(e) => handleChange(e)}
            >
              <option value=''>Difficulty...</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            {errors.difficulty && <p className={styles.error}>{errors.difficulty}</p>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='season'>
              Season:
            </label>
            <select
              className={styles.input}
              id='season'
              name='season'
              onChange={(e) => handleChange(e)}
            >
              <option value=''>Season...</option>
              <option value='Summer'>Summer</option>
              <option value='Fall'>Fall</option>
              <option value='Winter'>Winter</option>
              <option value='Spring'>Spring</option>
            </select>
            {errors.season && <p className={styles.error}>{errors.season}</p>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='season'>
              Country:
            </label>
            <select
              className={styles.input}
              name='countries'
              value='Countries...'
              onChange={(e) => handleSelect(e)}
              
            >
              <option hidden value=''>Countries...</option>
              {countries.filter((f)=> !details.countries.includes(f.id)).map((c) => (
                <option value={c.id}>{c.name} </option>
              ))}
            </select>
           
          </div>
         
          {errors.countries && <p className={styles.error}>{errors.countries}</p>}

          <Link to='/countries'>
         
            <button className={styles.btnBack}>Go back</button>
          </Link>
          <button className={styles.btn} type='submit'>
            Add Activity
          </button>
          
        </form>
         <ul className={styles.caca}>
            
          {details.countries.map((c)=>(
            <div className={styles.delete}>
             <li> <p>{c}</p>
              <button
              className={styles.botton}

            onClick={()=>{
              handleDelete(c)

            }}
            > X

            </button>
            </li>
            </div>
          ))}
         </ul>
        
      </div>
    </div>
  )
}