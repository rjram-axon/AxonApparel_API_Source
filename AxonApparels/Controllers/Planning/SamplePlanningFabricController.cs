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
    public class SamplePlanningFabricController : Controller
    {
        //
        // GET: /SamplePlanningFabric/

        IPlanningSampleBusiness oblSPA = new PlanningSampleBusiness();

        public ActionResult SamplePlanningFabricIndex()
        {
            return View();
        }
        public JsonResult GetPlanSampleDetails(int StyleRowId)
        {

            return Json(oblSPA.GetDataSamPlanDetails(StyleRowId), JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult Add(PlanningSampleMain ObjPlanSE)
        {
            var result = oblSPA.CreatePlanningSamEntry(ObjPlanSE);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPlanEditSampleDetails(int StyleRowId)
        {
            return Json(oblSPA.GetDataEditSamPlanDetails(StyleRowId), JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListEditFabDetDetails(int StyleRowId, string Type)
        {
            var getCompDetails = oblSPA.GetFabEditDetails(StyleRowId, Type).Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListEditYarnDetDetails(int StyleRowId, string Type)
        {
            var getCompDetails = oblSPA.GetYarnEditDetails(StyleRowId, Type).Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PlanningSampleMain ObjIE)
        {
            return Json(oblSPA.UpdateSPlanEntry(ObjIE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(PlanningSampleMain ObjID)
        {
            return Json(oblSPA.DeleteSPlanEntry(ObjID), JsonRequestBehavior.AllowGet);
        }
    }
}
