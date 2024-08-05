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

namespace AxonApparels.Controllers.OrderProcessing
{
    public class PrecostingTargetAddController : Controller
    {
        //
        // GET: /PrecostingTargetAdd/

        public ActionResult PrecostingTargetAddIndex()
        {
            return View();
        }

    }
}
