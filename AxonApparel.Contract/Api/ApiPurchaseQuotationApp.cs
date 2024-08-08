using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiPurchaseQuotationApp
    {
        public int Quoteid { get; set; }

        public string QuoteNo { get; set; }
        public string EntryNo { get; set; }
        public string EntryDate { get; set; }
        public string Quotedate { get; set; }
        public string Supplier { get; set; }
        public string BuyOrdgeneral { get; set; }
        public string ApprovedStatus { get; set; }
    }
    public class ApiPurchaseQuotationedit
    {
        public int Quoteid { get; set; }
        public int Process_Quote_detid { get; set; }

        public string BuyordNo { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string UOM { get; set; }
        public Decimal Rate { get; set; }
        public Decimal Apprate { get; set; }
        public Decimal MinQty { get; set; }
        public Decimal MaxQty { get; set; }
        public string ApprovedStatus { get; set; }
        public string Image { get; set; }


    }

}
