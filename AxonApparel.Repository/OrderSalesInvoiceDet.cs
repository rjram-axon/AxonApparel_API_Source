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
    
    public partial class OrderSalesInvoiceDet
    {
        public int Invdetid { get; set; }
        public Nullable<int> Invid { get; set; }
        public Nullable<int> Itemid { get; set; }
        public string OrderNo { get; set; }
        public string Articleno { get; set; }
        public string HsCode { get; set; }
        public Nullable<int> description { get; set; }
        public Nullable<decimal> qty { get; set; }
        public Nullable<decimal> rate { get; set; }
        public Nullable<decimal> amount { get; set; }
        public Nullable<int> ShipRowId { get; set; }
        public Nullable<int> Fcarton { get; set; }
        public Nullable<int> Tcarton { get; set; }
        public Nullable<int> Totcarton { get; set; }
        public Nullable<decimal> GRwgt { get; set; }
        public Nullable<decimal> NETwgt { get; set; }
    
        public virtual ProductionBuy_Ord_Ship Buy_Ord_Ship { get; set; }
        public virtual OrderSalesInvoiceMas OrderSalesInvoiceMas { get; set; }
    }
}
