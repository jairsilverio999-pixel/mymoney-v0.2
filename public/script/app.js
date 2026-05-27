
const formCategories = document.getElementById('formCategories')
const listCategoriesSaved = document.getElementById('listCategoriesSaved')
const selectCategories = document.getElementById('categories')
let idEditData = null

// objetos


updateUI()

// cambio de pantalla menu
function changeScreen(id){
    const sections = document.querySelectorAll('.screen')
    sections.forEach(section => {
        section.classList.add('hide')
    })
    document.getElementById(id).classList.remove('hide')
}

//registro categorias
formCategories.addEventListener('submit', function(e){
    e.preventDefault()
    let id = Date.now()
    let category = document.getElementById('categorie').value
    console.log(category)
    console.log(idEditData)
    if (idEditData) {
        categories = categories.map( categorie =>{
            if (categorie.id === idEditData) {
                return {id:idEditData, category}
            }
            return categorie
        })
        idEditData = null
    }
    else{
        categories.push({id, category})
    }
    localStorage.setItem('categorie', JSON.stringify(categories))
    createList(categories, listCategoriesSaved, 'categorie')
    menuCategories()
    formCategories.reset()
    formCategories.querySelector('button').textContent = 'Registrar categoria'
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
            if (key === 'expenditure' || key === 'income$$$') {
                valuesList += `$${obj[key]} - `
                continue
            }
            if (key === 'noCard') {
                console.log(obj[key])
                console.log(obj[key].match(/.{1,4}/g).join(' '))
                valuesList += `${obj[key].match(/.{1,4}/g).join(' ')} - `
                continue
            }
            valuesList += `${obj[key]} - `
        }
        let leftSpan = document.createElement('span')
        leftSpan.textContent = valuesList.slice(0 , -3)
        let divBtnEditDelete = document.createElement('div')
        let btnEdit = document.createElement('button')
        btnEdit.textContent = 'Editar'
        btnEdit.addEventListener('click', function(){
            editDataRegister(obj, keyObj)
        })
        let btnDetails = document.createElement('button')
        btnDetails.textContent = 'Detalles'
        btnDetails.addEventListener('click', function() {
            console.log('Detallando')
        })
        let btnDelete = document.createElement('button')
        btnDelete.textContent = 'Eliminar'
        btnDelete.addEventListener('click', function () {
            deleteByID(obj.id, saveInLocalstore, keyObj)
        })
        divBtnEditDelete.appendChild(btnDetails)
        divBtnEditDelete.appendChild(btnEdit)
        divBtnEditDelete.appendChild(btnDelete)
        li.appendChild(leftSpan)
        li.appendChild(divBtnEditDelete)
        list.appendChild(li)
    });
}

// actualiza la UI
function updateUI() {
    gastos = JSON.parse(localStorage.getItem('gasto')) || []
    cards = JSON.parse(localStorage.getItem('card'))  || []
    categories = JSON.parse(localStorage.getItem('categorie')) || []
    incomes = JSON.parse(localStorage.getItem('income')) || []
    renderGastos()
    menuBanksExpenses()
    menuBanksIncomes()
    menuCategories()
    createList(cards, listCardsSaved, 'card')
    createList(categories, listCategoriesSaved, 'categorie')
    createList(incomes, listIncomes, 'income')
}

// borra objeto por ID
function deleteByID(id, arrayInLocalStore, key) {
    const newArrayInLocalStore = arrayInLocalStore.filter(obj => obj.id !== id)
    localStorage.setItem(key, JSON.stringify(newArrayInLocalStore))
    updateUI()
}

// editor de objetos (a futuro mejor un objeto)
function editDataRegister(objet, typeDataSaved){
    console.log(objet.id)
    idEditData = objet.id
    switch (typeDataSaved) {
        case 'gasto':
            document.getElementById('montGast').value = objet.expenditure
            document.getElementById('description').value = objet.description
            document.getElementById('cardsExpenses').value = objet.card
            document.getElementById('categories').value = objet.categorie   
            formExpensives.querySelector('button').textContent = 'Actualizar gasto'
            break;
        case 'card':
            document.getElementById('aliasCard').value = objet.alias
            document.getElementById('bank').value = objet.bank
            document.getElementById('noCard').value = objet.noCard
            document.getElementById('typeCard').value = objet.typeCard
            formCards.querySelector('button').textContent = 'Actualizar gasto'
        case 'categorie':
            document.getElementById('categorie').value = objet.category 
            formCategories.querySelector('button').textContent = 'Actualizar gasto'
        case 'income':
            document.getElementById('montIncome').value = objet.income$$$
            document.getElementById('descriptionIncome').value = objet.descriptionIncome
            document.getElementById('cardIncome').value = objet.cardIncome
            formIncomes.querySelector('button').textContent = 'Actualizar gasto'
        default:
            console.log(idEditData)
            break;
    }
    console.log('Editando')
}