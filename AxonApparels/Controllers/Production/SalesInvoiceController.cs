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
    public class SalesInvoiceController : Controller
    {
        //
        // GET: /SalesInvoice/
        ISalesInvoiceBusiness obj = new SalesInvoiceBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult SalesInvoiceIndex()
        {
            GetInvMainDetails(0, 0, 0, 0, "", "", 0, "");
            return View();
        }
        public JsonResult Add(Sales_Inv_mas opj)
        {
            var result = obj.CreateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(Sales_Inv_mas opj)
        {
            var result = obj.UpdateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(Sales_Inv_mas opj)
        {
            var result = obj.DeleteEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetInvMasDetails(int Id)
        {
            return Json(obj.GetInvMasDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvDetails(int Id)
        {
            return Json(obj.GetInvDetails(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInvMainDetails(int? CompanyID, int?Order_No, int?Ref_no, int?StyleID, string frmDate, string ToDate,int? Entryid,string Jobno)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.SalesInvAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.SalesInvAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                     menu = MenuNumber.MenuSalesInvoice;
                       
                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.SalesInvAddFlg = "";
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


                var result = obj.GetInvMainDetails(CompanyID, Order_No, Ref_no, StyleID, frmDate, ToDate, Entryid, Jobno);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;

                foreach (Sales_Inv_mas BuySty in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"Editbtnmain\"  " + Edit + "=\"" + Edit + "\" onclick=\"return getbyEditID({0})\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Delete + "=\"" + Delete + "\"  id=\"DelbtnMain\" onclick=\"return getbyDeleteID({0})\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", BuySty.SalesInvMasid, BuySty.EntryNo, BuySty.Entrydate, BuySty.Bmasid
                        , BuySty.OrderNo, BuySty.RefNo, BuySty.Styleid, BuySty.Style, BuySty.Job_ord_no);

                }


                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                //return Json(result, JsonRequestBehavior.AllowGet);
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {


                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMainDDL(int? CompanyID, int? Order_No, int? Ref_no, int? StyleID, string frmDate, string ToDate, int? Entryid, string Jobno)
        {
            try
            {
                return Json(obj.GetMainDDL(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
           
        }
    }
}
