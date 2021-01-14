const pokemonData = require("./pokemonData")
const Sequelize = require('sequelize')
const { forEach } = require("./pokemonData")
const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     })
// sequelize
// .query("SELECT * FROM teacher")
// .then(function ([results, metadata]) {
//   results.forEach(c => console.log(c))
// })
//  sequelize
// .query("INSERT INTO company VALUES(null, 'Google', 'Tech', 10000)")
// .then(function ([result]) {
//     console.log(result)
// })
//     const addStudent = async function (name, isBrilliant) {
//         let query =`INSERT INTO student VALUES (null, '${name}', ${isBrilliant})`
//         let result = await sequelize.query(query)
//         console.log(result[0])
//         return result[0]
//     }

// addStudent("Leonidis", 1)

//  addTeacher = async (name, isTenured) => {
//     let query =`INSERT INTO teacher VALUES (null, '${name}', ${isTenured})`
//     let result = await sequelize.query(query)
//     console.log(result[0])
//     return result[0]
// }
// addTeacher("Yoda", 0)
// enrollStudent = async(Sname, Tname) => {
//     let StudentData =`SELECT s_id FROM student WHERE s_name = '${Sname}'`
//     let teacherData =`SELECT t_id FROM teacher WHERE t_name = '${Tname}'`
//     let sResult = await sequelize.query(StudentData)
//     console.log(sResult)
//     let tResult = await sequelize.query(teacherData)
//     console.log(tResult)
//     let studentId = sResult[0][0].s_id
//     let teacherId = tResult[0][0].t_id
//     if (!(studentId && teacherId)) { return }
//     sequelize.query(`INSERT INTO student_teacher VALUES (${studentId}, ${teacherId})`)
//     console.log(studentId)
//     console.log(teacherId)
//     sequelize
//       .query("SELECT * FROM student_teacher")
//      .then(function ([results, metadata]) {
//       console.log(results)
//     })
// }
// enrollStudent("Leonidis", "Yoda")

// sequelize
// .query("INSERT INTO pokemon VALUES(null, 'Google', 'Tech', 10000)")
// .then(function ([result]) {
//     console.log(result)
// })


//  addPokemonType = async () => {
//      let obj ={}
//    for(let i in pokemonData){
//         obj[pokemonData[i].type] = "value"
//     }
//     for (let i in obj){
//     await sequelize.query(`INSERT INTO pokemon_type  VALUES(null, '${i}')`)
//     }
// }

// addTown = async () => {
//     let obj = {}
//     for (let p of pokemonData) {
//         for (let j of p.ownedBy) {
//             obj[j.town] = "value"
//         }
//     }
//     console.log(obj)
//     for (let i in obj) {
//         // console.log(i)
//         await sequelize.query(`INSERT INTO town VALUES(null, '${i}')`)
//     }
// }

//  addTrainer = async () => {
//     let obj ={}
//     let arr = []
//     let counter = 0
//     for (let p of pokemonData) {
//         for (let j of p.ownedBy){
//             obj[j.name] = j.town
//      }
//  }
//  for (let i in obj) {
//     // console.log(obj[i])
//      let data = await sequelize.query(`SELECT id FROM town WHERE name = '${obj[i]}'`)
//     //  console.log(data[0][0].id)
//      arr.push(data[0][0].id)
//  }
//  for (let i in obj){
//     await sequelize.query(`INSERT INTO trainer VALUES(null, '${i}', ${arr[counter]})`)
//     counter++
//  }
// }

// addPokemon = async () => {
//     for (let p of pokemonData) {
//     let data = await sequelize.query(`SELECT id FROM pokemon_type WHERE name = '${p.type}' `)
//     await sequelize.query(`INSERT INTO pokemon
//     VALUES(${p.id}, '${p.name}', ${data[0][0].id} , ${p.height}, ${p.weight})`)
//     }
// }

