using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProdInvDc
    {
        public int ProdInvDcId { get; set; }
        public int Prodinvid { get; set; }
        public int prod_recpt_masid { get; set; }
        public string GrnNo { get; set; }
        public string DcNo { get; set; }
        public DateTime DCDate { get; set; }
        public DateTime GrnDate { get; set; }
        public string process { get; set; }
    }
        
}
