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
    
    public partial class Special_Req_Mas
    {
        public Special_Req_Mas()
        {
            this.Special_Req_Det = new HashSet<Special_Req_Det>();
        }
    
        public int Spl_Reqid { get; set; }
        public string Spl_Req_No { get; set; }
        public Nullable<System.DateTime> Spl_Req_Date { get; set; }
        public string Ref_No { get; set; }
        public Nullable<System.DateTime> Ref_Date { get; set; }
        public string Job_Ord_No { get; set; }
        public Nullable<int> Companyid { get; set; }
        public Nullable<int> CompanyUnitid { get; set; }
        public string Req_Remarks { get; set; }
        public string Req_Commit_Cancel { get; set; }
        public Nullable<int> App_By { get; set; }
        public Nullable<System.DateTime> App_Date { get; set; }
        public string App_Commit_Cancel { get; set; }
        public string App_Remarks { get; set; }
        public string Auto_Manual { get; set; }
        public string OrderType { get; set; }
        public string Unit_Or_Other { get; set; }
        public string Type { get; set; }
        public string App_Amend { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> Employeeid { get; set; }
    
        public virtual ICollection<Special_Req_Det> Special_Req_Det { get; set; }
    }
}
