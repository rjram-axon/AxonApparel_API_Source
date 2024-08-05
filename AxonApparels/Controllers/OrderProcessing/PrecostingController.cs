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
    public class PrecostingController : Controller
    {
        //
        // GET: /Precosting/
        IPrecostingBusiness Precostobj = new PrecostingBusiness();

        public ActionResult PrecostingIndex()
        {
            return View();
        }

        public JsonResult Add(PrecostingFabTrim_mas opj)
        {
            var result = Precostobj.CreateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(PrecostingFabTrim_mas opj)
        {
            var result = Precostobj.UpdateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(PrecostingFabTrim_mas opj)
        {
            var result = Precostobj.DeleteEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetPrecostingDetails(int Id)
        {
            return Json(Precostobj.GetPrecostingDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostTrimsEditDetails(int Id)
        {
            return Json(Precostobj.GetPrecostTrimsEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostfabricEditDetails(int Id)
        {
            return Json(Precostobj.GetPrecostfabricEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostEmblishmentEditDetails(int Id)
        {
            return Json(Precostobj.GetPrecostEmblishmentEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
    }
}
