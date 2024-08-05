using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IPlanningConsumptionRepository
    {

        //int AddData(Planning_Mas objPlan);
        IQueryable<PlanningMain> GetDataPlanItemDetails(int ItemId,int StyleRowId);
        IQueryable<PlanCompDetails> Getfabricdet();
        IList<PlanCompDetails> GetDataCompItemDetails(int ItemId, int StyleRowId, string GroupId, int ClNo);
        //bool AddDetData(List<Comp_Plan_Mas> objPDet);
        bool AddDetConItemData(Planning_Mas objPlan, List<Comp_Plan_Mas> objPCMDet, List<Con_Plan> objPconDet, List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet, string PrgThr, string Mode, List<Yarn_Plan_Mas> objPYDet, List<Yarn_Plan_Det> objPYDDet, List<Yarn_Plan_ProLoss> objPYLDet, List<Yarn_Plan_Dyeing> objPDyet);
        bool AddDetConsumDetItemData(Planning_Mas objcPlan, List<Comp_Plan_Mas> objPcCMDet, List<Con_Plan> objPcconDet, string PrgThr, string Mode);
        bool AddDetFabItemData(Planning_Mas objFabPlan,List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet);
        bool AddDetYarnItemData(Planning_Mas objYnPlan, List<Yarn_Plan_Mas> objPYDet, List<Yarn_Plan_Det> objPYDDet, List<Yarn_Plan_ProLoss> objPYLDet, List<Yarn_Plan_Dyeing> objPDyet);
        bool AmendData(Planning_Mas objPlan, List<Comp_Plan_Mas> objPCMDet, List<Con_Plan> objPconDet, List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet, string PrgThr, string Mode, List<Yarn_Plan_Mas> objPYDet, List<Yarn_Plan_Det> objPYDDet, List<Yarn_Plan_ProLoss> objPYLDet, List<Yarn_Plan_Dyeing> objPDyet);

        
        //bool AddDetConItemData(Con_Plan objPconDet);
        IList<PlanComponent> GetRepCompDetList(int itemId, int StyleRowId, int PlanID);
        IList<PlanCompDetails> GetRepConDetList(int itemId, int StyleRowId, int CompSNo, int PlanID);
        IList<PlanCompDetails> GetRepConDetTotList(int itemId, int StyleRowId, int PlanID);
        IList<PlanCompDetails> GetRepCopyConDetTotList(int itemId, int StyleRowId, int PlanID, int CopyStyRowID, int CopyItemID);
        IList<PlanLoss> GetCompDetFabricLossDetails(int PId, int ComSNo);
        //bool UpdateData(Planning_Mas objAd);
        //bool UpdateDetData(List<Comp_Plan_Mas> objAdDet);
        bool UpdateConDetData(Planning_Mas objCAd, List<Comp_Plan_Mas> objPCMDet, List<Con_Plan> objPconDet, List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet, string PrgThr, string Mode, List<Yarn_Plan_Mas> objPYDet, List<Yarn_Plan_Det> objPYDDet, List<Yarn_Plan_ProLoss> objPYLDet, List<Yarn_Plan_Dyeing> objPDyet);
        bool UpdateConSumDetData(Planning_Mas objCEAd, List<Comp_Plan_Mas> objPECMDet, List<Con_Plan> objPEconDet, string PrgThr, string Mode);
        bool UpdateFabDetData(Planning_Mas objFEAd, List<Fabric_Plan> objFPDet, List<Fab_Plan_ProLoss> objPFLDet, string PrgThr, string Mode);
        bool UpdateYarnDetData(Planning_Mas objYEAd, List<Yarn_Plan_Mas> objPYDet, List<Yarn_Plan_Det> objPYDDet, List<Yarn_Plan_ProLoss> objPYLDet, List<Yarn_Plan_Dyeing> objPDyet);
        bool BitFabSave(Planning_Mas objFEAd, List<Fabric_Plan> objFPDet, string PrgThr, string Mode);
        bool BitFabUpdate(Planning_Mas objFEAd, List<Fabric_Plan> objFPDet, string PrgThr, string Mode);
        bool BitFabDelete(Planning_Mas objFEAd, List<Fabric_Plan> objFPDet, string PrgThr, string Mode);
        //Fabric 
        IList<PlanningFabricDetails> GetCompFabricPlanList(int Itemid, int StyleRowId, int CompSNo);
        IList<PlanningFabricDetails> GetConFabricPlantotList(int PId);
        IList<PlanningFabricDetails> GetConCopyFabricPlantotList(int PId, int CopyStyRowID, int CopyItemID);
        //
        //Yarn
        IList<PlanningYarn> GetFabricItemDetails(int PId);
        IList<PlanningYarnDet> GetEditYarnDetDetails(int PId);

        IList<PlanningYarn> GetFabricCopyItemDetails(int PId, int CopyStyRowID, int CopyItemID);
        IList<PlanningYarnDet> GetEditCopyYarnDetDetails(int PId, int CopyStyRowID, int CopyItemID);
        IList<PlanningYarnDyeing> GetDyeingItemDetails(int StyleRowId, int ItemId, int BColorId, int FabricId,int CompId, int YDSlNo);
        IList<PlanningYarnDyeing> GetYarnDyeingRepList(int PId, int IteID, int FabID, int StRowID);
        IList<PlanningYarnLoss> GetCompDetYarnLossDetails(int PId);
        //
        IList<Bom> GetDataRepCheckPoDetails(string OrdNo, int StyId);
        IList<ProdPrgMas> GetDataRepCheckPrgDetails(int StyRowId);
        IQueryable<Domain.PlanningMain> GetStyleNo(string orderno);


        //Statement
        IQueryable<Domain.PlanningMain> FabRequirementRpt(int compid, int buyerid, string ordno, int styleid, string fromdate, string todate);
        IQueryable<Domain.PlanningMain> PlanningRpt(int compid, int buyerid, string ordno, int styleid, string ordtype, string buyrefno, string itmtype,string DtType, string fromdate, string todate);
        IQueryable<Domain.PlanningMain> DetailCostingRpt(int compid, int buyerid, int seasonid, int itmgrpid, string ordno, int styleid, string ordtype, string refno, string wrkord, string itmtype, string fromdate, string todate);
        IList<Bom> GetDataRepCheckPoIndDetails(string OrdNo, int StyId,int Itmid,int Colorid,int Sizeid);

        bool PrintAdd(User_Print_Log objPrintAd,int Stylerowid);
        IQueryable<PlanningMain> GetDataPrintCheckDetails(int Id);
        IQueryable<PlanningMain> LoadProcess(int GItemId, int StyRowId, string BmasId);
        IQueryable<PlanningMain> LoadYarn(int GItemId, int StyRowId, string BmasId);
        IQueryable<PlanningMain> LoadFabric(int GItemId, int StyRowId, string BmasId);
        IQueryable<PlanningMain> LoadCopyOrder(string OrderNo);
        IQueryable<Domain.OrdCons_Mas> LoadMeasRepFabric(int GItemId, int StyRowId, int BmasId);
        IQueryable<Domain.PlanningMain> LoadEntrystatus(string Ordno, int Styleid, int Itmid);

        IList<PlanningFabricDetails> GetConRepFabricBStockList(int FabricID, int BColorID, int GreyWidthID);
        IList<PlanningFabricDetails> GetConRepFabricFStockList(int FabricID, int FColorID, int FinishWidthID);
        IList<PlanningFabricDetails> LoadStockDetails(int Itemid, int Sizeid, int Colorid);
        IList<Domain.PlanningMain> LoadPurYarnDetails(int Planid);
        IList<Domain.PlanningMain> LoadFabDetails(int Planid);
        IList<Domain.PlanningMain> LoadFabPurDetails(int Planid);
        IList<Domain.PlanningMain> LoadYarnPOQtyDetails(int Planid);
        IList<Domain.PlanningMain> LoadAmendDetails(int Stylerowid, string jmasid, string Workordno);
        IList<Domain.PlanningMain> GetBalQty(string OrderNo, int Itemid, int Colorid, int Sizeid);
    }
}
