import { createStore, applyMiddleware } from 'redux' //Los middlewares te dajan envolver el método dispatch del Store.Soportar acciones asíncronas
import { composeWithDevTools } from 'redux-devtools-extension'  //con esto me ahorro todo el choclo de window.__REDUX(...)
import rootReducer from '../reducers/index' // reestablecer estado a su estado inicial
import thunkMiddleware from 'redux-thunk' //Van a recibir dispatch como argumento y capaz llamarlo asíncronamente.

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store