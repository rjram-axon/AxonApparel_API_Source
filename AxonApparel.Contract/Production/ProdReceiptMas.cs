using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProdReceiptMas
    {
        public int Receiptid { get; set; }
        public string ReceiptNo { get; set; }
        public DateTime ReceiptDate { get; set; }
        public DateTime ReRefDate { get; set; }
        public int CompanyId { get; set; }
        public int CompanyUnitId { get; set; }
        public int ProcessId { get; set; }
        public int WorkDivisionId { get; set; }
        public string Remarks { get; set; }
        public string JobWrkSample { get; set; }
        public string DcNumber { get; set; }
        public string InterorExter { get; set; }
        public string RecptType { get; set; }
        public int CreatedBy { get; set; }
        public string Processor { get; set; }
        public int ParentUnitid { get; set; }
        public string Storetype { get; set; }
        public int StoreUnitID { get; set; }
        public string StoreName { get; set; }

        public string Qlty_No { get; set; }
        public Nullable<System.DateTime> Qlty_date { get; set; }
        public string QltyRemarks { get; set; }

        public string Type { get; set; }
        public int Mod { get; set; }


        public List<ProdReceiptDet> ProdReceiptDet { get; set; }
        public List<ProdReceiptReason> ProdReceiptReason { get; set; }
        
    }
}
