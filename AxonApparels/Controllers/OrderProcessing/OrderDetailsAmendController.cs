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
using AxonApparel.Common;

namespace AxonApparels.Controllers.OrderProcessing
{
    public class OrderDetailsAmendController : Controller
    {
        //
        // GET: /OrderDetailsAmend/
        IBulkOrderAmendBusiness BuyOrdobj = new BulkOrderAmendBusiness();

        public ActionResult OrderDetailsAmendIndex()
        {
            return View();
        }

        public JsonResult Update(BuyOrderStyle Spm)
        {
            return Json(BuyOrdobj.UpdateBuyOrderAmendStyle(Spm), JsonRequestBehavior.AllowGet);
        }
    }
}
