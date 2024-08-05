using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcQltyStock
    {
        public int Proc_Qlty_Stockid { get; set; }
        public int Proc_qlty_jobDetid { get; set; }
        public int Stockid { get; set; }
        public decimal Rejectedqty { get; set; }
        public int JobRowid { get; set; }
        public int Proc_Recpt_jobdetid { get; set; }

        public int itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
        public string lotno { get; set; }
        public int processid { get; set; }
        public string process { get; set; }
        public string transno { get; set; }
        public DateTime transdate { get; set; }
        public string supplier { get; set; }
        public decimal balqty { get; set; }
    }
}
