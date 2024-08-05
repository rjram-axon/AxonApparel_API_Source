using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
namespace AxonApparels.Controllers
{
    public class OrderApprovalController : Controller
    {
        //
        // GET: /OrderApproval/
        IOrderApprovalBusiness obj = new OrderApprovalBusiness();

        public ActionResult OrderApprovalIndex()
        {
            return View();
        }

        public JsonResult Update(string ordno, int Bmasid,string PA,string PType)
        {

            return Json(obj.Update(ordno, Bmasid, PA, PType), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetPAStatus(int bmasid)
        {
            var result = obj.GetPAStatus(bmasid);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStyleRowid(string ordno)
        {
            var result = obj.GetStyleRowid(ordno);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
