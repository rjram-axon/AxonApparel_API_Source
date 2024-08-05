using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;
namespace AxonApparels.Controllers.HouseKeeping
{
    public class ReviseMarkupController : Controller
    {
        //
        // GET: /ReviseMarkup/

        IReviseMarkupBusiness obj = new ReviseMarkupBusiness();

        public ActionResult ReviseMarkupIndex()
        {
            return View();
        }
        [HttpPost]
        public JsonResult LoadMaingriddet(string OrdNo, string RefNo, string Tranno, int ItemId, int PrdId, int CompId, string tyid)
        {

            return Json(obj.LoadMaingrid(OrdNo, RefNo, Tranno, ItemId, PrdId, CompId, tyid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(ItmStkDet ObjP)
        {
            return Json(obj.UpdateReviseEntry(ObjP), JsonRequestBehavior.AllowGet);
        }
    }
}
