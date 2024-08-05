using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class OpenDebit
    {
        public int DebitId { get; set; }
        public string DebitNo { get; set; }
        public DateTime DebitDate { get; set; }
        public int Companyid { get; set; }
        public string Company { get; set; }
        public int Partyid { get; set; }
        public string Supplier { get; set; }
        public string RefNo { get; set; }
        public DateTime RefDate { get; set; }
        public int Processid { get; set; }
        public string Process { get; set; }
        public decimal Amount { get; set; }
        public string Remarks { get; set; }
        public int voucherid { get; set; }
        public int ledgerid { get; set; }
        public string voucher { get; set; }
        public string ledger { get; set; }
        public string OpenOrOrder { get; set; }
        public string OrderType { get; set; }
        public string Order_No { get; set; }
        public int Styleid { get; set; }
        public string DebitOrCredit { get; set; }
        public int CreatedBy { get; set; }
        public string VehicleNo { get; set; }
        public decimal Addless_amount { get; set; }
        public string AddLessManualOrFormula { get; set; }
        public int CurrencyID { get; set; }
        public string Currency { get; set; }
        public decimal ExchangeRate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        public string mail { get; set; }
       
        public List<OpenDebitDet> ItemOpenDet { get; set; }
        public List<OpenDebitAddless> OpenAddless { get; set; }
    }

























}
