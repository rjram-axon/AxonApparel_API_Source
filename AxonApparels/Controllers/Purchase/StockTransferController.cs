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

namespace AxonApparels.Controllers.Purchase
{
    public class StockTransferController : Controller
    {
        //
        // GET: /StockTransfer/

        IStockTransferBusiness SBT = new StockTransferBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult StockTransferIndex()
        {
            GetMainLoad("", "", "", "", "", "", 0, 0, 0);
            return View();
        }
        public JsonResult LoadStockTrnItemDetails(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? ProcessSeq, string Reqno)
        {
            var getDetails = SBT.ListGetTfrItemDetails(FromCompId, ToCompId, FTransType, FSTransType, TTransType, TSTransType, ItemId, ColorId, ItemGroupId, FromStoreUnitID, ToStoreUnitID, MillId, FromStyleid, ToStyleid, FromRef, ToRef, FOrdNo, TOrdNo, FJOrdNo, TJOrdNo, Processid, ProcessSeq, Reqno).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadProcessSeq(int? Processid, string JobNo)
        {
            var getDetails = SBT.LoadProcessSeq(Processid, JobNo).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadReqno( string JobNo,int id)
        {
            var getDetails = SBT.LoadReqno(JobNo, id).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Add(StockTransfer opj)
        {
            var result = SBT.CreateStockTransferEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetOrd(string FromDate, string ToDate)
        {
            return Json(SBT.GetDataOrderDetails(FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPurchaseStockDet(int Compid,int Itemid,int Colorid,int Sizeid,int Uomid)
        {
            return Json(SBT.GetPurchaseStockDet(Compid, Itemid, Colorid, Sizeid, Uomid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetTransNo(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid)
        {
            return Json(SBT.GetDataTransDetails(FromDate, ToDate, FOrdNo, TOrdNo, FromRef, ToRef, ItemGroupId, Processid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainLoad(string FromDate, string ToDate, string FOrdNo, string TOrdNo, string FromRef, string ToRef, int? ItemGroupId, int? Processid, int? TransferId)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StkTransAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StkTransAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                      
                    menu = MenuNumber.MenuStockTransfer;
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StkTransAddFlg = "";
                    }
                    if (ret[0].EditFlg == 1)
                    {
                        Edit = "";
                    }
                    if (ret[0].DelFlg == 1)
                    {
                        Delete = "";
                    }
                    if (ret[0].PrintFlg == 1)
                    {
                        Print = "";
                    }
                }


                StringBuilder sb = new StringBuilder();
                var result = SBT.GetDataTransMainDetails(FromDate, ToDate, FOrdNo, TOrdNo, FromRef, ToRef, ItemGroupId, Processid,TransferId).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (StockTransfer App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return StkTransPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", App.TransferId, App.ToComp, App.TransNo, App.TransDate, App.FTransType, App.ItemGroup, App.Process);

                }

                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult LoadEditTransDetails(int TransferId)
        {
            return Json(SBT.GetTrfEditDetails(TransferId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadItemEditDetailsTfr(int? FromCompId, int? ToCompId, string FTransType, string FSTransType, string TTransType, string TSTransType, int? ItemId, int? ColorId, int? ItemGroupId, int? FromStoreUnitID, int? ToStoreUnitID, int? MillId, int? FromStyleid, int? ToStyleid, string FromRef, string ToRef, string FOrdNo, string TOrdNo, string FJOrdNo, string TJOrdNo, int? Processid, int? TransferId)
        {
            var getDetails = SBT.ListGetTfrEditItemDetails(FromCompId, ToCompId, FTransType, FSTransType, TTransType, TSTransType, ItemId, ColorId, ItemGroupId, FromStoreUnitID, ToStoreUnitID, MillId, FromStyleid, ToStyleid, FromRef, ToRef, FOrdNo, TOrdNo, FJOrdNo, TJOrdNo, Processid, TransferId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(StockTransfer ObjPE)
        {
            return Json(SBT.UpdateTransEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(StockTransfer ObjPFDelete)
        {
            return Json(SBT.DeleteTransEntry(ObjPFDelete), JsonRequestBehavior.AllowGet);
        }

        public JsonResult PurchaseStockTranfer(List<StockTransferDet> opj)
        {
            var result = SBT.PurchaseStockTranfer(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }


        public JsonResult GetPurchaseStockDetApp(string Status, string FromDate, string ToDate)
        {
            return Json(SBT.GetPurchaseStockDetApp(Status, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }

        public JsonResult PurchaseStockTranferApp(List<StockTransferDet> opj)
        {
            var result = SBT.PurchaseStockTranferApp(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }

    }
}
