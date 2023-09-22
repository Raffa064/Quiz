const { points, id } = getUrlParams()

if (points === undefined || id === undefined) throw new Error()
if (points === null || id === null) throw new Error()

const storedPoints = JSON.parse(localStorage.storedPoints || "[]")
const existsID = storedPoints.find((value) => value[1] == id)
if (!existsID) {
    storedPoints.push([points, id])
    localStorage.storedPoints = JSON.stringify(storedPoints)
}

const totalPoints = storedPoints.reduce((acc, value) => parseInt(value[0]) + parseInt(acc), 0)
const n = Math.max(1, storedPoints.length)
const avgPoints = Math.floor(totalPoints / n)

var avgMsg = 'Jogue mais de uma vez para ver a sua pontuação média!'

if (n > 1) {
    avgMsg = '<strong>Sua média foi de ' + (avgPoints || 'x') + ' pontos.</strong><br>'
    
    if (avgPoints == 0) avgMsg += 'Você precisa marcar as respotas certa, tá?'
    if (avgPoints == 1) avgMsg += 'Pelo menos não é zero... '
    if (avgPoints == 2) avgMsg += 'Você precisa praticar um pouco mais!' 
    if (avgPoints == 3) avgMsg += 'Você consegue, so esudar um pouco mais!'
    if (avgPoints == 4) avgMsg += 'Quase lá...'
    if (avgPoints == 5) avgMsg += 'Sua média está na média'
    if (avgPoints == 6) avgMsg += 'Acima da média, parabéns'
    if (avgPoints == 7) avgMsg += 'Otimo! Continue assim!'
    if (avgPoints == 8) avgMsg += 'Parabéns!'
    if (avgPoints == 9) avgMsg += 'Por um ponto!!!'
    if (avgPoints == 10) avgMsg += 'Perfeito! 100% aprovado!!'
    if (avgPoints < 0 || avgPoints > 10) avgMsg += 'H4ck3r M4n 5.0 turbo power 3000'
    
}

document.querySelector('#points').innerText = points || 'x'
document.querySelector('#avg-points').innerHTML = avgMsg

function getUrlParams() {
    const paramsStr = window.location.search
    const urlSplit = paramsStr.substring(1, paramsStr.length).split('&')

    const params = {}

    for (let i in urlSplit) {
        const line = urlSplit[i]
        const key = line.substring(0, line.indexOf("="))
        const value = line.substring(line.indexOf("=") + 1, line.length)

        params[key] = value
    }

    return params
}