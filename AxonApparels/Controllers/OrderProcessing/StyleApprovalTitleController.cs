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
    public class StyleApprovalTitleController : Controller
    {
        //
        // GET: /StyleApprovalTitle/
        IStyleApprovalTitleBusiness StyAppvobj = new StyleApprovalTitleBusiness();
        public ActionResult StyleApprovalTitleIndex()
        {
            return View();
        }

        public JsonResult Add(buyordapptitle opj)
        {
            var result = StyAppvobj.CreateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(buyordapptitle opj)
        {
            var result = StyAppvobj.UpdateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(buyordapptitle opj)
        {
            var result = StyAppvobj.DeleteEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetAppmasDetails(int Id)
        {
            return Json(StyAppvobj.GetAppmasDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAppDDLdet(int Id)
        {
            return Json(StyAppvobj.GetAppDDLdet(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAppEditDetails(string Ordno, int Id)
        {
            return Json(StyAppvobj.GetAppEditDetails(Ordno,Id), JsonRequestBehavior.AllowGet);
        }
    }
}
