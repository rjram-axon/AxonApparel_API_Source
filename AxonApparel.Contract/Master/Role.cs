using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string Remarks { get; set; }
        public List<RoleDet> RoleDetList { get; set; }
    }
}
