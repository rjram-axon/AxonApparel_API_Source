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

namespace AxonApparels.Controllers.AMC
{
    public class AMCController : Controller
    {
        IAMCBusiness AMCbus = new AMCBusiness();
        //
        // GET: /AMC/

        public ActionResult AMCIndex()
        {
            return View();
        }
        [HttpPost]
        public JsonResult UpdateUserdata(int dcompanyid)
        {
            var result = AMCbus.UpdateUserdata(dcompanyid);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckUserLicence(int dcompanyid)
        {
            var result = AMCbus.CheckUserLicence(dcompanyid);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCompany()
        {
            var result = AMCbus.GetCompany();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckAMC()
        {
            var result = AMCbus.CheckAMC();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
