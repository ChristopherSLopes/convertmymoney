const api = require('./api.bcb')
const axios = require('axios')
//Testa o que esta sendo exportado.
//Se usarmos o axios de verdade deixariamos de fazer um teste unitario e sim de integração. Porque estariamos chamando o axios.
jest.mock('axios')//Mocka o axios. Isso fala: Olha, não é um axios de verdade. QWuero passa uma versão desse acios aqui.
test('getCotacaoAPI', () => {
    const res = { //Quero retorna a minha cotação. Minha resposta de cotação.
        data: {
            value: [ //Isso aqui ta inutil.
                { cotacaoVenda: 8.8 } //Esse é o valor que nosa api responde se estiver funcionando corretamente.
            ]
        }

    }
    //abaixo. Quando o axios for chamado com get que é o que acontece no modulo. Ele vai mocka a resosta.
    axios.get.mockResolvedValue(res) //Quando eu chama aqui dentro nao vamos chama o axios.get falso que acabamos de criar.
    api.getCotacaoAPI('url').then(resp => { //checando a cotação. Pega a cotação do api que é o documento ./apo.bcb
        expect(resp).toEqual(res) //Na linha de cima, coloquei um s na url e não deu erro.
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

//Testando se chama o axios.get passando a url certa que passamos como parametro.


test('extractCotacao', () => {
    const cotacao = api.extractCotacao({
        data: {
            value: [
                { cotacaoVenda: .88 }
            ]
        }
    })
    expect(cotacao).toBe(8.8)
})

//Como que eu sei se temos testes o suficiente?
//Uma das metricas tenta descobrir a cobertura do codigo.
//Uma maneira de faze isso é definir algumas variaveis do jest

//Precisamos fazer alguns tratamentos diferenciados porque estamos usando o data que é um ogjeto do global
describe('getToday', () => { //Mas podemos agrupar varios teste com describe
    const RealDate = Date //Que é meu global date. Vamos apenas guarda aqui

    function mockDate(date) { //Aqui vamos criar uma funsão e passa a data que queremos.
        global.Date = class extends RealDate { //sobrescrevendo o proprio date
            constructor() {
                return new RealDate(date) //Vamos fixar a data usanod mockDate
            }
        }
    }
    afterErch(() => {//Depois de roda cada teste
        global.Date = RealDate //Volta o date para o que era antes
    })


    test('getToday', () => {
        mockDate('2019-01-01T12:00:00z') //Como fazemos o teste? Chaa o mockDate e passa uma data.
        const today = api.getToday
        expect(today).toBE('1-1-2019')
    })
})




///////Falta testa agora o getURL

test('getURL', () => {
    const url = api.getUrl('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

//Queremos testa a funsão puta do getCotacao
test('getCotacao', () => {//São necessarias muitas funsões para isso funcionar. Então fazemos a injessão de dependencias na funsão original e aqui precisamos moka essas depencencias. 
    const res = {
        data: {
            value: [
                { cotacaoVenda: 8.8 }
            ]
        }

    }

    const getToday = jest.fn()
    getToday.mockReturnValue('01-01-2019')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoApi = jest.fn()
    getCotacaoApi.mockResolvedValue(res)

    const extractCotacao = jest.fn()
    extractCotacao.mockResolvedValue(5.7)
    //Extraimos todo mundo, criamos funsões falsas para todo mundo. Fizemos todas as versçoes mockadas
    //Quando eu for chama meu getCotação eu preciso passa essas funsões aqui.

    api.pure
        .getCotacao({ getToday, getUrl, getCotacaoApi, extractCotacao })
        //  Isso me retorna uma outra funsão. Como me retorna uma outra funsão vou executa de novo, ele vai retorna uma promisse pra mim e eu farei um then
        .then(res => {
            expect(res).toBe(3.9)
        })
}) //Eu sei que é um pouco confuso mas lembre-se que temos que testa a unidade.

test('getCotacao', () => {//São necessarias muitas funsões para isso funcionar. Então fazemos a injessão de dependencias na funsão original e aqui precisamos moka essas depencencias. 
    const res = {
    }

    const getToday = jest.fn()
    getToday.mockReturnValue('01-01-2019')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoApi = jest.fn()
    getCotacaoApi.mockReturnValue(Promise.reject('err'))

    const extractCotacao = jest.fn()
    extractCotacao.mockResolvedValue(5.7)
    //Extraimos todo mundo, criamos funsões falsas para todo mundo. Fizemos todas as versçoes mockadas
    //Quando eu for chama meu getCotação eu preciso passa essas funsões aqui.

    api.pure
        .getCotacao({ getToday, getUrl, getCotacaoApi, extractCotacao })
        //  Isso me retorna uma outra funsão. Como me retorna uma outra funsão vou executa de novo, ele vai retorna uma promisse pra mim e eu farei um then
        .then(res => {
            expect(res).toBe('')
        })
})