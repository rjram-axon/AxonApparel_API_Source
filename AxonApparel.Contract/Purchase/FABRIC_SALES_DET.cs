using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class FABRIC_SALES_DET
    {

        public int FabDetid { get; set; }
        public int Fabmasid { get; set; }
        public string Order_no { get; set; }
        public Nullable<int> Styleid { get; set; }
        public string Transno { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> colorid { get; set; }
        public Nullable<int> sizeid { get; set; }
        public string hsncode { get; set; }
        public Nullable<decimal> StockQty { get; set; }
        public Nullable<decimal> SalesQty { get; set; }
        public Nullable<decimal> rate { get; set; }
        public Nullable<decimal> amount { get; set; }
        public Nullable<decimal> cgst { get; set; }
        public Nullable<decimal> sgst { get; set; }
        public Nullable<decimal> igst { get; set; }
        public Nullable<decimal> Totaltaxamount { get; set; }
        public Nullable<int> Stockid { get; set; }
        public Nullable<int> scolorid { get; set; }
        public Nullable<decimal> SecSalQty { get; set; }
        public Nullable<int> uomid { get; set; }
        public Nullable<int> Sec_saluomid { get; set; }
        public Nullable<decimal> SecQty { get; set; }
        public string Color { get; set; }
        public string Item { get; set; }
        public string Size { get; set; }

        public int CompanyId { get; set; }
        public string ItemCat { get; set; }
        public string Ref_No { get; set; }
        public string Job_Ord_No { get; set; }
        public string Style { get; set; }
        public Nullable<int> ItemGroupId { get; set; }
        public Nullable<int> StoreUnitID { get; set; }
        public Nullable<decimal> Markup_Rate { get; set; }
        public string stocktype { get; set; }
        public string Uom { get; set; }
        public string Supplier { get; set; }
        public int Buy_Ord_MasId { get; set; }

        public string Lot_No { get; set; }

        public string ChkStateid { get; set; }

       
    }
}
