using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Text;
using AxonApparel.Business;

namespace AxonApparels.Controllers.Purchase
{
    public class PurchaseOrderTrimsMainController : Controller
    {
        //
        // GET: /PurchaseOrderTrimsMain/

        public ActionResult PurchaseOrderTrimsMainIndex()
        {
            return View();
        }

    }
}
