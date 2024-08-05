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

namespace AxonApparels.Controllers.HouseKeeping
{
    public class AllowanceController : Controller
    {
        //
        // GET: /Allowance/

        IAllowanceBusiness AlDb = new AllowanceBusiness();

        public ActionResult AllowanceIndex()
        {
            return View();
        }
        public JsonResult LoadDataAlloPurchaseDetails(int? ItemGroupId, int? ItemId)
        {
            var getDetails = AlDb.ListAllItemDetails(ItemGroupId, ItemId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadDataAlloCheckPurchaseDetails(int? ItemId)
        {
            var getDetails = AlDb.ListAllItemCDetails(ItemId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(AllowanceSetup ObjA)
        {
            return Json(AlDb.UpdateAllowEntry(ObjA), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ProcessUpdate(AllowanceSetup ObjP)
        {
            return Json(AlDb.UpdateProcessAllowEntry(ObjP), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadDataAlloProcessDetails(int? ProcessId)
        {
            var getDetails = AlDb.ListAllProcessDetails(ProcessId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
