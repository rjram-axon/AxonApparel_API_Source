using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ComboColor
    {
        public int CombocolorId { get; set; }
        public int StyleRowId { get; set; }
        public int ComboSeq { get; set; }
        public int ComboId { get; set; }
        public string ComboName { get; set; }
        public int ColorSeq { get; set; }
        public int ColorId { get; set; }
        public string ColorName { get; set; }
        public int ColorRatio { get; set; }
        public decimal ComboPer { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int ComboQty { get; set; }
        public string Flag { get; set; }
    }
}
