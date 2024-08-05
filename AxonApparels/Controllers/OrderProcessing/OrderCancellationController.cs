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

using AxonApparel.Common;
namespace AxonApparels.Controllers.OrderProcessing
{
    public class OrderCancellationController : Controller
    {
        //
        // GET: /OrderCancellation/
        IOrderCancellationBusiness bcObj = new OrderCancellationBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult OrderCancellationIndex()
        {
            ListViewbag();
            return View();
        }
        public JsonResult ListOrderClose(int? CCompId, int? CBmasId, string CRefNo, int? CBuyId, int? StyleId, string FmDate, string ToDate, string COrderType)
        {


            var getDetails = bcObj.GetOrderClose(CCompId, CBmasId, CRefNo, CBuyId, StyleId, FmDate, ToDate, COrderType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListOrderCloseRevert(int? CCompId, int? CBmasId, string CRefNo, int? CBuyId, int? StyleId, string FmDate, string ToDate, string COrderType)
        {
            var getDetails = bcObj.GetOrderClose(CCompId, CBmasId, CRefNo, CBuyId, StyleId, FmDate, ToDate, COrderType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EditOrderCloseList(int ID)
        {
            return Json(bcObj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateOrderWithHeld(BulkOrderCancel ObjBuk)
        {
            return Json(bcObj.UpdateOrderWithHeld(ObjBuk), JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateOrderCancel(BulkOrderCancel ObjBuk)
        {
            return Json(bcObj.UpdateOrderClose(ObjBuk), JsonRequestBehavior.AllowGet);
        }


        public void ListViewbag()
        {
            try
            {

                //var Add = "disabled";
                //var Edit = "disabled";
                ViewBag.OrderCancelDelete = "disabled";
               // ViewBag.OrderCancel Print = "disabled";
                ViewBag.OrderCancelAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.OrderCancelAddFlg = "";
                    ViewBag.OrderCancelDelete = "";
                   
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                      
                   menu = MenuNumber.MenuBulkOrder;
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.OrderCancelAddFlg = "";
                    }
                    //if (ret[0].EditFlg == 1)
                    //{
                    //    Edit = "";
                    //}
                    if (ret[0].DelFlg == 1)
                    {
                        ViewBag.OrderCancelDelete = "";
                    }
                    //if (ret[0].PrintFlg == 1)
                    //{
                    //    Print = "";
                    //}
                }




            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
               // return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }




    }
}
