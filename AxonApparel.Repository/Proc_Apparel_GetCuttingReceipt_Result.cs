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
    
    public partial class Proc_Apparel_GetCuttingReceipt_Result
    {
        public int buy_Ord_MasId { get; set; }
        public string Order_No { get; set; }
        public string Ref_No { get; set; }
        public string Style { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public int StyleId { get; set; }
        public string ProdPrgNo { get; set; }
        public int ProdPrgId { get; set; }
        public Nullable<int> Buyerid { get; set; }
        public string Buyer { get; set; }
        public int CuttingOrdId { get; set; }
        public string CuttingOrderNo { get; set; }
        public string Processor { get; set; }
        public Nullable<int> WorkDivisionid { get; set; }
        public Nullable<decimal> OrderQty { get; set; }
        public Nullable<decimal> Balance { get; set; }
        public string AMend { get; set; }
        public string JobNo { get; set; }
    }
}