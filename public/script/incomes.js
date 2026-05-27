const formIncomes = document.getElementById('formIncomes');
const listIncomes = document.getElementById('allIncomes');
const selectCardsIncomes = document.getElementById('cardIncome');

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

// agrega opciones al menu de tarjetas de ingresos
function menuBanksIncomes() {
    selectCardsIncomes.innerHTML = '';
    cards.forEach((card)=>{
        let option = document.createElement('option');
        option.value = card.alias;
        option.textContent = `${card.alias} (**** ${card.noCard.slice(-4)})`;
        selectCardsIncomes.appendChild(option);
    });
};