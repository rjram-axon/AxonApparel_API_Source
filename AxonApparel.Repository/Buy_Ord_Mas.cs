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
    
    public partial class Buy_Ord_Mas
    {
        public Buy_Ord_Mas()
        {
            this.Buy_Ord_Det = new HashSet<Buy_Ord_Det>();
            this.Sam_Ord_Type = new HashSet<Sam_Ord_Type>();
            this.Buy_Ord_MeasureMas = new HashSet<Buy_Ord_MeasureMas>();
            this.Buy_Ord_Ship = new HashSet<Buy_Ord_Ship>();
            this.Ord_styleTempMas = new HashSet<Ord_styleTempMas>();
            this.Planning_Mas = new HashSet<OrderPlanning_Mas>();
        }
    
        public int Buy_Ord_MasId { get; set; }
        public string Order_No { get; set; }
        public Nullable<System.DateTime> Order_Date { get; set; }
        public Nullable<int> BuyerId { get; set; }
        public Nullable<int> Buyer_AddId { get; set; }
        public Nullable<int> ManagerId { get; set; }
        public Nullable<int> MerchandiserId { get; set; }
        public string Ref_No { get; set; }
        public Nullable<System.DateTime> Ref_Date { get; set; }
        public Nullable<int> Pay_SystemId { get; set; }
        public Nullable<int> SystemId { get; set; }
        public Nullable<int> Payment_ModeId { get; set; }
        public Nullable<int> AgentId { get; set; }
        public Nullable<int> Agent_AddId { get; set; }
        public Nullable<int> ShipAgentId { get; set; }
        public Nullable<int> ShipAgent_AddId { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public Nullable<decimal> Exchange { get; set; }
        public bool Cancel { get; set; }
        public bool Comit { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public string Closed { get; set; }
        public Nullable<System.DateTime> CloseDate { get; set; }
        public Nullable<int> Quantity { get; set; }
        public string Cost_def { get; set; }
        public Nullable<int> GuomId { get; set; }
        public Nullable<short> Guom_Conv { get; set; }
        public Nullable<decimal> Agency_Per { get; set; }
        public Nullable<int> Bas_Unit { get; set; }
        public string Remarks { get; set; }
        public string ClaimType { get; set; }
        public string NominatedForwarder { get; set; }
        public string CSP { get; set; }
        public string Buyer_Ref_No { get; set; }
        public string TransAmend { get; set; }
        public Nullable<int> ConsigneeId { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public string OrdType { get; set; }
        public Nullable<int> Consignee_AddId { get; set; }
        public Nullable<int> ParentOrderId { get; set; }
        public Nullable<int> EnquiryId { get; set; }
        public Nullable<int> QuoteId { get; set; }
        public Nullable<int> ModifyBy { get; set; }
        public Nullable<System.DateTime> Modify_Date { get; set; }
        public string PA { get; set; }
        public string Rev { get; set; }
        public Nullable<int> RevQuoteId { get; set; }
        public string RevQuoteNo { get; set; }
        public string OrdPost { get; set; }
        public string PlanPost { get; set; }
        public string FOrderNo { get; set; }
        public string DiscussRemarks { get; set; }
    
        public virtual ICollection<Buy_Ord_Det> Buy_Ord_Det { get; set; }
        public virtual ICollection<Sam_Ord_Type> Sam_Ord_Type { get; set; }
        public virtual ICollection<Buy_Ord_MeasureMas> Buy_Ord_MeasureMas { get; set; }
        public virtual ICollection<Buy_Ord_Ship> Buy_Ord_Ship { get; set; }
        public virtual ICollection<Ord_styleTempMas> Ord_styleTempMas { get; set; }
        public virtual ICollection<OrderPlanning_Mas> Planning_Mas { get; set; }
        public virtual OrderBuyer Buyer { get; set; }
        public virtual OrderBuyer Buyer1 { get; set; }
        public virtual OrderGarment_Uom Garment_Uom { get; set; }
        public virtual OrderGarment_Uom Garment_Uom1 { get; set; }
        public virtual OrderCompany Company { get; set; }
    }
}
