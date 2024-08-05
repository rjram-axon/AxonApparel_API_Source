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
    public class PlanningYarnController : Controller
    {
        //
        // GET: /PlanningYarn/

        IPlanningYarnBusiness obYarn = new PlanningYarnBusiness();

        public ActionResult PlanningYarnIndex()
        {
            return View();
        }
        public ActionResult ListPlanningFabricYarn(int PlanID)
        {

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obYarn.GetDataPlanYarnList(PlanID).Value.ToList();
                if (result == null || result == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);


                foreach (PlanningYarn App in result)
                {

                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.SlNo, App.YPlanmasID, App.FabricID, App.Fabric, App.BColor, App.Fabric_Weight, App.Fabric_ColorId, App.Fabric_type);
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
        public ActionResult ListPlanningFabricYarnDyeingDetails(int PlanID, int StyleRowId, int ItemId, int BColorId, int FabricId, int YDSlNo, decimal FQty)
        {

            var getYarnDyeAddDetails = obYarn.GetDataPlanDyeDetList(PlanID, StyleRowId, ItemId, BColorId, FabricId, YDSlNo, FQty).Value.ToList();
            return Json(getYarnDyeAddDetails, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Add(PlanningYarn ObjPlanYarn)
        {
            var result = obYarn.CreatePlanningYarnEntry(ObjPlanYarn);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(obYarn.DeletePlanYarn(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListCompYarnLossDetails(int PlanID, int CNo)
        {

            var getLossDetails = obYarn.GetDataPlanYarnLossList(PlanID, CNo).Value.ToList();
            return Json(getLossDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListYarnEditDetDetails(int YMasID, string OrdNo, int StyleId)
        {

            var getYarnDetails = obYarn.GetDataPlanYarnEditList(YMasID, OrdNo, StyleId).Value.ToList();
            return Json(getYarnDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListYarnDyeingEditDetails(int PlId, int ItemID, int FabricID, int baseColorID, int StyleRowID, int YMasID, int YDetID, decimal Qty, int Dying, int YlNo)
        {

            var getYarnDyeEditDetails = obYarn.GetYarnDyeingplanList(PlId, ItemID, FabricID, baseColorID, StyleRowID, YMasID, YDetID, Qty, Dying, YlNo).Value.ToList();
            return Json(getYarnDyeEditDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PlanningYarn ObjPFYEn)
        {
            return Json(obYarn.UpdateYarnEntry(ObjPFYEn), JsonRequestBehavior.AllowGet);
        }
    }
}

