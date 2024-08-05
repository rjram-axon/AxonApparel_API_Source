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

    public class BulkOrderController : Controller
    {
        //
        // GET: /BulkOrder/
        IBulkOrderBusiness bulBus = new BulkOrderBusiness();

        IGeneralFunctionBusiness bulNo = new GeneralFunctionBusiness();
        IBulkOrderNomBusiness bulnom = new BulkOrderNomSupBusiness();
        IRoleBusiness roleobj = new RoleBusiness();



        [Authorize]
        public ActionResult BulkOrderIndex()
        {
            ListDetailsMain(0, "", "", 0, "", "", "Ord", "0", "N");


            return View();
        }

        public ActionResult BulkOrderIndex2()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Add(BulkOrder bukObj)
        {
            var result = bulBus.CreateBulkOrder(bukObj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditMainList(int ID)
        {
            return Json(bulBus.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddNom(BulkOrder bukObj)
        {
            var result = bulnom.CreateNomSupBulkOrder(bukObj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult NomSupList(BulkOrder ObjNom)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = bulnom.GetNomSupp();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (BulkOrder App in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", App.NomSupId, App.Supplier, App.Item);
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
        public ActionResult ListDetails(BulkOrder ObjNom)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = bulBus.GetBulkOrder();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (BulkOrder List in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", List.Buy_Ord_MasId, List.Company, List.Buyer, List.Order_No, List.Ref_No, List.Order_Date, List.Quantity);
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ListDetailsMain(int? CmpId, string Order_No, string Ref_No, int? BuyId, string frmDate, string ToDate, string OrderType, string OrdType, string DispatchClosed)
        {
            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.OrderAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.OrderAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                        if (OrderType == "Ord")
                        {
                            menu = MenuNumber.MenuBulkOrder;
                        }
                        else if (OrderType == "Sty")
                        {
                            menu = MenuNumber.MenuOrderStyle;
                        }

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.OrderAddFlg = "";
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
                var result = bulBus.MainGetBulkOrder(CmpId, Order_No, Ref_No, BuyId, frmDate, ToDate, OrdType, DispatchClosed).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (BulkOrder App in result)
                {


                    if (OrderType == "Sty")
                    {
                        if (App.StyleCount > 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" onclick=\"return AddStyleEntry({0})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"StyleAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return EditStyEntry({0})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return DeleteStyEntry({0})\" " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\" id=\"Prntbtn\" " + Print + "=\"" + Print + "\"   class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Buy_Ord_MasId, App.Company, App.Buyer, App.Order_No, App.Ref_No, App.Order_Date, App.Quantity, App.StyleCount, App.PA, App.GCount, App.BuyerId);
                        }
                        else if (App.StyleCount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"addsty\" onclick=\"return AddStyleEntry({0})\"  " + Add + "=\"" + Add + "\"   class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"StyleAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return EditStyEntry({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return DeleteStyEntry({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\" disabled=\"disabled\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Buy_Ord_MasId, App.Company, App.Buyer, App.Order_No, App.Ref_No, App.Order_Date, App.Quantity, App.StyleCount, App.PA, App.GCount, App.BuyerId);

                        }
                    }
                    else if (OrderType == "Ord")
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return AddOrdID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"StyleAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  id=\"Editbtn\" onclick=\"return getbyID({0},{8})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"Delbtn\" onclick=\"return Delete({0},{7},{8})\"  " + Delete + "=\"" + Delete + "\"   class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button><a></a><button type=\"button\"  id=\"Prntbtn\"  " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Buy_Ord_MasId, App.Company, App.Buyer, App.Order_No, App.Ref_No, App.Order_Date, App.Quantity, App.StyleCount, App.OrdApp, App.GCount, App.BuyerId);

                    }
                    if (OrderType == "Gitm")
                    {
                        if (App.StyleCount == 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" onclick=\"return AddGarmentItemEntry({0})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\"  onclick=\"return EditGarmentItemEntry({0})\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return DeleteGarmentItemEntry({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\" disabled=\"disabled\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Garment_ITem_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Buy_Ord_MasId, App.Company, App.Buyer, App.Order_No, App.Ref_No, App.Order_Date, App.Quantity, App.StyleCount, App.OrdApp, App.GCount);
                        }
                        else if (App.StyleCount > 0 && App.GCount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"AddbtnG\" onclick=\"return AddGarmentItemEntry({0})\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" onclick=\"return EditGarmentItemEntry({0})\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return DeleteGarmentItemEntry({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\" disabled=\"disabled\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Garment_ITem_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Buy_Ord_MasId, App.Company, App.Buyer, App.Order_No, App.Ref_No, App.Order_Date, App.Quantity, App.StyleCount, App.OrdApp, App.GCount);

                        }
                        else if (App.StyleCount > 0 && App.GCount > 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" onclick=\"return AddGarmentItemEntry({0})\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"EditbtnG\" onclick=\"return EditGarmentItemEntry({0})\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"DelbtnG\" onclick=\"return DeleteGarmentItemEntry({0})\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\"  id=\"PrntbtnG\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Garment_ITem_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Buy_Ord_MasId, App.Company, App.Buyer, App.Order_No, App.Ref_No, App.Order_Date, App.Quantity, App.StyleCount, App.OrdApp, App.GCount);

                        }
                    }
                    if (OrderType == "oid")
                    {
                        if (App.StyleCount == 0)
                        {

                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return AddOrdItmDet({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return EditOrdItmDet({0})\" disabled=\"disabled\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return DeleteOrdItmDet({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\" disabled=\"disabled\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Garment_ITem_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Buy_Ord_MasId, App.Company, App.Buyer, App.Order_No, App.Ref_No, App.Order_Date, App.Quantity, App.StyleCount, App.OrdApp, App.GCount);
                        }
                        else if (App.StyleCount > 0 && App.OICount == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"AddbtnO\" onclick=\"return AddOrdItmDet({0})\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return EditOrdItmDet({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return DeleteOrdItmDet({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\" disabled=\"disabled\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Garment_ITem_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Buy_Ord_MasId, App.Company, App.Buyer, App.Order_No, App.Ref_No, App.Order_Date, App.Quantity, App.StyleCount, App.OrdApp, App.GCount);

                        }
                        else if (App.StyleCount > 0 && App.OICount > 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return AddOrdItmDet({0})\" disabled=\"disabled\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ItemAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"EditbtnO\" onclick=\"return EditOrdItmDet({0})\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"DelbtnO\" onclick=\"return DeleteOrdItmDet({0})\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\"   id=\"Prntbtn\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return Garment_ITem_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Buy_Ord_MasId, App.Company, App.Buyer, App.Order_No, App.Ref_No, App.Order_Date, App.Quantity, App.StyleCount, App.OrdApp, App.GCount);

                        }
                    }



                }

                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ListordDetailsMain(int? CmpId, string Order_No, string Ref_No, int? BuyId, string frmDate, string ToDate, string OrderType, string OrdType)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = bulBus.MainGetTargetBulkOrder(CmpId, Order_No, Ref_No, BuyId, frmDate, ToDate, OrdType).Value.ToList();
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Delete(int ID)
        {
            return Json(bulBus.DeleteBulkOrder(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(BulkOrder ObjBuk)
        {
            return Json(bulBus.UpdateBulkOrder(ObjBuk), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRefNo()
        {
            var result = bulBus.GetRefNo();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderNo()
        {
            var result = bulBus.GetOrderNoList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBuyRefNo()
        {
            var result = bulBus.GetBuyRefNoList();
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetSampleOrdRefNo()
        {
            var result = bulBus.GetSampleOrderRefNo();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBulkOrdRefNo()
        {
            var result = bulBus.GetBulkOrderRefNo();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSampleOrdNo()
        {
            var result = bulBus.GetSampleOrderNo();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBulkOrdNo()
        {
            var result = bulBus.GetBulkOrderNo();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GenerateNo(string tblname, string ColName, int CompanyID, string Doc)
        {
            var result = bulNo.GenerateNumberBuss(tblname, ColName, CompanyID, Doc);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GenerateShipNo(string tblname, string ColName, string YCode)
        {
            var result = bulNo.GenerateShipNoBuss(tblname, ColName, YCode);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListNomSuppDetails(int Buy_Ord_MasId)
        {
            var getCompDetails = bulBus.GetNom(Buy_Ord_MasId).Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListNomSuppItemDetails(string Supplier, int Buy_Ord_MasId)
        {
            var getCompDetails = bulBus.GetNomItem(Supplier, Buy_Ord_MasId).Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckRefno(string Ref_No)
        {
            return Json(bulBus.GetDataByRef(Ref_No), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetReportOption(string docname)
        {
            var result = bulNo.GenerateReportItem(docname);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckPlanJobDetails(string Order_No)
        {
            return Json(bulBus.GetDataCheckPlanJobDetails(Order_No), JsonRequestBehavior.AllowGet);
        }

    }
}
