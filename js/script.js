let pessoa = null

const meses = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

const signos = [
    { nome: "Áries", inicio: "03-21", fim: "04-19" },
    { nome: "Touro", inicio: "04-20", fim: "05-20" },
    { nome: "Gêmeos", inicio: "05-21", fim: "06-20" },
    { nome: "Câncer", inicio: "06-21", fim: "07-22" },
    { nome: "Leão", inicio: "07-23", fim: "08-22" },
    { nome: "Virgem", inicio: "08-23", fim: "09-22" },
    { nome: "Libra", inicio: "09-23", fim: "10-22" },
    { nome: "Escorpião", inicio: "10-23", fim: "11-21" },
    { nome: "Sagitário", inicio: "11-22", fim: "12-21" },
    { nome: "Capricórnio", inicio: "12-22", fim: "01-19" },
    { nome: "Aquário", inicio: "01-20", fim: "02-18" },
    { nome: "Peixes", inicio: "02-19", fim: "03-20" },
]
const signosCarac = new Signos()

document.querySelector('#dia').addEventListener('input', () => {
    initData()
})
document.querySelector('#mes').addEventListener('input', () => {
    initData()
})
document.querySelector('#ano').addEventListener('input', () => {
    initData()
})

const criarOption = (op, id) => {
    const elemento = document.querySelector(`#${id}`)
    switch (op) {
        case 'dia':
            for (let index = 1; index <= 31; index++) {
                const num = index.toString().padStart(2, '0')
                if (index === new Date().getDate()) {
                    elemento.innerHTML += `<option value="${num}" selected>${num}</option>`
                } else {
                    elemento.innerHTML += `<option value="${num}">${num}</option>`
                }
            }
            break;
        case 'mes':
            for (let index = 1; index <= 12; index++) {
                const num = index.toString().padStart(2, '0')
                if (index === new Date().getMonth() + 1) {
                    elemento.innerHTML += `<option value="${num}" selected>${meses[index]}</option>`
                } else {
                    elemento.innerHTML += `<option value="${num}">${meses[index]}</option>`
                }
            }
            break;
        case 'ano':
            for (let index = parseInt(new Date().getFullYear()) - 99; index <= new Date().getFullYear(); index++) {
                const num = index.toString()
                if (index === 2000) {
                    elemento.innerHTML += `<option value="${num}" selected>${num}</option>`
                } else {
                    elemento.innerHTML += `<option value="${num}">${num}</option>`
                }

            }
        default:
            break;
    }

}
criarOption('dia', 'dia')
criarOption('mes', 'mes')
criarOption('ano', 'ano')


const initData = () => {
    const dia = document.querySelector('#dia').value
    const mes = document.querySelector('#mes').value
    const ano = document.querySelector('#ano').value
    const idade = getIdade(dia, mes, ano)
    const txtIdade = (idade > 0) ? ` (${idade} anos)` : ""
    document.querySelector('#data-nasc').innerHTML = `Data de Nascimento${txtIdade}`
}

const consultar = () => {
    let dataNasc = {
        dia: document.querySelector('#dia').value,
        mes: document.querySelector('#mes').value,
        ano: document.querySelector('#ano').value,
        signo: "",
        idade: 0,
        nasc: null
    }
    dataNasc.nasc = new Date(dataNasc.ano, dataNasc.mes - 1, dataNasc.dia)
    dataNasc.idade = getIdade(dataNasc.dia, dataNasc.mes, dataNasc.ano)

    signos.forEach(el => {
        const inicio = new Date(dataNasc.ano, el.inicio.slice(0, 2) - 1, el.inicio.slice(3, 5))
        const fim = new Date(dataNasc.ano, el.fim.slice(0, 2) - 1, el.fim.slice(3, 5))
        if (dataNasc.nasc >= inicio && dataNasc.nasc <= fim) {
            dataNasc.signo = el.nome
        }
    })

    pessoa = dataNasc

    const signoOneCarac = signosCarac.filter(obj => obj.nome === pessoa.signo)

    initData()

    document.querySelector('#painel').classList.remove('display-none')
    document.querySelector('#painel-titulo').innerHTML = signoOneCarac[0].nome
    document.querySelector('#painel-datas').innerHTML = signoOneCarac[0].datas
    document.querySelector('#painel-descricao').innerHTML = signoOneCarac[0].descricao
}

const getIdade = (dia, mes, ano) => {
    dia = parseInt(dia)
    mes = parseInt(mes)
    ano = parseInt(ano)
    let idade = ''

    const hoje = new Date()
    const hojeDia = hoje.getDate()
    const hojeMes = hoje.getMonth() + 1
    const hojeAno = hoje.getFullYear()


    if (mes < hojeMes) {
        idade = hojeAno - ano

    }
    else if (mes === hojeMes) {
        if (dia <= hojeDia) {
            idade = hojeAno - ano
        }
        else {
            idade = hojeAno - ano - 1
        }
    }
    else {
        idade = hojeAno - ano - 1
    }

    return idade
}

initData()