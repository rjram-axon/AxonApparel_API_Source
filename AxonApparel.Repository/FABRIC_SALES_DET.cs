//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AxonApparel.Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class FABRIC_SALES_DET
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
    
        public virtual PurchaseColor Color { get; set; }
        public virtual FABRIC_SALES_MAS FABRIC_SALES_MAS { get; set; }
        public virtual PurchaseItem Item { get; set; }
        public virtual PurchaseSize Size { get; set; }
        public virtual ItemStock ItemStock { get; set; }
    }
}
