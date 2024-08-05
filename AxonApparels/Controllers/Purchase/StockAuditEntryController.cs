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
    public class StockAuditEntryController : Controller
    {
        //
        // GET: /StockAuditEntry/

        IStockAuditEntryBusiness Sb = new StockAuditEntryBusiness();

        public ActionResult StockAuditEntryIndex()
        {
            return View();
        }
        public JsonResult GetDropNo(int? BMasId, int? JobId, int? Styleid, string RefNo)
        {

            return Json(Sb.GetDataDropDetails(BMasId, JobId, Styleid, RefNo), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetProcessNo()
        {

            return Json(Sb.GetDataProcessDropDetails(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadStockAuditItemDetails(int? Companyid, string OType, string StockType,string SupType, int? Itemid, int? item_Groupid, int? buyerid, int? Supplierid, int? StoreId, string Buy_Ord_no, string RefNo, string Job_Ord_no, int? Styleid, int? ProcessId)
        {
            var getDetails = Sb.ListGetSUItemDetails(Companyid, OType, StockType, SupType,Itemid, item_Groupid, buyerid, Supplierid, StoreId, Buy_Ord_no, RefNo, Job_Ord_no, Styleid, ProcessId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(StockAudit opj)
        {
            var result = Sb.CreateStockAuditEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetAuditEditDetails(int Audit_MasId)
        {
            return Json(Sb.GetDataPurAudEditDetails(Audit_MasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadAudEdititemDetails(int? Audit_MasId)
        {
            var getDetails = Sb.ListGetEditAudDetails(Audit_MasId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(StockAudit ObjPE)
        {
            return Json(Sb.UpdatePoAuEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(StockAudit ObjPFDelete)
        {
            return Json(Sb.DeleteAudit(ObjPFDelete), JsonRequestBehavior.AllowGet);
        }
    }
}
