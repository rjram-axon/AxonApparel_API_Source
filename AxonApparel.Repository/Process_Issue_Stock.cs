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
    
    public partial class Process_Issue_Stock
    {
        public int ProcessIssStockId { get; set; }
        public Nullable<int> ProcessIssueId { get; set; }
        public string ProcessIssueNo { get; set; }
        public Nullable<int> ProcessIssueJobid { get; set; }
        public string Job_ord_no { get; set; }
        public Nullable<int> ItemStockId { get; set; }
        public Nullable<decimal> IssueQty { get; set; }
        public Nullable<decimal> ReturnQty { get; set; }
        public Nullable<decimal> LossQty { get; set; }
        public Nullable<decimal> Returnable_Qty { get; set; }
        public Nullable<decimal> Markup_Rate { get; set; }
        public string LotNo { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public Nullable<int> OpItemId { get; set; }
        public Nullable<int> OpColorId { get; set; }
        public Nullable<int> OpSizeId { get; set; }
        public string ProdPrgNo { get; set; }
    
        public virtual Process_Issue_Jobdet Process_Issue_Jobdet { get; set; }
    }
}
