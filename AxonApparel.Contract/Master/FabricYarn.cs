using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class FabricYarn
    {
        public int FabricYarnmasid { get; set; }
        public int Fabricmasid { get; set; }
        public int Yarnid { get; set; }
        public string Yarn { get; set; }
        public int Countid { get; set; }
        public string Count { get; set; }
        public int Colorid { get; set; }
        public string Color { get; set; }
        public decimal Percentage { get; set; }

    }
}
