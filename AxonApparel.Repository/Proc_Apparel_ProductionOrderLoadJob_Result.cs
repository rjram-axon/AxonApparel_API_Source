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
    
    public partial class Proc_Apparel_ProductionOrderLoadJob_Result
    {
        public Nullable<int> ProductionOrdid { get; set; }
        public decimal issued_qty { get; set; }
        public Nullable<int> ProductionOrddetid { get; set; }
        public int ProductionJobDetid { get; set; }
        public string job_ord_no { get; set; }
        public string IsProportion { get; set; }
        public string ProdPrgno { get; set; }
        public Nullable<decimal> OrderQty { get; set; }
        public Nullable<decimal> bal { get; set; }
        public bool Closed { get; set; }
        public int ItemId { get; set; }
        public int Colorid { get; set; }
        public int SizeId { get; set; }
    }
}
