using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanCompDetails
    {
        public int Con_PlanID { get; set; }
        public int CompSlNo { get; set; }
        public int CPlanSlNo { get; set; }
        public int PlanID { get; set; }
        public int ColorID { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public decimal Prdn_Qty { get; set; }
        public int FinishWidthID { get; set; }
        public int GreyWidthID { get; set; }
        public string FinishWidth { get; set; }
        public string GreyWidth { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Weight { get; set; }
        public decimal GSM { get; set; }
        public decimal Wmetres { get; set; }
        public decimal WtMetre { get; set; }
        public decimal Grammage { get; set; }
        public decimal ActualFabricWidth { get; set; }
        public int ItemID { get; set; }
        public decimal Requirement { get; set; }
        public decimal TotMetres { get; set; }
        public decimal TotPieces { get; set; }
        public decimal GmsPieces { get; set; }
        public string type { get; set; }
        public int No_Of_Parts { get; set; }
        public decimal AlloLen { get; set; }
        public decimal AllowWid { get; set; }
        public decimal Pattern { get; set; }
        public int CheckDcMade { get; set; }
    }
}
