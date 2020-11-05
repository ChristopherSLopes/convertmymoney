const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')


app.set('view engine', 'ejs') //Para usar o ejs precisamo seta o view engine
app.set('views', path.join(__dirname, 'views')) //Passa o diretorio que colocaremos os meus views
app.use(express.static(path.join(__dirname, 'public')))  //Um lugar para por nossos arquivos. Css e tudo mais
//Pasta public.

app.get('/', async (req, res) => {
    const cotacao = await apiBCB.getCotacao()
    res.render('home', {
        cotacao
    })
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query //Usa o destruction assiment
    const conversao = convert.convert(cotacao, quantidade)
    if (cotacao && quantidade) {
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),  //Aqui o valor da coração sera o mesmo, mas apenas convertido
            quantidade: convert.toMoney(quantidade), //Se tirar o convvert.tomoney() e os : do começo, deixa só a palavra, tbm funciona
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Valores Invalidos'
        })
    }
})

app.listen(3000, err => {
    if (err) {
        console.log('Não foi possivel iniciar')
    } else {
        console.log('ConvertMyMoney esta online')
    }
})