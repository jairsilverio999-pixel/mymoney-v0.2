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

// cambio de pantalla menu
function changeScreen(id){
    const sections = document.querySelectorAll('.screen')
    sections.forEach(section => {
        section.classList.add('hide')
    })
    document.getElementById(id).classList.remove('hide')
}