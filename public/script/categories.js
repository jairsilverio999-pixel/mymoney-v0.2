const formCategories = document.getElementById('formCategories');
const listCategoriesSaved = document.getElementById('listCategoriesSaved');
const selectCategories = document.getElementById('categories');

//registro categorias
formCategories.addEventListener('submit', function(e){
    e.preventDefault();
    let id = Date.now();
    let category = document.getElementById('categorie').value;
    if (idEditData) {
        categories = categories.map( categorie =>{
            if (categorie.id === idEditData) {
                return {id:idEditData, category}
            }
            return categorie;
        });
        idEditData = null;
    }
    else{
        categories.push({id, category});
    };
    saveStorage('categorie', categories);
    createList(categories, listCategoriesSaved, 'categorie');
    menuCategories();
    formCategories.reset();
    formCategories.querySelector('button').textContent = 'Registrar categoria';
    alert('Categoria registrada exitosamente');
});

// agregar opciones al menu de categorias
function menuCategories(){
    selectCategories.innerHTML = '';
    categories.forEach((categorie) =>{
        let option = document.createElement('option');
        option.value = categorie.category;
        option.textContent = `${categorie.category}`;
        selectCategories.appendChild(option);
    });
};