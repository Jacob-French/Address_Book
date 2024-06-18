function Contact(){
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.mobile = "";
    this.address = "";
    this.notes = "";
    this.id = -1;
    this.set = function(field, value){
        switch(field){
            case "firstName":
                this.firstName = value;
                break;
            case "lastName":
                this.lastName = value;
                break;
            case "email":
                this.email = value;
                break;
            case "mobile":
                this.mobile = value;
                break;
            case "address":
                this.address = value;
                break;
            case "notes":
                this.notes = value;
                break;
            case "id":
                this.id = value;
        }
    }
    this.print = function(){
        console.log("first name: " + this.firstName);
        console.log("last name: " + this.lastName);
        console.log("email: " + this.email);
        console.log("mobile: " + this.mobile);
        console.log("address: " + this.address);
        console.log("notes: " + this.notes);
    }
}

function AddressBook(){
    this.contacts = new Map();
    this.idCount = 0;
    this.addContact = function(contact){
        contact.set("id", this.idCount);
        this.contacts.set(this.idCount, contact);
        this.idCount += 1;
    }
    this.search = function(order, name, letter, searchTerm){
        //search function goes here
    }
}