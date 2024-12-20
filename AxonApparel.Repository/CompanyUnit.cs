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
    
    public partial class CompanyUnit
    {
        public CompanyUnit()
        {
            this.Employee = new HashSet<Employee>();
            this.WorkDivision = new HashSet<WorkDivision>();
        }
    
        public int Id { get; set; }
        public string CompanyUnit1 { get; set; }
        public string CUnitLookup { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public Nullable<int> CityId { get; set; }
        public string Zipcode { get; set; }
        public int CompanyId { get; set; }
        public string IssueType { get; set; }
        public bool IsActive { get; set; }
        public Nullable<decimal> WastageCut { get; set; }
        public Nullable<decimal> WastageProc { get; set; }
        public Nullable<decimal> OrderOverHeads { get; set; }
        public Nullable<decimal> QuoteOverHeads { get; set; }
        public Nullable<decimal> OfficeExpense { get; set; }
    
        public virtual City City { get; set; }
        public virtual ICollection<Employee> Employee { get; set; }
        public virtual ICollection<WorkDivision> WorkDivision { get; set; }
    }
}
