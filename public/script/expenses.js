const formExpensives = document.getElementById('dataRegister');
const listExpensesSaved = document.getElementById('listExpensesSaved');
const totalExpensives = document.getElementById('totalExpensive');
const reset = document.getElementById('reset');

// registro de gastos
formExpensives.addEventListener('submit', function(e){ 
    e.preventDefault();
    let id = Date.now();
    let expenditure = parseFloat(document.getElementById('montGast').value);
    let description = document.getElementById('description').value;
    let card = document.getElementById('cardsExpenses').value;
    let categorie = document.getElementById('categories').value;
    if (idEditData) {
        gastos = gastos.map(gasto =>{
            if (gasto.id === idEditData) {
                return {...gasto, id:idEditData, expenditure, description, card, categorie};
            }
            return gasto;
        })
        idEditData = null;
    }
    else{
        gastos.push({id, expenditure, description, card, categorie});
    };
    saveStorage('gasto', gastos);
    renderGastos();
    formExpensives.reset();
    formExpensives.querySelector('button').textContent = 'Registrar gasto';
    alert('Gasto registrado con exito');
});

//Actualiza la lista de gastos y los agrega en forma de lista
function renderGastos() { 
    let gastoTotal = 0;
    createList(gastos, listExpensesSaved, 'gasto');
    gastos.forEach(gasto =>{
        gastoTotal += gasto.expenditure;
    });
    totalExpensives.textContent = gastoTotal;
};

// borra la lista de gastos
reset.addEventListener("click", function(){
    if(confirm('Seguro que desea eliminar todos los gastos?')){
        localStorage.removeItem('gasto');
        listExpensesSaved.innerHTML = '';
        totalExpensives.textContent = '';
    };
});

