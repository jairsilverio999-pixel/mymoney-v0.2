// guarda datos en localStorage
function saveStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
};

// carga datos de localStorage
function loadStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
};

let gastos = loadStorage('gasto');
let cards = loadStorage('card');
let categories = loadStorage('categorie');
let incomes = loadStorage('income');