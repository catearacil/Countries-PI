
const { Router } = require('express')
const { Country, Activity } = require('../../db.js')
const { Op } = require('sequelize')
const router = Router()

router.get('/', async (req, res) => {
  //incluyo la información de la tabla Activities para poder filtrar por actividad
  const all = await Country.findAll({ include: Activity })
  
  try{

  if (req.query.name) {
    let { name } = req.query
    name = name[0].toUpperCase() + name.slice(1).toLowerCase() //no importa si uno busca en may o min
    const found = await Country.findAll({
      where: { name: { [Op.substring]: name } }, //me veo si literalmente el nombre concuerda con el q se busca
    })
   
    return res.json(found)
  }

  res.json(all)

  }catch(error){
  res.send('ESTAS HACIENDO TODO MAL ',error)
}
})



router.get('/:id', async (req, res) => {
  const one = await Country.findByPk(req.params.id.toUpperCase(), {
    include: Activity,
  })
  if (!one) {
    return res.status(404).send('Error: country not found')
  }
  // console.log(one)
  return res.json(one)
})



module.exports = router