using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningYarnDet
    {
        public int YplanDetID { get; set; }
        public int YPlanMasID { get; set; }
        public int Knit_In_ItemId { get; set; }
        public string Yarn { get; set; }
        public int Knit_In_SizeID { get; set; }
        public string Size { get; set; }
        public int Knit_in_ColorID { get; set; }
        public string Color { get; set; }
        public decimal Knit_In_Per { get; set; }
        public decimal Knit_In_Qty { get; set; }
        public decimal Knit_In_ActQty { get; set; }
        public decimal Loss_per { get; set; }
        public decimal OrdQty { get; set; }
        public bool Dyeing_Req { get; set; }
       // public string Fabric { get; set; }
        public int YSlNo { get; set; }
        public int FabricID { get; set; }
        public int BaseColorID { get; set; }
        public int SlNo { get; set; }
        public int CompSno { get; set; }
        public int YDSlno { get; set; }
        public int stockTrans { get; set; }



    }
}
