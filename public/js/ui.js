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
    newItemForm: function(){
        if(this.state != "newItemForm"){
            constructNewItemForm(document.getElementById("content"));
            document.getElementById("add_icon").style.fill = "var(--color-active)";
            this.state = "newItemForm";
        }
    }
}

//for getting css variables
function getStyleVariable(variableName){
    const rootStyle = getComputedStyle(document.documentElement);
    return rootStyle.getPropertyValue(variableName);
}

function constructNewItemForm(container){
    //heading
    const h1 = document.createElement("h1");
    h1.classList.add("contentHeading");
    const h1Text = document.createTextNode("Add New Address");
    h1.appendChild(h1Text);
    const hr = document.createElement("hr");
    container.appendChild(h1);
    container.appendChild(hr);

    //form
    const formFlex = document.createElement("div");
    formFlex.classList.add("formFlex");

    let formItem = document.createElement("div");
    formItem.classList.add("formItem");
    const firstNameLabel = document.createElement("label");
    const firstNameText = document.createTextNode("First Name:");
    const firstNameField = document.createElement("input");
    firstNameField.type = "text";
    firstNameLabel.appendChild(firstNameText);
    formItem.appendChild(firstNameLabel);
    formItem.appendChild(firstNameField);
    formFlex.appendChild(formItem);

    formItem = document.createElement("div");
    formItem.classList.add("formItem");
    const lastNameLabel = document.createElement("label");
    const lastNameText = document.createTextNode("Last Name:");
    const lastNameField = document.createElement("input");
    lastNameField.type = "text";
    lastNameLabel.appendChild(lastNameText);
    formItem.appendChild(lastNameLabel);
    formItem.appendChild(lastNameField);
    formFlex.appendChild(formItem);

    formItem = document.createElement("div");
    formItem.classList.add("formItem");
    const mobileLabel = document.createElement("label");
    const mobileText = document.createTextNode("Mobile:");
    const mobileField = document.createElement("input");
    mobileField.type = "text";
    mobileLabel.appendChild(mobileText);
    formItem.appendChild(mobileLabel);
    formItem.appendChild(mobileField);
    formFlex.appendChild(formItem);

    
    container.appendChild(formFlex);
}