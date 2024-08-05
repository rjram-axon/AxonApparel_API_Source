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
    public class PrecostingTargetController : Controller
    {
        //
        // GET: /PrecostingTarget/
        IPrecostingTargetBusiness Precostobj = new PrecostingTargetBusiness();

        public ActionResult PrecostingTargetIndex()
        {
            return View();
        }
        public JsonResult GetPrecostTargetListDetails(int? CmpId, string Order_No, string Ref_No, int? BuyId, string frmDate, string ToDate, string TargetNo)
        {
            return Json(Precostobj.GetPrecostTargetListDetails(CmpId, Order_No, Ref_No, BuyId, frmDate, ToDate, TargetNo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPrecostTargetDetails(int? Targetmasid)
        {
            return Json(Precostobj.GetPrecostTargetDetails(Targetmasid), JsonRequestBehavior.AllowGet);
        }
    }
}
