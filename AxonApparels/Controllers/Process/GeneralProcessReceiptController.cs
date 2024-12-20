﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;
namespace AxonApparels.Controllers
{
    public class GeneralProcessReceiptController : Controller
    {
        //
        // GET: /GeneralProcessReceipt/
        IGeneralProcessReciptBusiness obj = new GeneralProcessReceiptBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult GeneralProcessReceiptIndex()
        {
            LoadMaingrid(0, 0, 0, 0, 0, 0, "", "", "", "", "", "", "",0);
            return View();
        }
        public JsonResult Getprocess(int cmpid, int cmpunitid, string ordertype)
        {

            return Json(obj.Getprocess(cmpid, cmpunitid, ordertype), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getprocessor()
        {

            return Json(obj.Getprocessor(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetWrkdiv()
        {

            return Json(obj.Getwrkdiv(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Getissueno(int cmpid, int cmpunitid, int processid, int processorid)
        {

            return Json(obj.Getissueno(cmpid, cmpunitid, processid, processorid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadcolor(int cmpid, int cmpunitid, int processid, int processorid)
        {

            return Json(obj.Loadcolor(cmpid, cmpunitid, processid, processorid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadaddgrid(int cmpid, int cmpunitid, int processid, int processorid, string ordtype, string clsed)
        {

            return Json(obj.Loadaddgrid(cmpid, cmpunitid, processid, processorid, ordtype, clsed), JsonRequestBehavior.AllowGet);

        }
          public JsonResult Loaditm(string pid)
        {

            return Json(obj.LoadItmgrid(pid), JsonRequestBehavior.AllowGet);

        }
          public JsonResult Loadjobddet(string pid)
          {

              return Json(obj.Loadjobdetgrid(pid), JsonRequestBehavior.AllowGet);

          }
          public JsonResult Add(ProcessReceiptMas str)
          {
              var result = obj.CreateUnitEntry(str);
              return Json(result, JsonRequestBehavior.AllowGet);
          }
          public JsonResult LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int processorid)
          {

              try
              {
                  var Add = "disabled";
                  var Edit = "disabled";
                  var Delete = "disabled";
                  var Print = "disabled";
                  ViewBag.GenProcRecptAddFlg = "disabled";
                  int menu = 0;
                  var username = Session["UserName"].ToString();

                  if (username == "superuser")
                  {
                      ViewBag.GenProcRecptAddFlg = "";
                      Add = "";
                      Edit = "";
                      Delete = "";
                      Print = "";
                  }
                  else
                  {
                      int roleid = Convert.ToInt16(Session["RoleId"]);
                      if (roleid != 0)
                          
                      menu = MenuNumber.MenuGeneralProcessReceipt;
                         
                      var res = roleobj.GetRolebyId(roleid, menu, 0);
                      var ret = res.Value.RoleDetList.ToList();

                      // ViewBag.OrderAddFlg = ret[0].AddFlg;

                      if (ret[0].AddFlg == 1)
                      {
                          ViewBag.GenProcRecptAddFlg = "";
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
                  var result = obj.LoadMaingrid(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate, processorid).Value.ToList();
                  if (result == null)
                      return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                  foreach (ProcessReceiptMas App in result)
                  {
                      sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\"  " + Delete + "=\"" + Delete + "\"  onclick=\"return getDeleteID({0})\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \"<button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return GenProcRecpt({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.proc_recpt_masid, App.proc_recpt_no, App.proc_recpt_date, App.unit, App.process, App.Recpt_Ref_no, App.type, App.supplier);

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
          public JsonResult LoadMaingriddet(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int processorid)
          {

              return Json(obj.LoadMaingrid(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate, processorid), JsonRequestBehavior.AllowGet);

          }
          public JsonResult Loadedititemdet(int pid)
          {

              return Json(obj.LoadEditItmgrid(pid), JsonRequestBehavior.AllowGet);

          }
          public JsonResult Loadeditjobdetdet(int pid)
          {

              return Json(obj.LoadEditjobdetgrid(pid), JsonRequestBehavior.AllowGet);

          }

          public JsonResult ChkDC(string recpt, int pid)
          {

              return Json(obj.ChkDC(recpt, pid), JsonRequestBehavior.AllowGet);

          }
          public JsonResult Delete(ProcessReceiptMas ObjPE)
          {
              return Json(obj.DeleteDelEntry(ObjPE), JsonRequestBehavior.AllowGet);
          }
          public JsonResult Update(ProcessReceiptMas str)
          {
              var result = obj.UpdateData(str);
              return Json(result, JsonRequestBehavior.AllowGet);
          }
    }
}
