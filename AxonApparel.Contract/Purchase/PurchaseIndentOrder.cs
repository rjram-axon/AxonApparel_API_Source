using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseIndentOrder
    {
      
        public int Buy_Ord_BomDetid { get; set; }
        public string OrderNo { get; set; }
        public string ORefNo { get; set; }
        public int Styleid { get; set; }
        public string OStyle { get; set; }
        public decimal quantity { get; set; }
        public int IndentDetid { get; set; }
        public int Indentmasid { get; set; }
        public int ReceivedQty { get; set; }
        public int Indent_BuyJobid { get; set; }
        public decimal Cancel_Qty { get; set; }
        public string ItemCode { get; set; }
        public int ReturnQty { get; set; }
        public DateTime ReqDate { get; set; }
        public int ItemID { get; set; }
        public string Item { get; set; }
        public int SizeID { get; set; }
        public string Size { get; set; }
        public int ColorID { get; set; }
        public string Color { get; set; }
        public int PurUomId { get; set; }
        public string Uom { get; set; }
        public int StyleRowId { get; set; }
        public int CancelDetId { get; set; }
        public int CancelOrdId { get; set; }
        public int CancelId { get; set; }
        public int BuyODetId { get; set; }
        public decimal BomQty { get; set; }
        public decimal OBQty { get; set; }
        public decimal PurordQty { get; set; }    
        public decimal PurcancelQty { get; set; }

    }
}
