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
    
    public partial class Report_Footer_Setup
    {
        public Report_Footer_Setup()
        {
            this.Report_Footer_Email = new HashSet<Report_Footer_Email>();
            this.Report_Footer_Process = new HashSet<Report_Footer_Process>();
        }
    
        public int Rpt_Setupid { get; set; }
        public string Doc_Title { get; set; }
        public string Rpt_Title { get; set; }
        public string Rpt_StdCode { get; set; }
        public Nullable<bool> Rpt_Buyer { get; set; }
        public Nullable<bool> Rpt_BuyLookup { get; set; }
        public Nullable<bool> Rpt_Orderno { get; set; }
        public Nullable<bool> Rpt_Style { get; set; }
        public Nullable<bool> Rpt_StyleQty { get; set; }
        public Nullable<bool> Rpt_JobNo { get; set; }
        public Nullable<bool> Rpt_RefNo { get; set; }
        public string Rpt_forwarded { get; set; }
        public string Rpt_Verified { get; set; }
        public string Rpt_Prepared { get; set; }
        public string Rpt_Approved { get; set; }
        public string Rpt_Remarks { get; set; }
        public string rpt_Header { get; set; }
        public Nullable<bool> HBolD { get; set; }
        public Nullable<int> merch { get; set; }
        public string RPT_STDCODE2 { get; set; }
        public Nullable<int> voucherid { get; set; }
        public Nullable<int> ledgerid { get; set; }
        public string TallyExport { get; set; }
        public bool mail_Company { get; set; }
        public bool mail_ProductionUnit { get; set; }
        public bool mail_Supplier { get; set; }
        public bool mail_Buyer { get; set; }
        public bool mail_Employee { get; set; }
        public bool mail_Agent { get; set; }
        public bool mail_consignee { get; set; }
        public bool mail_Bank { get; set; }
        public bool mail_Courier { get; set; }
        public Nullable<int> PrintCount { get; set; }
        public bool PrintMerchTeam { get; set; }
        public Nullable<bool> Rpt_BuyerRefNo { get; set; }
    
        public virtual ICollection<Report_Footer_Email> Report_Footer_Email { get; set; }
        public virtual ICollection<Report_Footer_Process> Report_Footer_Process { get; set; }
    }
}