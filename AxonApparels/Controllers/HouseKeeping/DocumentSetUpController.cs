using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers
{
    public class DocumentSetUpController : Controller
    {
        //
        // GET: /DocumentSetUp/

        IDocumentSetupBusiness AlDb = new DocumentSetupBusiness();

        public ActionResult DocumentSetUpIndex()
        {
            return View();
        }
        public JsonResult GetRptOption()
        {
            var getDetails = AlDb.GetRptOption().Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRptDet(string docname)
        {
            var getDetails = AlDb.GetRptDet(docname).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRptEmpDet(string docname)
        {
            var getDetails = AlDb.GetRptEmpDet(docname).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ReportFooterSetup str)
        {
            var result = AlDb.UpdateData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
