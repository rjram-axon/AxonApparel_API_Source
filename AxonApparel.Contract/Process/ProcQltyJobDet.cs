using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcQltyJobDet
    {
        public int Proc_qlty_jobDetid { get; set; }
        public int Proc_qlty_Masid { get; set; }
        public int Proc_qlty_Detid { get; set; }
        public int Proc_Recpt_jobDetid { get; set; }
        public int Proc_Recpt_Detid { get; set; }
        public decimal DebitQty { get; set; }
        public decimal AcptQty { get; set; }
        public int DbtProcessId { get; set; }
        public int DbtProcessorId { get; set; }

        public int itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public int uomid { get; set; }
        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public string lotno { get; set; }
        public string jobordno { get; set; }
        public string prodprgno { get; set; }
        public string procordno { get; set; }
        public decimal Recvdqty { get; set; }
        public decimal Rate { get; set; }
        public decimal DRate { get; set; }
        public decimal Amount { get; set; }
        public int sno { get; set; }
    }
}
