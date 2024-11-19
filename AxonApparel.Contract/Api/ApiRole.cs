using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiRole
    {
        public int Roleid { get; set; }
        public int Menuid { get; set; }
        public string MenuName { get; set; }
        public int Addflag { get; set; }
    }
}
