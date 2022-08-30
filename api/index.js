async function loader(){
   
    try {
      const allCountries = await axios.get('https://restcountries.com/v3/all');
      let info = [];
    
      await allCountries.data.forEach(country =>{
        // console.log(country.population)
        info.push({
          'id':country.cca3,
          'name':country.name.common,
          'flag':country.flags[1],
          'continents': country.region,
          'capital': country.capital?country.capital[0]: 'NO SE ENCONTRO',
          'subregion':country.subregion?country.subregion[0]: ' NO SE ENCONTRO',
          'area': country.area,
          'population': country.population

      })
    });
    await Country.bulkCreate(info);
    console.log("data added to db")
  
    } catch(err){
      console.log(err)
      return err
    }
  }







//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country } = require('./src/db.js')
const axios = require("axios")

// Syncing all the models at once.
conn.sync({ force: true }).then(()=>{loader()}).then(() => { 
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

// Loader countries