// addPokemonTrainer = async () => {
//     let results = []
//     let pokemonIdData = await sequelize.query(`SELECT id FROM pokemon`)
//     let pokemonId = pokemonIdData[0]
//     // console.log(pokemonId)
//     for (let p of pokemonData) {
//         if (pokemonId[p.id]) {
//             for (let i in p.ownedBy) {
//                 let data = await sequelize.query
//                     (`SELECT id FROM trainer WHERE name ='${p.ownedBy[i].name}'`)
//                 results.push(...data[0])
//             }
//             console.log(results)
//                  for (let i in results) {
       
//              await sequelize.query(`INSERT INTO pokemon_trainer VALUES(${p.id}, ${results[i].id} )`)
//             }
//           results = []
//         }
//     }
// }

// findMax = async () =>{
//     let results = await sequelize.query
//     ("SELECT name, weight FROM pokemon WHERE weight=(SELECT MAX(weight) FROM pokemon)")
//     console.log(results[0])
// } ;

// findMax()

// findType = async (type) =>{
//     let results = await sequelize.query
//     (`SELECT pokemon.name FROM pokemon, pokemon_type WHERE pokemon.type = pokemon_type.id
//     AND pokemon_type.name = '${type}'`)
//     let res = results[0].map(r=>r.name)
//         console.log(res)
    
// } ;
// findType("grass")

// findOwner = async (name) =>{
//     let results = await sequelize.query
//     (`SELECT trainer.name FROM trainer, pokemon_trainer, pokemon WHERE pokemon_trainer.t_id = trainer.id 
//     AND pokemon_trainer.p_id = pokemon.id AND pokemon.name = '${name}'`)
//     let res = results[0].map(r=>r.name)
//         console.log(res)
    
// } ;
// findOwner("gengar")

// findPokemons = async (trainer) =>{
//     let results = await sequelize.query
//     (`SELECT pokemon.name FROM pokemon, pokemon_trainer, trainer WHERE pokemon_trainer.t_id = trainer.id 
//     AND pokemon_trainer.p_id = pokemon.id AND trainer.name = '${trainer}'`)
//     let res = results[0].map(r=>r.name)
//         console.log(res)
//     } ;
// findPokemons("Loga")

findPokemons = async () =>{
        let mostOwned = await sequelize.query
        (`SELECT p.name, COUNT(pt.t_id) AS owner_count FROM pokemon AS p, pokemon_trainer AS pt, trainer AS t
        WHERE  pt.p_id = p.id AND t.id = pt.t_id
        GROUP BY p.name`)
    console.log(mostOwned[0])
      
    mostOwned[0].sort((a, b) => b.owner_count - a.owner_count)
    console.log(mostOwned[0])
    let maxOwners = mostOwned[0][0].owner_count
    console.log(maxOwners)

    let indexNotMax = mostOwned[0].findIndex(mo => mo.owner_count !== maxOwners)
    console.log("index", indexNotMax)
    mostOwned[0].splice(indexNotMax)


    let namesMostOwned = []
    mostOwned[0].forEach(mo => namesMostOwned.push(mo.name))
    console.log(namesMostOwned)                       
    return namesMostOwned
}
        
 findPokemons()  
    



//   let countTId = await sequelize.query(`SELECT COUNT(*) FROM trainer`)


//   for (let i in pId[0]){
//   console.log(pId[0][i].id)
//   }
//   console.log(tId)
//   console.log(countTId[0][0])
//     for (let p of pokemonData) {
//     let pokemonId = await sequelize.query(`SELECT id FROM pokemon WHERE name = '${p.name}' `)
//     console.log(pokemonId[0][0].id)
//     }
//     for (let p of pokemonData){
//       for (let j of p.ownedBy){
//         let trainerId = await sequelize.query(`SELECT id FROM trainer WHERE name = '${j.name}' `)
//         console.log(trainerId[0][0].id)
//     }
// }
// await sequelize.query(`INSERT INTO pokemon
// VALUES(${p.id}, '${p.name}', ${data[0][0].id} , ${p.height}, ${p.weight})`)
// }



