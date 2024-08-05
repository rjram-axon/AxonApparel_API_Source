using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CuttingReturnDetail
    {
        public int CuttingIssueId { get; set; }
        public int CuttingReturnId { get; set; }
        public int CuttingReturnDetId { get; set; }
        public int Itemid { get; set; }
        public string Item { get; set; }
        public int Colorid { get; set; }
        public string Color { get; set; }
        public int Sizeid { get; set; }
        public decimal Returnqty { get; set; }
        public decimal Lossqty { get; set; }
        public decimal Allotedqty { get; set; }
        public decimal Secqty { get; set; }
        public string Size { get; set; }
        public decimal Balanceqty { get; set; }
        public decimal Issueqty { get; set; }
        public int CuttingIssueDetid { get; set; }
        public int CuttingIssueStckid { get; set; }
        public string Uom { get; set; }
        public string Lotno { get; set; }
        public decimal CancelQty { get; set; }

        public int CuttingOrdid { get; set; }
        public decimal RecQty { get; set; }
        public int CuttingOrdDetid { get; set; }
        public decimal OrdQty { get; set; }
        public string InorOut { get; set; }

        public int Cutting_Cancel_Detid { get; set; }
        public Nullable<int> Cutting_Cancel_Masid { get; set; }
     

    }
}
