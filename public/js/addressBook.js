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

    this.getFullName = function(){
        if(this.lastName != ""){
            return this.firstName + " " + this.lastName;
        }
        else{
            return this.firstName;
        }
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
        
        //create contacts list
        let contacts = [];
        this.contacts.forEach((value, key) => {
            let push = false;
            let contactName;
            if(name == "firstname"){
                contactName = value.firstName + " " + value.lastName;
            }
            else{
                contactName = value.lastName + " " + value.firstName;
            }

            contactName = contactName.toLowerCase();

            if(letter != null){
                if(contactName.at(0).toLowerCase() == letter.toLowerCase()){
                    push = true;
                }
            }
            else{
                push = true;
            }

            if(searchTerm != null && push){
                if(contactName.search(searchTerm.toLowerCase()) != -1){
                    push = true;
                }
                else{
                    push = false;
                }
            }

            if(push){
                contacts.push(value);
            }
        });

        let comparisonObject = new ComparisonObject(compareAlphabetical, {
            direction: -1,
            name: name
        })

        if(order != 'a-z'){
            comparisonObject.comparisonSettings.direction = 1;
        }

        const sortedContacts = mergeSort(contacts, comparisonObject);
        
        //We left off here. You have the name variable which is firstname, lastname or fullname. create a compare function to 
        //select depending on name.
        return sortedContacts;
    }

    this.addTestContacts = function(){
        let contact = new Contact();
        contact.set("firstName", "Jacob");
        contact.set("lastName", "French");
        contact.set("email", "jacobjfrench@gmail.com");
        contact.set("mobile", "0422129627");
        contact.set("address", "2/3 Meaker Avenue, Oak Park, VIC, 3046");
        contact.set("notes", "This is me");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Rina");
        contact.set("lastName", "Liza");
        contact.set("email", "rinamazing@gmail.com");
        contact.set("mobile", "0483948594");
        contact.set("address", "Cebu City");
        contact.set("notes", "I love her");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Oli");
        contact.set("lastName", "Mursell");
        contact.set("notes", "This is my flatmate");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Keana");
        contact.set("lastName", "Davy");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Evelina");
        contact.set("lastName", "Rusaite");
        this.addContact(contact);
        
        contact = new Contact();
        contact.set("firstName", "Eagle");
        contact.set("lastName", "Oodle");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Josh");
        contact.set("lastName", "Fronie");
        contact.set("notes", "Not sure who this is");
        this.addContact(contact);
    }
}