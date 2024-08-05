using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace AxonApparels
{
    public class MyPrincipal : IPrincipal
    {
        public MyPrincipal(IIdentity identity)
        {
            Identity = identity;
        }
        public IIdentity Identity
        {
            get;
            private set;
        }
        public UserName User { get; set; }
        public bool IsInRole(string role)
        {
            return true;
        }
    }
}