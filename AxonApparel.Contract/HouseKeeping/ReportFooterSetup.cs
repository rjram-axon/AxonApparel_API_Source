using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ReportFooterSetup
    {
        //public int setupid { get; set; }
        //public string doctitle { get; set; }
        //public string rpttitle { get; set; }
        //public string reptfrwd { get; set; }
        //public string reptverfd { get; set; }
        //public string reptprepd { get; set; }
        //public string reptapprvd { get; set; }


        public int optionid { get; set; }
        public string optionname { get; set; }
        public bool optionvalue { get; set; }



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


        public List<ReportFooterSetup> RptDet { get; set; }
        public List<ReportOption> RptOptDet { get; set; }
        public List<Report_Footer_Email> RptEmailDet { get; set; }
        public List<Report_Footer_Process> RptProcDet { get; set; }
    }
}
