using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProdInvDet
    {
        public int ProdInvDetid { get; set; }
        public int ProdInvId { get; set; }
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int UomId { get; set; }
        public string Uom { get; set; }
        public int Componentid { get; set; }
        public int Grndetid { get; set; }
        public int GrnMasid { get; set; }
        public string Closed { get; set; }
        public string LotNo { get; set; }
        public string Job_Ord_No { get; set; }
        public string BundleNo { get; set; }
        public string design { get; set; }
        public string NoOfStiches { get; set; }
        public decimal GrnQty { get; set; }
        public decimal GrnRate { get; set; }
        public decimal BalQty { get; set; }
        public decimal InvoiceQty { get; set; }
        public decimal InvoiceRate { get; set; }
        public decimal Amount { get; set; }
        public decimal IPMarkup_Rate { get; set; }
        public decimal OPMarkup_Rate { get; set; }
        public decimal RejectdQty { get; set; }
        public decimal RejectdRate { get; set; }
        public decimal SecQty { get; set; }
        public decimal Apprate { get; set; }
        public int Processid { get; set; }
        public string ReciptNo { get; set; }

    }
    
}
