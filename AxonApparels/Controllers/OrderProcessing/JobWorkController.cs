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
    public class JobWorkController : Controller
    {
        //
        // GET: /JobWork/

        IJobWorkBusiness oblJob = new JobWorkBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult JobWorkIndex()
        {
            GetMainLoad(0, 0, 0, 0, "", "", "", "", "", "", "N");
            return View();
        }
        public JsonResult LoadJobAddDetails(int? companyid, int? BuyerId, int? StyleId, string OrderNo, string RefNo, string BRefNo)
        {
            var getDetails = oblJob.ListJobAddDetails(companyid, BuyerId, StyleId, OrderNo, RefNo, BRefNo).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetJobEntryDetails(string OrderNo, int StyleRowId)
        {
            return Json(oblJob.GetLoadJobEntryDetails(OrderNo, StyleRowId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadJobEntryShipDetails(int StyleRowId)
        {
            var getDetails = oblJob.ListJobShipDetails(StyleRowId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadJobEntryItemDetails(int StyleRowId, int? ShipRowId)
        {
            var getDetails = oblJob.ListJobItemDetails(StyleRowId, ShipRowId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(JobWorkDetails ObjPlanSE)
        {
            var result = oblJob.CreateJobEntry(ObjPlanSE);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListDetails(string order, int stylId, string Type, string StageType, string JobOrderNo)
        {
            var getCompDetails = oblJob.GetList(order, stylId, Type, StageType, JobOrderNo).Value.ToList();
            return Json(getCompDetails, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetMainLoad(int? companyid, int? BuyerId, int? SupplierId, int? StyleId, string OrderNo, string RefNo, string JobOrderNo, string Fdate, string Tdate, string OrderType, string DispatchClosed)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.JobAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.JobAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                     menu = MenuNumber.MenuJobOrder;
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.JobAddFlg = "";
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
                var result = oblJob.GetDataJobMainDetails(companyid, BuyerId, SupplierId, StyleId, OrderNo, RefNo, JobOrderNo, Fdate, Tdate, OrderType, DispatchClosed).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (JobWorkDetails App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0},{1})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnMDelete\" onclick=\"return getDeleteID({0},{1},{5},{6})\" " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a><button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return Job_Wrk_Print({0})\" " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.JobOrderId, App.StyleRowId, App.JobOrderNo, App.OrderDate, App.OrderNo, App.ChkBomPurJQty, App.ChkJQty, App.Buy_Ord_MasId, App.RefNo, App.StyleId, App.StyleName, App.BuyerId, App.Buyer, App.SupplierId, App.SupplierName);

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

        public JsonResult LoadEditJobDetails(int JobOrderId, int StyleRowId)
        {
            return Json(oblJob.GetJobEditDetails(JobOrderId, StyleRowId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetJobEditShipDetails(int JobOrderId, int StyleRowId)
        {
            var getDetails = oblJob.ListJobEditShipDetails(JobOrderId, StyleRowId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetJobEntryEditItemDetails(int JobOrderId)
        {
            var getDetails = oblJob.ListJobEditItemDetails(JobOrderId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStage()
        {
            return Json(oblJob.GetBussStage(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(JobWorkDetails ObjPlanESE)
        {
            return Json(oblJob.UpdateJobWorkEntry(ObjPlanESE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(JobWorkDetails ObjPlanDSE)
        {
            return Json(oblJob.DeleteJobWorkEntry(ObjPlanDSE), JsonRequestBehavior.AllowGet);
        }
    }
}
