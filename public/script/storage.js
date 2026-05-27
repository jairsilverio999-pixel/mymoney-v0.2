function saveStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
};

function loadStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
};

let gastos = loadStorage('gasto');
let cards = loadStorage('card');
let categories = loadStorage('categorie');
let incomes = loadStorage('income');