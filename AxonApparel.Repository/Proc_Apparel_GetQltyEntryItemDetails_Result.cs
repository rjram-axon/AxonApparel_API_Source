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
    
    public partial class Proc_Apparel_GetQltyEntryItemDetails_Result
    {
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public string uom { get; set; }
        public Nullable<decimal> rate { get; set; }
        public Nullable<int> itemid { get; set; }
        public Nullable<int> uomid { get; set; }
        public Nullable<int> colorid { get; set; }
        public Nullable<int> sizeid { get; set; }
        public decimal grnqty { get; set; }
        public decimal excess_qty { get; set; }
        public decimal grnaccept { get; set; }
        public decimal grnreject { get; set; }
        public decimal grnreturn { get; set; }
        public decimal grnshortage { get; set; }
        public decimal grnreceivable { get; set; }
        public decimal grndebit { get; set; }
        public decimal qltyexcess { get; set; }
        public decimal excess_return { get; set; }
        public string itemremarks { get; set; }
        public string QltyItemRemarks { get; set; }
        public int grn_detid { get; set; }
        public int grnmfrid { get; set; }
    }
}
