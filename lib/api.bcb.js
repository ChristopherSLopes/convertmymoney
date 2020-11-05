const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
const getCotacaoAPI = url => axios.get(url) //chama o axios passando a url
const extractCotacao = res => res.data.value[0].cotacaoVenda //dado um fomato, extrai o dado
const getToday = () => {
    const today = new Date()
    return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
    //console.log(today.getDate(), today.getFullYear(), today.getMonth())
}

//Vamos coloca mais uma arroy function na frente. Quando chamarmos a primeira vez, vamos passaas dependencias para essa funsão 
//e quando chama novamente ai sim vamos executa a funsão de verdade. 
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => { //Junta todas as funcionalidades.
    try {
        //Usa o gettoday para dentro
        //const {getToday, getUrl, getCotacaoAPI, extractCotacao} = deps. Era passado o deps como parametro. Mas tiramos e colocamos as funsões direto
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    } catch (err) {
        return ''
    }
}


module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }), //O que to fazendo aqui? Estou preparando meu getCotação lá pro index com as dependencias internas já setados a eles
    extractCotacao,
    getUrl,
    getToday,
    pure: {//Criar um  outro objeto aqui para passa ele limpo sem a dependencia.
        getCotacao
    }
}


//https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2722-10-2020%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao
