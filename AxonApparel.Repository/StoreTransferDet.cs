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
    
    public partial class StoreTransferDet
    {
        public int DetID { get; set; }
        public int MasID { get; set; }
        public int IssueStockID { get; set; }
        public Nullable<decimal> TransferQty { get; set; }
        public Nullable<decimal> ReceivedQty { get; set; }
        public Nullable<decimal> RejectedQty { get; set; }
        public Nullable<int> RecptStockID { get; set; }
        public Nullable<int> RejectedStockID { get; set; }
        public string QltyItemRemarks { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<decimal> CGST { get; set; }
        public Nullable<decimal> SGST { get; set; }
        public Nullable<decimal> IGST { get; set; }
        public Nullable<decimal> CGSTAMT { get; set; }
        public Nullable<decimal> SGSTAMT { get; set; }
        public Nullable<decimal> IGSTAMT { get; set; }
    }
}
