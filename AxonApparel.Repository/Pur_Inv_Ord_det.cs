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
    
    public partial class Pur_Inv_Ord_det
    {
        public int Pur_Inv_Ord_DetID { get; set; }
        public string Order_No { get; set; }
        public Nullable<int> Pur_invID { get; set; }
        public Nullable<int> Pur_Inv_DetID { get; set; }
        public decimal InvoiceQty { get; set; }
        public Nullable<int> StyleID { get; set; }
    }
}
