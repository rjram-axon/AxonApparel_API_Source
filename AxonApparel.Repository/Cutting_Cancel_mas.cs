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
    
    public partial class Cutting_Cancel_mas
    {
        public Cutting_Cancel_mas()
        {
            this.Cutting_Cancel_det = new HashSet<Cutting_Cancel_det>();
        }
    
        public int Cutting_Cancel_masid { get; set; }
        public string Cutting_Cancel_no { get; set; }
        public Nullable<System.DateTime> Cutting_Cancel_date { get; set; }
        public string Cancel_Ref_no { get; set; }
        public Nullable<System.DateTime> Cancel_Ref_date { get; set; }
        public string CancelOrClose { get; set; }
        public Nullable<int> CuttingReturnId { get; set; }
    
        public virtual ICollection<Cutting_Cancel_det> Cutting_Cancel_det { get; set; }
        public virtual Cutting_Return_Mas Cutting_Return_Mas { get; set; }
    }
}
