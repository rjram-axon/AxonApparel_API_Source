using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  
    public class Bill_Adj_det
    {
        public int Trans_Detid { get; set; }
        public Nullable<int> Trans_Masid { get; set; }
        public string Type { get; set; }
        public Nullable<int> Pur_Inv_Id { get; set; }
        public Nullable<decimal> Inv_Amount { get; set; }
        public Nullable<decimal> Adj_Amt { get; set; }

        public Nullable<decimal> BalanceAmount { get; set; }
        public string InvoiceNo { get; set; }
        public string InvoiceDate { get;set;}
        public string SupplierInvoiceNo { get; set; }
    }
}
