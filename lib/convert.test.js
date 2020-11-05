const { TestScheduler } = require('jest')
const convert = require('./convert')

test('Convert cotacao 4 and quantidade 4', () => {
    expect(convert.convert(4, 4)).toBe(16)  //Se eu roda isso, 4 8 4 eu espero 16
})
//Quando quero testa algo, criamos espectativas. O que eu espero que aconteça

test('Convert cotacao 0 and quantidade 345', () => {
    expect(convert.convert(0, 345)).toBe(0)
})

test('toMoney converts float', () => {
    expect(convert.toMoney(2)).toBe('2.00')
})

test('toMoney converts string', () => {
    expect(convert.toMoney('2')).toBe('2.00')
})

//É sempre uma boa pratica para ver se o teste esta funcionando fazendo ele errar tambem
//Se eu fizer uma manutenção eu sei se estou quebrando ou não. 
//O ideal é começa pelo teste. Mas no começo é melhor programar antes. 