using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace AxonApparel.Domain
{
  
    public class buyordapptitle
    {
        public int TitleId { get; set; }
        public string order_no { get; set; }
        public int styleid { get; set; }
        public int  Approvalid { get; set; }
        public string ordertype { get; set; }
        public string ApprovalTitle { get; set; }
        public List<buyordapptitle> AppDet { get; set; }
    }
}
