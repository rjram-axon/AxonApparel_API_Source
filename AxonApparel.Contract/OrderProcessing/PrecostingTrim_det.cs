using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class PrecostingTrim_det
    {
        public int PrecostTrimmasid { get; set; }
        public int PrecostFabTrimmasid { get; set; }
        public int Itemid { get; set; }
        public string Item { get; set; }
        public int Colorid { get; set; }
        public string Color { get; set; }
        public int Sizeid { get; set; }
        public string Size { get; set; }
        public int UOMid { get; set; }
        public string UOM { get; set; }
        public int GItemid { get; set; }
        public string GItem { get; set; }
        public decimal Consumption { get; set; }
        public decimal Rate { get; set; }
        public decimal Target { get; set; }
        public string Approved { get; set; }
    }
}
