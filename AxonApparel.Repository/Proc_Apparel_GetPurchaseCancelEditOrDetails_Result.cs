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
    
    public partial class Proc_Apparel_GetPurchaseCancelEditOrDetails_Result
    {
        public int ItemId { get; set; }
        public int ColorID { get; set; }
        public int SizeID { get; set; }
        public int UomID { get; set; }
        public int DetId { get; set; }
        public int OrdDetId { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public int StyleID { get; set; }
        public Nullable<decimal> OrderQty { get; set; }
        public decimal CancelQty { get; set; }
        public string PType { get; set; }
        public Nullable<decimal> Totqty { get; set; }
        public decimal BOMQty { get; set; }
        public int CancelDetID { get; set; }
        public int CancelId { get; set; }
        public int CancelOrdId { get; set; }
    }
}
