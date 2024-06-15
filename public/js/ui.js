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