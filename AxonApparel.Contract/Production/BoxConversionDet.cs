using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BoxConversionDet
    {
        public int BoxConMasId { get; set; }
        public int BoxConDetId { get; set; }
        public int StyleId { get; set; }
        public int ColorId { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public string Style { get; set; }
        public int SizeId { get; set; }
        public decimal PcsQty { get; set; }
        public decimal BoxQty { get; set; }
        public decimal Rate { get; set; }
        public decimal OldBoxQty { get; set; }
    }
}
