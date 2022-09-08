//El reducer es una función pura que toma el estado anterior y una acción,
// y devuelve en nuevo estado.
// especifican cómo cambió el estado de la aplicación en respuesta A LA ACCION

const initialState = {
    countries: [], //este array se va a ir modificando según los filtros que aplique en el front
    allCountries: [], //en este array voy a tener siempre TODOS los paises
    countryDetail: {},
    currentPage: 1,
  
    
  }
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {

      case 'GET_COUNTRIES':
        return {
          ...state,
          countries: action.payload,
          allCountries: action.payload,
        }
        
      case 'DETAILS_COUNTRY':
        return{
          ...state,
          countryDetail:[]
        }

      case 'GET_COUNTRIES_BY_NAME':
        return {
          ...state,
          countries: action.payload,
        }


      case 'FILTER_BY_CONTINENT':
        const filteredByCntnt =
          action.payload === 'All'
            ? state.allCountries
            : state.allCountries.filter((c) => 
            // console.log("SOY EL C DE CONTINENT", c)
            c.continents === action.payload
            )
        return {
          ...state,
          countries: filteredByCntnt,
         
        
        }

     case 'FILTER_BY_ACTIVITY':
          const filtered =
            action.payload === 'All'
              ? state.allCountries
              : state.allCountries.filter(
                  (c) =>
                    c.activities &&
                    c.activities.filter((act) => act.season === action.payload)
                      .length
                )
          return {
            ...state,
            countries: filtered,
          }
    
    

     case 'SORT':
        var sorted
        if (action.payload.length === 2) {
          sorted =
            action.payload === 'AZ'
              ? state.countries.sort((a, b) => {
                  if (a.name > b.name) return 1
                  if (a.name < b.name) return -1
                  return 0
                })
              : state.countries.sort((a, b) => {
                  if (a.name > b.name) return -1
                  if (a.name < b.name) return 1
                  return 0
                })
        } else {
          sorted =
            action.payload === 'populationAsc'
              ? state.countries.sort((a, b) => a.population - b.population)
              : state.countries.sort((a, b) => b.population - a.population)
        }
        return {
          ...state,
          countries: sorted,
        }

    case 'CREATE_ACTIVITY':
        return {
          ...state,
        }

    case 'GET_COUNTRY_DETAILS':
        return {
          ...state,
          countryDetail: action.payload,
        }
    
  
    case 'CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      }
   
 

        
      default:
        return state
    }

    
  }
  
  export default rootReducer

