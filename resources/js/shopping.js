//Selectors
const newListInput = document.querySelector(".new-list-input");
const newListButton = document.querySelector(".new-list-button");
const shoppingList = document.querySelector(".shopping-list");



//Event Listeners
newListButton.addEventListener("click", addNewList);
shoppingList.addEventListener("click", (e)=>{
    removeList(e);
    showActiveList(e);
    minimizeActiveList(e);
});


//Functions

function addNewList(e){
    //If input is valid
    if (newListInput.value.length > 0){
        //prevent form submit
        e.preventDefault();

        //newList div
        const newListDiv = document.createElement('div');
        newListDiv.classList.add('shopping-list-div', "glowScale");

        //Create li
        const shoppingListEntry = document.createElement('li');
        shoppingListEntry.innerText = newListInput.value;
        shoppingListEntry.classList.add("shopping-list-entry");
        newListDiv.appendChild(shoppingListEntry);

        //Delete List button
        const deleteListButton = document.createElement("button");
        deleteListButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteListButton.classList.add('delete-list-button');
        newListDiv.appendChild(deleteListButton);

        //Minimize button (hidden until active)
        const minimizeListButton = document.createElement("button");
        minimizeListButton.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
        minimizeListButton.classList.add("minimize-list-button","not-active-button");
        newListDiv.appendChild(minimizeListButton);


        //Append to list
        shoppingList.appendChild(newListDiv);

        //Clear newListInput value
        newListInput.value = "";    
    }

    
}

function removeList (e){
    const item = e.target
    //Delete list entry
    if (item.classList[0] === "delete-list-button" ){
        const listEntry = item.parentElement;

        // Animation
        listEntry.classList.remove("glowScale");
        listEntry.classList.add("drop");
        listEntry.addEventListener("transitionend", ()=>{
            listEntry.remove();
        });
        
    };
};

function showActiveList (e) {
    const item = e.target;
    const minimizeListButton = item.querySelector(".minimize-list-button");
    const deleteListButton = item.querySelector(".delete-list-button");
    // Open list
    if (item.classList[0] === "shopping-list-div"){
        item.classList.remove("glowScale");
        item.classList.add("active-shopping-list");
        minimizeListButton.classList.remove("not-active-button");
        deleteListButton.classList.add("not-active-button");
    }
};

function minimizeActiveList (e) {
    const item = e.target;
    const shoppingDiv = item.parentElement;
    const deleteListButton = item.parentElement.querySelector(".delete-list-button");
    //Minize list
    if (item.classList[0] === 'minimize-list-button') {
        shoppingDiv.classList.remove("active-shopping-list");
        shoppingDiv.classList.add("glowScale");
        item.classList.add("not-active-button");
        deleteListButton.classList.remove("not-active-button");
    }
};