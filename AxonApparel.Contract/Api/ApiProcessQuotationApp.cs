using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiProcessQuotationApp
    {
        public int Quoteid { get; set; }

        public string QuoteNo { get; set; }
        public int QuoteRefNo { get; set; }
        public string Quotedate { get; set; }
        public string Supplier { get; set; }
        public string BuyOrdgeneral { get; set; }
        public string ApprovedStatus { get; set; }
    }
    public class ApiProcessQuotationedit
    {
        public int Quoteid { get; set; }
        public int Process_Quote_detid { get; set; }
        public string BuyordNo { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string size { get; set; }
        public string Uom { get; set; }
        public Decimal rate { get; set; }
        public Decimal AppRate { get; set; }
        public Decimal MinQty { get; set; }
        public Decimal MaxQty { get; set; }
        public string ApprovedStatus { get; set; }
        public string Image { get; set; }

    }

}
