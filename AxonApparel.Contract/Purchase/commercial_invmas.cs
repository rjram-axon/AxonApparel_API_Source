using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class commercial_invmas
    {
        public int Invmasid { get; set; }
        public Nullable<int> Companyid { get; set; }
        public string EntryNo { get; set; }
        public Nullable<System.DateTime> EntryDate { get; set; }
        public string Invoiceno { get; set; }
        public Nullable<System.DateTime> Invoicedate { get; set; }
        public Nullable<decimal> TotalAmt { get; set; }
        public Nullable<decimal> NetAmt { get; set; }
        public Nullable<int> Supplierid { get; set; }
        public string Remarks { get; set; }
        public string Company { get; set; }
        public string Supplier { get; set; }


        public Nullable<int> EmpId { get; set; }
        public Nullable<System.DateTime> BillPassDate { get; set; }
        public string Hold_Or_Ret { get; set; }
        public Nullable<bool> Passed { get; set; }
        public Nullable<bool> Paid { get; set; }
        public Nullable<int> CreatedBy { get; set; }

        public  IList<Commercial_Invdet> Commercial_Invdet { get; set; }

        public IList<CommercialInvoice_Addless> CommercialInvoice_Addless { get; set; }


    }
}
