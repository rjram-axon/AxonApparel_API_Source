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
    public class GRNAddController : Controller
    {
        //
        // GET: /GRNAdd/
        IPurchaseGrnAddBusiness obPMo = new PurchaseGrnAddBusiness();

        public ActionResult GRNAddIndex()
        {
            return View();
        }
        public JsonResult GetAddLoaddetails(string LorI, string pur_type, string Pur_ItemType, string OrderNo, string RefNo, int? supplierid, int? companyid, string PurIndType)     
        {
            var getDetails = obPMo.GetDataOrderDetails(LorI, pur_type, Pur_ItemType, OrderNo, RefNo, supplierid, companyid, PurIndType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetAddLoaddetails_Barcode(string LorI, string pur_type, string Pur_ItemType, string OrderNo, string RefNo, int? supplierid, int? companyid, string PurIndType)
        {
            var getDetails = obPMo.GetDataOrderDetails_Barcode(LorI, pur_type, Pur_ItemType, OrderNo, RefNo, supplierid, companyid, PurIndType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetOrderNo(string LorI, string pur_type, string Pur_ItemType)
        {

            return Json(obPMo.GetDataOrderDropDetails(LorI, pur_type, Pur_ItemType), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetRefNo(string LorI, string pur_type, string Pur_ItemType)
        {

            return Json(obPMo.GetDataRefDropDetails(LorI, pur_type, Pur_ItemType), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadMainOrderdet(int pid)
        {

            return Json(obPMo.LoadMainOrderdet(pid), JsonRequestBehavior.AllowGet);

        }
    }
}
