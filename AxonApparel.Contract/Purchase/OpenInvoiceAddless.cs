using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  public class OpenInvoiceAddless
    {
        public int Open_InvID { get; set; }
        public int openiv_Addless_ID { get; set; }
        public int addlessid { get; set; }
        public string addless { get; set; }
        public decimal Percentage { get; set; }
        public decimal Amount { get; set; }
        public string AorL { get; set; }
        public int SlNo { get; set; }
    }
}
