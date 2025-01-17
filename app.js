/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            console.log(personInfo)
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            console.log(personFamily)
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */



// USE THIS FUNCTION AS A REF FOR SEARCH BY TRAIT

function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findSiblings(person, people) {
    let newArray = people.filter(function(el) {
        if (person.id == el.id) {
            return false;
        }
        if(person.parents.includes(el.parents[0]) || person.parents.includes(el.parents[1])){
            return true;
        };
    })
    return newArray;
}


function findSpouse(person, people) {
    let newArray = people.filter(function(el){
        if (el.currentSpouse == person.id){
            return true;
        }
    });
    return newArray;
}


function findParents(person, people) {
    let newArray = people.filter(function(el){
        if(person.parents.includes(el.id)){
            return true;
        }
    });
    return newArray;
}


function findDescendants(person, people) {
    let newArray = people.filter(function(el){
        if (el.parents[0] === person.id || el.parents[1] === person.id){
            return true;
        }
    });
    return newArray;
}


function findPersonFamily(person, people) {
    let newArray = "";
    let siblings = findSiblings(person,people);
    let spouse = findSpouse(person,people);
    let parents = findParents(person,people);
    let children = findDescendants(person,people);

    if (siblings != null){
        for(let i = 0; i < siblings.length; i++){
            newArray += `siblings: ${siblings[i].firstName} ${siblings[i].lastName}\n`
        }
    }
    if (spouse != null){
        for(let i = 0; i < spouse.length; i++){
            newArray += `spouse: ${spouse[i].firstName} ${spouse[i].lastName}\n` 
        }
    }
    if (parents != null){
        for(let i = 0; i < parents.length; i++){
            newArray += `parents: ${parents[i].firstName} ${parents[i].lastName}\n`
        }
    }
    if (children != null){
        for(let i = 0; i < spouse.length; i++){
            newArray += `descendants: ${descendants[i].firstName} ${descendants[i].lastName}\n`
        }
    }
    return newArray;
}


function findPersonDescendants(person, people) {
    let descendants = [];
    let filteredChildren = "";

    descendants = people.filter(function(el){
        if(el.parents.length === 0){
            return false;
        }
        else if(el.parents[0] === person.id || el.parents[1] === person.id){
            return true;
        }
    });
    for(let i = 0; i < descendants.length; i++){
        filteredChildren += descendants[i].firstName + " " + descendants[i].lastName + " "
    }
    if(descendants.length === 0) {
        filteredChildren = "No descendants found.";
    }
    return filteredChildren;
}


function lookUpGender(people) {
    let userInput = promptFor("What is the person's gender?", chars);
    let genderFilteredArray = people.filter(function(el){
        if(el.gender === userInput){
            return true;
        }
    });
    return genderFilteredArray;
}


function searchByGender(people) {
    let genderSearch = promptFor("Would you like to search by gender? Enter yes or no.", yesNo).toLowerCase();

    switch(genderSearch){
        case "yes":
            let filterByGender = lookUpGender(people);
            return filterByGender;
        case "no":
            return people;
        default:
            searchByGender(people);
            break;
    }
}


function lookUpDob(people) {
    let userInput = promptFor("What is the person's date of birth?", chars);
    let dobFilteredArray = people.filter(function(el){
        if(el.dob === userInput){
            return true;
        }
    });
    return dobFilteredArray;
}


function searchByDob(people) {
    let dobSearch = promptFor("Would you like to search by date of birth? Enter yes or no.", yesNo).toLowerCase();

    switch(dobSearch){
        case "yes":
            let filterByDob = lookUpDob(people);
            return filterByDob;
        case "no":
            return people;
        default:
            searchByDob(people);
            break;
    }
}


function lookUpHeight(people) {
    let userInput = parseInt(promptFor("What is the Height of the person?", chars));
    let heightFilteredArray = people.filter(function(el){
        if(el.height === userInput){
            return true;
        }
    });
    return heightFilteredArray;
}


function searchByHeight(people) {
    let heightSearch = promptFor("Would you like to search by height? Enter yes or no.", yesNo).toLowerCase();

    switch(heightSearch){
        case "yes":
            let filterByHeight = lookUpHeight(people);
            return filterByHeight;
        case "no":
            return people;
        default:
            searchByHeight(people);
            break;
    }
}


function lookUpWeight(people) {
    let userInput = parseInt(promptFor("What is the Weight of the person?", chars));
    let weightFilteredArray = people.filter(function(el){
        if(el.weight === userInput){
            return true;
        }
    });
    return weightFilteredArray;
}


function searchByWeight(people) {
    let weightSearch = promptFor("Would you like to search by weight? Enter yes or no.", yesNo).toLowerCase();

    switch(weightSearch){
        case "yes":
            let filterByWeight = lookUpWeight(people);
            return filterByWeight;
        case "no":
            return people;
        default:
            searchByWeight(people);
            break;
    }
}


function lookUpEyeColor(people) {
    let userInput = promptFor("What is the eye color of the person?", chars);
    let eyeColorFilteredArray = people.filter(function(el){
        if(el.eyeColor === userInput){
            return true;
        }
    });
    return eyeColorFilteredArray;
}


function searchByEyeColor(people) {
    let eyeColorSearch = promptFor("Would you like to search by eye color? Enter yes or no.", yesNo).toLowerCase();

    switch(eyeColorSearch){
        case "yes":
            let filterByEyeColor = lookUpEyeColor(people);
            return filterByEyeColor;
        case "no":
            return people;
        default:
            searchByEyeColor(people);
            break;
    }
}


function lookUpOccupation(people) {
    let userInput = promptFor("What is the occupation of the person?", chars);
    let occupationFilteredArray = people.filter(function(el){
        if(el.occupation === userInput){
            return true;
        }
    });
    return occupationFilteredArray;
}


function searchByOccupation(people) {
    let occupationSearch = promptFor("Would you like to search by occupation? Enter yes or no.", yesNo).toLowerCase();

    switch(occupationSearch){
        case "yes":
            let filterByOccupation = lookUpOccupation(people);
            return filterByOccupation;
        case "no":
            return people;
        default:
            searchByOccupation(people);
            break;
    }
}


function searchByTraits(people) {
    let traits = "";
    let filteredList;

    filteredList = searchByGender(people);
    filteredList = searchByDob(filteredList);
    filteredList = searchByHeight(filteredList);
    filteredList = searchByWeight(filteredList);
    filteredList = searchByEyeColor(filteredList);
    filteredList = searchByOccupation(filteredList);

    if (filteredList.length === 22) {
        alert("Found no one to display.");
    } else if(filteredList.length === 0) {
        alert("Found no one to display");
    } else {
        for(let i = 0; i < filteredList.length; i++) {
            traits += filteredList[i].firstName + " " + filteredList[i].lastName + "\n";
        }
        alert(traits)
    }
    app(people);
}
