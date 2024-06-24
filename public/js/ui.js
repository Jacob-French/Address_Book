const addressBook = new AddressBook();
const toggleButtonManager = new ToggleButtonManager();

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
            navPanel.populateItems();
        }
    },
    deactivateLetter: function(){
        if(this.activeLetter != null){
            this.activeLetterButton.style.color = "var(--color-text)";
            this.activeLetter = null;
            this.activeLetterButton = null;
            navPanel.populateItems();
        }
    }
};
alphabetSearch.initiate();


const contentPanel = {
    state: null,
    setState: function(newState){
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
            navPanel.deselectItem();
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
        navPanel.selectItem(contact.id);
    },
    displayItem: function(itemId){
        load_content("html/displayItem.html", "content", () => {this.itemDisplayed(itemId)});
        this.setState("displayItem");
    },
    itemDisplayed: function(itemId){
        let contact = addressBook.contacts.get(itemId);
        let name = contact.firstName
        if(contact.lastName != ""){
            name = name + " " + contact.lastName;
        }

        document.getElementById("contactName").innerHTML = name;

        let table = document.getElementById("displayItemTable");
        let tr, td, text;
        
        //construct email section
        if(contact.email != ""){
            tr = document.createElement("tr");
            th = document.createElement("th");
            td = document.createElement("td");
            text = document.createTextNode(contact.email);
            td.appendChild(text);
            text = document.createTextNode("Email:");
            th.appendChild(text);
            td.classList.add("text_light_dark");
            th.classList.add("text_medium_dark");
            tr.appendChild(th);
            tr.appendChild(td);
            table.appendChild(tr);
        }

        //construct mobile section
        if(contact.mobile != ""){
            tr = document.createElement("tr");
            th = document.createElement("th");
            td = document.createElement("td");
            text = document.createTextNode(contact.mobile);
            td.appendChild(text);
            text = document.createTextNode("Mobile:");
            th.appendChild(text);
            td.classList.add("text_light_dark");
            th.classList.add("text_medium_dark");
            tr.appendChild(th);
            tr.appendChild(td);
            table.appendChild(tr);
        }

        //construct address section
        if(contact.address != ""){
            tr = document.createElement("tr");
            th = document.createElement("th");
            td = document.createElement("td");
            text = document.createTextNode(contact.address);
            td.appendChild(text);
            text = document.createTextNode("Address:");
            th.appendChild(text);
            td.classList.add("text_light_dark");
            th.classList.add("text_medium_dark");
            tr.appendChild(th);
            tr.appendChild(td);
            table.appendChild(tr);
        }

        //construct notes section
        if(contact.notes != ""){
            tr = document.createElement("tr");
            th = document.createElement("th");
            th.classList.add("text_medium_dark");
            text = document.createTextNode("Notes:");
            th.appendChild(text);
            tr.appendChild(th);
            table.appendChild(tr);
    
            tr = document.createElement("tr");
            tr.style.height = "0";
            td = document.createElement("td");
            let tdText = document.createTextNode(contact.notes);
            td.appendChild(tdText);
            td.colSpan = "2";
            td.classList.add("text_light_dark");
            tr.appendChild(td);
            table.appendChild(tr);
        }
    }
}

//define the call back functions for when sorting toggle buttons are clicked
toggleButtonManager.setCallbackById("sortOrderToggle", () => {
    navPanel.populateItems();
});
toggleButtonManager.setCallbackById("sortNameToggle", () => {
    navPanel.populateItems();
});

//set up the search bar
document.getElementById("search_bar").addEventListener("input", searchBarInput);
function searchBarInput(){
    const searchBar = document.getElementById("search_bar");
    navPanel.activeSearchTerm = searchBar.value;
    navPanel.populateItems();
}

const navPanel = {
    nav: document.getElementById("navPanel"),
    activeItem: null,
    activeSearchTerm: null,
    populateItems: function(){
        this.deselectItem();
        this.nav.innerHTML = "";
        
        const order = toggleButtonManager.getValueById("sortOrderToggle");
        const name = toggleButtonManager.getValueById("sortNameToggle");
        const letter = alphabetSearch.activeLetter;
        let searchTerm = this.activeSearchTerm;
        if(searchTerm != null){
            if(searchTerm.trim() == ""){
                searchTerm = null;
            }
        }

        const contacts = addressBook.search(order, name, letter, searchTerm);
        for(contact of contacts){
            this.nav.appendChild(this.constructItem(contact.firstName, contact.lastName, contact.id));
        }
    },
    constructItem: function(firstName, lastName, id){
        let container = document.createElement("div");
        container.classList.add("navItem");
        container.id = "nav_item_" + id;
        container.onclick = () => {this.selectItem(id)};
        let title = document.createElement("h2");
        let text = document.createTextNode(firstName + " " + lastName);
        title.appendChild(text);
        container.appendChild(title);
        return container;
    },
    selectItem: function(id){
        console.log("selecting item");
        if(this.activeItem != null){
            let activeItem = document.getElementById("nav_item_" + this.activeItem);
            activeItem.classList.remove("selectedItem");
            this.activeItem = null;
        }
        
        this.activeItem = id;
        let item = document.getElementById("nav_item_" + id);
        item.classList.add("selectedItem");
        contentPanel.displayItem(id);
    },
    deselectItem: function(){
        if(this.activeItem != null){
            let activeItem = document.getElementById("nav_item_" + this.activeItem);
            activeItem.classList.remove("selectedItem");
            this.activeItem = null;
        }
    }
}

//for getting css variables
function getStyleVariable(variableName){
    const rootStyle = getComputedStyle(document.documentElement);
    return rootStyle.getPropertyValue(variableName);
}

addressBook.addTestContacts();
navPanel.populateItems();