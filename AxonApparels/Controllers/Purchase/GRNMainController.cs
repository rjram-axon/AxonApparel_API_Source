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

namespace AxonApparels.Controllers
{
    public class GRNMainController : Controller
    {
        //
        // GET: /GRNMain/


        IPurchaseGrnMainBusiness obPGo = new PurchaseGrnMainBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult GRNMainIndex()
        {
            GetPurGrnMainDetails("", "", "", 0, 0, 0, 0, "", "", "", "", "GRN", "");
            return View();
        }
        public JsonResult GetOrderNo(string pur_type, string Pur_ItemType, string FromDate, string ToDate)
        {

            return Json(obPGo.GetDataOrderDetails(pur_type, Pur_ItemType, FromDate, ToDate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetGrnPoNo(string pur_type, string Pur_ItemType, string FromDate, string ToDate)
        {

            return Json(obPGo.GetDataPoOrderDetails(pur_type, Pur_ItemType, FromDate, ToDate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetGrnSupp(string pur_type, string Pur_ItemType, string FromDate, string ToDate)
        {

            return Json(obPGo.GetDataSuppOrderDetails(pur_type, Pur_ItemType, FromDate, ToDate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetGrnDc(string pur_type, string Pur_ItemType, string FromDate, string ToDate)
        {

            return Json(obPGo.GetDataDcOrderDetails(pur_type, Pur_ItemType, FromDate, ToDate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetGrn(string pur_type, string Pur_ItemType, string FromDate, string ToDate)
        {

            return Json(obPGo.GetDataGrnOrderDetails(pur_type, Pur_ItemType, FromDate, ToDate), JsonRequestBehavior.AllowGet);

        }
		  public JsonResult GetStkGrnNo()
        {

            return Json(obPGo.GetDataStockGrnDetails(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetPurGrnMainDetails(string OrderNo, string RefNo, string Dc_no, int? supplierid, int? companyid, int? PurOrdId, int? Grn_MasId, string pur_type, string Pur_ItemType, string FromDate, string ToDate, string MEntryType, string PurIndType)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.GRNAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    if (MEntryType == "GRN")
                    {
                        ViewBag.GRNAddFlg = "";
                    }
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                        if (MEntryType == "GRN")
                        {
                            menu = MenuNumber.MenuGoodsReceipt;
                        }
                        else if (MEntryType == "Qlty")
                        {
                            menu = MenuNumber.MenuGoodsReceiptQuality;
                        }

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        if (MEntryType == "GRN")
                        {
                        ViewBag.GRNAddFlg = "";
                        }
                        Add = "";
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
                var result = obPGo.GetDataGrnMainDetails(OrderNo, RefNo, Dc_no, supplierid, companyid, PurOrdId, Grn_MasId, pur_type, Pur_ItemType, FromDate, ToDate, PurIndType).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (PurchaseGrnMas App in result)
                {
                    //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \" onclick=\"return getbyID({0},{2},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0},{2},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.Grn_MasId, App.Company, App.companyid, App.Supplier, App.supplierid, App.receipt_no, App.Dc_no, App.receipt_date, App.Pur_ItemType, App.Qlty_No);



                    if (MEntryType == "GRN")
                    {

                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \" onclick=\"return AddGrnEntry({0},{2},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"StyleAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return EditGrnEntry({{0},{2},{4}})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return DeleteGrnEntry({{0},{2},{4}})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", App.Grn_MasId, App.Company, App.companyid, App.Supplier, App.supplierid, App.receipt_no, App.Dc_no, App.receipt_date, App.Pur_ItemType, App.Qlty_No);

                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyID({0},{2},{4},{10})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GRNAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-plus\" style=\"cursor: pointer;\"></i></button></a><a id=\"{0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0},{2},{4},{10})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GRNEdit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0},{2},{4},{10})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"GRNDelete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-times\" style=\"cursor: pointer;\"></i></button></a><button type=\"button\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Pur_Grn_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Grn_MasId, App.Company, App.companyid, App.Supplier, App.supplierid, App.receipt_no, App.Dc_no, App.receipt_date, App.Pur_ItemType, App.Qlty_No, App.ChkAccPos, App.supplierid, App.OrderNo, App.RefNo, App.PurOrdId, App.PurOrdNo);

                    }
                    else if (MEntryType == "Qlty")
                    {
                        if (App.Qlty_No != "")
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnAdd\" onclick=\"return AddQltyID({0},{2},{4})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"QltyAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-plus\" style=\"cursor: pointer;\"></i></button></a><a id=\"{0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return EditQltyID({0},{2},{4})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"QltyEdit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return QltyDelete({0},{2},{4})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"QltyDelete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-times\" style=\"cursor: pointer;\"></i></button></a>'],", App.Grn_MasId, App.Company, App.companyid, App.Supplier, App.supplierid, App.receipt_no, App.Dc_no, App.receipt_date, App.Pur_ItemType, App.Qlty_No, App.ChkAccPos, App.supplierid, App.OrderNo, App.RefNo, App.PurOrdId, App.PurOrdNo);
                        }
                        else
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnAdd\" onclick=\"return AddQltyID({0},{2},{4})\"  " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"QltyAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-plus\" style=\"cursor: pointer;\"></i></button></a><a id=\"{0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" disabled=\"disabled\" id=\"btnEdit\" onclick=\"return EditQltyID({0},{2},{4})\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"QltyEdit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return QltyDelete({0},{2},{4})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"QltyDelete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-times\" style=\"cursor: pointer;\"></i></button></a>'],", App.Grn_MasId, App.Company, App.companyid, App.Supplier, App.supplierid, App.receipt_no, App.Dc_no, App.receipt_date, App.Pur_ItemType, App.Qlty_No, App.ChkAccPos, App.supplierid, App.OrderNo, App.RefNo, App.PurOrdId, App.PurOrdNo);

                        }
                    }

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
         public JsonResult LoadMainOrderstkdet(int pid)
        {

            return Json(obPGo.LoadMainOrderStkdet(pid), JsonRequestBehavior.AllowGet);

        }
         public JsonResult LoadMainOrderdet(int pid)
         {

             return Json(obPGo.LoadMainOrderdet(pid), JsonRequestBehavior.AllowGet);
         }
         public JsonResult LoadItemstockMovement(string GrnNo)
         {

             return Json(obPGo.LoadItemstockMovement(GrnNo), JsonRequestBehavior.AllowGet);
         }

    }
}
