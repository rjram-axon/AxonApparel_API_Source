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
    
    public partial class Prod_Ord_Det
    {
        public Prod_Ord_Det()
        {
            this.Prod_Ord_JobDet = new HashSet<Prod_Ord_JobDet>();
        }
    
        public int ProductionDetId { get; set; }
        public Nullable<int> ProductionId { get; set; }
        public Nullable<int> itemid { get; set; }
        public Nullable<int> colorid { get; set; }
        public Nullable<int> sizeid { get; set; }
        public string inp_op { get; set; }
        public decimal order_output_qty { get; set; }
        public decimal issued_qty { get; set; }
        public Nullable<decimal> rate { get; set; }
        public decimal received_qty { get; set; }
        public Nullable<decimal> Return_Qty { get; set; }
        public Nullable<decimal> Damage_qty { get; set; }
        public Nullable<decimal> Cancel_Qty { get; set; }
        public Nullable<decimal> Returnable_Qty { get; set; }
        public Nullable<decimal> Inp_CancelQty { get; set; }
        public Nullable<decimal> Markup_Rate { get; set; }
        public Nullable<decimal> Markup_Value { get; set; }
        public Nullable<int> PlannedSizeID { get; set; }
        public decimal OrdSecQty { get; set; }
        public string ItemRemarks { get; set; }
        public Nullable<decimal> Loss_Qty { get; set; }
        public Nullable<int> IN_OUT_UOMID { get; set; }
        public Nullable<int> IssueSizeID { get; set; }
        public Nullable<System.DateTime> ReqDate { get; set; }
        public string Loop_Len { get; set; }
        public string Gauge { get; set; }
    
        public virtual ICollection<Prod_Ord_JobDet> Prod_Ord_JobDet { get; set; }
        public virtual Prod_Ord_Mas Prod_Ord_Mas { get; set; }
    }
}
