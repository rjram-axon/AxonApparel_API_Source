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
    
    public partial class Sales_Inv_mas
    {
        public Sales_Inv_mas()
        {
            this.Sales_Inv_Det = new HashSet<Sales_Inv_Det>();
        }
    
        public int SalesInvMasid { get; set; }
        public string EntryNo { get; set; }
        public Nullable<int> Compid { get; set; }
        public Nullable<int> Bmasid { get; set; }
        public string Job_ord_no { get; set; }
        public Nullable<int> Styleid { get; set; }
        public Nullable<System.DateTime> Entrydate { get; set; }
        public string Remarks { get; set; }
    
        public virtual ICollection<Sales_Inv_Det> Sales_Inv_Det { get; set; }
    }
}
