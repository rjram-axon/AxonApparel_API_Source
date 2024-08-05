using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class BillEntry
    {
        public int BillID { get; set; }
        public int CompanyID { get; set; }
        public int CreatedBy { get; set; }
        public string company { get; set; }
        public string BillNo { get; set; }
        public DateTime BillDate { get; set; }
        public string SupBillNo { get; set; }
        public DateTime SupBillDate { get; set; }
        public int SupplierID { get; set; }
        public string supplier { get; set; }
        public string Pur_Type { get; set; }
        public string Order_Type { get; set; }
        public decimal Amount { get; set; }
        public int CurrencyID { get; set; }
        public string currency { get; set; }
        public decimal ExchangeRate { get; set; }
        public string Remarks { get; set; }
        public string IsInvoiced { get; set; }
        public string InvoiceNo { get; set; }
        public string department { get; set; }
        public string SupplierType { get; set; }
    }
}
