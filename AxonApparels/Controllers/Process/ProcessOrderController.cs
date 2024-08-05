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
    public class ProcessOrderController : Controller
    {
        //
        // GET: /ProcessOrder/
        IProcessOrderBusiness obj = new ProcessOrderBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult ProcessOrderIndex()
        {
            LoadMaingrid(0, "", "W", "W", 0, "", "",0, 0, 0, "","", "", "", 0, "");
            return View();
        }
        public JsonResult Getrefno(int cmpid, int cmpunitid)
        {

            return Json(obj.Getrefno(cmpid, cmpunitid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetProcessSupplier(int Processordid)
        {

            return Json(obj.GetProcessSupplier(Processordid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetUserGroup(int Userid)
        {

            return Json(obj.GetUserGroup(Userid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype, int buyerid, string refno, int stylid, string orderno)
        {

            return Json(obj.Loadgrid(cmpid, closed, amend, cmpunitid, procid, ordertype, buyerid, refno, stylid, orderno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadOutputitmsgrid(string closed, string jobordno, int procid)
        {

            return Json(obj.LoadOutputitmsgrid(closed, jobordno, procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadInputitmsgrid(string closed, string jobordno, int procid)
        {

            return Json(obj.LoadInputitmsgrid(closed, jobordno, procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadOutputjobdetgrid(string closed, string jobordno, int procid, string OpenPgAp)
        {

            return Json(obj.LoadOutputjoborddetgrid(closed, jobordno, procid, OpenPgAp), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadInputjobdetgrid(string closed, string jobordno, int procid, string OpenPgAp)
        {

            return Json(obj.LoadInputjoborddetgrid(closed, jobordno, procid,OpenPgAp), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadInputStkWgrid(string itmcat, int itmid, int clrid, int sizeid, string jobordno, string transtype, int cmpid, int procid,int Storeid)
        {

            return Json(obj.LoadInputStkWgrid(itmcat, itmid, clrid, sizeid, jobordno, transtype, cmpid, procid, Storeid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(ProcessOrdMas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult IssueAdd(ProcessOrdMas str)
        {
            var result = obj.CreateIss(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult IssueUpdate(ProcessOrdMas str)
        {
            var result = obj.UpdateIss(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(ProcessOrdMas str)
        {
            var result = obj.UpdateData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult Delete(int id)
        //{
        //    return Json(obj.Delete(id), JsonRequestBehavior.AllowGet);
        //}
        public JsonResult LoadMaingriddet(int cmpid, string closed, string buyrsamp, string processortype, int prodordid, string prodord, string type, int processorid, int unitid, int processid, string fromdate, string todate, string orderno, string refno, int styleid,string AppType)
        {

            int Userid = Convert.ToInt32(Session["UserID"]);

            return Json(obj.LoadMaingriddet(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate, orderno, refno, styleid, AppType, Userid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType)
        {

            try
            {
                int Userid = Convert.ToInt32(Session["UserID"]);
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.ProcessOrderAddFlg = "disabled";

                ViewBag.ProcessOrderAppFlg = "disabled";

                ViewBag.ProcessOrderRevertFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.ProcessOrderAddFlg = "";
                    ViewBag.ProcessOrderAppFlg = "";

                    ViewBag.ProcessOrderRevertFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                      
                     menu = MenuNumber.MenuProcessOrder;

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.ProcessOrderAddFlg = "";
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

                    LoadViewbagProcApp(roleid);

                }
                 

                StringBuilder sb = new StringBuilder();
                var result = obj.LoadMaingrid(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate, orderno, refno, styleid, AppType, Userid).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProcessOrderAddScreen App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','{17}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0},{8})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0},{8})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \"<button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return ProcessOrdPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a><a id=\" {0} \" onclick=\"return getAppbyID({0},{8})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn-round btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"View Item\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-eye\"></i> </button></a> '],", App.productionordid, App.prodnord, App.proddate, App.company, App.cmpnyunit, App.process, App.processor, App.type, App.Approved, App.CheckClos, App.ProcessSetup, App.cmpunitid, App.orderno, App.refno, App.styleid,
                        App.style, App.processid, App.processorid);

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
        public JsonResult LoadApprovalMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType)
        {

            try
            {
                int Userid = Convert.ToInt32(Session["UserID"]);
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.ProcessOrderAddFlg = "disabled";

                ViewBag.ProcessOrderAppFlg = "disabled";

                ViewBag.ProcessOrderRevertFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.ProcessOrderAddFlg = "";
                    ViewBag.ProcessOrderAppFlg = "";

                    ViewBag.ProcessOrderRevertFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuProcessOrderApproval;

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

                    LoadViewbagProcApp(roleid);

                }


                StringBuilder sb = new StringBuilder();
                var result = obj.LoadMaingrid(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate, orderno, refno, styleid, AppType, Userid).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (ProcessOrderAddScreen App in result)
                {
                    if (App.Approved == 0)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','{17}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Add + "=\"" + Add + "\"  onclick=\"return getbyID({0},{8})\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" disabled=\"disabled\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>'],", App.productionordid, App.prodnord, App.proddate, App.company, App.cmpnyunit, App.process, App.processor, App.type, App.Approved, App.CheckClos, App.ProcessSetup, App.cmpunitid, App.orderno, App.refno, App.styleid,
                        App.style, App.processid, App.processorid);

                    }
                    else if (App.Approved == 1)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','{17}','<a id=\" {0} \" onclick=\"\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" " + Add + "=\"" + Add + "\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" disabled=\"disabled\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Edit + "=\"" + Edit + "\"   onclick=\"return getbyID({0},{8})\"  class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>'],", App.productionordid, App.prodnord, App.proddate, App.company, App.cmpnyunit, App.process, App.processor, App.type, App.Approved, App.CheckClos, App.ProcessSetup, App.cmpunitid, App.orderno, App.refno, App.styleid,
                          App.style, App.processid, App.processorid);

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
        public void LoadViewbagProcApp(int roleid)
        {

            var menu = MenuNumber.MenuProcessOrderApproval;

            var res1 = roleobj.GetRolebyId(roleid, menu, 0);
            var ret1 = res1.Value.RoleDetList.ToList();



            if (ret1[0].AddFlg == 1)
            {
                ViewBag.ProcessOrderAppFlg = "";
            }
            if (ret1[0].EditFlg == 1)
            {
                ViewBag.ProcessOrderRevertFlg = "";
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
        public JsonResult LoadEditOutputjobdetgrid(int prodid)
        {

            return Json(obj.LoadEditOutputJobDetgrid(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditInputjobdetgrid(int prodid)
        {

            return Json(obj.LoadEditInputJobDetgrid(prodid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadOrderMaindetails(int prodid)
        {

            return Json(obj.LoadOrderMaindetails(prodid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadOrderMaindetailsforProd(int prodid,string type)
        {

            return Json(obj.LoadOrderMaindetailsforProd(prodid, type), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadEditAddlessgrid(int prodid)
        {

            return Json(obj.LoadEditAddlessgrid(prodid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditInputStkDet(int cmpid, int prodid, string prodordno)
        {

            return Json(obj.LoadEditInputStkdet(cmpid, prodid, prodordno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(ProcessOrdMas ObjPE)
        {
            return Json(obj.DeleteDelEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteIss(ProcessOrdMas ObjPE)
        {
            return Json(obj.DeleteIssDelEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadIssueNo(int ordid)
        {

            return Json(obj.LoadIssueNo(ordid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadProcessCheckItemEditDetails(string RecNo)
        {
            var getDetails = obj.GetProEntryCheckEditItemDetails(RecNo).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderRefNo(string buyrsamp, string processortype, string fromDate, string todate)
        {

            return Json(obj.GetDataOrderRefDetails(buyrsamp, processortype, fromDate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetOrderStyle(string buyrsamp, string processortype, string fromDate, string todate)
        {

            return Json(obj.GetDataStyleDetails(buyrsamp, processortype, fromDate, todate), JsonRequestBehavior.AllowGet);

        }

        public JsonResult AppUpdate(ProcessOrdMas str)
        {
            var result = obj.AppUpdateData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AppRevert(ProcessOrdMas str)
        {
            var result = obj.RevUpdateData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckClosure(ProcessOrdMas str)
        {
            var result = obj.RevClosureData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
