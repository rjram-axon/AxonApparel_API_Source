using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ComboItem
    {
        public int ComboitemRowId { get; set; }
        public int ComboColorId { get; set; }
        public int ComboId { get; set; }
        public int StyleRowId { get; set; }
        public int Itemseq { get; set; }
        public int ItemID { get; set; }
        public string ItemName { get; set; }
        public int ItemRatio { get; set; }
        public string Flag { get; set; }
    }
}
