

const { Router } = require('express')

const router = Router()

// Importar todos los routers;
const activities = require('./components/activities')
const countries = require('./components/countries')

// Configurar los routers
router.use('/activity', activities)
router.use('/countries', countries)









module.exports = router


