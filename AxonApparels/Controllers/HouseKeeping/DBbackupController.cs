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
    public class DBbackupController : Controller
    {
        //
        // GET: /DBbackup/

        IDBbackupBusiness obj = new DBbackupBusiness();

        public ActionResult DBbackupIndex()
        {
            return View();
        }

        public JsonResult UpdateShrink()
        {
            return Json(obj.UpdateShrink(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateBackUp()
        {
            return Json(obj.UpdateBackUp(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateBackUpLogin()
        {
            return Json(obj.UpdateBackUpLogin(), JsonRequestBehavior.AllowGet);
        }
    }
}
