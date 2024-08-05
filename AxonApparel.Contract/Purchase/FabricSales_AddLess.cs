using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class FabricSales_AddLess
    {
        public int Fabmasid { get; set; }
        public int FabricsaleAddLessid { get; set; }
        public Nullable<int> AddLessid { get; set; }
        public Nullable<decimal> Percentage { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public string aorl { get; set; }
        public string Addless { get; set; }
        public string Type { get; set; }
    }
}
