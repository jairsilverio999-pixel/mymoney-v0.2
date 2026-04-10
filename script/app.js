
let gastosSaved = []
const form = document.getElementById('dataRegister')
//localStorage.setItem()
let gastos = JSON.parse(localStorage.getItem('gasto')) || []

// Guarda el valor del gasto
function regGasto(){     
    const monto = document.getElementById('montGast').value
    localStorage.setItem('gasto', JSON.stringify(monto))
    let gastosSaved = JSON.parse(localStorage.getItem('gasto')) || [] // si lo de la derecha es falsy, usa una lista vacia como dato a almacenar
    console.log(monto)
}

form.addEventListener('submit', function(e){
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

})
console.log(gastos)

