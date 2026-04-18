const form = document.getElementById('dataRegister')
const lista = document.getElementById('allExpensives')
const totalExpensives = document.getElementById('totalExpensive')
const reset = document.getElementById('reset')
const formCards = document.getElementById('cardRegister')
const selectCards = document.getElementById('cards') 
const listCardsSaved = document.getElementById('listCardsSaved')

let gastos = JSON.parse(localStorage.getItem('gasto')) || []
let cards = JSON.parse(localStorage.getItem('card'))  || []
render()
menuBanks()
renderCards()

// guarda los gastos en localstore
form.addEventListener('submit', function(e){ 
    e.preventDefault()
    let id = Date.now()
    let expenditure = parseFloat(document.getElementById('montGast').value)
    console.log(expenditure)
    let description = document.getElementById('description').value
    console.log(description)
    let card = document.getElementById('cards').value
    console.log(card)
    let categorie = document.getElementById('categories').value
    console.log(categorie)
    gastos.push({id, expenditure, description, card, categorie})
    localStorage.setItem('gasto', JSON.stringify(gastos))
    console.log(gastos)
    render()
    form.reset()
    alert('Gasto registrado con exito')
})

//Actualiza la lista de gastos y los agrega en forma de lista
function render() { 
    lista.innerHTML = ''
    let gastoTotal = 0
    gastos.forEach((gasto) => {
        let li = document.createElement('li')
        li.textContent = `$${gasto.expenditure}, Descripcion:  ${gasto.description}, Origen: ${gasto.card}, Categoria: ${gasto.categorie}`
        let btn = document.createElement('button')
        btn.textContent = 'Eliminar'
        btn.addEventListener('click', function () {
            deleteExpensive(gasto.id)
        })
        li.appendChild(btn)
        lista.appendChild(li)
        gastoTotal += gasto.expenditure
    });
    totalExpensives.textContent = gastoTotal
}

//borrar gasto por id
function deleteExpensive(id) {
    gastos = gastos.filter(function (gasto){
        return gasto.id !== id
    })
    localStorage.setItem('gasto', JSON.stringify(gastos))
    render()
}

// borra la lista de gastos
reset.addEventListener("click", function(){
    if(confirm('Seguro que desea eliminar todos los gastos?')){
        localStorage.clear();
        lista.innerHTML = ''
        totalExpensives.textContent = ''
    }
})

// cambio de pantalla menu
function changeScreen(id){
    const sections = document.querySelectorAll('.screen')
    sections.forEach(section => {
        section.classList.add('hide')
    })
    document.getElementById(id).classList.remove('hide')
}

// registro tarjetas
formCards.addEventListener("submit", function(e){
    e.preventDefault()
    let id = Date.now()
    let alias = document.getElementById('aliasCard').value
    let bank = document.getElementById('bank').value
    let noCard = document.getElementById('noCard').value
    // valida que sean numeros y que sean 16 digitos
    if (!/^\d{16}$/.test(noCard)) {
        alert('Numero de tarjeta deben ser 16 digitos numericos')
        return
    }
    let typeCard = document.getElementById('typeCard').value
    cards.push({id, alias, bank, noCard, typeCard})
    localStorage.setItem('card', JSON.stringify(cards))
    renderCards()
    menuBanks()
    formCards.reset()
    alert('Tarjeta registrada correctamente')
})

// agrega opciones al menu de registro de gastos
function menuBanks() {
    selectCards.innerHTML = ''
    cards.forEach((card)=>{
        let option = document.createElement('option')
        option.value = card.alias
        option.textContent = `${card.alias} (${card.noCard.slice(-4)})`
        selectCards.appendChild(option)
    })


}

// actualiza lista de tarjetas y los agrega como lista
function renderCards() { 
    listCardsSaved.innerHTML = ''
    cards.forEach((card) => {
        let li = document.createElement('li')
        li.textContent = `Alias:${card.alias}, Banco:  ${card.bank}, No. Tarjeta: **** ${card.noCard.slice(-4)}, Tipo: ${card.typeCard}`
        let btn = document.createElement('button')
        btn.textContent = 'Eliminar'
        btn.addEventListener('click', function () {
            deleteCard(card.id)
        })
        li.appendChild(btn)
        listCardsSaved.appendChild(li)
    });
}

// borrar tarjeta por id
function deleteCard(id) {
    cards = cards.filter(function (card){
        return card.id !== id
    })
    localStorage.setItem('card', JSON.stringify(cards))
    renderCards()
    menuBanks()
}