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
    public class PurchaseOrderMainController : Controller
    {
        //
        // GET: /PurchaseGeneralAllMain/

        IPurchaseOrderMainBusiness obPMo = new PurchaseOrderMainBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult PurchaseOrderMainIndex()
        {
            GetPurMainDetails("", "", 0, 0, 0, 0, "", "", "", "", "", "", "", "");
            return View();
        }
        public JsonResult GetPoNo(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {

            return Json(obPMo.GetDataPOrderDetails(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetPoNoTrack()
        {

            return Json(obPMo.GetPoNoTrack(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetRecNoTrack()
        {

            return Json(obPMo.GetRecNoTrack(), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetOrderRefNo(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {

            return Json(obPMo.GetDataOrderRefDetails(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetOrderStyle(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {

            return Json(obPMo.GetDataStyleDetails(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetSupplier(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {

            return Json(obPMo.GetDataSupplierDetails(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetPurMainDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string MDecType, string PurIndType, string IsApproved)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.POAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.POAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                        if (MDecType != "PurCan")
                        {
                            if (Purchase_ItemType == "A") {
                                menu = MenuNumber.MenuPurchaseOrderTrims;
                            }
                            else if (Purchase_ItemType == "Y")
                            {
                                menu = MenuNumber.MenuPurchaseOrderYarn;
                            }
                            else
                            {
                                menu = MenuNumber.MenuPurchaseOrder;
                            }
                        }
                        else if (MDecType == "PurCan")
                        {
                            menu = MenuNumber.MenuPurchaseOrderCancel;
                        }

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.POAddFlg = "";
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
                var result = obPMo.GetDataPirMainDetails(OrderNo, RefNo, SupplierId, companyid, pur_ord_id, StyleId, LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate, PurIndType, IsApproved).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                if (MDecType != "PurCan")
                {

                    foreach (PurchaseOrder App in result)
                    {
                        // sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round\" style=\"background-color:#FF69B4;color:#fff;\"> Program Add </button></a><a id=\" {8} \" onclick=\"return getbyEditID({8})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round\" disabled=\"disabled\"  style=\"background-color:#FF69B4;color:#fff; \"> Program Edit </button></a><a id=\" {8} \" onclick=\"return getbyDeleteID({8})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round\" disabled=\"disabled\"  style=\"background-color:#FF69B4 ;color:#fff;\"> Program Delete </button></a><a id=\" {8} \" onclick=\"return getBomID({8})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn_bom\"> Bom </button></a><a id=\" {8} \" onclick=\"return getBudgetID({8})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{8}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn_bud\"> Budget </button></a>'],", App.pur_ord_id, App.company, App.Supplier, App.pur_ord_no, App.orddate, App.Reference, App.LocalImport);
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\"  " + Edit + "=\"" + Edit + "\"  onclick=\"return getbyID({0})\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"   onclick=\"return Pur_ord_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.pur_ord_id, App.company, App.Supplier, App.pur_ord_no, App.orddate, App.Reference, App.LocalImport, App.SupplierId, App.StyleId, App.Style, App.OrderNo, App.RefNo, App.IsApproved);

                    }
                }
                else if (MDecType == "PurCan")
                {
                    foreach (PurchaseOrder App in result)
                    {
                        if (App.cancel == false)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyCAddID({0})\"  " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"  >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyCEditID({0})\" class=\"btnSelect btn btn_round btn-warning\" disabled=\"disabled\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" disabled=\"disabled\" id=\"btnDelete\" onclick=\"return getbyCDeleteID({0})\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-times\"></i> </button></a> '],", App.pur_ord_id, App.company, App.Supplier, App.pur_ord_no, App.orddate, App.Reference, App.LocalImport, App.SupplierId, App.StyleId, App.Style, App.OrderNo, App.RefNo, App.IsApproved);
                        }
                        else
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyCAddID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"  >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyCEditID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyCDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"   class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-times\"></i> </button></a> '],", App.pur_ord_id, App.company, App.Supplier, App.pur_ord_no, App.orddate, App.Reference, App.LocalImport, App.SupplierId, App.StyleId, App.Style, App.OrderNo, App.RefNo, App.IsApproved);

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

        public JsonResult GetPurMainAppDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string Type, int ToApprove)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";

                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {

                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuPurchaseOrderApp;

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
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
                var result = obPMo.GetDataPurMainAppDetails(OrderNo, RefNo, SupplierId, companyid, pur_ord_id, StyleId, LocalImport, Purchase_Type, Purchase_ItemType, FrmDate, ToDate, Type, ToApprove).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (PurchaseOrder App in result)
                {
                    if (Type == "PENDING")
                    {

                       // sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Pur_ord_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.pur_ord_id, App.company, App.Supplier, App.pur_ord_no, App.orddate, App.Reference, App.LocalImport);
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyAddID({0,7})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" disabled=\"disabled\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i></a>'],", App.pur_ord_id, App.company, App.Supplier, App.pur_ord_no, App.orddate, App.Reference, App.LocalImport);

                    }
                    else
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyAddID({0,7})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" disabled=\"disabled\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i></a>'],", App.pur_ord_id, App.company, App.Supplier, App.pur_ord_no, App.orddate, App.Reference, App.LocalImport);
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyAddID({0,7})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" disabled=\"disabled\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyAddID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i></a>'],", App.pur_ord_id, App.company, App.Supplier, App.pur_ord_no, App.orddate, App.Reference, App.LocalImport);

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
        public JsonResult LoadMainOrderdet(int prodid)
        {

            return Json(obPMo.LoadMainOrderdet(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadPreOrderdet(int Itemid,int Sizeid,int Colorid)
        {

            return Json(obPMo.LoadPreOrderdet(Itemid, Sizeid, Colorid), JsonRequestBehavior.AllowGet);

        }


        public JsonResult AddSession()
        {

            var result = Session["POReportPath"];
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSuppdet(int masid)
        {

            return Json(obPMo.GetSuppdet(masid), JsonRequestBehavior.AllowGet);
        }
    }

}
