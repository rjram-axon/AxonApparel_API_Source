using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ColorMaster
    {
        public string ColorName { get; set; }
        public int ColorId { get; set; }
        public string Lookup { get; set; }
        public int ColorGroupId { get; set; }
        public string ColorGroupName { get; set; }
        public string IsActive { get; set; }
        public string ColorCode { get; set; }
        public string Pantone { get; set; }
        public string ColorNo { get; set; }
        public int CountColorId { get; set; }
    }
}
