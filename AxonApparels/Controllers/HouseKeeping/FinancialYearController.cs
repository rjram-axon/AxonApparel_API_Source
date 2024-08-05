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
using System.Net;

namespace AxonApparels.Controllers.FinancialYear
{
    public class FinancialYearController : Controller
    {
       // IUserEntryLogBusiness entrylogbus = new FinancialYearBusiness();
        //
        // GET: /RightsMain/

        public ActionResult FinancialYearIndex()
        {
            return View();
        }

    }
}
