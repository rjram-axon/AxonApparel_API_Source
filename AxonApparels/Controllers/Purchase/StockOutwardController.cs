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
    public class StockOutwardController : Controller
    {
        //
        // GET: /StockOutward/
        IStockOutwardBusiness obj = new StockOutwardBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        public ActionResult StockOutwardIndex()
        {
            GetStkoutMainDetails("", 0, "", 0, "", 0, 0, 0, "", "");
            return View();
        }
        public JsonResult GetItem(int ItemGroupId)
        {
            return Json(obj.GetItem(ItemGroupId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUom(int itmid)
        {
            return Json(obj.GetUom(itmid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetPurUom(int itmid)
        {
            return Json(obj.GetPurUom(itmid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetStkdet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno, int FabReqId , string Orderno,int Styleid)
        {
            return Json(obj.GetStkDet(type, cmpid, itmid, colorid, sizeid, uomid, issueid, procid, stunitid, itmcat, ordno, FabReqId, Orderno, Styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetItmeditdet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno)
        {
            return Json(obj.GetItmeditDet(type, cmpid, itmid, colorid, sizeid, uomid, issueid, procid, stunitid, itmcat, ordno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(GenIssueMas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(GenIssueMas ObjPSeq)
        {
            return Json(obj.Update(ObjPSeq), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDataMainList(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid, int? suppid, int? procid, string fromDate, string todate)
        {

            return Json(obj.GetDataMainList(ivtype, issueid, issueno, cmpnyid, unittype, unitid, suppid, procid, fromDate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetStkoutMainDetails(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid, int? suppid, int? procid, string fromDate, string todate)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StkOutwardAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StkOutwardAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                            menu = MenuNumber.MenuStockOutward;
                      

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StkOutwardAddFlg = "";
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
                var result = obj.GetDataMainList(ivtype, issueid, issueno, cmpnyid, unittype, unitid, suppid, procid, fromDate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (GenIssueMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0})\" class=\"btnSelect btn btn_round btn-danger\"  " + Delete + "=\"" + Delete + "\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-minus\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return StkOutPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", App.IssueId, App.company, App.unit, App.IssueNo, App.IssueDate, App.invoice, App.NetAmount);

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
        public JsonResult Delete(GenIssueMas ObjPSeq)
        {
            return Json(obj.Delete(ObjPSeq), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDataHeaderdet(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid, int? suppid, int? procid, string fromDate, string todate)
        {

            return Json(obj.GetDataheaderdet(ivtype, issueid, issueno, cmpnyid, unittype, unitid, suppid, procid, fromDate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadAddlessEditContDetails(int id)
        {
            var getDetails = obj.ListGetEditAddlessDetails(id).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetItmReqdet(int ReqMasId)
        {
            return Json(obj.loadItmReqDet(ReqMasId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDataLoadReqNo()
        {
            return Json(obj.GetDataReqNoList(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDataLoadEditReqNo(string ReqMasNo)
        {
            return Json(obj.GetDataEditReqNoList(ReqMasNo), JsonRequestBehavior.AllowGet);

        }
    }
}
