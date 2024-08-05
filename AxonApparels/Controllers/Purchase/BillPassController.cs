using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Purchase
{
    public class BillPassController : Controller
    {
        //
        // GET: /BillPass/
        IBillPassBusiness obj = new BillPassBusiness();

        public ActionResult BillPassIndex()
        {
            return View();
        }

        public ActionResult LoadListData(int CmpId, string Order_No,string Ref_No,string SuppInvNo,int BuyId,int Suppid,string frmDate,string ToDate,string OrderType,string POType,string OSType,string OPType)
        {
            return Json(obj.LoadListData(CmpId, Order_No, Ref_No, SuppInvNo, BuyId, Suppid, frmDate, ToDate, OrderType, POType, OSType, OPType), JsonRequestBehavior.AllowGet);

        }
        public ActionResult Grnview(string GrnNo, int Itemid, int Colorid, int sizeid, string Type)
        {
            //return Json(obj.Grnview(GrnNo, Itemid, Colorid, sizeid, Type), JsonRequestBehavior.AllowGet);
            var getDetails = obj.Grnview(GrnNo, Itemid, Colorid, sizeid, Type).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(BillPass Det)
        {
            return Json(obj.Update(Det), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetSupplierInvNo(string Type) {
            return Json(obj.GetSupplierInvNo(Type), JsonRequestBehavior.AllowGet);
        
        }

    }
}
