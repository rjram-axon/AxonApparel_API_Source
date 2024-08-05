using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class PrecostFabDept_Yarn
    {
        public int PreCostFabDeptYarnmasid { get; set; }
        public int PreCostFabDeptmasid { get; set; }
        //public int PreCostFabDeptFabmasid { get; set; }
        public int Fabricid { get; set; }
        public int  Yarnid { get; set; }
        public int Countid { get; set; }
        public int Colorid { get; set; }
        public decimal Percentage { get; set; }
        public decimal Rate { get; set; }
        public string Type { get; set; }
        public string Yarn { get; set; }
        public int FabSlno { get; set; }
        public string Count { get; set; }
       
        public string Color { get; set; }
        public int PreCostFabDeptFabmasid { get; set; }
    }
}
