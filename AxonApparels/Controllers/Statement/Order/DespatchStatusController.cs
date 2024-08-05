using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparels.Controllers.Statement.Order
{
    public class DespatchStatusController : Controller
    {
        //
        // GET: /DespatchStatus/

        public ActionResult DespatchStatusIndex()
        {
            Employee em = new Employee();
            return View();
        }

    }
}
