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
    
    public partial class ProdReturnDet
    {
        public int ReturnDetID { get; set; }
        public Nullable<int> ReturnID { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int IssueStockID { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal LossQty { get; set; }
        public Nullable<int> NewStockID { get; set; }
        public string Bundled { get; set; }
        public Nullable<int> CuttingId { get; set; }
        public string ProdPrgNo { get; set; }
        public string lotNo { get; set; }
        public string BundleNo { get; set; }
        public Nullable<int> IssueDetID { get; set; }
        public Nullable<decimal> RejectQty { get; set; }
        public Nullable<decimal> ReworkQty { get; set; }
    
        public virtual Cutting_Order_Mas Cutting_Order_Mas { get; set; }
        public virtual Prod_iss_det Prod_iss_det { get; set; }
    }
}
