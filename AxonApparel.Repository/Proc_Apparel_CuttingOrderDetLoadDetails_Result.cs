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
    
    public partial class Proc_Apparel_CuttingOrderDetLoadDetails_Result
    {
        public int CuttingOrdID { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<int> ColorId { get; set; }
        public Nullable<int> OrdSizeid { get; set; }
        public Nullable<int> SizeId { get; set; }
        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string OrdSize { get; set; }
        public string InorOut { get; set; }
        public decimal Consumption { get; set; }
        public decimal Weight { get; set; }
        public decimal ordqty { get; set; }
        public decimal rate { get; set; }
        public decimal Prog_Op_Qty { get; set; }
        public decimal secqty { get; set; }
        public Nullable<decimal> Bal_Qty { get; set; }
        public int CuttingIssueDetid { get; set; }
        public int CuttingOrdDetid { get; set; }
        public decimal IssueQty { get; set; }
        public Nullable<decimal> TotIssueQty { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal ReturnQty { get; set; }
        public int prodprgdetid { get; set; }
        public decimal ipmarkuprate { get; set; }
        public string LProcess { get; set; }
        public int LProcessid { get; set; }
        public Nullable<int> SizeRow { get; set; }
        public int Grammage { get; set; }
    }
}
