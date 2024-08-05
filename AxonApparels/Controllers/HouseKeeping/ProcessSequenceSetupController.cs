using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;
using AxonApparel.Domain;

namespace AxonApparels.Controllers.HouseKeeping
{
    public class ProcessSequenceSetupController : Controller
    {
        //
        // GET: /ProcessSequenceSetup/

        IProcessSeqSetBusiness obj = new ProcessSeqSetBusiness();

        public ActionResult ProcessSequenceSetUpIndex()
        {
            return View();
        }
        public JsonResult Add(int[] sbTwo)
        {
            var result = obj.CreateProcessSeqSetUpEntry(sbTwo);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
