using System;
using System.Collections.Generic;
using System.Linq;
using AxonApparel.Business;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;

namespace AxonApparels.Controllers.Process
{
    public class ProcessReceiptQualityController : Controller
    {
        //
        // GET: /ProcessReceiptQuality/

        public ActionResult ProcessReceiptQualityIndex()
        {
            return View();
        }

    }
}
