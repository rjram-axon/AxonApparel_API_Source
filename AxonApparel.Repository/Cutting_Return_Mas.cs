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
    
    public partial class Cutting_Return_Mas
    {
        public Cutting_Return_Mas()
        {
            this.Cutting_Return_det = new HashSet<Cutting_Return_det>();
            this.Cutting_Cancel_mas = new HashSet<Cutting_Cancel_mas>();
            this.Cutting_Wastage_Det = new HashSet<Cutting_Wastage_Det>();
        }
    
        public int CuttingReturnId { get; set; }
        public Nullable<int> CuttingIssueId { get; set; }
        public Nullable<int> CuttingOrdid { get; set; }
        public string CuttingReturnNo { get; set; }
        public Nullable<System.DateTime> CuttingReturnDate { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> ToLocation { get; set; }
        public string RetLocType { get; set; }
        public Nullable<int> CreatedBy { get; set; }
    
        public virtual ICollection<Cutting_Return_det> Cutting_Return_det { get; set; }
        public virtual ICollection<Cutting_Cancel_mas> Cutting_Cancel_mas { get; set; }
        public virtual ICollection<Cutting_Wastage_Det> Cutting_Wastage_Det { get; set; }
        public virtual Cutting_Order_Mas Cutting_Order_Mas { get; set; }
    }
}
