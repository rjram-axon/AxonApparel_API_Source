using System;
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
    public class CSPReceiptController : Controller
    {
        //
        // GET: /CSPReceipt/
        ICSPReceiptBusiness obj = new CSPReceiptBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult CSPReceiptIndex()
        {
            LoadMaingrid(0, 0, 0, "", "", 0, "", "", "", "RCPT");
            return View();
        }
        public JsonResult GetAddlist(string ordno, int styleid, int cmpid)
        {

            return Json(obj.GetAddlist(ordno, styleid, cmpid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(CSPReceiptMas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadMaingriddet(int cmpid, int buyerid, int masid, string refno, string ordno, int styleid, string recptno, string fromdate, string todate)
        {

            return Json(obj.LoadMaingrid(cmpid, buyerid, masid, refno, ordno, styleid, recptno, fromdate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadMaingrid(int cmpid, int buyerid, int masid, string refno, string ordno, int styleid, string recptno, string fromdate, string todate, string CSPType)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.CSPAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.CSPAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                        if (CSPType == "RCPT")
                        {
                            menu = MenuNumber.MenuCSPReceipt;
                        }
                        else if (CSPType == "QLTY")
                        {
                            menu = MenuNumber.MenuCSPReceiptQuality;
                        }

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.CSPAddFlg = "";
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
                var result = obj.LoadMaingrid(cmpid, buyerid, masid, refno, ordno, styleid, recptno, fromdate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (CSPReceiptMas App in result)
                {
                    if (CSPType == "RCPT")
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>  <a id=\" {0} \"<button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" id=\"btnPrint\" onclick=\"return ProcRetPrint({0})\"  " + Print + "=\"" + Print + "\"  disabled=\"disabled\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button>'],", App.ReceiptID, App.ReceiptNo, App.ReceiptDate, App.buyer, App.OrderNo, App.RefNo, App.DCNo);
                    }
                    else if (CSPType == "QLTY")
                    {
                        if (App.QltyMode == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnAdd\" onclick=\"return AddQltyID({0})\"  " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"QltyAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-plus\" style=\"cursor: pointer;\"></i></button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button id=\"btnEdit\" disabled=\"disabled\" type=\"button\" onclick=\"return getbyQltyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" disabled=\"disabled\" onclick=\"return getQltyDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>  <a id=\" {0} \"<button type=\"button\" disabled=\"disabled\"  class=\"btnSelect btn btn_round btn-success\" id=\"btnPrint\" onclick=\"return ProcRetPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button>'],", App.ReceiptID, App.ReceiptNo, App.ReceiptDate, App.buyer, App.OrderNo, App.RefNo, App.DCNo);

                        }
                        else if (App.QltyMode > 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnAdd\" onclick=\"return AddQltyID({0})\" disabled=\"disabled\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\"  title=\"QltyAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-plus\" style=\"cursor: pointer;\"></i></button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyQltyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getQltyDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>  <a id=\" {0} \"<button type=\"button\"  class=\"btnSelect btn btn_round btn-success\" id=\"btnPrint\" onclick=\"return ProcRetPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button>'],", App.ReceiptID, App.ReceiptNo, App.ReceiptDate, App.buyer, App.OrderNo, App.RefNo, App.DCNo);
                        }
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
        public JsonResult LoadEditItmDet(int masid)
        {

            return Json(obj.GetEditlist(masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(CSPReceiptMas str)
        {
            var result = obj.UpdateData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(CSPReceiptMas str)
        {
            var result = obj.DeleteDet(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetQltyAddlist( int masid)
        {

            return Json(obj.GetQltyAddlist(masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetQltyAdddetlist(int masid)
        {

            return Json(obj.GetQltyAdddetlist(masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult QltyAdd(CSPReceiptMas str)
        {
            var result = obj.CreateUnitQlty(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult QltyUpdate(CSPReceiptMas str)
        {
            var result = obj.UpdateQlty(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult QltyDelete(CSPReceiptMas str)
        {
            var result = obj.DeleteQlty(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
