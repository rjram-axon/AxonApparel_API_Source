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
    
    public partial class Proc_Apparel_Quotationgetprocess_Result
    {
        public int ProcessId { get; set; }
        public string Process { get; set; }
        public string Description { get; set; }
        public Nullable<byte> Stage_Schedule { get; set; }
        public Nullable<bool> IsProportion { get; set; }
        public bool IsComponentProcess { get; set; }
        public bool AllowLotNumGen { get; set; }
        public bool IsActive { get; set; }
        public Nullable<int> SeqNo { get; set; }
        public Nullable<decimal> Prc_Allowance { get; set; }
        public string Program_input { get; set; }
        public string Program_output { get; set; }
        public string GSTTaxCode { get; set; }
        public string IGSTTaxCode { get; set; }
        public Nullable<decimal> ProcessLoss { get; set; }
        public bool IsValidateProcessOrdQty { get; set; }
        public Nullable<bool> IsEmblishmentProcess { get; set; }
    }
}