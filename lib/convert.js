const convert = (cotacao, quantidade) => {
    return cotacao * quantidade
}

const toMoney = valor => {
    return parseFloat(valor).toFixed(2) //tofixed e duas casa decimais.
}

module.exports = {
    convert,
    toMoney
}
