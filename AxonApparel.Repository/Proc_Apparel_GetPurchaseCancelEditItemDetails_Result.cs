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
    
    public partial class Proc_Apparel_GetPurchaseCancelEditItemDetails_Result
    {
        public int DetID { get; set; }
        public string Item { get; set; }
        public int ItemID { get; set; }
        public string Color { get; set; }
        public int ColorId { get; set; }
        public string Size { get; set; }
        public int SizeId { get; set; }
        public string Uom { get; set; }
        public int UomId { get; set; }
        public Nullable<decimal> OrderQty { get; set; }
        public decimal CancelQty { get; set; }
        public int CancelDetID { get; set; }
        public int CancelId { get; set; }
    }
}
