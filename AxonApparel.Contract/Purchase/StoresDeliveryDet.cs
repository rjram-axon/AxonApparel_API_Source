using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StoresDeliveryDet
    {

        public int IssueDetId { get; set; }
        public int IssueId { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int Uomid { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Uom { get; set; }
        public string SUom { get; set; }
        public int UnitStockid { get; set; }
        public int Sec_uomid1 { get; set; }
        public int Sec_uomid { get; set; }
        public int RejectStockId { get; set; }
        public decimal Quantity { get; set; }
        public decimal AllowValue { get; set; }
        public decimal returnqty { get; set; }
        public decimal Sec_Qty { get; set; }
        public decimal Sec_qty1 { get; set; }
        public decimal RefConversion { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal RejectedQty { get; set; }
        public decimal ExcessQty { get; set; }
        public string QltyItemRemarks { get; set; }
        public string qtyremarks { get; set; }
        public string ItemRemarks { get; set; }
        public decimal BalQty { get; set; }
        public string JMasId { get; set; }
        public int SNo { get; set; }
        //public int ESNo { get; set; }
        //public string OrderType { get; set; }
        //public string ItType { get; set; }

        public int Plansizeid { get; set; }
        public string Plansize { get; set; }
    }

     



}




