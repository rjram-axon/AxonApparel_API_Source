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
    
    public partial class ProductionProd_Prg_Det
    {
        public int Prodprgdetid { get; set; }
        public Nullable<int> Prodprgid { get; set; }
        public Nullable<int> Itemid { get; set; }
        public Nullable<int> Colorid { get; set; }
        public Nullable<int> Sizeid { get; set; }
        public decimal ActualPlan_Qty { get; set; }
        public decimal Prog_Op_Qty { get; set; }
        public decimal order_qty { get; set; }
        public string InorOut { get; set; }
        public string CatType { get; set; }
        public Nullable<int> LastProcessid { get; set; }
        public Nullable<decimal> BalanceQty { get; set; }
        public Nullable<decimal> Issue_qty { get; set; }
        public Nullable<decimal> Receipt_Qty { get; set; }
        public Nullable<decimal> Return_Qty { get; set; }
        public Nullable<decimal> Damage_qty { get; set; }
        public Nullable<decimal> Cancel_Qty { get; set; }
        public Nullable<decimal> Tolerance { get; set; }
        public Nullable<decimal> Returnable_Qty { get; set; }
        public Nullable<decimal> Closure_qty { get; set; }
        public decimal Excess_Qty { get; set; }
        public Nullable<decimal> Inp_CancelQty { get; set; }
        public Nullable<decimal> transferIn { get; set; }
        public Nullable<decimal> transferOut { get; set; }
        public Nullable<decimal> IP_MarkupRate { get; set; }
        public Nullable<decimal> MarkupValue { get; set; }
        public string AltItem { get; set; }
        public decimal Dely_Qty { get; set; }
        public decimal SecQty { get; set; }
        public decimal OrderSecQty { get; set; }
        public decimal IssSecQty { get; set; }
        public decimal RecptSecQty { get; set; }
        public string Amended { get; set; }
        public Nullable<decimal> Dely_Returnqty { get; set; }
        public Nullable<decimal> Loss_Qty { get; set; }
        public string buy_ord_ship { get; set; }
        public Nullable<decimal> GrpQty { get; set; }
        public Nullable<decimal> GrpRate { get; set; }
        public Nullable<decimal> ReWorkQty { get; set; }
    
        public virtual ProductionProd_Prg_Mas Prod_Prg_Mas { get; set; }
    }
}
