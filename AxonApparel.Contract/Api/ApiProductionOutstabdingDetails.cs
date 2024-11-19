using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiProductionOutstabdingDetails
    {
        public string CuttingOrderNo { get; set; }
        public string DeliveryDate { get; set; }
        public string Process { get; set; }
        public string Order_No { get; set; }
        public int? Styleid { get; set; }
        public string Style { get; set; }
        public string Supplier { get; set; }
        public Decimal Issuedqty { get; set; }
        public string IssuItem { get; set; }
        public string Colorname { get; set; }
        public string size { get; set; }
        public Decimal OrderQty { get; set; }
        public string Recptitem { get; set; }
        public string Recptcolor { get; set; }
        public string Recptsize { get; set; }
        public string CuttingRecptNo { get; set; }
        public string DCNo { get; set; }
        public string CuttingRecptDate { get; set; }
        public Decimal RecptQty { get; set; }
        public string RecptUom { get; set; }
        public string IssueUom { get; set; }
        public Decimal Recptwgt { get; set; }
        public Decimal Grammage { get; set; }
        public Decimal OrderIssueqty { get; set; }
        public Decimal orderReturnqty { get; set; }
        public Decimal orderRecptqty { get; set; }
        public Decimal ordrecptwgt { get; set; }
        public Decimal OrderwiseOrdQty { get; set; }
    }
}
