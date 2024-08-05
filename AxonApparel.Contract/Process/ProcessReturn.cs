using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessReturn
    {
        public int processid { get; set; }
        public string process { get; set; }
        public int supplierid { get; set; }
        public string supplier { get; set; }
        public int buyerid { get; set; }
        public string buyer { get; set; }
        public int bmasid { get; set; }
        public string orderno { get; set; }
        public string refno { get; set; }
        public int StyleId { get; set; }
        public string Style { get; set; }

        public int procordid { get; set; }
        public string prodord { get; set; }
        public int processorid { get; set; }
        public string processor { get; set; }
        public decimal orderqty { get; set; }
        public decimal bal { get; set; }
        public decimal issued { get; set; }
        public DateTime procdate { get; set; }
        public int cmpid { get; set; }
        public string cmp { get; set; }
        public int colorid { get; set; }
        public string color { get; set; }
        public int cmpunitid { get; set; }
        public string cmpunit { get; set; }
    }
}
