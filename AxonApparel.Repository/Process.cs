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
    
    public partial class Process
    {
        public Process()
        {
            this.Cost_Defn_Bom_First = new HashSet<ProcessCost_Defn_Bom_First>();
            this.Process_Ord_Mas = new HashSet<Process_Ord_Mas>();
            this.Process_Qlty_Jobdet = new HashSet<Process_Qlty_Jobdet>();
            this.Prod_Prg_Mas = new HashSet<ProcessProd_Prg_Mas>();
        }
    
        public int ProcessId { get; set; }
        public string Process1 { get; set; }
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
    
        public virtual ICollection<ProcessCost_Defn_Bom_First> Cost_Defn_Bom_First { get; set; }
        public virtual ICollection<Process_Ord_Mas> Process_Ord_Mas { get; set; }
        public virtual ICollection<Process_Qlty_Jobdet> Process_Qlty_Jobdet { get; set; }
        public virtual ICollection<ProcessProd_Prg_Mas> Prod_Prg_Mas { get; set; }
    }
}