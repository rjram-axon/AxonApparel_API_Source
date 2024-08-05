using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurDebitMas
    {
        public int Debit_id { get; set; }
        public int InvMasId { get; set; }
        public int companyid { get; set; }
        public string company { get; set; }
        public int company_unitid { get; set; }
        public int supplierid { get; set; }
        public int DocuID { get; set; }
        public int voucherid { get; set; }
        public int ledgerid { get; set; }
        public int CreatedBy { get; set; }
        public string Debit_no { get; set; }
        public DateTime Debit_date { get; set; }
        public string remarks { get; set; }
        public string debitcommit { get; set; }
        public string DocType { get; set; }
        public decimal Amount { get; set; }
        public string DocumentNo { get; set; }
        public string DocPrefix { get; set; }
        public string EntryType { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        public string DocuNo { get; set; }
        public DateTime DocuDate { get; set; }
        public string DcNo { get; set; }
        public DateTime DcDate { get; set; }
        public string Supplier { get; set; }
        public string mail { get; set; } 

        public List<PurDebitItemdet> PurDebItemDet { get; set; }
        public List<PurDebitOthers> PurDebOthers { get; set; }
        public List<DebitOrdDetails> PurDebOrd { get; set; }
    }
        
}
