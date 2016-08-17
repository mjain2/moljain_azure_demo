using System;
using System.Collections.Generic;
using System.Linq; //to 'link' to database
using System.Net;
using System.Net.Http;
using System.Web.Http;
using moljainapp_demo.Models;

//Mollee Jain
//8-12-16
//Using http://www.asp.net/web-api/overview/getting-started-with-aspnet-web-api/tutorial-your-first-web-api
//And using https://azure.microsoft.com/en-us/documentation/articles/web-sites-dotnet-deploy-aspnet-mvc-app-membership-oauth-sql-database/

namespace moljainapp_demo.Controllers
{
    public class ContactsController1 : ApiController
    {
        //NOTE: This should query an existing database to be more real
        //this is where you can create an initial dataset of contacts
     
        Contact[] contacts = new Contact[]
        {
            new Contact {Alias = "jdoe", Name = "John Doe", Team = "SEALS", Hobbies = "Being anonymous" },
            new Contact { Alias = "lskywalk", Name = "Luke Skywalker", Team = "SEALS", Hobbies = "Fighting my dad" },
        };

        //this allows you to enumerate through and get the dataset
        public IEnumerable<Contact> GetAllContacts()
        { return contacts; }


        //this allows you to get one item in the contacts dataset by Alias
        public IHttpActionResult GetContact(string alias)
        {
            //handle null
            if (alias == null) { return NotFound();   }

            var alias_lower = alias.ToLower();
            var contact = contacts.FirstOrDefault((p) => String.Equals(p.Alias,alias_lower));
            if (contact == null) { return NotFound(); }
            return Ok(contact);
        }
    }
}
