using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningSampleFabricDet
    {
        public int FabItemID { get; set; }
        public string FabItem { get; set; }


        public int BColorID { get; set; }
        public string BColor { get; set; }

        public int FColorID { get; set; }
        public string FColor { get; set; }


        public int SizeID { get; set; }
        public string Size { get; set; }

        public int PrintColorID { get; set; }
        public string PColor { get; set; }

        public string SampleJobNo { get; set; }
        public decimal ProgramQty { get; set; }
        public decimal BPurQty { get; set; }
        public decimal FPurQty { get; set; }
        public decimal AppQty { get; set; }
        public int SNo { get; set; }
        public int YSNo { get; set; }
        public decimal Per { get; set; }

        public int YItemID { get; set; }
        public string Yarn { get; set; }
        public int SFDetID { get; set; }
    
    }
}