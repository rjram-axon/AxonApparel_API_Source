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
    
    public partial class Job_Ord_Det_Amend
    {
        public int JodDetAmndId { get; set; }
        public string Job_Ord_No { get; set; }
        public string Buy_ord_ship { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public Nullable<decimal> Finish_qty { get; set; }
        public Nullable<decimal> Despatch_qty { get; set; }
        public Nullable<System.DateTime> Delivery_date { get; set; }
        public Nullable<decimal> WorkOrd_Qty { get; set; }
        public Nullable<decimal> Style_qty { get; set; }
        public Nullable<decimal> Sty_FinQty { get; set; }
        public Nullable<decimal> Sty_despQty { get; set; }
        public Nullable<System.DateTime> Ck_date { get; set; }
    }
}
