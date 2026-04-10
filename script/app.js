const form = document.getElementById('dataRegister')
const lista = document.getElementById('allExpensives')
const totalExpensives = document.getElementById('totalExpensive')

let gastos = JSON.parse(localStorage.getItem('gasto')) || []
render()

form.addEventListener('submit', function(e){ // guarda los gastos en localstore
    e.defaultPrevented
    alert('Formulario detenido')
    let expenditure = parseFloat(document.getElementById('montGast').value)
    console.log(expenditure)
    let description = document.getElementById('description').value
    console.log(description)
    let card = document.getElementById('cards').value
    console.log(card)
    let categorie = document.getElementById('categories').value
    console.log(categorie)
    gastos.push({expenditure, description, card, categorie})
    localStorage.setItem('gasto', JSON.stringify(gastos))
    console.log(gastos)
    render()
    form.reset()

})
function render() { //Actualiza la lista de gastos
    lista.innerHTML = ''
    let gastoTotal = 0
    gastos.forEach((gasto, index) => {
        console.log(gasto, index)
        let li = document.createElement('li')
        li.textContent = `Monto: $${gasto.expenditure}, Descripcion: ${gasto.description}, Origen: ${gasto.card}, Categoria: ${gasto.categorie}`
        lista.appendChild(li)
        gastoTotal += gasto.expenditure
    });
    totalExpensives.textContent = gastoTotal
}
console.log(gastos)


