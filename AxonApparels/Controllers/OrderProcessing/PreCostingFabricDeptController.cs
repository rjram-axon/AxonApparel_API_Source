using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using System.Text.RegularExpressions;
using System.IO;

namespace AxonApparels.Controllers.OrderProcessing
{
    public class PreCostingFabricDeptController : Controller
    {
        //
        // GET: /PreCostingFabricDept/
        IPrecostingFabdeptBusiness Precostobj = new PrecostingFabdeptBusiness();

        public ActionResult PreCostingFabricDeptIndex()
        {
            return View();
        }
        public JsonResult Add(PreCostFabDept_mas opj)
        {
            var result = Precostobj.CreateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(PreCostFabDept_mas opj)
        {
            var result = Precostobj.UpdateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(PreCostFabDept_mas opj)
        {
            var result = Precostobj.DeleteEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetPrecostingmasDetails(int Id)
        {
            return Json(Precostobj.GetPrecostingmasDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostingAddfabric(int Id)
        {
            return Json(Precostobj.GetPrecostingAddfabric(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostingEditfabric(int Id)
        {
            return Json(Precostobj.GetPrecostingEditfabric(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostingEditYarn(int Id)
        {
            return Json(Precostobj.GetPrecostingEditYarn(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostingEditprocess(int Id)
        {
            return Json(Precostobj.GetPrecostingEditprocess(Id), JsonRequestBehavior.AllowGet);
        }
    }
}
