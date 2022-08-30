import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/Landing'
import Home from './components/Home'
import CreateActivity from './components/CreateActivity'
import Details from './components/Details'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        {/* //va preg cuando la ruta sea tal mostra tal y deja de evaluar las demas */}
        <Switch> 
          <Route exact path='/' component={LandingPage}></Route>
          <Route path='/countries/:id' render={({ match }) => <Details country={match.params.id} />} ></Route> 
          <Route path='/countries' component={Home}></Route>
          <Route path='/activities' component={CreateActivity}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App

//el match lo use ya que al tener id en params para ver el detalle del pais la unica forma de acceder a ese valor es con useParams o con una prop en un comp de clase.