const formCards = document.getElementById('cardRegister');
const selectCardsExpenses = document.getElementById('cardsExpenses');
const listCardsSaved = document.getElementById('listCardsSaved');

// registro tarjetas
formCards.addEventListener("submit", function(e){
    e.preventDefault()
    let id = Date.now()
    let alias = document.getElementById('aliasCard').value
    let bank = document.getElementById('bank').value
    let noCard = document.getElementById('noCard').value
    // valida que sean numeros y que sean 16 digitos
    if (!/^\d{16}$/.test(noCard)) {
        alert('Numero de tarjeta deben ser 16 digitos numericos')
        return
    }
    let typeCard = document.getElementById('typeCard').value
    if (idEditData) {
        cards = cards.map(card =>{ // edita tarjetas por id
            if (card.id === idEditData) {
                return {...card, id:idEditData, alias, bank, noCard, typeCard}
            }
            return card
        })
        idEditData = null
    }
    else{
        cards.push({id, alias, bank, noCard, typeCard})
    }
    saveStorage('card', cards)
    createList(cards, listCardsSaved, 'card')
    menuBanksExpenses()
    menuBanksIncomes()
    formCards.reset()
    formCards.querySelector('button').textContent = 'Registrar tarjeta'
    alert('Tarjeta registrada correctamente')
})

// agrega opciones al menu de bancos
function menuBanksExpenses() {
    selectCardsExpenses.innerHTML = ''
    cards.forEach((card)=>{
        let option = document.createElement('option')
        option.value = card.alias
        option.textContent = `${card.alias} (**** ${card.noCard.slice(-4)})`
        selectCardsExpenses.appendChild(option)
    })
}