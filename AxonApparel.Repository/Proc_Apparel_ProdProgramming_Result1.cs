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
    
    public partial class Proc_Apparel_ProdProgramming_Result1
    {
        public int id { get; set; }
        public string Job_Ord_No { get; set; }
        public string Buyer { get; set; }
        public string CompanyUnit { get; set; }
        public int CompUnitId { get; set; }
        public string Ref_No { get; set; }
        public string Style { get; set; }
        public Nullable<int> Styleid { get; set; }
        public Nullable<decimal> quantity { get; set; }
        public string Process { get; set; }
        public int Processid { get; set; }
        public bool IsComponentProcess { get; set; }
        public string ProdPrgNo { get; set; }
        public int ProdPrgId { get; set; }
        public Nullable<System.DateTime> progdate { get; set; }
        public string Closed { get; set; }
        public string Amend { get; set; }
        public int MaxSeqNo { get; set; }
    }
}
