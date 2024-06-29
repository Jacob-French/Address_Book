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

    this.removeContact = function(contactId){
        console.log("address book has been asked to remove contact: " + contactId);
        if(this.contacts.has(contactId)){
            console.log("address book removing contact: " + contactId);
            this.contacts.delete(contactId);
        }
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
        return sortedContacts;
    }

    this.addTestContacts = function(){
        let contact = new Contact();
        contact.set("firstName", "John");
        contact.set("lastName", "Doe");
        contact.set("email", "john.doe@example.com");
        contact.set("address", "123 Main St, Anytown, USA");
        contact.set("notes", "Interested in tech gadgets.");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Jane");
        contact.set("lastName", "Smith");
        contact.set("email", "jane.smith@emailprovider.com");
        contact.set("mobile", "+1-234-567-8901");
        contact.set("address", "Apartment 45, 789 Elm St, Anothercity, USA");
        contact.set("notes", "Recently moved in, prefers email contact.");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Michael");
        contact.set("lastName", "Johnson");
        contact.set("address", "456 Oak Ave, Somewhereville, USA");
        contact.set("notes", "No email provided, prefers calls.");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Sarah");
        contact.set("lastName", "Lee");
        contact.set("email", "sarah.lee@emailservice.com");
        contact.set("address", "567 Pine St, Cityville, USA");
        contact.set("notes", "Contact via email only.");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Alex");
        contact.set("lastName", "Wong");
        contact.set("mobile", "+1-456-789-0123");
        contact.set("notes", "No fixed address, often travels.");
        this.addContact(contact);
        
        contact = new Contact();
        contact.set("firstName", "Emily");
        contact.set("lastName", "Brown");
        contact.set("mobile", "+1-567-890-1234");
        contact.set("address", "678 Maple Dr, Townsville, USA");
        contact.set("notes", "Preferred contact method is text messages.");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "David");
        contact.set("lastName", "Martinez");
        contact.set("email", "david.martinez@emaildomain.com");
        contact.set("address", "789 Cedar Rd, Villageton, USA");
        contact.set("notes", "Regular customer, likes personalized service.");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Jessica");
        contact.set("lastName", "Taylor");
        contact.set("mobile", "+1-678-901-2345");
        contact.set("address", "890 Birch Ln, Suburbia, USA");
        contact.set("notes", "Recently married, updating contact info.");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Kevin");
        contact.set("lastName", "Brown");
        contact.set("mobile", "+1-789-012-3456");
        contact.set("email", "kevin.brown@emailserver.com");
        contact.set("address", "901 Willow Ave, Countryside, USA");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Lisa");
        contact.set("lastName", "Chen");
        contact.set("email", "lisa.chen@examplemail.com");
        contact.set("notes", "No mobile or email provided.");
        this.addContact(contact);

        contact = new Contact();
        contact.set("firstName", "Juan");
        contact.set("lastName", "Pablo");
        contact.set("email", "juan.pablo@example.com");
        contact.set("mobile", "+52-123-456-7890");
        contact.set("address", "Avenida del Sabor, Mexico City, Mexico");
        contact.set("notes", "Travels the world for food adventures. Recently discovered the joy of Australian meat pies.");
        this.addContact(contact);

        // Contact 1: Australian Adventure Seeker
        contact = new Contact();
        contact.set("firstName", "Bruce");
        contact.set("lastName", "Outback");
        contact.set("email", "bruce.outback@example.com");
        contact.set("mobile", "+61-987-654-321");
        contact.set("address", "12 Kangaroo Road, Sydney, Australia");
        contact.set("notes", "Loves camping, surfing, and BBQs on the beach. Always up for an adventure!");
        this.addContact(contact);

        // Contact 2: Tech Savvy Aussie
        contact = new Contact();
        contact.set("firstName", "Sheila");
        contact.set("lastName", "Techie");
        contact.set("email", "sheila.techie@example.com");
        contact.set("mobile", "+61-876-543-210");
        contact.set("notes", "Works in IT support, passionate about gadgets and coding. Has a pet koala named Pixel.");
        this.addContact(contact);

        // Contact 3: Minimalist Traveller
        contact = new Contact();
        contact.set("firstName", "Tom");
        contact.set("lastName", "Wanders");
        contact.set("email", "tom.wanders@example.com");
        contact.set("address", "Somewhere in the world");
        this.addContact(contact);

        // Contact 4: Aussie Beach Bum
        contact = new Contact();
        contact.set("firstName", "Shazza");
        contact.set("lastName", "Surfboard");
        contact.set("email", "shazza.surfboard@example.com");
        contact.set("mobile", "+61-765-432-109");
        contact.set("address", "7 Beachside Avenue, Gold Coast, Australia");
        this.addContact(contact);

        // Contact 5: Funny Contact
        contact = new Contact();
        contact.set("firstName", "Chuck");
        contact.set("lastName", "Norris");
        contact.set("email", "chuck.norris@example.com");
        this.addContact(contact);

        // Contact 6: International Foodie
        contact = new Contact();
        contact.set("firstName", "Marie");
        contact.set("lastName", "Gourmet");
        contact.set("email", "marie.gourmet@example.com");
        contact.set("mobile", "+33-123-456-789");
        contact.set("address", "Rue de la Cuisine, Paris, France");
        contact.set("notes", "Food blogger who loves exploring global cuisines. Currently obsessed with Australian pavlova.");
        this.addContact(contact);

        // Contact 7: Outback Ranger
        contact = new Contact();
        contact.set("firstName", "Steve");
        contact.set("lastName", "Crocodile");
        contact.set("mobile", "+61-432-567-890");
        contact.set("notes", "Wildlife ranger, lives in the outback. Expert in crocodile wrestling.");
        this.addContact(contact);

        // Contact 8: Music Lover
        contact = new Contact();
        contact.set("firstName", "Liam");
        contact.set("lastName", "Beat");
        contact.set("email", "liam.beat@example.com");
        contact.set("address", "123 Melody Lane, Dublin, Ireland");
        this.addContact(contact);
    }
}