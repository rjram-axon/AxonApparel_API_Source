using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningMain
    {
        public int PlanID { get; set; }
        public int CompanyID { get; set; }
        public int BMasID { get; set; }
        public int StyleID { get; set; }

        public int ItemID { get; set; }
        public int CreatedBy { get; set; }
        public int LockCon { get; set; }
        public int LockFab { get; set; }
        public int LockYarn { get; set; }
        public int LockAccs { get; set; }
        public int LockPack { get; set; }
        public string Order_No { get; set; }
        public string Job_Ord_No { get; set; }
        public string Con_Plan { get; set; }
        public string Fabric_Plan { get; set; }
        public string Yarn_Plan { get; set; }
        public string Acc_Plan { get; set; }
        public string Pack_Plan { get; set; }
        public string Fab_plan_Remarks { get; set; }
        public string IsApproved { get; set; }
        public bool LockPlanning { get; set; }
        public DateTime EDate { get; set; }
        public int GUomID { get; set; }
        public int GUomCon { get; set; }
        public string GUom { get; set; }
        public string Type { get; set; }
        public int CostDefId { get; set; }
        public decimal Bal_Stk_Qty { get; set; }
        public string OrderType { get; set; }

        //main list 
        //  public int companyid { get; set; }
        public string Company { get; set; }
        public string CLookup { get; set; }
        public int buyerid { get; set; }
        public string buyer { get; set; }
        public string buyer_lookup { get; set; }
        public string City { get; set; }
        //  public string order_no { get; set; }
        public DateTime Order_date { get; set; }
        public string Ref_no { get; set; }
        public string Style { get; set; }
        public string Despatch_Closed { get; set; }
        public int StyleRowid { get; set; }
        // public int Styleid { get; set; }
        public decimal Quantity { get; set; }
        public int ProductionQty { get; set; }
        public int OrderQty { get; set; }
        public int TID { get; set; }
        public int merchandiserid { get; set; }
        public decimal ORDQuantity { get; set; }

        public string PA { get; set; }

        public int PlanApp { get; set; }
        public int CostApp { get; set; }
        public decimal StyleRate { get; set; }
        public string DocumentNo { get; set; }
        //AddList

        public string Item { get; set; }

        //Process Seq
        public int ProSeq { get; set; }

        public decimal TProgQty { get; set; }
        public int ProdAmend { get; set; }
        public string PrgThr { get; set; }
        public string Mode { get; set; }
        public string ComAmend { get; set; }
        public string FabAmend { get; set; }
        public string YarnAmend { get; set; }
        //component
        public List<PlanComponent> CompoItemMas { get; set; }
        public List<PlanCompDetails> CompoItemDetails { get; set; }



        //Fabric

        public List<PlanningFabricDetails> PlanFabricDet { get; set; }
        //public List<PlanningFabricDetails> PlanConDet { get; set; }
        //public List<PlanningFabric> PlanFabric { get; set; }
        public List<PlanLoss> PlanLoss { get; set; }

        //Yarn

        public List<PlanningYarn> PlanYarn { get; set; }
        public List<PlanningYarnDyeing> PlanYarnDyeing { get; set; }
        public List<PlanningYarnLoss> PlanYarnLoss { get; set; }
        public List<PlanningYarnDet> PlanYarnDet { get; set; }
        public List<PlanningYarn> PlanYarnN { get; set; }

        public string PrintName { get; set; }
        public int PrintUserId { get; set; }
        public decimal ProcessLoss { get; set; }
        public string Process { get; set; }
        public int Processid { get; set; }
        public string Yarn { get; set; }
        public int YarnId { get; set; }
        public string fabric { get; set; }
        public int FabricId { get; set; }
        public decimal OrdMeasAvg { get; set; }
        public int CopyItemID { get; set; }
        public int CopyStyRowID { get; set; }


        public string CurrName { get; set; }
        public decimal ExRate { get; set; }
        public decimal Price { get; set; }
        public int CurrId { get; set; }

        public int FabricColorid { get; set; }
        public int FabricSizeid { get; set; }
        public string FabricColor { get; set; }
        public string FabricSize { get; set; }

        public string Bit_Plan { get; set; }
        public string BitAmend { get; set; }
        public Nullable<int> LockBit { get; set; }
        public int Pur_UOMid { get; set; }
        public string PurType { get; set; }
    }
}
