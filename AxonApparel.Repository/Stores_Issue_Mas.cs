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
    
    public partial class Stores_Issue_Mas
    {
        public Stores_Issue_Mas()
        {
            this.Stores_Issue_Det = new HashSet<Stores_Issue_Det>();
            this.Stores_Issue_Order = new HashSet<Stores_Issue_Order>();
            this.Stores_Issue_ReturnMas = new HashSet<Stores_Issue_ReturnMas>();
        }
    
        public int IssueId { get; set; }
        public string Issueno { get; set; }
        public Nullable<System.DateTime> Issuedate { get; set; }
        public int Companyunitid { get; set; }
        public int Companyid { get; set; }
        public string Joborderno { get; set; }
        public string Unit_supplier_self { get; set; }
        public Nullable<int> desunitid { get; set; }
        public string remarks { get; set; }
        public string Job_Mac_Gen { get; set; }
        public string issue_Commit { get; set; }
        public string reqorstock { get; set; }
        public int issueunit { get; set; }
        public string unit_or_other { get; set; }
        public string ItemType { get; set; }
        public string GatePassVehicle { get; set; }
        public string QualityMade { get; set; }
        public string QltyRemarks { get; set; }
        public Nullable<int> RequestnerId { get; set; }
        public Nullable<int> FromStoreUnitID { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> Deptid { get; set; }
        public Nullable<int> SplNo { get; set; }
        public Nullable<int> Processid { get; set; }
    
        public virtual ICollection<Stores_Issue_Det> Stores_Issue_Det { get; set; }
        public virtual ICollection<Stores_Issue_Order> Stores_Issue_Order { get; set; }
        public virtual ICollection<Stores_Issue_ReturnMas> Stores_Issue_ReturnMas { get; set; }
    }
}
