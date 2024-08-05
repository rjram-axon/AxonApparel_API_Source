using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace  AxonApparel.Domain{
    public class OrdCons_ProcSeq
    {
        public int ordconsprocessmasid { get; set; }
        public int ordconsmasid { get; set; }
        public int ordconsprocessid { get; set; }       
        public decimal ordconsprocessloss { get; set; }
        public string Process { get; set; }   
    }
}
