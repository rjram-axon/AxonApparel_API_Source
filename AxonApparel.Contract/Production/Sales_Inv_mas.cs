using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Sales_Inv_mas
    {

        public int SalesInvMasid { get; set; }
        public string EntryNo { get; set; }
        public Nullable<int> Compid { get; set; }
        public Nullable<int> Bmasid { get; set; }
        public string Job_ord_no { get; set; }
        public int Jobmasid { get; set; }
        public Nullable<int> Styleid { get; set; }
        public Nullable<System.DateTime> Entrydate { get; set; }
        public string Remarks { get; set; }

        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public List<Sales_Inv_Det> InvDet { get; set; }
    }
}
