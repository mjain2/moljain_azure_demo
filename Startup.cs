using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(moljainapp_demo.Startup))]

namespace moljainapp_demo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            Console.WriteLine("Hello World - this is the moljainapp demo.");
        }
    }
}
