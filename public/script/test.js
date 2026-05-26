function createList(saveInLocalstore, list){
    list.innerHTML = ''
    saveInLocalstore.forEach(obj => {
        let li = document.createElement('li')
        let valuesList = ""
        for (key in obj){
            valuesList += `${obj[key]} - `
        }
        let btn = document.createElement('button')
        btn.textContent = 'Eliminar'
        btn.addEventListener('click', function () {
            deleteCard(obj.id)
        })
        li.textContent = valuesList.slice(0 , -3)
        list.appendChild(li)
    });
}

