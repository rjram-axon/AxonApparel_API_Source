using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  
    public class Bill_Adj_mas
    {
        public string Trans_Type { get; set; }
        public string Trans_No { get; set; }
        public Nullable<System.DateTime> Trans_Date { get; set; }
        public Nullable<int> Supplierid { get; set; }
        public string Type { get; set; }
        public string Cheque_No { get; set; }
        public Nullable<System.DateTime> Cheque_Date { get; set; }
        public Nullable<decimal> Cheque_Amt { get; set; }
        public string Remarks { get; set; }
        public string Narration { get; set; }
        public Nullable<int> Bankid { get; set; }
        public Nullable<int> Companyid { get; set; }
        public int Trans_masid { get; set; }
        public Nullable<decimal> Advance_Amt { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public List<Bill_Adj_det> Det { get; set; }
        public string Mode { get; set; }

        public string Company { get; set; }
        public string Supplier { get; set; }
    }
}
