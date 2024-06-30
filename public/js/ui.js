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

//Here is where we left off. you need to keep track of event listeners and be able to remove them. 
// try adding close message event listeners in the constructor. 
function popUpMessage(){
    
    this.closeMessage = function(){
        this.messageBox.style.display = "none";
    }.bind(this);
    
    this.messageBox = document.getElementById("popUpContainer");
    this.message = document.getElementById("popUpText");
    this.yesButton = document.getElementById("popUpYes");
    this.noButton = document.getElementById("popUpNo");
    this.yesButton.addEventListener("click", this.closeMessage);
    this.noButton.addEventListener("click", this.closeMessage);
    this.activeYesButtonListener = null;
    this.activeNoButtonListener = null;

    this.displayMessage = function(message, noLabel, yesLabel, noCallback, yesCallback){
        if(this.activeYesButtonListener != null){
            this.yesButton.removeEventListener(this.activeYesButtonListener.event, this.activeYesButtonListener.callback);
        }
        if(this.activeNoButtonListener != null){
            this.noButton.removeEventListener(this.activeNoButtonListener.event, this.activeNoButtonListener.callback);
        }
        
        this.messageBox.style.display = "flex";
        this.message.innerHTML = message;
        this.yesButton.innerHTML = yesLabel;
        this.noButton.innerHTML = noLabel;
        this.yesButton.addEventListener("click", yesCallback);
        this.activeYesButtonListener = {event: "click", callback: yesCallback};
        this.noButton.addEventListener("click", noCallback);
        this.activeNoButtonListener = {event: "click", callback: noCallback};

        if(noCallback == null){
            this.noButton.style.display = "none";
        }
        else{
            this.noButton.style.display = "block";
        }
    }
}

const popup = new popUpMessage();


const contentPanel = {
    state: null,
    activeContactId: null,
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

        if(firstName == ""){
            popup.displayMessage("Your contact must have a first name.", "Ok", "I understand", null, ()=>{});
        }
        else{
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
        }
    },
    updateItem: function(){
        let firstName = document.getElementById("firstNameInput").value;
        let lastName = document.getElementById("lastNameInput").value;
        let email = document.getElementById("emailInput").value;
        let mobile = document.getElementById("mobileInput").value;
        let address = document.getElementById("addressInput").value;
        let notes = document.getElementById("notesInput").value;

        if(firstName == ""){
            popup.displayMessage("Your contact must have a first name.", "Ok", "I understand", null, ()=>{});
        }
        else{
            let contact = addressBook.contacts.get(this.activeContactId);
            contact.firstName = firstName;
            contact.lastName = lastName;
            contact.email = email;
            contact.mobile = mobile;
            contact.address = address;
            contact.notes = notes;

            navPanel.populateItems();
            navPanel.selectItem(this.activeContactId);
        }
    },
    displayLanding: function(){
        load_content("html/landing.html", "content", () => {});
    },
    displayItem: function(itemId){
        load_content("html/displayItem.html", "content", () => {this.itemDisplayed(itemId)});
        this.setState("displayItem");
        this.activeContactId = itemId;
    },
    displayActiveItem: function(){
        this.displayItem(this.activeContactId);
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
    },
    deleteItem: function(){
        popup.displayMessage("Are you sure you want to delete this contact?", "No", "Delete", ()=>{}, deleteContact);
    },
    editItem: function(){
        load_content("html/editItemForm.html", "content", () => {this.editItemform(this.activeContactId)});
    },
    editItemform: function(itemId){
        let contact = addressBook.contacts.get(itemId);

        document.getElementById("firstNameInput").value = contact.firstName;
        document.getElementById("lastNameInput").value = contact.lastName;
        document.getElementById("emailInput").value = contact.email;
        document.getElementById("mobileInput").value = contact.mobile;
        document.getElementById("addressInput").value = contact.address;
        document.getElementById("notesInput").value = contact.notes;
    }
}

function deleteContact(){
    console.log("deleting contact");
    addressBook.removeContact(contentPanel.activeContactId);
    navPanel.populateItems();
    contentPanel.displayLanding();
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
contentPanel.displayLanding();