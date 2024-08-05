using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionReceiptMainDetail
    {
        public int ReceiptId { get; set; }
        public DateTime ReceiptDate { get; set; }
        public int CompanyId { get; set; }
        public int CompanyUnitId { get; set; }
        public int ProcessId { get; set; }
        public int WorkDivId { get; set; }
        public string Company { get; set; }
        public string CompanyUnit { get; set; }
        public string ReceiptNo { get; set; }
        public string Process { get; set; }
        public string WorkDiv { get; set; }
        public string DcNumber { get; set; }
        public decimal RejQty { get; set; }
        public string JobWorkSample { get; set; }
        public string Remarks { get; set; }
        public string JobNo { get; set; }
        public string OrdNo { get; set; }
        public string RefNo { get; set; }

        public string Qlty_No { get; set; }
        public Nullable<System.DateTime> Qlty_date { get; set; }
    }
}
