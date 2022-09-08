

const { Router } = require('express')
const { Country, Activity } = require('../../db.js')
const router = Router()


router.post('/', async (req, res) => {
  const { countries, name, difficulty, duration, season } = req.body
  
  try{
    
   const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
    
  })

  // console.log(countries)
  // countries.map(
  //   async (c) => await newActivity.setCountries(await Country.findByPk(c))
  // )
  await newActivity.setCountries(countries)

  res.json(newActivity)

  } catch (error){
    res.send('TODO MAL ', error)
  }

 
})

module.exports = router