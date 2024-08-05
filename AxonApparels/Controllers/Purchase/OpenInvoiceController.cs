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
    public class OpenInvoiceController : Controller
    {
        //
        // GET: /OpenInvoice/
        IOpenInvoiceBusiness obj = new OpenInvoiceBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        public ActionResult OpenInvoiceIndex()
        {
            GetMainDetails(0, 0, 0, "", 0, "", "", "", "","","");
            return View();
        }
        public JsonResult Add(OpenInvoiceMas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(OpenInvoiceMas str)
        {
            var result = obj.Update(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainDetails(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate, string IorE,string refno)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.OpenInvAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.OpenInvAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                            menu = MenuNumber.MenuOpenInvoice;
                        

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.OpenInvAddFlg = "";
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
                var result = obj.GetDataMainList(compid, suppid, unitid, orderno, opinvid, entryno, otype, fromDate, todate, IorE, refno).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (OpenInvoiceMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-minus\"></i> </button></a> <a id=\" {0} \"  button type=\"button\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return OpenInvPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Open_InvID, App.company, App.supplier, App.InvoiceNo, App.InvoiceDate, App.EntryNo, App.Gross_amount);

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
        public JsonResult Getddl(int? compid, int? suppid, int? unitid, string orderno, int? opinvid, string entryno, string otype, string fromDate, string todate)
        {

            return Json(obj.GetDataMainListddl(compid, suppid, unitid, orderno, opinvid, entryno, otype, fromDate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadheaderdet(int invid)
        {

            return Json(obj.Getheaderdet(invid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadItmedit(int invid)
        {

            return Json(obj.GetItmeditdet(invid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadaddlessdit(int invid)
        {

            return Json(obj.Getaddlesdet(invid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(int id)
        {
            return Json(obj.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
