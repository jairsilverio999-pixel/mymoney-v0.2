const form = document.getElementById('dataRegister')
const lista = document.getElementById('allExpensives')
const totalExpensives = document.getElementById('totalExpensive')
const reset = document.getElementById('reset')

let gastos = JSON.parse(localStorage.getItem('gasto')) || []
let id = typeof gastos.id
render()

form.addEventListener('submit', function(e){ // guarda los gastos en localstore
    e.defaultPrevented
    alert('Gasto registrado con exito')
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

})

function render() { //Actualiza la lista de gastos y los agrega en forma de lista
    lista.innerHTML = ''
    let gastoTotal = 0
    gastos.forEach((gasto) => {
        let li = document.createElement('li')
        li.textContent = `$${gasto.expenditure}, Descripcion:  ${gasto.description}, Origen: ${gasto.card}, Categoria: ${gasto.categorie}`
        let btn = document.createElement('button')
        btn.textContent = 'Eliminar gasto'
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
        console.log(gasto.id)
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

console.log(id)

