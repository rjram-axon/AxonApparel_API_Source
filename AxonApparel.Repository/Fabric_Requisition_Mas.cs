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
    
    public partial class Fabric_Requisition_Mas
    {
        public Fabric_Requisition_Mas()
        {
            this.Fabric_Requisition_Det = new HashSet<Fabric_Requisition_Det>();
        }
    
        public int Fabric_Req_Masid { get; set; }
        public string Fabric_Req_no { get; set; }
        public Nullable<System.DateTime> Fabric_Req_date { get; set; }
        public string IntenalOrExternal { get; set; }
        public Nullable<int> ProcessorId { get; set; }
        public Nullable<int> Buy_Ord_Masid { get; set; }
        public Nullable<int> DeliScheduleNo { get; set; }
        public Nullable<decimal> PlannedQty { get; set; }
        public Nullable<decimal> PendingQty { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public string OType { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> StyleId { get; set; }
    
        public virtual ICollection<Fabric_Requisition_Det> Fabric_Requisition_Det { get; set; }
    }
}