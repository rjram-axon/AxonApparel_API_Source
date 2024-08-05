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
    public class StoresDeliveryReturnController : Controller
    {
        //
        // GET: /StoresDeliveryReturn/

        IStoresDeliReturnBusiness oblDelR = new StoresDeliReturnBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult StoresDeliveryReturnIndex()
        {
            GetMainLoad(0, "", "", 0, "", 0, "", "", "");
            return View();
        }
        public JsonResult AGetOrdRefNo(int? Desunitid, string OType, string ItemType, int? CompanyId, int? Issueid, string Unit_Supplier_self)
        {
            return Json(oblDelR.GetDataOrderDetails(Desunitid, OType, ItemType, CompanyId, Issueid, Unit_Supplier_self), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AGetIssNo(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, string OrdNo, string RefNo)
        {
            return Json(oblDelR.GetDataIssDetails(Desunitid, OType, ItemType, CompanyId, OrdNo, RefNo, Unit_Supplier_self), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadAddDelRetDetails(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, string OrdNo, string RefNo, int? Issueid)
        {

            var getDetails = oblDelR.ListAddDetails(Desunitid, OType, ItemType, CompanyId, OrdNo, RefNo, Unit_Supplier_self, Issueid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetRetEntryDetails(int Issueid)
        {

            return Json(oblDelR.GetDataRetEntryDetails(Issueid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadStoresDeliItemDetails(int Issueid)
        {

            var getDetails = oblDelR.GetStoresDeliRetEntryDetails(Issueid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(StoresDeliveryReturn opj)
        {
            var result = oblDelR.CreateDelRetEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetMainOrd(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string Reference)
        {
            return Json(oblDelR.GetDataMainOrderDetails(Desunitid, OType, ItemType, CompanyId, Unit_Supplier_self, ReturnId, Reference), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainRefer(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo)
        {
            return Json(oblDelR.GetDataMainRefDetails(Desunitid, OType, ItemType, CompanyId, Unit_Supplier_self, ReturnId, OrdNo, RefNo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainRetNo(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, string OrdNo, string RefNo, string Reference)
        {
            return Json(oblDelR.GetDataMainRetDetails(Desunitid, OType, ItemType, CompanyId, Unit_Supplier_self, OrdNo, RefNo, Reference), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainUSuppNo(string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, string OrdNo, string RefNo, string Reference, int? ReturnId)
        {
            return Json(oblDelR.GetDataMainUnSuppDetails(OType, ItemType, CompanyId, Unit_Supplier_self, ReturnId, OrdNo, RefNo, Reference), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainLoad(int? Desunitid, string OType, string ItemType, int? CompanyId, string Unit_Supplier_self, int? ReturnId, string OrdNo, string RefNo, string Reference)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StoreIssueRetAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StoreIssueRetAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                     menu = MenuNumber.MenuStoresDeliveryReturn;
                      
                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StoreIssueRetAddFlg = "";
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
                var result = oblDelR.GetDataDeliRetMainDetails(Desunitid, OType, ItemType, CompanyId, Unit_Supplier_self,ReturnId, OrdNo, RefNo, Reference).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (StoresDeliveryReturn App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return StoresDelRetPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.ReturnId, App.Unit_Supplier_self, App.ReturnNo, App.ReturnDate, App.Reference, App.IssueNo, App.Desunitid, App.Desunit,
                        App.OrdNo,App.RefNo);

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
        public JsonResult LoadEditDeliRetDetails(int ReturnId)
        {
            return Json(oblDelR.GetDeliRetEditDetails(ReturnId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadItemEditDetailsDelRet(string ReturnNo, int Issueid, string OType)
        {

            var getDetails = oblDelR.GetStoresDeliRetEntryItemEdit(ReturnNo, Issueid, OType).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(StoresDeliveryReturn opj)
        {
            var result = oblDelR.UpdateDelRetEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(StoresDeliveryReturn ObjPE)
        {
            return Json(oblDelR.DeleteDelRetEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
    }
}
