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
    
    public partial class Purchasebuy_ord_style
    {
        public string order_no { get; set; }
        public int Styleid { get; set; }
        public Nullable<int> categoryid { get; set; }
        public Nullable<decimal> quantity { get; set; }
        public Nullable<decimal> price { get; set; }
        public Nullable<decimal> value { get; set; }
        public decimal job_qty { get; set; }
        public int StyleRowid { get; set; }
        public string LongDesc { get; set; }
        public bool cost_estimated { get; set; }
        public Nullable<System.DateTime> styleentdate { get; set; }
        public Nullable<decimal> ProductionQty { get; set; }
        public string Amend { get; set; }
        public string Yarn_Amend { get; set; }
        public string Acc_Amend { get; set; }
        public string Pack_Amend { get; set; }
        public string Despatch_Closed { get; set; }
        public Nullable<decimal> despatch_qty { get; set; }
        public string cutG_Amend { get; set; }
        public int Grouped_StyleID { get; set; }
        public bool Grouped { get; set; }
        public string WORKORDER { get; set; }
        public Nullable<int> Company_Unitid { get; set; }
        public Nullable<int> Enquiryid { get; set; }
        public string BuyerArt { get; set; }
        public string OpenPrgAmend { get; set; }
        public Nullable<int> SampleStyleId { get; set; }
        public Nullable<int> SeasonId { get; set; }
        public Nullable<int> GarmentGsm { get; set; }
        public Nullable<int> ProcessUnitID { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<bool> IsSeQPrgmLock { get; set; }
        public Nullable<decimal> prs_loss { get; set; }
        public int mis_tmArchive { get; set; }
        public int mis_type { get; set; }
        public Nullable<int> Cancel { get; set; }
        public string OrderType { get; set; }
        public Nullable<int> AllowancePer { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public Nullable<decimal> Exchange { get; set; }
        public Nullable<decimal> CAD_Weight { get; set; }
        public Nullable<decimal> CAD_Percentage { get; set; }
        public Nullable<int> Modifiedby { get; set; }
        public Nullable<System.DateTime> Modifieddate { get; set; }
        public string PA { get; set; }
        public string Description { get; set; }
    }
}
