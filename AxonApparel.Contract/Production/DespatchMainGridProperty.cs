using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class DespatchMainGridProperty
    {
        public int DespatchID { get; set; }
        public int BuyerID { get; set; }
        public int CompanyID { get; set; }
        public string DespatchNo { get; set; }
        public string Company { get; set; }        
        public DateTime DespatchDate { get; set; }
        public string Destination { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public string Buyer { get; set; }
        public decimal DesQty { get; set; }
        public string DocRefNo { get; set; }
    }
}
