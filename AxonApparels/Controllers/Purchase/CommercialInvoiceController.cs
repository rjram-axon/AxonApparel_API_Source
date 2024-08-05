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
    public class CommercialInvoiceController : Controller
    {
        //
        // GET: /CommercialInvoice/
        ICommercialInvoiceBusiness obj = new CommercialInvoiceBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult CommercialInvoiceIndex()
        {
            GetMainDetails(0, 0, "", 0, "", "", "", 0);
            return View();
        }

        public JsonResult Add(commercial_invmas str)
        {
            var result = obj.Add(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Update(commercial_invmas str)
        {
            var result = obj.Update(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(commercial_invmas str)
        {
            var result = obj.Delete(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadAddDet(string Commercial, string Order, string Ref, string Style)
        {

            return Json(obj.LoadAddDet(Commercial, Order, Ref, Style), JsonRequestBehavior.AllowGet);

        }


        public JsonResult GetMainDetails(int? compid, int? suppid, string orderno, int? invid, string fromDate, string todate, string refno, int? styleid)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.CommercialInvoiceAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.CommercialInvoiceAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuCommercialInvoice;


                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.CommercialInvoiceAddFlg = "";
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
                var result = obj.GetDataMainList( compid,  suppid,  orderno,  invid,  fromDate,  todate,  refno,  styleid).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (commercial_invmas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return GetDelete({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-minus\"></i> </button></a> <a id=\" {0} \"  button type=\"button\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return OpenInvPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Invmasid, App.Company, App.Supplier, App.Invoiceno, App.Invoicedate, App.EntryNo);

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

        public JsonResult LoadMasedit(int Masid)
        {

            return Json(obj.LoadMasedit(Masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadDetedit(int Masid)
        {

            return Json(obj.LoadDetedit(Masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadAddlessedit(int Masid)
        {

            return Json(obj.LoadAddlessedit(Masid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadEntryddl()
        {

            return Json(obj.LoadEntryddl(), JsonRequestBehavior.AllowGet);

        }


    }
}
