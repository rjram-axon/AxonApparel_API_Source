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
    
    public partial class Proc_Apparel_ProductionReturnHeaderInfo_Result
    {
        public int ReturnID { get; set; }
        public string ReturnNo { get; set; }
        public Nullable<System.DateTime> ReturnDate { get; set; }
        public string RefNo { get; set; }
        public Nullable<System.DateTime> RefDate { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public Nullable<int> ProcessID { get; set; }
        public Nullable<int> WorkDivID { get; set; }
        public Nullable<int> Emp_SuppID { get; set; }
        public string Remarks { get; set; }
        public string EmpOrSupp { get; set; }
        public string WorkDivision { get; set; }
        public Nullable<int> WorkDivisionId { get; set; }
        public string Company { get; set; }
        public string Process { get; set; }
        public int StoreUnitID { get; set; }
        public string Storename { get; set; }
    }
}
