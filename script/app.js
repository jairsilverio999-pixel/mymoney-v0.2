const formExpensives = document.getElementById('dataRegister')
const lista = document.getElementById('allExpensives')
const totalExpensives = document.getElementById('totalExpensive')
const reset = document.getElementById('reset')
const formCards = document.getElementById('cardRegister')
const selectCards = document.getElementById('cards') 
const listCardsSaved = document.getElementById('listCardsSaved')
const formCategories = document.getElementById('formCategories')
const listCategoriesSaved = document.getElementById('listCategoriesSaved')
const selectCategories = document.getElementById('categories')

let gastos = JSON.parse(localStorage.getItem('gasto')) || []
let cards = JSON.parse(localStorage.getItem('card'))  || []
let categories = JSON.parse(localStorage.getItem('categorie')) || []

updateUI()

// registro de gastos
formExpensives.addEventListener('submit', function(e){ 
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
    formExpensives.reset()
    alert('Gasto registrado con exito')
})

//Actualiza la lista de gastos y los agrega en forma de lista
function render() { 
    let gastoTotal = 0
    createList(gastos, lista, 'gasto')
    gastos.forEach(gasto =>{
        gastoTotal += gasto.expenditure
    })
    totalExpensives.textContent = gastoTotal
}

// borra la lista de gastos
reset.addEventListener("click", function(){
    if(confirm('Seguro que desea eliminar todos los gastos?')){
        localStorage.removeItem('gasto');
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
    createList(cards, listCardsSaved, 'card')
    menuBanks()
    formCards.reset()
    alert('Tarjeta registrada correctamente')
})

// agrega opciones al menu de bancos
function menuBanks() {
    selectCards.innerHTML = ''
    cards.forEach((card)=>{
        let option = document.createElement('option')
        option.value = card.alias
        option.textContent = `${card.alias} (**** ${card.noCard.slice(-4)})`
        selectCards.appendChild(option)
    })
}

// actualiza lista de tarjetas y los agrega como lista
createList(cards, listCardsSaved, 'card')

//registro categorias
formCategories.addEventListener('submit', function(e){
    e.preventDefault()
    let id = Date.now()
    let category = document.getElementById('categorie').value
    console.log(category)
    categories.push({id, category})
    localStorage.setItem('categorie', JSON.stringify(categories))
    createList(categories, listCategoriesSaved, 'categorie')
    menuCategories()
    formCategories.reset()
    alert('Categoria registrada exitosamente')
})

// agregar opciones al menu de categorias
function menuCategories(){
    selectCategories.innerHTML = ''
    categories.forEach((categorie) =>{
        let option = document.createElement('option')
        option.value = categorie.category
        option.textContent = `${categorie.category}`
        selectCategories.appendChild(option)
    })
}

// funcion para crear listas dinamicas
function createList(saveInLocalstore, list, keyObj){
    list.innerHTML = ''
    saveInLocalstore.forEach(obj => {
        let li = document.createElement('li')
        let valuesList = ""
        for (key in obj){
            if (key === 'id') continue
            if (key === 'expenditure') {
                valuesList += `$${obj[key]} - `
                continue
            }
            valuesList += `${obj[key]} - `
        }
        li.textContent = valuesList.slice(0 , -3)
        let btn = document.createElement('button')
        btn.textContent = 'Eliminar'
        btn.addEventListener('click', function () {
            deleteByID(obj.id, saveInLocalstore, keyObj)
        })
        li.appendChild(btn)
        list.appendChild(li)
    });
}

// actualiza la UI
function updateUI() {
    gastos = JSON.parse(localStorage.getItem('gasto')) || []
    cards = JSON.parse(localStorage.getItem('card'))  || []
    categories = JSON.parse(localStorage.getItem('categorie')) || []
    render()
    menuBanks()
    menuCategories()
    createList(cards, listCardsSaved, 'card')
    createList(categories, listCategoriesSaved, 'categorie')
}

// borra objeto por ID
function deleteByID(id, arrayInLocalStore, key) {
    const newArrayInLocalStore = arrayInLocalStore.filter(obj => obj.id !== id)
    localStorage.setItem(key, JSON.stringify(newArrayInLocalStore))
    updateUI()
}