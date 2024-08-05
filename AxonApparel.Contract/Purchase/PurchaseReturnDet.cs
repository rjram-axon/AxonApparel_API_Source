using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseReturnDet
    {
        public int Return_DetID { get; set; }
        public int Return_ID { get; set; }
        public int Stockid { get; set; }
        public decimal Return_qty { get; set; }
        public decimal Pur_return_qty { get; set; }     
        public int itemid { get; set; }
        public int sizeid { get; set; }
        public int colorid { get; set; }
        public string item { get; set; }
        public string size { get; set; }
        public string color { get; set; }
        public int uomId { get; set; }
        public string puom { get; set; }
        public int suomId { get; set; }
        public string suom { get; set; }
        public int UnitId { get; set; }
        public string purorprod { get; set; }
        public decimal rate { get; set; }
        public decimal stockQty { get; set; }
        public string transno { get; set; }
        public decimal transtype { get; set; }
        public string jobno { get; set; }
        public string style { get; set; }
        public string mfr { get; set; }
        public int styleid { get; set; }
        public int mfrid { get; set; }
        public string ItemCat { get; set; }
        public string dcno { get; set; }
        public string splno { get; set; }
        public int compId { get; set; }
        public int storeunitid { get; set; }
        public int stockuomid { get; set; }
        public decimal SecQty { get; set; }
        public int conmode { get; set; }
        public string ToPurUom { get; set; }
        
    }
}
