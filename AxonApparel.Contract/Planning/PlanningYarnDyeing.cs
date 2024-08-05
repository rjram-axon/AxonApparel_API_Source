using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningYarnDyeing
    {
        public int YPlanDetID { get; set; }
        public int YPlanDyeID { get; set; }
        public int YPlanMasID { get; set; }
        public int SlNo { get; set; }
        public int YDSlNo { get; set; }
        public int Garment_ColorID { get; set; }
        public string GColor { get; set; }
        public decimal GWeight { get; set; }
        public int Yarn_DyeColorID { get; set; }
        public decimal Qty_Per { get; set; }
        public decimal Weight { get; set; }
        public decimal ActWeight { get; set; }
        public decimal Purchase_Qty { get; set; }
        public int Courses { get; set; }    
        public int CColorID { get; set; }
        public string CColor { get; set; }
        public decimal Loss { get; set; }
        public int ColorSeq { get; set; }
        public decimal PerWeight { get; set; }
        public int CompSlNo { get; set; }


    }

}
