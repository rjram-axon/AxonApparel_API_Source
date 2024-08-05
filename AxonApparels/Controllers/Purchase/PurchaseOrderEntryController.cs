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
    public class PurchaseOrderEntryController : Controller
    {
        //
        // GET: /PurchaseOrderEntry/
        IPurchaseOrderBusiness oblPur = new PurchaseOrderBusiness();

        public ActionResult PurchaseOrderEntryIndex()
        {
            return View();
        }
        public JsonResult LoadItemDetails(string StyleRowId, string OType, string Purchase_ItemType, string LocalImport, string IGId, string PurIndType, int supplierid, string GetUser)
        {
            var getDetails = oblPur.ListEntryItemDetails(StyleRowId, OType, Purchase_ItemType, LocalImport, IGId, PurIndType, supplierid, GetUser).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadOrderContDetails(string StyleRowId, int ItemID, int ColorID, int SizeID, int PurUomId, int quantity, string OType, string LocalImport, string PurIndType)
        {
            var getDetails = oblPur.ListEntryOrderDetails(StyleRowId, ItemID, ColorID, SizeID, PurUomId, quantity, OType, LocalImport, PurIndType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
       
        public JsonResult Add(PurchaseOrder opj)
        {
            var result = oblPur.CreatePOrderEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);
            
        }
        public JsonResult GetPurEditDetails(int pur_ord_id)
        {

            return Json(oblPur.GetDataPurEditDetails(pur_ord_id), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetPurOrdNo()
        {
            var result = oblPur.GetPoOrderNoList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadItemEditDetails(int pur_ord_id, string Purchase_Type, string LocalImport, string PurIndType)
        {
            var getDetails = oblPur.GetItemEditDetails(pur_ord_id, Purchase_Type, LocalImport, PurIndType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadOrderEditContDetails(string pur_ord_id, int ItemID, int ColorID, int SizeID, int PurUomId, int quantity, string OType, string LocalImport, string PurIndType)
        {
            var getDetails = oblPur.ListGetEditOrderDetails(pur_ord_id, ItemID, ColorID, SizeID, PurUomId, quantity, OType, LocalImport, PurIndType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(PurchaseOrder ObjPE)
        {
            return Json(oblPur.UpdatePoEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadTermonEditDetails(int pur_ord_id)
        {
            var getDetails = oblPur.GetTermEditDetails(pur_ord_id).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadAddlessEditContDetails(int pur_ord_id)
        {
            var getDetails = oblPur.ListGetEditAddlessDetails(pur_ord_id).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(PurchaseOrder ObjPFDelete)
        {
            return Json(oblPur.DeletePurchase(ObjPFDelete), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPurNomDetails(string StyleRowId, string IGId)
        {
            return Json(oblPur.GetDataPurNomDetails(StyleRowId, IGId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLoadTerms(int Tremsdetid)
        {

            return Json(oblPur.GetLoadTerms(Tremsdetid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetTermDesc(int Tremsdetid)
        {

            return Json(oblPur.GetTermDesc(Tremsdetid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetStateGST(int Supplierid,int Companyid)
        {

            return Json(oblPur.GetStateGST(Supplierid, Companyid), JsonRequestBehavior.AllowGet);

        }


    }
}
