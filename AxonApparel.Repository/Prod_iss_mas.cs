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
    
    public partial class Prod_iss_mas
    {
        public Prod_iss_mas()
        {
            this.Prod_iss_det = new HashSet<Prod_iss_det>();
            this.Prod_iss_JobDet = new HashSet<Prod_iss_JobDet>();
            this.Prod_Recpt_Det = new HashSet<Prod_Recpt_Det>();
            this.Prod_Recpt_Mas = new HashSet<Prod_Recpt_Mas>();
            this.Prod_Recpt_Return = new HashSet<Prod_Recpt_Return>();
        }
    
        public int ProdIssueId { get; set; }
        public string ProdIssueNo { get; set; }
        public Nullable<System.DateTime> ProdIssueDate { get; set; }
        public Nullable<int> ProductionOrdId { get; set; }
        public string Remarks { get; set; }
        public string GatePassVehicle { get; set; }
        public Nullable<int> IssueStoreid { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ProcessorId { get; set; }
        public string ProgramNo { get; set; }
        public string InternalOrExternal { get; set; }
        public Nullable<int> ProcessId { get; set; }
        public string OrderType { get; set; }
        public Nullable<int> CompanyUnitId { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public string Closed { get; set; }
        public Nullable<int> LastProcessId { get; set; }
    
        public virtual ICollection<Prod_iss_det> Prod_iss_det { get; set; }
        public virtual ICollection<Prod_iss_JobDet> Prod_iss_JobDet { get; set; }
        public virtual ICollection<Prod_Recpt_Det> Prod_Recpt_Det { get; set; }
        public virtual ICollection<Prod_Recpt_Mas> Prod_Recpt_Mas { get; set; }
        public virtual ICollection<Prod_Recpt_Return> Prod_Recpt_Return { get; set; }
    }
}
