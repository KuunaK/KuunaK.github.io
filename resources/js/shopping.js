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
    addListEntry(e);
    deleteCheck(e);
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
        minimizeListButton.classList.add("minimize-list-button","no-display");
        newListDiv.appendChild(minimizeListButton);

        // Create hidden list div
        const listEntryDiv = document.createElement('div');
        listEntryDiv.classList.add("list-item-entry-container", "no-display");
        newListDiv.appendChild(listEntryDiv);

        // Create form
        const listEntryForm = document.createElement("form");
        listEntryDiv.appendChild(listEntryForm);

        // Create inner form div
        const listEntryInnerDiv = document.createElement("div");
        listEntryInnerDiv.classList.add("new-list-item-container");
        listEntryForm.appendChild(listEntryInnerDiv);

        // Create inner div input
        const innerDivInput = document.createElement("input");
        innerDivInput.classList.add("new-list-item-input");
        innerDivInput.setAttribute("type", "text");
        innerDivInput.setAttribute("id", "new-list-item-input");
        innerDivInput.setAttribute("placeholder", "Add new entry");
        innerDivInput.setAttribute("autocomplete", "off");
        innerDivInput.setAttribute("maxlength", "20");
        innerDivInput.setAttribute("required", "required");
        listEntryInnerDiv.appendChild(innerDivInput);

        // Add entry button
        const innerDivButton = document.createElement("button");
        innerDivButton.setAttribute("type", "submit");
        innerDivButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
        innerDivButton.classList.add("new-entry-button");
        listEntryInnerDiv.appendChild(innerDivButton);

        //Add second outer div
        const outerDiv = document.createElement("div");
        outerDiv.classList.add("list-item-container");
        listEntryDiv.appendChild(outerDiv);

        //Add UL to new list items div
        const outerDivUL = document.createElement("ul");
        outerDivUL.classList.add("shopping-list-items");
        outerDiv.appendChild(outerDivUL);

        
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
    const showHiddenList = item.querySelector(".list-item-entry-container");
    // Open list
    if (item.classList[0] === "shopping-list-div"){
        item.classList.remove("glowScale");
        item.classList.add("active-shopping-list");
        minimizeListButton.classList.remove("no-display");
        deleteListButton.classList.add("no-display");
        showHiddenList.classList.remove("no-display");
    }
};

function minimizeActiveList (e) {
    const item = e.target;
    const shoppingDiv = item.parentElement;
    const deleteListButton = item.parentElement.querySelector(".delete-list-button");
    const showHiddenList = item.parentElement.querySelector(".list-item-entry-container");
    //Minize list
    if (item.classList[0] === 'minimize-list-button') {
        shoppingDiv.classList.remove("active-shopping-list");
        shoppingDiv.classList.add("glowScale");
        item.classList.add("no-display");
        deleteListButton.classList.remove("no-display");
        showHiddenList.classList.add("no-display");
    }
};

function addListEntry (e) {
    e.preventDefault();
    const item = e.target
    const innerDivInput = item.parentElement.children[0]
    
    if ((item.classList[0] === "new-entry-button") && (innerDivInput.value.length > 0)) {
        const shoppingListItems = item.parentElement.parentElement.parentElement.children[1].children[0]
        //Create inner div
        const newInnerListDiv = document.createElement("div");
        newInnerListDiv.classList.add("inner-shopping-list-div");

        // Create LI
        const innerShoppingListEntry = document.createElement("li");
        innerShoppingListEntry.innerText = innerDivInput.value;
        innerShoppingListEntry.classList.add("inner-shopping-list-entry");
        newInnerListDiv.appendChild(innerShoppingListEntry);

        // Create Check button
        const checkEntryButton = document.createElement("button");
        checkEntryButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        checkEntryButton.classList.add("check-entry-button");
        newInnerListDiv.appendChild(checkEntryButton)

        // Create Trash button
        const trashEntryButton = document.createElement("button");
        trashEntryButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
        trashEntryButton.classList.add("trash-entry-button");
        newInnerListDiv.appendChild(trashEntryButton);

        // Append to new list
        shoppingListItems.appendChild(newInnerListDiv);

        // Clear innerdiv input
        innerDivInput.value = "";
    }
};

function deleteCheck(e){
    const item = e.target
    console.log(item.parentElement)
    //Delete entry
    if (item.classList[0] === "trash-entry-button") {
        const listEntry = item.parentElement;
        // Animation
        listEntry.classList.add("drop");
        listEntry.addEventListener("transitionend", ()=>{
            listEntry.remove();
        });
    }

    if (item.classList[0] === "check-entry-button") {
        const listEntry = item.parentElement;
        listEntry.classList.toggle("completed")
    }
};