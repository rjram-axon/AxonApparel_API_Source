using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  
    public class Commercial_Invdet
    {
        public int Invdetid { get; set; }
        public Nullable<int> Invmasid { get; set; }
        public Nullable<int> Commercialid { get; set; }
        public string OrderNo { get; set; }
        public Nullable<int> Styleid { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public string Refno { get; set;}
        public string Style { get; set;}
        public Nullable<decimal> Totalcost { get; set; }
        public Nullable<decimal> Balancecost { get; set; }
        public string Commercial { get; set; }
    }
}
