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
    
    public partial class Production_Recpt_JobDet
    {
        public int Prod_Recpt_JobDetid { get; set; }
        public Nullable<int> Prod_Recpt_Detid { get; set; }
        public Nullable<int> Prod_Recpt_Masid { get; set; }
        public string Job_Ord_No { get; set; }
        public string ProdPrgNo { get; set; }
        public decimal Received_Qty { get; set; }
        public string LotNo { get; set; }
        public decimal Sec_Qty { get; set; }
        public Nullable<int> DisRowId { get; set; }
        public Nullable<int> ProcessOrdDetid { get; set; }
        public Nullable<int> ProcessOrdJobDetid { get; set; }
        public Nullable<int> LotRowid { get; set; }
        public string IssLot { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
    
        public virtual Production_Ord_Det Production_Ord_Det { get; set; }
        public virtual Production_Ord_JobDet Production_Ord_JobDet { get; set; }
        public virtual Production_Recpt_Det Production_Recpt_Det { get; set; }
    }
}