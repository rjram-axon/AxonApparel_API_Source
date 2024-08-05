using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class EnquiryFabric
    {
        public int MarkEnqFabricId { get; set; }
        public int EnquiryID { get; set; }
        public int FabricId { get; set; }
        public string Fabric { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int GSM { get; set; }
        public string Composition { get; set; }
        public string FabDesc { get; set; }
        public string Counts { get; set; }
    }
}
