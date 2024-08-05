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
    public class PurchaseReturnMainController : Controller
    {
        //
        // GET: /PurchaseReturnMain/

        IPurchaseReturnMainBusiness ORet = new PurchaseReturnMainBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult PurchaseReturnMainIndex()
        {
            GetRetMainDetails("", "", 0, 0, 0, "", "", "");

            return View();
        }
        public JsonResult GetRetMainDetails(string OrderNo, string RefNo, int? SupplierID, int? CompanyID, int? Return_ID, string Ordtype, string FrmDate, string ToDate)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.PORetAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.PORetAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                            menu = MenuNumber.MenuPurchaseReturn;
                        

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.PORetAddFlg = "";
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
                var result = ORet.RetBussDetails(OrderNo, RefNo, SupplierID, CompanyID, Return_ID, Ordtype, FrmDate, ToDate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);


                foreach (PurchaseReturn App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\" id=\"Prntbtn\" " + Print + "=\"" + Print + "\"   class=\"btnSelect btn btn_round btn-success\" onclick=\"return Purret_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Return_ID, App.Company, App.Supplier, App.Return_no, App.Return_date, App.ReturnType);

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
        public JsonResult GetOrderNoRet(string Ordtype, string FrmDate, string ToDate)
        {

            return Json(ORet.GetDataDropDetails(Ordtype, FrmDate, ToDate), JsonRequestBehavior.AllowGet);

        }
    }
}