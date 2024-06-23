/*  DESCRIPTION:
        A toggleButton is a button that when hovered over reveals a drop down list. Each toggleButton holds a value which is the
        option chosen from the dropdown list. Each option in the list is called a toggle. 
    
    USAGE:
        This class automatically sets up toggleButtons for html elements with the correct class names and structure.
        A toggle button is represented by a div element with the toggle-button class. Each toggle inside the button must have
        the class toggle. Once set up, simply instantiate a toggleButtonManager object and the constructor function will set
        up the toggleButtons.
    
    STRUCTURE:
        <div class="toggle-button" id="fruits">
            <button class="toggle" value="apple">Apple</button>
            <button class="toggle" value="banana">Banana</button>
            <button class="toggle" value="orange">Orange</button>
            <button class="toggle" value="pair">Pair</button>
        </div>
    
    STYLE:
        Use the classes active-toggle and inactive-toggle to style the selected toggle and the rest of the options seperatly. 
*/

class ToggleButtonManager{
    #toggleButtonElements;   //list off all html elements with the toggle-button class
    #toggleButtons;          //list of toggle button objects
    #toggleButtonTextIdMap;  //Map linking html id of toggle button elements to their respective toggle button objects
    
    constructor(){
        this.#toggleButtonElements = document.querySelectorAll(".toggle-button");
        this.#toggleButtons = [];
        this.#toggleButtonTextIdMap = new Map();

        for(let i = 0; i < this.#toggleButtonElements.length; i ++){
            let children = this.#toggleButtonElements[i].children;
            
            let toggleButton = {
                container: this.#toggleButtonElements[i],
                numberOfToggles: children.length,
                toggles: [],
                id: i,
                textId: this.#toggleButtonElements[i].id, //id of the element with the toggle-button class
                activeToggle: 0,
                mouseOver: false,
                callback: null
            }

            for(let c = 0; c < children.length; c++){
                toggleButton.toggles.push(children[c]);
                children[c].style.display = "none";
                children[c].addEventListener("click", () =>{this.#toggleClicked(i, c)});
            }

            this.#toggleButtonElements[i].addEventListener("mouseenter", () =>{this.#toggleButtonMouseEnter(i)});
            this.#toggleButtonElements[i].addEventListener("mouseleave", () =>{this.#toggleButtonMouseLeave(i)});

            children[0].style.display = "block";

            this.#toggleButtons.push(toggleButton);
            this.#setToggleClasses(toggleButton.id);

            if(this.#toggleButtonElements[i].id != ""){
                this.#toggleButtonTextIdMap.set(this.#toggleButtonElements[i].id, toggleButton);
            }
        }
    }

    #toggleClicked(toggleButtonId, toggleId){
        if(toggleId != this.#toggleButtons[toggleButtonId].activeToggle){
            const toggleButton = this.#toggleButtons[toggleButtonId];
            toggleButton.activeToggle = toggleId;
            this.#moveToggleToTop(toggleButtonId, toggleId);
            this.#setToggleClasses(toggleButtonId);

            if(toggleButton.callback != null){
                toggleButton.callback();
            }
        }
    }

    #toggleButtonMouseEnter(toggleButtonId){
        for(let toggle of this.#toggleButtons[toggleButtonId].toggles){
            toggle.style.display = "block";
        }
    }

    #toggleButtonMouseLeave(toggleButtonId){
        let toggles = this.#toggleButtons[toggleButtonId].toggles;
        for(let i = 0; i < toggles.length; i ++){
            if(i != this.#toggleButtons[toggleButtonId].activeToggle){
                toggles[i].style.display = "none";
            }
        }
    }

    #moveToggleToTop(toggleButtonId, toggleId){
        const toggleButton = this.#toggleButtons[toggleButtonId];
        const container = toggleButton.container;
        const toggle = toggleButton.toggles[toggleId];

        //store other toggles
        let otherToggles = [];
        for(let t of toggleButton.toggles){
            if(t != toggle){
                otherToggles.push(t);
            }
        }

        //remove all toggles
        for(let t of toggleButton.toggles){
            container.removeChild(t);
        }

        //add toggles in correct order
        container.appendChild(toggle);
        for(let t of otherToggles){
            container.appendChild(t);
        }
    }

    #setToggleClasses(toggleButtonId){
        const toggleButton = this.#toggleButtons[toggleButtonId];
        const toggles = toggleButton.toggles;
        for(let i = 0; i < toggles.length; i ++){
            toggles[i].classList.remove("active-toggle");
            toggles[i].classList.remove("inactive-toggle");
            
            if(i == toggleButton.activeToggle){
                toggles[i].classList.add("active-toggle");
            }
            else{
                toggles[i].classList.add("inactive-toggle");
            }
        }
    }

    //PUBLIC METHOD: given a toggleButton id it returns the value of the active toggle
    getValueById(textId){
        try{
            const toggleButton = this.#toggleButtonTextIdMap.get(textId);
            return toggleButton.toggles[toggleButton.activeToggle].value;
        }
        catch(error){
            return null;
        }
    }

    setCallbackById(textId, callback){
        try{
            const toggleButton = this.#toggleButtonTextIdMap.get(textId);
            toggleButton.callback = callback;
        }
        catch(error){
            
        }
    }
}