using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StoresDeliveryReturnDet
    {
        public int ReturnDetid { get; set; }
        public int Returnid { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Uom { get; set; }
        public string SUom { get; set; }
        public int IssueStockID { get; set; }
        public int Stockid { get; set; }
        public decimal IssQty { get; set; }
        public decimal BalQty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal AcceptedQty { get; set; }
        public decimal secqty { get; set; }
        public string Joborderno { get; set; }
        public string Itemremarks { get; set; }
        public int IssId { get; set; }
        public string ReIsDec { get; set; }
        public string SecIsDec { get; set; }
      

    }
}
