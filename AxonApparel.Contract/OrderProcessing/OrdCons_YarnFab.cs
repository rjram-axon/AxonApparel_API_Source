using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class OrdCons_YarnFab
    {
        public int ordconsyarnfabmasid { get; set; }
        public int ordconsmasid { get; set; }
        public string ordconsitemtype { get; set; }
        public int ordconsitemid { get; set; }
        public string Item { get; set; }
    }
}
