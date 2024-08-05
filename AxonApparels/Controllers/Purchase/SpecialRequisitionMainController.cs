using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Purchase
{
    public class SpecialRequisitionMainController : Controller
    {
        //
        // GET: /SpecialRequisitionMain/
        ISpecialRequisitionMainBusiness obPGo = new SpecialRequisitionMainBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult SpecialRequisitionMainIndex()
        {
            GetkMainDetails(0, "", "", "", "", 0, "", 0, 0, "", "", "");
            return View();
        }
        public JsonResult GetkMainDetails(int? companyId, string type, string orderno, string refno, string jobordno, int? reqid, string reqno, int? styleid, int? unitid, string unitrother, string fromDate, string todate)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.SpecialReqAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.SpecialReqAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                            menu = MenuNumber.MenuSpecialRequisition;
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.SpecialReqAddFlg = "";
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
                var result = obPGo.GetDataMainList(companyId, type, orderno, refno, jobordno, reqid, reqno, styleid, unitid, unitrother, fromDate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (SpecialReqMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({7})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {7} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({7})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" id=\"btnPrint\" onclick=\"return SplReqPrint({7})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.unitid, App.unit, App.Spl_Req_No, App.Spl_Req_Date, App.Ref_No, App.orderno, App.Job_Ord_No, App.Spl_Reqid);

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

        public JsonResult GetkMainDetailsApproval(int? companyId, string type, string orderno, string refno, string jobordno, int? reqid, string reqno, int? styleid, int? unitid, string unitrother, string fromDate, string todate)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";

                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {

                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuSpecialReqApproval;

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        Add = "";
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
                var result = obPGo.GetDataMainList(companyId, type, orderno, refno, jobordno, reqid, reqno, styleid, unitid, unitrother, fromDate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (SpecialReqMas App in result)
                {

                    if (App.App_By > 0)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({7})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {7} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({7})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"  onclick=\"return SplReqPrint({7})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.unitid, App.unit, App.Spl_Req_No, App.Spl_Req_Date, App.Ref_No, App.orderno, App.Job_Ord_No, App.Spl_Reqid);

                    }
                    else
                    {

                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnAdd\" onclick=\"return getbyID({7})\"  " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a>'],", App.unitid, App.unit, App.Spl_Req_No, App.Spl_Req_Date, App.Ref_No, App.orderno, App.Job_Ord_No, App.Spl_Reqid);
                    }
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

        public JsonResult GetMainddldet(int? companyId, string type, string orderno, string refno, string jobordno, int? reqid, string reqno, int? styleid, int? unitid, string unitrother, string fromDate, string todate)
        {
            return Json(obPGo.GetDataMainList(companyId, type, orderno, refno, jobordno, reqid, reqno, styleid, unitid, unitrother, fromDate, todate), JsonRequestBehavior.AllowGet);


        }
    }
}
