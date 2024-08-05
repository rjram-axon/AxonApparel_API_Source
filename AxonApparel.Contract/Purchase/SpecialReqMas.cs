using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class SpecialReqMas
    {
        public int Spl_Reqid { get; set; }
        public string Spl_Req_No { get; set; }
        public DateTime Spl_Req_Date { get; set; }
        public string Ref_No { get; set; }
        public DateTime Ref_Date { get; set; }
        public string Job_Ord_No { get; set; }
        public int Companyid { get; set; }
        public string company { get; set; }
        public int CompanyUnitid { get; set; }
        public string companyunit { get; set; }
        public string Req_Remarks { get; set; }
        public string Req_Commit_Cancel { get; set; }
        public int App_By { get; set; }
        public DateTime App_Date { get; set; }
        public string App_Commit_Cancel { get; set; }
        public string App_Remarks { get; set; }
        public string Auto_Manual { get; set; }
        public string OrderType { get; set; }
        public string Unit_Or_Other { get; set; }
        public string Type { get; set; }
        public string App_Amend { get; set; }
        public int CreatedBy { get; set; }

        public int bmasid { get; set; }
        public int jmasid { get; set; }
        public string orderno { get; set; }
        public int unitid { get; set; }
        public string unit { get; set; }
        public int styleid { get; set; }
        public string style { get; set; }

        public int Employeeid { get; set; }

        public List<SpecialReqDet> SplreqDet { get; set; }
    }
}
