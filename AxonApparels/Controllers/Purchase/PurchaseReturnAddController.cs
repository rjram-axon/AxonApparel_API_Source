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
    public class PurchaseReturnAddController : Controller
    {
        //
        // GET: /PurchaseReturnAdd/

        IPurchaseReturnEntryBusiness obPRo = new PurchaseReturnEntryBusiness();

        public ActionResult PurchaseReturnAddIndex()
        {
            return View();
        }

        public JsonResult GetSupplierNo(int? companyid)
        {

            return Json(obPRo.GetDataSuppDetails(companyid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetPoNo(int? companyid, int? SupplierId, string Purchase_Type, string EType)
        {

            return Json(obPRo.GetDataPoDetails(companyid, SupplierId, Purchase_Type, EType), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetGrnNo(int? companyid, int? SupplierId, string Purchase_Type, string EType)
        {

            return Json(obPRo.GetDataGrnDetails(companyid, SupplierId, Purchase_Type, EType), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetWorkNo(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id)
        {

            return Json(obPRo.GetDataWrkDetails(companyid, SupplierId, Purchase_Type, EType, pur_ord_id), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetOrderNo(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id)
        {

            return Json(obPRo.GetDataOrdDetails(companyid, SupplierId, Purchase_Type, EType, pur_ord_id), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetStyle(int? companyid, int? SupplierId, string Purchase_Type, string EType, string OrderNo, string job_ord_no)
        {

            return Json(obPRo.GetDataStyleDetails(companyid, SupplierId, Purchase_Type, EType, OrderNo, job_ord_no), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetGrnDcNo(int? GrnId, string Purchase_Type)
        {

            return Json(obPRo.GetDataGrnDcDetails(GrnId, Purchase_Type), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadRetitemDetails(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string Ordtype, string EntryType)
        {
            var getDetails = obPRo.ListGetRetDetails(CompanyID, SupplierID, storeid, PurOrGrnNo, Ordtype, EntryType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(PurchaseReturn opj)
        {
            var result = obPRo.CreatePReturnEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetReturnDetails(int Return_ID)
        {
            return Json(obPRo.GetDataPurRetEditDetails(Return_ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadRetEdititemDetails(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string Ordtype, string EntryType, int? Return_ID)
        {
            var getDetails = obPRo.ListGetEditRetDetails(CompanyID, SupplierID, storeid, PurOrGrnNo, Ordtype, EntryType, Return_ID).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(PurchaseReturn ObjPE)
        {
            return Json(obPRo.UpdatePoREntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(PurchaseReturn ObjPE)
        {
            return Json(obPRo.DeletePoREntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
    }
}
