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
    
    public partial class Proc_Apparel_ProcessOrderLoadItmdettab_Result
    {
        public int processorddetid { get; set; }
        public int processordid { get; set; }
        public string processorder { get; set; }
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int Colorid { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public string size { get; set; }
        public decimal OrderQty { get; set; }
        public Nullable<decimal> rate { get; set; }
        public Nullable<decimal> bal { get; set; }
        public Nullable<int> PlanSizeId { get; set; }
        public int FinDiaId { get; set; }
        public decimal SecQty { get; set; }
        public string FSize { get; set; }
    }
}
