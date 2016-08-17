using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

//Mollee Jain
//8-12-16 
namespace moljainapp_demo.Models
{
    public class Contact
    {
        //properties of the class
        //these properties describe information about a contact
        [Key]
        public string Alias { get; set; } //primary key
        public string Name { get; set; }
        public string Team { get; set; }
        public string Hobbies { get; set; }

    }

}