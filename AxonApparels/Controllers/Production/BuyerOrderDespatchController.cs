using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class BuyerOrderDespatchController : Controller
    {
        //
        // GET: /BuyerOrderDespatch/

        IDespatchBuyerOrderBusiness DespatchBA = new DespatchBuyerOrderBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult BuyerOrderDespatchIndex()
        {
            GetMaindt(0, "", "", "", "", "", 0,"");
            return View();
        }

        public JsonResult GetAddGridDetails(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid)
        {
            var getDespatchInfo = DespatchBA.GetDespatchAddGridDet( CompanyId,  OrderType,  RefNo,  storeid,  OrderNo,  Buyerid).Value.ToList();
            return Json(getDespatchInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInnerHeaderDetails(int ShipRowId)
        {
            var getDespatchHeaderInfo = DespatchBA.GetDespatchInnerHeaderInfo(ShipRowId).Value.ToList();
            return Json(getDespatchHeaderInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInnerItemDetails(int ShipRowId, string OrderNo, string ShipNo)
        {
            var getDespatchItemInfo = DespatchBA.GetDespatchInnerItemInfo(ShipRowId, OrderNo, ShipNo).Value.ToList();
            return Json(getDespatchItemInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInnerItemStockDetails(string OrderNo, string JobOrderNo, int itemId, int ColorId, int SizeId, int StoreUnitId)
        {
            var getDespatchItemStockInfo = DespatchBA.GetDespatchInnerItemStockInfo(OrderNo, JobOrderNo, itemId, ColorId, SizeId, StoreUnitId).Value.ToList();
            return Json(getDespatchItemStockInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaindt(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid, string ShipType)
        {
            ViewBag.BuyOrddespatchAddFlg = "disabled";
            ViewBag.BuyOrddespatchEditFlg = "disabled";
            ViewBag.BuyOrddespatchDeleteFlg = "disabled";
            ViewBag.BuyOrddespatchPrintFlg = "disabled";


            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.BuyOrddespatchAddFlg = "";
                ViewBag.BuyOrddespatchEditFlg = "";
                ViewBag.BuyOrddespatchDeleteFlg = "";
                ViewBag.BuyOrddespatchPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuBuyerOrderDespatch;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.BuyOrddespatchAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.BuyOrddespatchEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.BuyOrddespatchDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.BuyOrddespatchPrintFlg = "";
                }
            }

            var getDespatchMainDet = DespatchBA.GetMaindt(CompanyId,Fromdate,Todate ,OrderType,RefNo,OrderNo,Buyerid, ShipType).Value.ToList();
            return Json(getDespatchMainDet, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(DespatchMas Spm)
        {
            var result = DespatchBA.CreateDespatch(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //For Edit Mode
        public JsonResult Update(DespatchMas DespUpd)
        {
            return Json(DespatchBA.UpdateDespatch(DespUpd), JsonRequestBehavior.AllowGet);
        }

        //GetbyID by DespatchID
        public JsonResult GetDespatchEditMode(int ID)
        {
            var getProdReceiptHeaderInfo = DespatchBA.GetDespatchHeaderInformation(ID);
            return Json(getProdReceiptHeaderInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(DespatchBA.DeleteDespatch(id), JsonRequestBehavior.AllowGet);
        }
    }
}
