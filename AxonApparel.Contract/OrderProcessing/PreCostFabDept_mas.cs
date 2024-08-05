using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class PreCostFabDept_mas
    {
        public int PreCostFabDeptmasid { get; set; }
        public int Buyerid { get; set; }
        public string Buyer { get; set; }
        public string order_no { get; set; }
        public int  Quantity { get; set; }
        public DateTime Order_date { get; set; }
        public int Styleid { get; set; }
        public int Stylerowid { get; set; }
        public DateTime Entrydate { get; set; }
        public int Bmasid { get; set; }
        public string Ref_no { get; set; }
        public string Style { get; set; }
        public List<PrecostFabDept_Fab> FabDet { get; set; }
        public List<PrecostFabDept_Yarn> YarnDet { get; set; }
        public List<PrecostFabDept_Process> ProcessDet { get; set; }
    }
}
