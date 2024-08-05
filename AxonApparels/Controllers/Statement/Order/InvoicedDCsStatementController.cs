using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Business;

namespace AxonApparels.Controllers.Statement.Order
{
    public class InvoicedDCsStatementController : Controller
    {
        //
        // GET: /InvoicedDCsStatement/

        IEmployeeBusiness empobj = new EmployeeBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult InvoicedDCsStatementIndex()
        {
            Employee em = new Employee();
            return View();
        }

    }
}
