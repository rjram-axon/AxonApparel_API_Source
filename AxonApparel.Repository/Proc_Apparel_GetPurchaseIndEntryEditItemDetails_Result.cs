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
    
    public partial class Proc_Apparel_GetPurchaseIndEntryEditItemDetails_Result
    {
        public Nullable<int> itemid { get; set; }
        public Nullable<int> colorid { get; set; }
        public Nullable<int> sizeid { get; set; }
        public Nullable<int> Pur_UOMid { get; set; }
        public string Unit { get; set; }
        public string BaseUnit { get; set; }
        public Nullable<int> BaseUnitid { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public Nullable<decimal> Apprate { get; set; }
        public int currencyid { get; set; }
        public Nullable<decimal> Order_Qty { get; set; }
        public string itemremarks { get; set; }
        public int CGST { get; set; }
        public int SGST { get; set; }
        public int IGST { get; set; }
        public string HsNCode { get; set; }
        public Nullable<long> SNo { get; set; }
        public int CGSTAMT { get; set; }
        public int SGSTAMT { get; set; }
        public int IGSTAMT { get; set; }
        public decimal Qty { get; set; }
        public decimal SecQty { get; set; }
        public Nullable<decimal> Amt { get; set; }
        public decimal Rate { get; set; }
        public int Indentdetid { get; set; }
    }
}