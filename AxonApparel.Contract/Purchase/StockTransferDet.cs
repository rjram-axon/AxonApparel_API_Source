using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StockTransferDet
    {
        public string TransNo { get; set; }
        public int TrasId { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Uom { get; set; }
        public string Supplier { get; set; }
        public string LotNo { get; set; }
        public string Process { get; set; }
        public int StockId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int UomId { get; set; }
        public int SupplierId { get; set; }
        public int ProcessId { get; set; }
        public int StoreId { get; set; }
        public int PrgDetId { get; set; }
        public decimal StkQty { get; set; }
        public decimal PrgQty { get; set; }
        public decimal TransQty { get; set; }
        public decimal MrpRate { get; set; }
        public int NewStockId { get; set; }
        public decimal AllotedQty { get; set; }
        public decimal EditTransQty { get; set; }
        public DateTime StockDate { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string WorkOrdNo{ get; set; }
        public string StockType { get; set; }
        public int stktransno { get; set; }
        public int stkcompid { get; set; }
        public string Etype { get; set; }
        public string ItemCat { get; set; }
        public int Styleid { get; set; }
        public string ToOrderno { get; set; }
        public string ToRef { get; set; }
        public Nullable<int> ToStyleid { get; set; }
        public Nullable<int> Createdby { get; set; }
        public int Companyid { get; set; }
        public string Transdate { get; set; }
        public int ProgramSeqno { get; set; }
        public string ReqNo { get; set; }
        public int ReqId { get; set; }
        public string OrderStatus { get; set; }
        public string ToStyle { get; set; }
        public decimal Ordbalqty { get; set; }
        public decimal Ordbalqtyval { get; set; }
        public decimal BalStkQtyval { get; set; }

        public string ReqBy { get; set; }
        public DateTime Reqdate { get; set; }
        public string Appby { get; set; }
        public DateTime Appdate { get; set; }
        public string AppStatus { get; set; }
        public string Cancel { get; set; }
        public int StkAppId { get; set; }
        public string StkTransferNo { get; set; }
    }
}
