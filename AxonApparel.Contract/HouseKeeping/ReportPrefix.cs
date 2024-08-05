using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ReportPrefix
    {
        public int Rpt_PID { get; set; }
        public string Doc_Title { get; set; }
        public string Doc_Type { get; set; }


        public int setupid { get; set; }    
        public string rpttitle { get; set; }
        public string reptfrwd { get; set; }
        public string reptverfd { get; set; }
        public string reptprepd { get; set; }
        public string reptapprvd { get; set; }


        public int optionid { get; set; }
        public string optionname { get; set; }
        public bool optionvalue { get; set; } 

        public List<ReportFooterSetup> RptDet { get; set; }
        public List<ReportOption> RptOptDet { get; set; }
        
    }
}
