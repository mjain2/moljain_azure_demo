namespace moljainapp.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using moljainapp_demo.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<moljainapp_demo.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(moljainapp_demo.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Contacts.AddOrUpdate(p => p.Alias,
                new Contact {
                    Alias = "pleia",
                    Name = "Leia Skywalker",
                    Team = "Azure",
                    Hobbies = "I'm a princess"
                },
                new Contact
                {
                    Alias = "hsolo",
                    Name = "Han Solo",
                    Team = "Microsoft Research",
                    Hobbies = "Chillin with my Wookie"
                }
                );
        }
    }
}
