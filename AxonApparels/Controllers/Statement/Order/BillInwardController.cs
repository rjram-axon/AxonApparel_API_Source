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
    public class BillInwardController : Controller
    {
        //
        // GET: /BillInward/

        IEmployeeBusiness empobj = new EmployeeBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult BillInwardIndex()
        {
            Employee em = new Employee();
            return View();
        }

    }
}
