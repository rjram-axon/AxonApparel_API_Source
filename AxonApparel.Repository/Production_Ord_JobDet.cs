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
    
    public partial class Production_Ord_JobDet
    {
        public Production_Ord_JobDet()
        {
            this.Production_Recpt_JobDet = new HashSet<Production_Recpt_JobDet>();
        }
    
        public int ProductionJobDetid { get; set; }
        public Nullable<int> ProductionOrdid { get; set; }
        public Nullable<int> ProductionOrddetid { get; set; }
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
    
        public virtual Production_Ord_Det Production_Ord_Det { get; set; }
        public virtual Production_Ord_Mas Production_Ord_Mas { get; set; }
        public virtual ICollection<Production_Recpt_JobDet> Production_Recpt_JobDet { get; set; }
    }
}
