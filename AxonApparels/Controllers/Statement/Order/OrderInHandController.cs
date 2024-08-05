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
    public class OrderInHandController : Controller
    {
        //
        // GET: /OrderInHand/

        IEmployeeBusiness empobj = new EmployeeBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult OrderInHandIndex()
        {
            Employee em = new Employee(); 
            return View();
        }

        [HttpPost]   
        public JsonResult GetManager()
        {
            return Json(empobj.GetManager(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMerchandiser()
        {
            return Json(empobj.GetMerch(), JsonRequestBehavior.AllowGet);
        }
    }
}
