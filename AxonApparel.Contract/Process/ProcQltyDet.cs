using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcQltyDet
    {
        public int Proc_qlty_Masid { get; set; }
        public int Proc_Qlty_detid { get; set; }
        public int itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public int uomid { get; set; }
        public decimal DebitQty { get; set; }
        public decimal AcptQty { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }
        public int Prod_Recpt_detid { get; set; }
        public int Proc_Recpt_jobDetid { get; set; }
        public decimal Debit_Rate { get; set; }
        public decimal ReProQty { get; set; }
        public string CTransNo { get; set; }
        public int CTransId { get; set; }
    }
}
