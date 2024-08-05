using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Bom
    {
        public int Buyordmasdetid { get; set; }
        public int Buyordmasid { get; set; }
        public int Jobordmasdetid { get; set; }
        public int Jobordmasid { get; set; }
        public int Itemid { get; set; }
        public int Sizeid { get; set; }
        public int Colorid { get; set; }
        public string color { get; set; }
        public int Uomid { get; set; }
        public string puruom { get; set; }
        public string uom { get; set; }
        public int size { get; set; }
        public string item { get; set; }
        public decimal pgmqty { get; set; }
        public decimal AllowVal { get; set; }
        public int ordqty { get; set; }
        public decimal recvdqty { get; set; }
        public int issueqty { get; set; }
        public decimal BOM_qty { get; set; }
        public int Pur_UOMid { get; set; }
        public decimal ToPurUOM { get; set; }
        public int head_office { get; set; }
        public string purchase_thru { get; set; }
        public string Conv_Mode { get; set; }
        public int Adjust_Qty { get; set; }
        public string PurFor_Job { get; set; }
        public int Debit_qty { get; set; }
        public int Transfer_In { get; set; }
        public int Transfer_Out { get; set; }
        public int Cancelled_Qty { get; set; }
        public int BOMDiff_Qty { get; set; }
        public int Cancel_Qty { get; set; }
        public DateTime EntryDate { get; set; }
        public string Semi_finished_item { get; set; }
        public string CSP { get; set; }
        public string ProcessInput { get; set; }
        public string AltItem { get; set; }
        public string ItemRemarks { get; set; }
        public string ItemClosure { get; set; }
        public int ReturnQty { get; set; }
        public int StockIn { get; set; }
        public int StockOut { get; set; }
        public int Itemgroupid { get; set; }
        public string Itemgroup { get; set; }
        public string Orderno { get; set; }
        public int styleid { get; set; }
        public int stylerowid { get; set; }
        public string Category1 { get; set; }
        public string Category2 { get; set; }
        public string Category3 { get; set; }
        public int FromUomid { get; set; }
        public int ToUomid { get; set; }
        public string FromUom { get; set; }
        public string ToUom { get; set; }
        public string Conversion { get; set; }
        public string Mode { get; set; }
        public int Baseunit { get; set; }
        public string OType { get; set; }
        public decimal JobBomQty { get; set; }
        //For Po Check
        public string PoNo { get; set; }
        public int PurOrdId { get; set; }
        public string action { get; set; }
        public int SNo { get; set; }
        public int IGId { get; set; }
        //
        public List<Bom> BomListDet { get; set; }
    }
}
