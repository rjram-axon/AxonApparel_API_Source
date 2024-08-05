using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IPlanningConsumptionBusiness
    {
        Response<IQueryable<PlanningMain>> GetDataPlanItemDetails(int itemId, int stylerowId);
        Response<IList<PlanCompDetails>> GetDataAddItemList(int itemId, int stylerowId, string GroupingID, int CompSlNo);
        Response<bool> CreatePlanningConEntry(PlanningMain PlanConEnty);
        Response<bool> CreatePlanningConDetEntry(PlanningMain PlanConDetEnty);
        Response<bool> CreatePlanningFabDetEntry(PlanningMain FabConDetEnty);
        Response<bool> CreatePlanningYarnDetEntry(PlanningMain YarnDetEnty);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<PlanCompDetails>> GetFabricList();
        Response<IList<PlanComponent>> GetComplanList(int Itemid, int StyleRowId, int PlanID);
        Response<IList<PlanCompDetails>> GetConsumpplanList(int Itemid, int StyleRowId, int CompSNo, int PlanID);
        Response<IList<PlanCompDetails>> GetCopyConsumpplanTotList(int Itemid, int StyleRowId, int PlanID, int CopyStyRowID, int CopyItemID);
        Response<IList<PlanCompDetails>> GetConsumpplanTotList(int Itemid, int StyleRowId, int PlanID);

        //Fabric Details
        Response<IList<PlanningFabricDetails>> GetDataComFabricDetList(int Itemid, int StyleRowId, int CompSNo);
        Response<IList<PlanningFabricDetails>> GetConFabricplantotList(int PID);
        Response<IList<PlanningFabricDetails>> GetConCopyFabricplantotList(int PID, int CopyStyRowID, int CopyItemID);
        Response<IList<PlanLoss>> GetDataPlanFabricLossList(int PID, int ComSNo);

        //Yarn Details
        Response<IList<PlanningYarn>> GetDataPlanYarnList(int PID);
        Response<IList<PlanningYarnDet>> GetDataPlanYarnEditList(int PID);

        Response<IList<PlanningYarn>> GetDataPlanCopyYarnList(int PID, int CopyStyRowID, int CopyItemID);
        Response<IList<PlanningYarnDet>> GetDataPlanCopyYarnEditList(int PID, int CopyStyRowID, int CopyItemID);


        Response<IList<PlanningYarnDyeing>> GetDataPlanDyeDetList(int StyleRowId, int ItemId, int BColorId, int FabricId, int ComponentId, int YDSlNo);
        Response<IList<PlanningYarnDyeing>> GetYarnDyeingplanList(int PlId, int ItemID, int FabricID, int StyleRowID);
        Response<IList<PlanningYarnLoss>> GetDataPlanYarnLossList(int PID);

        //

        Response<bool> UpdateConEntry(PlanningMain PEntry);
        Response<bool> UpdateConDetEntry(PlanningMain PConEntry);
        Response<bool> UpdateFabDetEntry(PlanningMain PFabEntry);
        Response<bool> UpdateYarnDetEntry(PlanningMain PYEntry);
        Response<bool> BitFabSave(PlanningMain PFabEntry);
        Response<bool> BitFabUpdate(PlanningMain PFabEntry);
        Response<bool> BitFabDelete(PlanningMain PFabEntry);
        //Validate Po 
        Response<IList<Bom>> GetPoEntryCheckItemDetails(string OrdNo, int StyId);
        //
        //Validate Po 
        Response<IList<ProdPrgMas>> GetPrgEntryCheckItemDetails(int StyRowId);
        Response<IQueryable<Domain.PlanningMain>> GetStyleNo(string orderno);
        //


        //Statement
        Response<IQueryable<Domain.PlanningMain>> FabRequirementRpt(int compid, int buyerid, string ordno, int styleid, string fromdate, string todate);
        Response<IQueryable<Domain.PlanningMain>> PlanningRpt(int compid, int buyerid, string ordno, int styleid, string ordtype, string buyrefno, string itmtype,string DtType, string fromdate, string todate);
        Response<IQueryable<Domain.PlanningMain>> DetailCostingRpt(int compid, int buyerid, int seasonid, int itmgrpid, string ordno, int styleid, string ordtype, string refno, string wrkord, string itmtype, string fromdate, string todate);

        //Validate Po 
        Response<IList<Bom>> GetPoEntryIndCheckItemDetails(string OrdNo, int StyId, int ItmId, int ColorId, int SizeId);
        Response<bool> CreatePrintEntry(PlanningMain PlanPrintEnty);
        Response<IQueryable<PlanningMain>> GetPrintCheck(int Id);
        Response<IQueryable<Domain.PlanningMain>> LoadProcess(int GItemId, int StyRowId, string BmasId);
        Response<IQueryable<Domain.PlanningMain>> LoadYarn(int GItemId, int StyRowId, string BmasId);
        Response<IQueryable<Domain.PlanningMain>> LoadFabric(int GItemId, int StyRowId, string BmasId);
        Response<IQueryable<Domain.PlanningMain>> LoadBusCopyOrder(string OrderNo);
        Response<IQueryable<Domain.OrdCons_Mas>> GetMeasureName(int GItemId, int StyRowId, int BmasId);
        Response<IQueryable<Domain.PlanningMain>> LoadEntrystatus(string Ordno, int Styleid, int Itmid);

        Response<IList<PlanningFabricDetails>> GetConFabricBStockList(int FabricID, int BColorID, int GreyWidthID);
        Response<IList<PlanningFabricDetails>> GetConFabricFStockList(int FabricID, int FColorID, int FinishWidthID);
        Response<IList<PlanningFabricDetails>> LoadStockDetails(int Itemid, int Sizeid, int Colorid);

        Response<IList<Domain.PlanningMain>> LoadPurYarnDetails(int Planid);
        Response<IList<Domain.PlanningMain>> LoadFabDetails(int Planid);
        Response<IList<Domain.PlanningMain>> LoadFabPurDetails(int Planid);
        Response<IList<Domain.PlanningMain>> LoadYarnPOQtyDetails(int Planid);
        Response<IList<Domain.PlanningMain>> LoadAmendDetails(int Stylerowid, string jmasid, string Workordno);
        Response<IList<Domain.PlanningMain>> GetBalQty(string OrderNo, int Itemid, int Colorid, int Sizeid);
    }
}
