const formIncomes = document.getElementById('formIncomes');
const listIncomes = document.getElementById('allIncomes');
const selectCardsIncomes = document.getElementById('cardIncome');
let idEditData = null;

// regitro de ingresos
formIncomes.addEventListener('submit', function(e){
    e.preventDefault();
    let id = Date.now();
    let income$$$ = parseFloat(document.getElementById('montIncome').value);
    let descriptionIncome = document.getElementById('descriptionIncome').value;
    let cardIncome = document.getElementById('cardIncome').value;
    if (idEditData) {
        incomes = incomes.map(income =>{
            if (income.id === idEditData) {
                return {...income, id:idEditData, income$$$, descriptionIncome, cardIncome};
            }
            return income;
        })
        idEditData = null;
    }
    else{
        incomes.push({id, income$$$, descriptionIncome, cardIncome});
    };
    saveStorage('income', incomes);
    createList(incomes, listIncomes, 'income');
    formIncomes.reset();
    formIncomes.querySelector('button').textContent = 'Registrar ingreso';
    alert('Ingreso registrado con exito');
})

// agrega opciones al menu de tarjetas en ingresos
function menuBanksIncomes() {
    selectCardsIncomes.innerHTML = '';
    cards.forEach((card)=>{
        let option = document.createElement('option');
        option.value = card.alias;
        option.textContent = `${card.alias} (**** ${card.noCard.slice(-4)})`;
        selectCardsIncomes.appendChild(option);
    });
};

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