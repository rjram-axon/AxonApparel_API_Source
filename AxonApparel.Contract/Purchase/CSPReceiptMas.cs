using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class CSPReceiptMas
    {
        public int ReceiptID { get; set; }
        public string ReceiptNo { get; set; }
        public DateTime ReceiptDate { get; set; }
        public string RefNo { get; set; }
        public int CompanyId { get; set; }
        public string company { get; set; }
        public int Buyerid { get; set; }
        public string buyer { get; set; }
        public string OrderNo { get; set; }
        public int Styleid { get; set; }
        public string style { get; set; }
        public string Remarks { get; set; }
        public string Automated { get; set; }
        public int StoreUnitID { get; set; }
        public string DCNo { get; set; }
        public int bmasid { get; set; }
        public int QltyMode { get; set; }
        public int ParentUnitid { get; set; }
        public string Storetype { get; set; }
        public string StoreName { get; set; }

        public List<CSPReceiptDet> RecptDet { get; set; }
    }
}
