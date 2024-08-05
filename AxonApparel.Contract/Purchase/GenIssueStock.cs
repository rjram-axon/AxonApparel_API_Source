using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class GenIssueStock
    {
        public int GenIssueStockId { get; set; }
        public int IssueId { get; set; }
        public int IssueDetid { get; set; }
        public int Stockid { get; set; }
        public decimal Quantity { get; set; }
        public int Uomid { get; set; }
        public string uom { get; set; }
        
        public decimal IssStkQty { get; set; }
        public string ItemGroup { get; set; }
        public int ItemGroupId { get; set; }
        public decimal stkqty { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public int itemid { get; set; }
        public int colorid { get; set; }
        public int sizeid { get; set; }
       // public decimal quantity { get; set; }
        public decimal sQty { get; set; }
        public int ItmUomid { get; set; }
        public string ItmUom { get; set; }
        public int suomid { get; set; }
        public string sUom { get; set; }
        public string isdecimal { get; set; }
        public decimal rate { get; set; }
        public string Lotno { get; set; }
        public string transtype { get; set; }
        //public int uomid { get; set; }
        public string Style { get; set; }
        public string JobOrderNo { get; set; }
        public string purOrProd { get; set; }
        public string transNo { get; set; }
        public DateTime transdate { get; set; }
        public string process { get; set; }
        public decimal balqty { get; set; }
        public string abbreviation { get; set; }
        public int unitid { get; set; }
        public int storeunitid { get; set; }
        public string supp1 { get; set; }
        public int FabReqId { get; set; }
      
    }
}
