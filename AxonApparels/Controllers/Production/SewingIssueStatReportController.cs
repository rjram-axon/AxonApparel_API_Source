using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Domain;

namespace AxonApparels.Controllers
{
    public class SewingIssueStatReportController : Controller
    {
        //
        // GET: /SewingIssueStatReport/

        public ActionResult SewingIssueStatReportIndex()
        {
            return View();
        }

    }
}
