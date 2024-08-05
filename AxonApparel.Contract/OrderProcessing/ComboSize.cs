using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ComboSize
    {
        public int CombosizeId { get; set; }
        public int StyleRowId { get; set; }
        public int SizeId { get; set; }
        public int ComboSizeSeq { get; set; }
        public String SizeName { get; set; }
        public int Sizerow { get; set; }
    }
}
