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
    
    public partial class Proc_Apparel_GetProcessInvEditDetails_Result
    {
        public string processor { get; set; }
        public Nullable<System.DateTime> Entry_Date { get; set; }
        public string Entry_No { get; set; }
        public Nullable<System.DateTime> Inv_Date { get; set; }
        public string Inv_No { get; set; }
        public string OrderType { get; set; }
        public int SupplierId { get; set; }
        public int companyid { get; set; }
        public string company { get; set; }
        public Nullable<int> processid { get; set; }
        public string process { get; set; }
        public int Process_Invid { get; set; }
        public string Remarks { get; set; }
        public decimal InvAmt { get; set; }
        public decimal PayAmount { get; set; }
        public int UnitId { get; set; }
        public string CompUnit { get; set; }
        public string InternalOrExternal { get; set; }
    }
}
