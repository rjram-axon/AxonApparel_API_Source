using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;

namespace AxonApparels.Controllers.HouseKeeping
{
    public class UpdateScriptController : Controller
    {
        //
        // GET: /UpdateScript/
        IUpdateScriptBusiness OsBus = new UpdateScriptBusiness();
        public ActionResult UpdateScriptIndex()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Update(string LastDate, string entrydate)
        {
            var result = OsBus.Update(Convert.ToDateTime(LastDate), Convert.ToDateTime(entrydate));

            return Json(result, JsonRequestBehavior.AllowGet);
        }


    }
}
