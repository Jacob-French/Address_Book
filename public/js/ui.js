const addressBook = new AddressBook();

function toggleSort(dir){
    let buttonSelected = document.getElementById("sort_button_selected");
    let button2 = document.getElementById("sort_button_2");

    if(dir == "a-z"){
        buttonSelected.innerHTML = "A - Z";
        button2.innerHTML = "Z - A";
        buttonSelected.onclick = () => {toggleSort("a-z")};
        button2.onclick = () => {toggleSort("z-a")};
    }
    else{
        buttonSelected.innerHTML = "Z - A";
        button2.innerHTML = "A - Z";
        buttonSelected.onclick = () => {toggleSort("z-a")};
        button2.onclick = () => {toggleSort("a-z")};
    }
}

const alphabetSearch = {
    activeLetter: null,
    activeLetterButton: null,
    initiate: function(){
        let buttons = document.querySelectorAll("#letters > button");
        for(let i of buttons){
            i.addEventListener("click", ()=>{this.activateLetter(i.innerHTML, i)});
        }
    },
    activateLetter: function(letter, button){
        if(this.activeLetter != null){
            this.activeLetterButton.style.color = "var(--color-text)";
        }
        if(this.activeLetter == letter){
            this.deactivateLetter();
        }
        else{
            button.style.color = "var(--color-active)"
            this.activeLetterButton = button;
            this.activeLetter = letter;
        }
    },
    deactivateLetter: function(){
        if(this.activeLetter != null){
            this.activeLetterButton.style.color = "var(--color-text)";
            this.activeLetter = null;
            this.activeLetterButton = null;
        }
    }
};
alphabetSearch.initiate();


const contentPanel = {
    state: null,
    setState: function(newState){
        console.log("changing state");
        switch(this.state){
            case "newItemForm":
                document.getElementById("add_icon").style.fill = "var(--color-text)";
        }
        this.state = newState;
    },
    newItemForm: function(){
        if(this.state != "newItemForm"){
            load_content("html/newItemForm.html", "content", this.newItemFormLoaded);
            document.getElementById("add_icon").style.fill = "var(--color-active)";
            this.setState("newItemForm");
        }
    },
    newItemFormLoaded: function(){

    },
    addNewItem: function(){
        let firstName = document.getElementById("firstNameInput").value;
        let lastName = document.getElementById("lastNameInput").value;
        let email = document.getElementById("emailInput").value;
        let mobile = document.getElementById("mobileInput").value;
        let address = document.getElementById("addressInput").value;
        let notes = document.getElementById("notesInput").value;

        let contact = new Contact();
        contact.set("firstName", firstName);
        contact.set("lastName", lastName);
        contact.set("email", email);
        contact.set("mobile", mobile);
        contact.set("address", address);
        contact.set("notes", notes);

        addressBook.addContact(contact);
        navPanel.populateItems();
    },
    displayItem: function(itemId){
        load_content("html/displayItem.html", "content", this.itemDisplayed);
        this.setState("displayItem");
    },
    itemDisplayed: function(){

    }
}

const navPanel = {
    nav: document.getElementById("navPanel"),
    populateItems: function(){
        this.nav.innerHTML = "";
        addressBook.contacts.forEach((value, key) => {
            this.nav.appendChild(this.constructItem(value.firstName, value.lastName, value.id));
        });
    },
    constructItem: function(firstName, lastName, id){
        let container = document.createElement("div");
        container.classList.add("navItem");
        container.onclick = () => {this.selectItem(id)};
        let title = document.createElement("h2");
        let text = document.createTextNode(firstName + " " + lastName);
        title.appendChild(text);
        container.appendChild(title);
        return container;
    },
    selectItem: function(id){
        contentPanel.displayItem(id);
    }
}

//for getting css variables
function getStyleVariable(variableName){
    const rootStyle = getComputedStyle(document.documentElement);
    return rootStyle.getPropertyValue(variableName);
}