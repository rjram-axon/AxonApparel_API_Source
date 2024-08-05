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
    
    public partial class Process_Ord_JobDet
    {
        public Process_Ord_JobDet()
        {
            this.Process_Cancel_jobdet = new HashSet<Process_Cancel_jobdet>();
            this.Process_Recpt_Lot = new HashSet<Process_Recpt_Lot>();
            this.Process_Recpt_Jobdet = new HashSet<Process_Recpt_Jobdet>();
        }
    
        public int ProcessJobDetid { get; set; }
        public Nullable<int> ProcessOrdid { get; set; }
        public Nullable<int> ProcessOrddetid { get; set; }
        public Nullable<decimal> ProgQty { get; set; }
        public Nullable<decimal> OrderQty { get; set; }
        public decimal issued_qty { get; set; }
        public decimal received_qty { get; set; }
        public Nullable<decimal> Return_Qty { get; set; }
        public Nullable<decimal> Damage_qty { get; set; }
        public Nullable<decimal> Cancel_Qty { get; set; }
        public string Job_ord_no { get; set; }
        public string ProdPrgNo { get; set; }
        public Nullable<decimal> Returnable_Qty { get; set; }
        public Nullable<bool> Closed { get; set; }
        public Nullable<decimal> Inp_CancelQty { get; set; }
        public decimal OrdSecQty { get; set; }
        public Nullable<decimal> Loss_Qty { get; set; }
        public string buy_ord_ship { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public string ip_op { get; set; }
        public Nullable<int> PlannedSizeID { get; set; }
        public Nullable<int> OpItemId { get; set; }
        public Nullable<int> OpColorId { get; set; }
        public Nullable<int> OpSizeId { get; set; }
        public Nullable<decimal> rate { get; set; }
    
        public virtual ICollection<Process_Cancel_jobdet> Process_Cancel_jobdet { get; set; }
        public virtual ICollection<Process_Recpt_Lot> Process_Recpt_Lot { get; set; }
        public virtual ICollection<Process_Recpt_Jobdet> Process_Recpt_Jobdet { get; set; }
        public virtual Process_Ord_Mas Process_Ord_Mas { get; set; }
        public virtual Process_Ord_Det Process_Ord_Det { get; set; }
    }
}