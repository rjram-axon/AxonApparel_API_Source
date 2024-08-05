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
    public class DebitCreditController : Controller
    {
        //
        // GET: /DebitCredit/

        IPurchaseDebitBusiness PuDb = new PurchaseDebitBusiness();
        IRoleBusiness roleobj = new RoleBusiness();


        public ActionResult DebitCreditIndex()
        {
            GetMainLoad(0, 0, "", "", "", "", "");
            return View();
        }
        public JsonResult LoadDataAddDebDetails(int? companyid, int? supplierid, string DocType, string EntryType)
        {
            var getDetails = PuDb.ListDebAddDetails(companyid, supplierid, DocType, EntryType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadDataItemDebDetails(int? InvMasId, string DocType, string EntryType)
        {
            var getDetails = PuDb.ListDebItemDetails(InvMasId, DocType, EntryType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadDataOrdDebDetails(int? GrnDetId, string Mode, string EType)
        {
            var getDetails = PuDb.ListDebOrderDetails(GrnDetId, Mode, EType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadDataRateDiffDebDetails(int? InvId, string EType,string Stype)
        {
            var getDetails = PuDb.ListDebRateDetails(InvId, EType, Stype).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(PurDebitMas opj)
        {
            var result = PuDb.CreatePDebInvEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDebMainDropNo(int? companyid, int? supplierid, string DocType, string EntryType, string FromDate, string ToDate)
        {
            return Json(PuDb.GetDataMainEntDropDetails(companyid, supplierid, DocType, EntryType, FromDate, ToDate), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMainLoad(int? companyid, int? supplierid, string DocType, string EntryType, string DocumentNo, string FromDate, string ToDate)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.DebitCreditAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.DebitCreditAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                      
                            menu = MenuNumber.MenuDebitCredit;
                       
                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.DebitCreditAddFlg = "";
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
                var result = PuDb.GetDataInvDebMainDetails(companyid, supplierid, DocType, EntryType, DocumentNo, FromDate, ToDate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (PurDebitMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return CreDebPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.Debit_id, App.Debit_no, App.Debit_date, App.company, App.Supplier, App.DocType, App.EntryType);

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
        public JsonResult LoadEditDebDetails(int Debit_id)
        {
            return Json(PuDb.GetDebEditDetails(Debit_id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadMailDetails(int Debit_id)
        {
            return Json(PuDb.LoadMailDetails(Debit_id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadItemDebEditDetails(int? InvMasId)
        {
            var getDetails = PuDb.ListDebEditItemDetails(InvMasId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadDataOrdEditDebDetails(int? Debit_id, int? GrnDetId, string Mode)
        {
            var getDetails = PuDb.ListDebEditOrderDetails(Debit_id, GrnDetId, Mode).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(PurDebitMas opEj)
        {
            var result = PuDb.UpdatePDebInvEntry(opEj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(PurDebitMas opDj)
        {
            var result = PuDb.DeletePDebInvEntry(opDj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
    }
}
