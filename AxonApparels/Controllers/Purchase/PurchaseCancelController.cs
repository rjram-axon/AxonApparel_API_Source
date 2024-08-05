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
    public class PurchaseCancelController : Controller
    {
        //
        // GET: /PurchaseCancel/

        IPurchaseCancelEntryBusiness oblPurCan = new PurchaseCancelEntryBusiness();

        public ActionResult PurchaseCancelIndex()
        {
            return View();
        }

        public JsonResult GetCancelEntryDetails(int pur_ord_id)
        {
            return Json(oblPurCan.ListEntryDetails(pur_ord_id), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetCancelEntryItemDetails(int pur_ord_id)
        {
            var getDetails = oblPurCan.ListEntryCanItemDetails(pur_ord_id).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetCancelEntryOrderDetails(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId)
        {
            var getDetails = oblPurCan.ListEntryCanOrderDetails(pur_ord_id, ItemID, ColorID, SizeID, PurUomId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(PurchaseOrder opj)
        {
            var result = oblPurCan.CreatePOrderCancelEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetCancelEntryEditDetails(int pur_ord_id)
        {
            return Json(oblPurCan.EditDetails(pur_ord_id), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetCancelEntryItemEditDetails(int pur_ord_id)
        {
            var getDetails = oblPurCan.EditCanItemEditDetails(pur_ord_id).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetCancelEntryOrderEditDetails(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId)
        {
            var getDetails = oblPurCan.EdotOrderDetails(pur_ord_id, ItemID, ColorID, SizeID, PurUomId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(PurchaseOrder opjE)
        {
            var result = oblPurCan.UpdatePoCancelEntry(opjE);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(PurchaseOrder ObjPFDelete)
        {
            return Json(oblPurCan.DeleteCanPurchase(ObjPFDelete), JsonRequestBehavior.AllowGet);
        }
    }
}
