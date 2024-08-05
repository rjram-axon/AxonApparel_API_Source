using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;
namespace AxonApparels.Controllers.Production
{
    public class GeneralProcessOrderController : Controller
    {
        //
        // GET: /GeneralProcessOrder/
        IGeneralProcessOrderBusiness obj = new GeneralProcessOrderBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        public ActionResult GeneralProcessOrderIndex()
        {
            LoadMaingrid(0, "", "", "", 0, "", "", 0, 0, 0, "", "");
            return View();
        }
        public JsonResult LoadStkDet(int itmid, int clrid, int sizeid, int cmpid, int strunitid)
        {

            return Json(obj.Getstkdet(itmid, clrid, sizeid, cmpid, strunitid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult IssueAdd(ProcessOrdMas str)
        {
            var result = obj.CreateIss(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadMaingriddet(int cmpid, string closed, string buyrsamp, string processortype, int prodordid, string prodord, string type, int processorid, int unitid, int processid, string fromdate, string todate)
        {

            return Json(obj.LoadMaingrid(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate)
        {

            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.GenProcOrdAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.GenProcOrdAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                            menu = MenuNumber.MenuGeneralProcessOrder;
                        

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.GenProcOrdAddFlg = "";
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
                var result = obj.LoadMaingrid(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProcessOrderAddScreen App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \"<button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return GenProcOrdPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.productionordid, App.prodnord, App.proddate, App.company, App.cmpnyunit, App.process, App.processor, App.type);

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
        public JsonResult LoadEditOutputItmgrid(int prodid)
        {

            return Json(obj.LoadEditOutputitmsgrid(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditInputItmgrid(int prodid)
        {

            return Json(obj.LoadEditInputitmsgrid(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadStkDetEdit(int processordid)
        {

            return Json(obj.Getstkdetedit(processordid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult IssueUpdate(ProcessOrdMas str)
        {
            var result = obj.UpdateIss(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteIss(ProcessOrdMas ObjPE)
        {
            return Json(obj.DeleteIssDelEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadProcess()
        {

            return Json(obj.LoadProcess(), JsonRequestBehavior.AllowGet);

        }
    }
}
