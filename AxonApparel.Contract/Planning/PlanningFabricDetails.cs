using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningFabricDetails
    {
        public int Con_PlanID { get; set; }
        public int CompSlNo { get; set; }
        public int CPlanSlNo { get; set; }
        public int PlanID { get; set; }
        public int ColorID { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int Prdn_Qty { get; set; }
        public int FinishWidthID { get; set; }
        public int GreyWidthID { get; set; }
        public string FinishWidth { get; set; }
        public string GreyWidth { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Weight { get; set; }
        public decimal ActWeight { get; set; }
        public decimal GSM { get; set; }
        public decimal Wmetres { get; set; }
        public int Grammage { get; set; }
        public decimal ActualFabricWidth { get; set; }
        public int FabricID { get; set; }
        public string Fabric { get; set; }
        public int FabUomID { get; set; }
        public int SizeRow { get; set; }
        public int BColorID { get; set; }
        public string Bcolor { get; set; }
        public int FColorID { get; set; }
        public string Fcolor { get; set; }
        public int PColorID { get; set; }
        public string PColor { get; set; }
        public decimal BColorPQty { get; set; }
        public decimal FColorPQty { get; set; }
        public string FGsm { get; set; }
        public string KGsm { get; set; }
        public DateTime EntryDate { get; set; }
        public string FabricType { get; set; }
        public int FPlanId { get; set; }
        public decimal Woven_Req_InMtrs { get; set; }
        public int LossGain { get; set; }
        public int snumb { get; set; }
        public string type { get; set; }

        public string LoopLen { get; set; }
        public string texture { get; set; }
        public string content { get; set; }
        public string guage { get; set; }
        public int CheckDcMade { get; set; }

        //Stock Load

        public string STransno { get; set; }
        public string SOrderno { get; set; }
        public string SRefno { get; set; }
        public string WorkOrdNo { get; set; }
        public string SProcess { get; set; }
        public string SSupplier { get; set; }
        public decimal StockQty { get; set; }
        public int StkSlno { get; set; }
        public string SStyle { get; set; }
        public string SDespatch { get; set; }

        public decimal StockMarkUPRate { get; set; }
        public decimal StockValue { get; set; }
        public decimal StockAge { get; set; }
        public int SStockid { get; set; }

    
        public string BitItem { get; set; }
        public string BitSize { get; set; }
        public Nullable<decimal> PiecePerBit { get; set; }
        public Nullable<int> BitSizeId { get; set; }
        public Nullable<int> BitItemId { get; set; }
        public Nullable<decimal> TotalBit { get; set; }
    }
}
