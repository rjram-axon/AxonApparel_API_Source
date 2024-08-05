using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessList
    {
        public int Processid { get; set; }
        public string Processname { get; set; }
        public int ProcessSeqid { get; set; }
        public int Processseqmasid { get; set; }
        public DateTime Entry_Date { get; set; }
        public int styleid { get; set; }
        public string style { get; set; }
    }
}
