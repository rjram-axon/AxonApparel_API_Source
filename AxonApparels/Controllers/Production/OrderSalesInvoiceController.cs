using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using System.Text.RegularExpressions;
using System.IO;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Production
{
    public class OrderSalesInvoiceController : Controller
    {
        //
        // GET: /OrderSalesInvoice/
        IOrderSecondsSalesBusiness DespatchBA = new OrderSecondsSalesBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

    

        public ActionResult OrderSalesInvoiceIndex()
        {
            GetMaindt(0, "", "", "", "", "", 0);
            return View();
        }

      
    

        public JsonResult GetAddGridDetails(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid)
        {
            var getDespatchInfo = DespatchBA.GetDespatchAddGridDet(CompanyId, OrderType, RefNo, storeid, OrderNo, Buyerid).Value.ToList();
            return Json(getDespatchInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInnerHeaderDetails(int Invid)
        {
            var getDespatchHeaderInfo = DespatchBA.GetDespatchInnerHeaderInfo(Invid).Value;
            return Json(getDespatchHeaderInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInnerItemDetails(int Invid)
        {
            var getDespatchItemInfo = DespatchBA.GetDespatchInnerItemInfo(Invid).Value.ToList();
            return Json(getDespatchItemInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAddlessDetails(int Invid)
        {
            var getDespatchItemInfo = DespatchBA.GetAddlessDetails(Invid).Value.ToList();
            return Json(getDespatchItemInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInnerItemDetailsDespatch(int Invid)
        {
            var getDespatchItemInfo = DespatchBA.GetDespatchInnerItemInfoDespatch(Invid).Value.ToList();
            return Json(getDespatchItemInfo, JsonRequestBehavior.AllowGet);
        }
      

        public JsonResult GetMaindt(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid)
        {
            ViewBag.OrderSalesInvoiceAddFlg = "disabled";
            ViewBag.OrderSalesInvoiceEditFlg = "disabled";
            ViewBag.OrderSalesInvoiceDeleteFlg = "disabled";
            ViewBag.OrderSalesInvoicePrintFlg = "disabled";


            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.OrderSalesInvoiceAddFlg = "";
                ViewBag.OrderSalesInvoiceEditFlg = "";
                ViewBag.OrderSalesInvoiceDeleteFlg = "";
                ViewBag.OrderSalesInvoicePrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuOrderSalesInvoice;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.OrderSalesInvoiceAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.OrderSalesInvoiceEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.OrderSalesInvoiceDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.OrderSalesInvoicePrintFlg = "";
                }
            }

            var getDespatchMainDet = DespatchBA.GetMaindt(CompanyId, Fromdate, Todate, OrderType, RefNo, OrderNo, Buyerid).Value.ToList();
            return Json(getDespatchMainDet, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(OrderSalesInvoiceMas Spm)
        {
            var result = DespatchBA.Add(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //For Edit Mode
        public JsonResult Update(OrderSalesInvoiceMas DespUpd)
        {
            return Json(DespatchBA.Update(DespUpd), JsonRequestBehavior.AllowGet);
        }

     

        public JsonResult Delete(OrderSalesInvoiceMas DespUpd)
        {
            return Json(DespatchBA.Delete(DespUpd), JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetAddItemDetails(string ShipRowId)
        {
            var ItemInfo = DespatchBA.GetAddItemDetails(ShipRowId).Value.ToList();
            return Json(ItemInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInvdet(int companyid)
        {
            var ItemInfo = DespatchBA.GetInvdet(companyid).Value.ToList();
            return Json(ItemInfo, JsonRequestBehavior.AllowGet);
        }


    }
}
