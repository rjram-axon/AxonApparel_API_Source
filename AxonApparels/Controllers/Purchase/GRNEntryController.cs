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

namespace AxonApparels.Controllers
{
    public class GRNEntryController : Controller
    {
        //
        // GET: /GRNEntry/
        IPurchaseGrnEntryBusiness oblGrn = new PurchaseGrnEntryBusiness();

        public ActionResult GRNEntryIndex()
        {
            return View();
        }
        public JsonResult LoadGrnItemDetails(string MPurId, int companyid, int supplierid, string pur_type)
        
        {
            var getDetails = oblGrn.ListGrnItemDetails(MPurId, companyid, supplierid, pur_type).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadPOrderDetails(string GrnPurOrdNoId, int OItemid, int OColorid, int OSizeid, int OUomid, int quantity, string pur_type)
        {
            var getDetails = oblGrn.ListEntryOrderDetails(GrnPurOrdNoId, OItemid, OColorid, OSizeid, OUomid, quantity, pur_type).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(PurchaseGrnMas opj)
        {
            var result = oblGrn.CreatePGrnEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult CheckRefno(string DCNo, int supplierid, string CurrYear)
        {
            return Json(oblGrn.GetDataByRef(DCNo, supplierid, CurrYear), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPurGrnEditDetails(int Grn_MasId)
        {

            return Json(oblGrn.GetDataPurGrnEditDetails(Grn_MasId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadItemGrnEditDetails(int Grn_MasId, int supplierid, int companyid, string pur_type)
        {
            var getDetails = oblGrn.GetItemGrnEditDetails(Grn_MasId, supplierid, companyid, pur_type).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
              
        public JsonResult LoadOrderGrnEditContDetails(string GOrnMasID, int OItemid, int OColorid, int OSizeid, int OUomid, int quantity, int GOSupId, int GOCompId, string pur_type)
        {
            var getDetails = oblGrn.ListGetEditGrnOrderDetails(GOrnMasID, OItemid, OColorid, OSizeid, OUomid, quantity, GOSupId, GOCompId, pur_type).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PurchaseGrnMas ObjPE)
        {
            return Json(oblGrn.UpdateGrnEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(PurchaseGrnMas ObjPFDelete)
        {
            return Json(oblGrn.DeleteGrnPurchase(ObjPFDelete), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGrnNo()
        {
            var result = oblGrn.GetGrnNoList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetPurchaseItemRemarks(int Detid,string Type)
        {

            return Json(oblGrn.GetPurchaseItemRemarks(Detid, Type), JsonRequestBehavior.AllowGet);

        }


    }
}
