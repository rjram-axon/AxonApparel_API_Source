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
    public class OpenDebitNoteController : Controller
    {
        //
        // GET: /OpenDebitNote/

        IOpenDebitBusiness obDbR = new OpenDebitBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult OpenDebitIndex()
        {
            GetMainDebitLoad(0, 0, 0, 0, "", "", "", "","",""); 
            return View();
        }
        public JsonResult Add(OpenDebit opj)
        {
            var result = obDbR.CreateDebitEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetMainDebitNo(int? Companyid, int? Partyid, int? Processid, string OrderType, string DebitOrCredit, string FromDate, string ToDate)
        {
            return Json(obDbR.GetDataMainDebitDetails(Companyid, Partyid, Processid, OrderType, DebitOrCredit, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainDebProcess(int? Companyid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate)
        {
            return Json(obDbR.GetMainDebProcess(Companyid, Partyid, DebitId, OrderType, DebitOrCredit, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainDebSuppDrop(int? Companyid, int? Processid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate)
        {
            return Json(obDbR.GetMainDebBussSupl(Companyid, Processid, DebitId, OrderType, DebitOrCredit, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainDebitLoad(int? Companyid, int? Processid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate, string orderno, string refno)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.OpenDebitAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.OpenDebitAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                            menu = MenuNumber.MenuOpenDebitNote;
                        

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.OpenDebitAddFlg = "";
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
                var result = obDbR.GetDataDebitMainDetails(Companyid, Processid, Partyid, DebitId, OrderType, DebitOrCredit, FromDate, ToDate, orderno, refno).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (OpenDebit App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return OpenDebPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.DebitId, App.Supplier, App.DebitNo, App.DebitDate, App.Process, App.Amount);

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
        public JsonResult LoadEditDebitDetails(int DebitId)
        {
            return Json(obDbR.GetDebitEditDetails(DebitId), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadmailDetails(int DebitId)
        {
            return Json(obDbR.LoadmailDetails(DebitId), JsonRequestBehavior.AllowGet);

        }


        public JsonResult LoadDebItemEditDetails(int DebitId)
        {

            var getDetails = obDbR.GetStoresDebEntryItemEdit(DebitId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(OpenDebit opUj)
        {
            var result = obDbR.UpdateDebitEntry(opUj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(OpenDebit opUj)
        {
            var result = obDbR.DeleteDebitEntry(opUj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadDebAddlessEditDetails(int DebitId)
        {

            var getDetails = obDbR.GetStoresDebEntryAddlessEdit(DebitId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }

}
