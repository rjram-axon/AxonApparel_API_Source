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
    public class PrecostingTrimsConsumptionController : Controller
    {
        //
        // GET: /PrecostingTrimsConsumption/
        IPrecostingBusiness Precostobj = new PrecostingBusiness();

        public ActionResult PrecostingTrimsConsumptionIndex()
        {
            return View();
        }
        public JsonResult GetPrecostTrimsAddDetails(int Id)
        {
            return Json(Precostobj.GetPrecostTrimsAddDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostTrimsEditDetails(int Id)
        {
            return Json(Precostobj.GetPrecostTrimsEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(PrecostingFabTrim_mas opj)
        {
            var result = Precostobj.CreateTrimsEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(PrecostingFabTrim_mas opj)
        {
            var result = Precostobj.UpdateTrimsEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(PrecostingFabTrim_mas opj)
        {
            var result = Precostobj.DeleteTrimsEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
    }
}
