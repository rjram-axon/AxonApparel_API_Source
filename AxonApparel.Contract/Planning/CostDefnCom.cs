using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class CostDefnCom
    {
        public int Cost_Defn_id { get; set; }
        public string cost_defn_no { get; set; }
        public int Cost_Defn_COMid { get; set; }
        public int Particularid { get; set; }
        public decimal Cost { get; set; }
        public string Type { get; set; }
        public decimal Value { get; set; }
        public string Remarks { get; set; }
        public string CostType { get; set; }
        public decimal AppCost { get; set; }
        public decimal Actual_Cost { get; set; }
        public decimal FirstRate { get; set; }
    }
}
