using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class UserGroup
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }
        public string GroupType { get; set; }
    }
}
