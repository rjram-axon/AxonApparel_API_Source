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
    public class PrecostingTargetEntryController : Controller
    {
        //
        // GET: /PrecostingTargetEntry/

        IPrecostingTargetBusiness Precostobj = new PrecostingTargetBusiness();

        public ActionResult PrecostingTargetEntryIndex()
        {
            return View();
        }
        //Add Process
        public JsonResult GetPrecostTrimsAddDetails(string Id)
        {
            return Json(Precostobj.GetPrecostrateTrimsAddDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostFabricAddDetails(int Id)
        {
            return Json(Precostobj.GetPrecostrateFabricAddDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostEmblishmentAddDetails(string Id)
        {
            return Json(Precostobj.GetPrecostrateEmblishmentAddDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostFabricYarnAddDetails(string Id)
        {
            return Json(Precostobj.GetPrecostrateFabricYarnAddDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostprocessAddDetails(string Id)
        {
            return Json(Precostobj.GetPrecostrateprocessAddDetails(Id), JsonRequestBehavior.AllowGet);
        }

        //Edit Process
        public JsonResult GetPrecostTrimsEditDetails(string Id)
        {
            return Json(Precostobj.GetPrecostrateTrimsEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostFabricEditDetails(int Id)
        {
            return Json(Precostobj.GetPrecostrateFabricEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostEmblishmentEditDetails(string Id)
        {
            return Json(Precostobj.GetPrecostrateEmblishmentEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostFabricYarnEditDetails(string Id)
        {
            return Json(Precostobj.GetPrecostrateFabricYarnEditDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostprocessEditDetails(string Id)
        {
            return Json(Precostobj.GetPrecostrateprocessEditDetails(Id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Precosting_Target_mas opj)
        {
            var result = Precostobj.CreateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        //public JsonResult Update(PrecostingFabTrim_mas opj)
        //{
        //    var result = Precostobj.UpdateEntry(opj);
        //    return Json(result, JsonRequestBehavior.AllowGet);

        //}
        public JsonResult Delete(Precosting_Target_mas opj)
        {
            var result = Precostobj.DeleteEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
    }
}
