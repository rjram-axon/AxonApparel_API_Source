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
    
    public partial class Proc_Apparel_GetJobWorkItemDetails_Result
    {
        public string buy_ord_ship { get; set; }
        public int ShipRowid { get; set; }
        public Nullable<System.DateTime> ship_date { get; set; }
        public string Destination { get; set; }
        public Nullable<decimal> ProductionQty { get; set; }
        public Nullable<decimal> BalQty { get; set; }
        public int ItemID { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public int colorid { get; set; }
        public int sizeid { get; set; }
        public Nullable<decimal> DetQuantity { get; set; }
        public Nullable<decimal> DetBalQty { get; set; }
        public Nullable<int> sizerow { get; set; }
        public int Buy_Ord_DetId { get; set; }
    }
}