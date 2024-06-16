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
            load_content("html/newItemForm.html", "content", this.newItemFormLoaded);
            document.getElementById("add_icon").style.fill = "var(--color-active)";
            this.state = "newItemForm";
        }
    },
    newItemFormLoaded: function(){

    }
}

//for getting css variables
function getStyleVariable(variableName){
    const rootStyle = getComputedStyle(document.documentElement);
    return rootStyle.getPropertyValue(variableName);
}