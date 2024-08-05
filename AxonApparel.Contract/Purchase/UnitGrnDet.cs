using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class UnitGrnDet
    {
        public int Unit_GRN_Detid { get; set; }
        public int Unit_GRN_Masid { get; set; }
        public int itemid { get; set; }
        public string item { get; set; }
        public int Colorid { get; set; }
        public string color { get; set; }
        public int Sizeid { get; set; }
        public string size { get; set; }
        public int UOMid { get; set; }
        public string uom { get; set; }
        public decimal RecptQty { get; set; }
        public long sno { get; set; }
        public decimal returnqty { get; set; }
        public string ProgOrManual { get; set; }
        public int Supplierid { get; set; }
        public string supplier { get; set; }
        public decimal SecQty { get; set; }
        public string ItemRemarks { get; set; }
        public decimal Rate { get; set; }
        public int itmgrpid { get; set; }
        public string itmgrp { get; set; }
        public decimal balqty { get; set; }
        public decimal recvdqty { get; set; }
        public decimal prgqty { get; set; }
    }
}
