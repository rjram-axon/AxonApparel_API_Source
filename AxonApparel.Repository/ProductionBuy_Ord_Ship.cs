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
    
    public partial class ProductionBuy_Ord_Ship
    {
        public ProductionBuy_Ord_Ship()
        {
            this.OrderSalesInvoiceDet = new HashSet<OrderSalesInvoiceDet>();
        }
    
        public int ShipRowId { get; set; }
        public string Buy_Ord_Ship1 { get; set; }
        public string Order_No { get; set; }
        public Nullable<int> Buy_Ord_MasId { get; set; }
        public Nullable<int> StyleId { get; set; }
        public Nullable<System.DateTime> Ship_Date { get; set; }
        public string ItemMode { get; set; }
        public int Dest_Code { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public Nullable<decimal> Job_Qty { get; set; }
        public Nullable<decimal> Finish_Qty { get; set; }
        public Nullable<int> StyleRowid { get; set; }
        public string Lotno { get; set; }
        public Nullable<decimal> ProductionQty { get; set; }
        public Nullable<int> Despatch_Qty { get; set; }
        public Nullable<int> PortOfLoadingId { get; set; }
        public string ShipAmend { get; set; }
        public decimal AllowancePer { get; set; }
        public string Despatch_Closed { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> SlNo { get; set; }
        public Nullable<System.DateTime> DelDate { get; set; }
        public Nullable<int> ModifyBy { get; set; }
        public Nullable<System.DateTime> Modify_Date { get; set; }
        public string PA { get; set; }
    
        public virtual ICollection<OrderSalesInvoiceDet> OrderSalesInvoiceDet { get; set; }
    }
}