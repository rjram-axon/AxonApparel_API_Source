using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ComboItemComposition
    {
        public int RowId { get; set; }
        public int ComboItemRowId { get; set; }
        public int StyleRowId { get; set; }
        public int ColorSeq { get; set; }
        public int ColorID { get; set; }
        public string ColorName { get; set; }
        public string Flag { get; set; }
        public string Itemname { get; set; }
    }
}
