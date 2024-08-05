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
    public class PlanningFabricController : Controller
    {
        //
        // GET: /PlanningFabric/
        //IPlanningFabricBusiness oblFab = new PlanningFabricBusiness();

        IPlanningFabricBusiness obFab = new PlanningFabricBusiness();


        public ActionResult PlanningFabricIndex()
        {
            return View();
        }
        public ActionResult ListPlanningFabricComp(int PlanID)
        {

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obFab.GetDataPlanFabricList(PlanID).Value.ToList();
                if (result == null || result == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);


                foreach (PlanningFabric App in result)
                {

                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.Comp_Plan_MasID, App.ComponentID, App.ComponentName, App.Fabric_Type, App.kgs, App.PanParts, App.CompSlNo, App.GColorId, App.GColor, App.FabircId);
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
        public ActionResult ListPlanningFabricCompDetails(int PlanID, int CompSINO)
        {

           
            var getFabAddDetails = obFab.GetDataPlanFabricDetList(PlanID, CompSINO).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListTotPlanningFabricCompDetails(int PlanID)
        {
            var getFabAddDetails = obFab.GetDataPlanFabrictotDetList(PlanID).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListConFabricEdittotDetails(int PlanID)
        {



            var getFabAddDetails = obFab.GetConFabricplantotList(PlanID).Value.ToList();
            return Json(getFabAddDetails, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Add(PlanningFabric ObjPlanFab)
        {
            var result = obFab.CreatePlanningFabricEntry(ObjPlanFab);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListCompFabricLossDetails(int PlanID, int CNo)
        {
            
            var getLossDetails = obFab.GetDataPlanFabricLossList(PlanID, CNo).Value.ToList();
            return Json(getLossDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListConFabricEditDetails(int PlId, int CompNo)
        {
      
            var getFabEditDetails = obFab.GetConFabricplanList(PlId, CompNo).Value.ToList();
            return Json(getFabEditDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PlanningFabric ObjPFEn)
        {
            return Json(obFab.UpdateFabricEntry(ObjPFEn), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(PlanningFabric ObjPFDelete)
        {
            return Json(obFab.DeletePlanFabric(ObjPFDelete), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ColorList()
        {
            var getDetails = obFab.Getcolor().Value.ToList();
            var jsonResult =Json(getDetails, JsonRequestBehavior.AllowGet);  
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult PrintColorList()
        {
            var getDetails = obFab.Getprintcolor().Value.ToList();
            var jsonResult = Json(getDetails, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult GSizeList()
        {
            var getDetails = obFab.GSizeList().Value.ToList();
            var jsonResult = Json(getDetails, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult BitItemList()
        {
            var getDetails = obFab.BitItemList().Value.ToList();
            var jsonResult = Json(getDetails, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

    }
}
