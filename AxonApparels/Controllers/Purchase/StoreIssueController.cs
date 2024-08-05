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
    public class StoreIssueController : Controller
    {
        //
        // GET: /StoreIssue/

        IStoreDeliveryBusiness oblDel = new StoresDeliveryBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult StoreIssueIndex()
        {
            GetMainLoad("", "", "", "", "", 0, "", "", 0, 0);
            return View();
        }
        public JsonResult LoadAddDetails(int? Companyid, int? Buyerid, string OrderNo, string RefNo, int? FromStoreUnitID, int? Companyunitid, string Job_Mac_Gen, string ItemType, string unit_or_other, string IgroupId)
        {

            var getDetails = oblDel.ListAddDetails(Companyid, Buyerid, OrderNo, RefNo, FromStoreUnitID, Companyunitid, Job_Mac_Gen, ItemType, unit_or_other, IgroupId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDelyItemDetails(string JMasId, string Job_Mac_Gen, string ItemType, string ItemGroup,int Storeid,int Processid)
        {
            var getDetails = oblDel.ListDelyItemDetails(JMasId, Job_Mac_Gen, ItemType, ItemGroup, Storeid, Processid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDelyOrderDetails(string JMasId, string Job_Mac_Gen, string ItemType, int OItemid, int OColorid, int OSizeid, int OUomid, int ESNo, int Processid)
        {
            var getDetails = oblDel.ListDelyOrderDetails(JMasId, Job_Mac_Gen, ItemType, OItemid, OColorid, OSizeid, OUomid, ESNo, Processid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDelyStockDetails(string JMasId, string Job_Mac_Gen, string ItemType, int Companyid, int FromStoreUnitID, string Joborderno, int SItemid, int SColorid, int SSizeid, int SUomid, int ONo, int Processid)
        {

            var getDetails = oblDel.ListDelyStockDetails(JMasId, Job_Mac_Gen, ItemType, Companyid, FromStoreUnitID, Joborderno, SItemid, SColorid, SSizeid, SUomid, ONo, Processid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(StoresDelivery opj)
        {
            var result = oblDel.CreateDelEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetUnit(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid)
        {
            return Json(oblDel.GetDataUnitDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrd(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {
            return Json(oblDel.GetDataOrderDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid, OrderNo, RefNo, desunitid, IssueId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetIssue(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {
            return Json(oblDel.GetDataIssueDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid, OrderNo, RefNo, desunitid, IssueId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDis(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {
            return Json(oblDel.GetDataDisDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid, OrderNo, RefNo, desunitid, IssueId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMainLoad(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StoreIssueAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StoreIssueAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                            menu = MenuNumber.MenuStoresDelivery;
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StoreIssueAddFlg = "";
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
                var result = oblDel.GetDataDelyMainDetails(unit_or_other, Job_Mac_Gen, ItemType, FromDate, ToDate, Companyid, OrderNo, RefNo, desunitid, IssueId).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (StoresDelivery App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\"  " + Edit + "=\"" + Edit + "\"  onclick=\"return getbyID({0},{6})\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0},{6})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\"   " + Print + "=\"" + Print + "\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return StoreIssuePrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.IssueId, App.Unit_supplier_self, App.Unit, App.Issueno, App.Issuedate, App.Reference, App.RIssId);

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
        public JsonResult LoadEditDeliDetails(int IssueId)
        {
            return Json(oblDel.GetDeliEditDetails(IssueId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadItemEditDetailsDel(int IssueId, string Job_Mac_Gen)
        {
            var getDetails = oblDel.GetEditDetDetails(IssueId, Job_Mac_Gen).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadOrderEditDetailsDel(int IssueId, int OItemid, int OColorid, int OSizeid, int OUomid, string Job_Mac_Gen)
        {
            var getDetails = oblDel.GetEditOrdDetails(IssueId, OItemid, OColorid, OSizeid, OUomid, Job_Mac_Gen).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadStockEditDetailsDel(int? IssueId, int? OItemid, int? OColorid, int? OSizeid, int? OUomid, string Job_Mac_Gen, int? Companyid, int? FromStoreUnitID)
        {
            var getDetails = oblDel.GetEditStkDetails(IssueId, OItemid, OColorid, OSizeid, OUomid, Job_Mac_Gen, Companyid, FromStoreUnitID).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(StoresDelivery ObjPE)
        {
            return Json(oblDel.UpdateDelEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(StoresDelivery ObjPE)
        {
            return Json(oblDel.DeleteDelEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadMainOrderdet(int IssId)
        {
            return Json(oblDel.LoadMainOrderdet(IssId), JsonRequestBehavior.AllowGet);
        }
    }
}
