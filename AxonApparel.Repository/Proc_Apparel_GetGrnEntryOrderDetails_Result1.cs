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
    
    public partial class Proc_Apparel_GetGrnEntryOrderDetails_Result1
    {
        public int companyid { get; set; }
        public int Pur_Ord_DetId { get; set; }
        public int pur_ord_id { get; set; }
        public string Purchase_Type { get; set; }
        public string Pur_ord_no { get; set; }
        public Nullable<System.DateTime> Orddate { get; set; }
        public int supplierid { get; set; }
        public string PoRemarks { get; set; }
        public int Itemid { get; set; }
        public int Sizeid { get; set; }
        public int Colorid { get; set; }
        public int Unitid { get; set; }
        public string Item { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public string Unit { get; set; }
        public string isDecimal { get; set; }
        public decimal Rate { get; set; }
        public decimal Quantity { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal cancel_qty { get; set; }
        public decimal close_qty { get; set; }
        public decimal receivable_qty { get; set; }
        public decimal ReturnQty { get; set; }
        public string Amend { get; set; }
        public string Percentage { get; set; }
        public decimal Allow_Value { get; set; }
        public short mfrid { get; set; }
        public string mfr { get; set; }
        public Nullable<decimal> Balance { get; set; }
        public Nullable<decimal> MinRate { get; set; }
    }
}
