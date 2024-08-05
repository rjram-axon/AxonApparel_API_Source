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
    
    public partial class City
    {
        public City()
        {
            this.Agent = new HashSet<Agent>();
            this.Bank = new HashSet<Bank>();
            this.Employee = new HashSet<Employee>();
            this.CompanyUnit = new HashSet<CompanyUnit>();
            this.Consignee = new HashSet<Consignee>();
            this.Buyer = new HashSet<Buyer>();
            this.Company = new HashSet<Company>();
            this.Supplier = new HashSet<Supplier>();
        }
    
        public int Id { get; set; }
        public string City1 { get; set; }
        public int CountryId { get; set; }
        public Nullable<int> StateId { get; set; }
        public bool IsActive { get; set; }
    
        public virtual ICollection<Agent> Agent { get; set; }
        public virtual ICollection<Bank> Bank { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<Employee> Employee { get; set; }
        public virtual ICollection<CompanyUnit> CompanyUnit { get; set; }
        public virtual ICollection<Consignee> Consignee { get; set; }
        public virtual ICollection<Buyer> Buyer { get; set; }
        public virtual ICollection<Company> Company { get; set; }
        public virtual ICollection<Supplier> Supplier { get; set; }
    }
}