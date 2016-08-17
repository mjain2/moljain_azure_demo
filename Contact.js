//Mollee Jain
//Contact.js
//This javascript file is to allow for querying of the the Contacts database.
// Last updated: 8/17/2016


/* 
Load entire contact list on page start.
*/
var uri = 'api/Contacts';
var contacts = [];
//automatically (on load) gets the contacts
$('#contacts').text('Loading...');
$(document).ready(function () {
    // Send an AJAX request
    $.getJSON(uri)
        .done(function (data) {
            $('#contacts').text('');
            // On success, 'data' contains a list of contacts.
            $.each(data, function (key, item) {
                // Add a list item for the product.
                contacts.push(item);
                $('<ul>', { text: formatItem(item)}).appendTo($('#contacts'));
            });
        });
});

//Formats the contact info
function formatItem(contact) {
    return  contact.Name + ' [' + contact.Alias + '] | ' + contact.Team  + ' | Hobbies: '+ contact.Hobbies;
}

//get the list of contacts (each index is an entry)
function getContacts() {
    return contacts;
}
//SEARCHES FOR THE CONTACT WITH THE ALIAS ENTERED
function find() {
    console.log(getContacts());
    var alias = $('#contactAlias').val();
    //if valid alias
    if (alias && alias != '' && alias != undefined) {
        $.getJSON(uri + '/' + alias)
            .done(function (data) {
                $('#contact').text(formatItem(data));
            })
            .fail(function (jqXHR, textStatus, err) {
                $('#contact').text('Error: ' + err);
            });
    }
        //if INVALID value for alias, output error message
    else {
        $('#contact').text('Error: Cannot search for invalid or no alias.')
    }
           
}


//searches the existing list of contacts in a static setting (no actual querying 
// of data is done)
function query() {
    //reset text area
    $('#searchResults').text("");

    contacts = getContacts(); //get existing list of contacts
    var searchCat = $('#selectSearch').val(); //search category (ie. Name)
    var query = $('#selectQuery').val().toLowerCase(); //user query
    var temp = 0; //counter to indicate if matches found
    if (query && query != '' && query != undefined) {
        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i][searchCat]; //go through each contact
            if (contact.toLowerCase().indexOf(query) >= 0) {
                $('<ul>', { text: formatItem(contacts[i]) }).appendTo($('#searchResults'));
                temp++;
            }
           //end of loop
        }
        if (temp == 0) { $('#searchResults').text("No matches found"); }
    } else {
        $('#searchResults').text('ERROR: query not valid.');
    }
}

//ADDS A CONTACT TO THE CONTACT LIST (NAME, ALIAS, TEAM, HOBBIES)
function add() {
    //get contact information from page
    var values = $('#addForm :input'); //an array of all inputs
    var inputs = $('#addForm').serialize(); //serialized version of the inputs

    //get each part of the contact
    var name = values[0].value;
    var alias = values[1].value; //alias = key
    var team = values[2].value;
    var hobbies = values[3].value;

    if (name && alias && team) {

        console.log($("#addForm").serialize());
        //add contact
        $.post(uri,
            inputs,
            "json");

        $('#addContact').text("Added " + name + " [ " + alias + " ] to the database.");
        $('#refresh').show(); //refresh the page to show the updated contact list
    }
    else {
        $('#addContact').text("To add a contact, you need NAME, ALIAS and TEAM.");
    }
}

//DELETES A CONTACT FROM THE CONTACT LIST (BASED ON ALIAS)
function deleteContact() {
    var alias = $('#deleteAlias').val(); //store the alias provided by user
    $.ajax({ 
        url: uri + '/' + alias,
        type: 'DELETE',
        success: function(result) { //done
            $('#deleteContact').text('Contact [ ' + alias + ' ] has been deleted from list.');
        }
    })
    .fail(function () {
        $('#deleteContact').text("Invalid alias. Check the alias and try again.");
    })
    $('#refresh2').show(); //refresh the page to show the updated contact list
    //console.log("deleted successfully");

}
