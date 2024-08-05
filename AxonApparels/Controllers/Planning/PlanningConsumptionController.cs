using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;
namespace AxonApparels.Controllers.Planning
{
    public class PlanningConsumptionController : Controller
    {
        //
        // GET: /PlanningConsumption/
        IPlanningConsumptionBusiness oblPI = new PlanningConsumptionBusiness();

        public ActionResult PlanningConsumptionIndex()
        {
            return View();
        }
        public JsonResult GetPlanItemDetails(int ItemId, int StyleRowId)
        {

            return Json(oblPI.GetDataPlanItemDetails(ItemId, StyleRowId), JsonRequestBehavior.AllowGet);

        }

        public ActionResult ListPlanningComp(int ItemId, int StyleRowId, string GroupId, int CompSlNo)        
        {

            //var getConDetails = oblPI.GetDataAddItemList(ItemId, StyleRowId, GroupId, CompSlNo).Value.ToList();
            //return Json(getConDetails, JsonRequestBehavior.AllowGet);


            var getDetails = oblPI.GetDataAddItemList(ItemId, StyleRowId, GroupId, CompSlNo).Value.ToList();
            var jsonResult = Json(getDetails, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public ActionResult ListPlanningCompAvg(int ItemId, int StyleRowId, string GroupId, int CompSlNo)
        {

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = oblPI.GetDataAddItemList(ItemId, StyleRowId, GroupId, CompSlNo).Value.ToList();
                if (result == null || result == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);


                foreach (PlanCompDetails App in result)
                {

                    sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.Prdn_Qty, App.CPlanSlNo, App.CompSlNo);
                }

                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                var obj = new { tableValue = tableValue, Data = result };
                return Json(new { data = obj }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult Add(PlanningMain ObjPlanE)
        {
            var result = oblPI.CreatePlanningConEntry(ObjPlanE);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ConAdd(PlanningMain ObjPlanCon)
        {
            var result = oblPI.CreatePlanningConDetEntry(ObjPlanCon);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult FabSave(PlanningMain ObjPlanFab)
        {
            var result = oblPI.CreatePlanningFabDetEntry(ObjPlanFab);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult YarnAdd(PlanningMain ObjPlanYarn)
        {
            var result = oblPI.CreatePlanningYarnDetEntry(ObjPlanYarn);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStyleNumber(string OrdNo)
        {
            return Json(oblPI.GetStyleNo(OrdNo), JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListCompDetDetails(int PItemId, int StyleRowId,int PlanID)
        {
            var getCompDetails = oblPI.GetComplanList(PItemId, StyleRowId, PlanID).Value.ToList();        
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListConDetDetails(int PItemId, int StyleRowId, int CompSNo, int PlanID)
        {

            var getEditConDetails = oblPI.GetConsumpplanList(PItemId, StyleRowId, CompSNo, PlanID).Value.ToList();
            return Json(getEditConDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult TotListConDetDetails(int PItemId, int StyleRowId, int PlanID)
        {

            var getEditConDetails = oblPI.GetConsumpplanTotList(PItemId, StyleRowId, PlanID).Value.ToList();
            return Json(getEditConDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult TotListCopyConDetDetails(int PItemId, int StyleRowId, int PlanID, int CopyStyRowID, int CopyItemID)
        {

            var getEditConDetails = oblPI.GetCopyConsumpplanTotList(PItemId, StyleRowId, PlanID, CopyStyRowID, CopyItemID).Value.ToList();
            return Json(getEditConDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PlanningMain ObjPUEn)
        {
            return Json(oblPI.UpdateConEntry(ObjPUEn), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConUpdate(PlanningMain ObjPUCEn)
        {
            return Json(oblPI.UpdateConDetEntry(ObjPUCEn), JsonRequestBehavior.AllowGet);
        }
        public JsonResult FabUpdate(PlanningMain ObjPUFEn)
        {
            return Json(oblPI.UpdateFabDetEntry(ObjPUFEn), JsonRequestBehavior.AllowGet);
        }
        public JsonResult YarnUpdate(PlanningMain ObjPUYEn)
        {
            return Json(oblPI.UpdateYarnDetEntry(ObjPUYEn), JsonRequestBehavior.AllowGet);
        }

        public JsonResult BitFabSave(PlanningMain ObjPUFEn)
        {
            return Json(oblPI.BitFabSave(ObjPUFEn), JsonRequestBehavior.AllowGet);
        }

        public JsonResult BitFabUpdate(PlanningMain ObjPUFEn)
        {
            return Json(oblPI.BitFabUpdate(ObjPUFEn), JsonRequestBehavior.AllowGet);
        }
        public JsonResult BitFabDelete(PlanningMain ObjPUFEn)
        {
            return Json(oblPI.BitFabDelete(ObjPUFEn), JsonRequestBehavior.AllowGet);
        }


        public ActionResult FabricList()
        {
            var getDetails = oblPI.GetFabricList().Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListFabCompDetails(int PItemId, int StyleRowId, int CompSlNo)
        {

            var getFabAddDetails = oblPI.GetDataComFabricDetList(PItemId, StyleRowId, CompSlNo).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListConFabricEdittotDetails(int PlanID)
        {
            var getFabAddDetails = oblPI.GetConFabricplantotList(PlanID).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListConCopyFabricEdittotDetails(int PlanID, int CopyStyRowID, int CopyItemID)
        {
            var getFabAddDetails = oblPI.GetConCopyFabricplantotList(PlanID, CopyStyRowID, CopyItemID).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListPlanningFabricYarn(int PlanID)
        {                      
            var getYarnEditDetails = oblPI.GetDataPlanYarnList(PlanID).Value.ToList();
            return Json(getYarnEditDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListYarnEditDetDetails(int PlanID)
        {
            var getYarnDetails = oblPI.GetDataPlanYarnEditList(PlanID).Value.ToList();
            return Json(getYarnDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListPlanningCopyFabricYarn(int PlanID, int CopyStyRowID, int CopyItemID)
        {
            var getYarnEditDetails = oblPI.GetDataPlanCopyYarnList(PlanID, CopyStyRowID, CopyItemID).Value.ToList();
            return Json(getYarnEditDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListYarnEditDetDetailsCopy(int PlanID, int CopyStyRowID, int CopyItemID)
        {
            var getYarnDetails = oblPI.GetDataPlanCopyYarnEditList(PlanID, CopyStyRowID, CopyItemID).Value.ToList();
            return Json(getYarnDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadCheckPoMadeDetails(string Orderno, int Styleid)
        {
            var getDetails = oblPI.GetPoEntryCheckItemDetails(Orderno, Styleid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListPlanningFabricYarnDyeingDetails(int StyleRowId, int ItemId, int BColorId, int FabricId,int ComponentId, int YSlno)
        {

            var getYarnDyeAddDetails = oblPI.GetDataPlanDyeDetList(StyleRowId, ItemId, BColorId, FabricId,ComponentId, YSlno).Value.ToList();
            return Json(getYarnDyeAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListCompFabricLossDetails(int PlanID, int CNo)
        {

            var getLossDetails = oblPI.GetDataPlanFabricLossList(PlanID, CNo).Value.ToList();
            return Json(getLossDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListYarnDyeingEditDetails(int PlId, int ItemID, int FabricID, int StyleRowID)
        {

            var getYarnDyeEditDetails = oblPI.GetYarnDyeingplanList(PlId, ItemID, FabricID, StyleRowID).Value.ToList();
            return Json(getYarnDyeEditDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListCompYarnLossDetails(int PlanID)
        {

            var getLossDetails = oblPI.GetDataPlanYarnLossList(PlanID).Value.ToList();
            return Json(getLossDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadCheckPrgMadeDetails(int StyleRowid)
        {
            var getDetails = oblPI.GetPrgEntryCheckItemDetails(StyleRowid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult FabRequirementRpt(int compid, int buyerid, string ordno, int styleid, string fromdate, string todate)
        {
            var getDetails = oblPI.FabRequirementRpt(compid, buyerid, ordno, styleid, fromdate, todate).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult PlanningRpt(int compid, int buyerid, string ordno, int styleid, string ordtype, string buyrefno, string itmtype,string DtType, string fromdate, string todate)
        {
            var getDetails = oblPI.PlanningRpt(compid, buyerid, ordno, styleid, ordtype, buyrefno, itmtype, DtType, fromdate, todate).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DetailCostingRpt(int compid, int buyerid, int seasonid, int itmgrpid, string ordno, int styleid, string ordtype, string refno, string wrkord, string itmtype, string fromdate, string todate)
        {
            var getDetails = oblPI.DetailCostingRpt(compid, buyerid, seasonid, itmgrpid, ordno, styleid, ordtype, refno, wrkord, itmtype, fromdate, todate).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadCheckPoMadeEntryDetails(string Orderno, int Styleid, int Itemid, int Colorid, int Sizeid)
        {
            var getDetails = oblPI.GetPoEntryIndCheckItemDetails(Orderno, Styleid, Itemid, Colorid, Sizeid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult PrintInsert(PlanningMain ObjPlanP)
        {
          
            var result = oblPI.CreatePrintEntry(ObjPlanP);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PrintCheck(int StyleRowId)
        {

            return Json(oblPI.GetPrintCheck(StyleRowId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadProcess(int GItemId,int StyRowId,string BmasId)
        {

            return Json(oblPI.LoadProcess(GItemId, StyRowId, BmasId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadYarn(int GItemId, int StyRowId, string BmasId)
        {

            return Json(oblPI.LoadYarn(GItemId, StyRowId, BmasId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadFabric(int GItemId, int StyRowId, string BmasId)
        {

            return Json(oblPI.LoadFabric(GItemId, StyRowId, BmasId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetbyMeasureAvg(int GItemId, int StyRowId, int BmasId)
        {
            return Json(oblPI.GetMeasureName(GItemId, StyRowId, BmasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadCopyOrderNo(string Orderno)
        {

            return Json(oblPI.LoadBusCopyOrder(Orderno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEntrystatus(string Ordno, int Styleid,int Itmid)
        {
            return Json(oblPI.LoadEntrystatus( Ordno, Styleid, Itmid), JsonRequestBehavior.AllowGet);
        }
       
        public ActionResult LoadStockBaseDetails(int FabricID, int BColorID, int GreyWidthID)
        {
            var getFabAddDetails = oblPI.GetConFabricBStockList(FabricID, BColorID, GreyWidthID).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadStockFinishDetails(int FabricID, int FColorID, int FinishWidthID)
        {
            var getFabAddDetails = oblPI.GetConFabricFStockList(FabricID, FColorID, FinishWidthID).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadStockDetails(int Itemid, int Sizeid, int Colorid)
        {
            var getFabAddDetails = oblPI.LoadStockDetails(Itemid, Sizeid, Colorid).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadPurYarnDetails(int Planid)
        {
            var getFabAddDetails = oblPI.LoadPurYarnDetails(Planid).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadFabDetails(int Planid)
        {
            var getFabAddDetails = oblPI.LoadFabDetails(Planid).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadFabPurDetails(int Planid)
        {
            var getFabAddDetails = oblPI.LoadFabPurDetails(Planid).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadYarnPOQtyDetails(int Planid)
        {
            var getFabAddDetails = oblPI.LoadYarnPOQtyDetails(Planid).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LoadAmendDetails(int Stylerowid,string jmasid,string Workordno )
        {
            var getFabAddDetails = oblPI.LoadAmendDetails(Stylerowid, jmasid, Workordno).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetBalQty(string OrderNo, int Itemid, int Colorid, int Sizeid)
        {
            var BalanceQty = oblPI.GetBalQty (OrderNo, Itemid, Colorid, Sizeid).Value.ToList();
            return Json(BalanceQty, JsonRequestBehavior.AllowGet);
        }
    }
}
