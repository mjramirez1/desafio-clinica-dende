const http = require('http')
const url = require('url')
const axios = require('axios').default
const chalk = require('chalk')
const uuid = require('uuid')
const moment = require('moment')
const _ = require('lodash')

const resultado = []

http.createServer(function(req, res) {
    
    if(req.url.includes('/registrar')) {
        axios.get('https://randomuser.me/api').then(resUser => {
            resUser.data.results.forEach(e => {
                resultado.push(e)
            });
            let resultado_map = _.map(resultado, (value, key) => {
                return {
                nombre: value.name.first,
                apellido: value.name.last,
                uuid: uuid.v4().slice(0,6),
                timestamp: moment().format("MMMM Do yyyy, h:mm:ss a")
                }
            })
        console.log(chalk.blue.bgWhite(JSON.stringify(resultado_map)))
        res.write('PARA REGISTRAR MAS USUARIOS, ACTUALICE LA PAGINA!\n\n USUARIOS REGISTRADOS:\n\n')
        resultado_map.forEach((u, i) => {
            res.write(`${i + 1}. Nombre: ${u.nombre} - Apellido: ${u.apellido} - ID: ${u.uuid} - Timestamp: ${u.timestamp} \n`)
        })
        res.end()
        })
    }
}).listen(8080, () => console.log('Escuchando el puerto 8080'))