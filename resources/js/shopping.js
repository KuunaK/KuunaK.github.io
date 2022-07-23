//Selectors
const newListInput = document.querySelector(".new-list-input")
const newListButton = document.querySelector(".new-list-button")
const shoppingList = document.querySelector(".shopping-list")



//Event Listeners
newListButton.addEventListener("click", addNewList)



//Functions

function addNewList(e){
    //prevent form submit
    e.preventDefault();
    //newList div
    const newListDiv = document.createElement('div');
    newListDiv.classList.add('shopping-list-div');
    //Create li
    const shoppingListEntry = document.createElement('li');
    shoppingListEntry.innerText = "Test";
    shoppingListEntry.classList.add("shopping-list-entry");
    newListDiv.appendChild(shoppingListEntry);
    //Delete List button
    const deleteListButton = document.createElement("button");
    deleteListButton.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    deleteListButton.classList.add('delete-list-button');
    newListDiv.appendChild(deleteListButton);
    //append to list
    shoppingList.appendChild(newListDiv);
}