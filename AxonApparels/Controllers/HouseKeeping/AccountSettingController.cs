using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;

namespace AxonApparels.Controllers.HouseKeeping
{
    public class AccountSettingController : Controller
    {
        //
        // GET: /AccountSetting/
        IAccountSettingBusiness AccSetbus = new AccountSettingBusiness();

        public ActionResult AccountSettingIndex()
        {
            return View();
        }

        [HttpPost]
        public JsonResult UpdateStatus(PopMailSetting maillistobj)
        {
            return Json(AccSetbus.UpdateStatus(maillistobj), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSettingData()
        {
            var result = AccSetbus.GetSettingData();
            return Json(result, JsonRequestBehavior.AllowGet);
        }



    }
}
