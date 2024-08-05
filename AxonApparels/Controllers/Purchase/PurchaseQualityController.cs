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
    public class PurchaseQualityController : Controller
    {
        //
        // GET: /PurchaseQuality/

        IPurchaseQualityBusiness ObjQl = new PurchaseQualityBusiness();

        public ActionResult PurchaseQualityIndex()
        {
            return View();
        }
        public JsonResult GetQualityDetails(int Grn_MasId)
        {
            return Json(ObjQl.GetDataQltyDetails(Grn_MasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadQltyItemDetails(int Grn_MasId)
        {
            var getDetails = ObjQl.GetQltyEntryItemDetails(Grn_MasId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadQltyOrdDetails(int grn_detid)
        {
            var getDetails = ObjQl.GetQltyEntryOrderDetails(grn_detid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadQltyOrderSaveDetails(int Grn_MasId)
        {
            var getDetails = ObjQl.GetQltyEntryOrderSaveDetails(Grn_MasId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(PurchaseGrnMas opj)
        {
            var result = ObjQl.CreateQltyEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetQualityEditDetails(int Grn_MasId)
        {
            return Json(ObjQl.GetDataQltyEditDetails(Grn_MasId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadQltyItemEditDetails(int Grn_MasId)
        {
            var getDetails = ObjQl.GetQltyEntryEditItemDetails(Grn_MasId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadQltyCheckItemEditDetails(string RecNo)
        {
            var getDetails = ObjQl.GetQltyEntryCheckEditItemDetails(RecNo).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadQltyOrdEditDetails(int grn_detid)
        {
            var getDetails = ObjQl.GetQltyEntryOrderEditDetails(grn_detid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadQltyEditOrderSaveDetails(int Grn_MasId)
        {
            var getDetails = ObjQl.GetQltyEntryEditOrderSaveDetails(Grn_MasId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PurchaseGrnMas opj)
        {
            var result = ObjQl.UpdateQltyEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(PurchaseGrnMas opj)
        {
            var result = ObjQl.DeleteQltyEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
    }
}
