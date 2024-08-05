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
    public class PurchaseOrderAddController : Controller
    {
        //
        // GET: /PurchaseGeneralAll/

        IPurchaseOrderBusiness oblPur = new PurchaseOrderBusiness();

        public ActionResult PurchaseOrderAddIndex()
        {
            return View();
        }
        public JsonResult LoadDetails(int? companyid, int? BuyerId, string BMasId, string RefNo, string StyleId, string OType, string PType, string LocalImport, string PurIndType, string Itype, string Igroup)
        {
           // return Json(oblPur.ListDetails(companyid, BuyerId, OrderNo, RefNo, StyleId, OType, PType), JsonRequestBehavior.AllowGet);
            var getDetails = oblPur.ListDetails(companyid, BuyerId, BMasId, RefNo, StyleId, OType, PType, LocalImport, PurIndType, Itype, Igroup).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
           
        }
        public JsonResult LoadIndentDetails(int? companyid, int? BuyerId, string BMasId, string RefNo, int? StyleId, string OType, string PType, string LocalImport, string PurIndType)
        {
            // return Json(oblPur.ListDetails(companyid, BuyerId, OrderNo, RefNo, StyleId, OType, PType), JsonRequestBehavior.AllowGet);
            var getDetails = oblPur.ListIndentOrdDetails(companyid, BuyerId, BMasId, RefNo, StyleId, OType, PType, LocalImport, PurIndType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadSRDetails(int? companyid, int? BuyerId, string OrderNo, string RefNo, int? StyleId, string OType, string PType)
        {
            // return Json(oblPur.ListDetails(companyid, BuyerId, OrderNo, RefNo, StyleId, OType, PType), JsonRequestBehavior.AllowGet);
            var getDetails = oblPur.ListSRDetails(companyid, BuyerId, OrderNo, RefNo, StyleId, OType, PType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetOrderNo(int? companyid, string OType)
        {

            return Json(oblPur.GetDataOrderDetails(companyid, OType), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetStyleNo(int? companyid, string OType)
        {

            return Json(oblPur.GetDataStyleDetails(companyid, OType), JsonRequestBehavior.AllowGet);

        }
       
    }
}


