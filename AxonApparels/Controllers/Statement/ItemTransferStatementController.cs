using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;

namespace AxonApparels.Controllers.Statement
{
    public class ItemTransferStatementController : Controller
    {
        //
        // GET: /ItemTransfer/
        IItemTransferBusiness obj = new ItemTransferBusiness();

        public ActionResult ItemTransferStatementIndex()
        {
            return View();
        }
        public JsonResult LoadItemtransStatementList()
        {

            return Json(obj.LoadItemtransStatementList(), JsonRequestBehavior.AllowGet);
        }

    }
}
