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
    
    public partial class OrderPlanning_Mas
    {
        public int PlanID { get; set; }
        public int CompanyID { get; set; }
        public int Buy_Ord_MasId { get; set; }
        public string Order_No { get; set; }
        public int StyleID { get; set; }
        public int ItemID { get; set; }
        public string Con_Plan { get; set; }
        public string Fabric_Plan { get; set; }
        public string Yarn_Plan { get; set; }
        public string Acc_Plan { get; set; }
        public string Pack_Plan { get; set; }
        public string Fab_plan_Remarks { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public string IsApproved { get; set; }
        public Nullable<bool> LockPlanning { get; set; }
        public Nullable<int> LockCon { get; set; }
        public Nullable<int> LockFab { get; set; }
        public Nullable<int> LockYarn { get; set; }
        public Nullable<int> LockAccs { get; set; }
        public Nullable<int> LockPack { get; set; }
        public Nullable<int> ModifyBy { get; set; }
        public Nullable<System.DateTime> Modify_Date { get; set; }
        public string PA { get; set; }
        public string ComAmend { get; set; }
        public string FabAmend { get; set; }
        public string YarnAmend { get; set; }
        public string Bit_Plan { get; set; }
        public string BitAmend { get; set; }
        public Nullable<int> LockBit { get; set; }
    
        public virtual OrderItem Item { get; set; }
        public virtual OrderStyleHeader StyleHeader { get; set; }
        public virtual Buy_Ord_Mas Buy_Ord_Mas { get; set; }
        public virtual OrderCompany Company { get; set; }
    }
}
