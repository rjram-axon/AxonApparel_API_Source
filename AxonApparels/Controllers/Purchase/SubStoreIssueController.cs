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
    public class SubStoreIssueController : Controller
    {
        ISubStoreIssueBusiness strobj = new SubStoreIssueBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        //
        // GET: /SubStoreIssue/

        public ActionResult SubStoreIssueIndex()
        {
            List(0, 0, 0, "", "", "", 0, "", "", "", "");
            return View();
        }

        public JsonResult GetSubStoreStockAdd (int Compid, int Styleid, string JobNo,string OrderNo,string RefNo,int Storeid,int itemid,int itemgrpid,int processid,string Ordtype)
        {
            return Json(strobj.GetSubStoreStockAdd(Compid, Styleid, JobNo, OrderNo, RefNo, Storeid, itemid, itemgrpid, processid, Ordtype), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSubStoreStockEdit(int Masid)
        {
            return Json(strobj.GetSubStoreStockEdit(Masid), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadIssueNo() {
            return Json(strobj.LoadIssueNo(), JsonRequestBehavior.AllowGet);
        
        }


        [HttpPost]
        public JsonResult Add(StoreTransferMas Spm)
        {
            var result = strobj.Create(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(StoreTransferMas Spm)
        {
            var result = strobj.Update(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(StoreTransferMas Spm)
        {
            var result = strobj.Delete(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public ActionResult List(int Companyid, int IsuStoreid, int RcptStoreid,string OrderNo,string RefNo,string JobNo,int masid,string ordtype,string Frmdate,string Todate,string type)
        {
            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StoreTransAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StoreTransAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                        if (type == "Issue")
                        {
                            menu = MenuNumber.MenuSubStoreIssue;
                        }
                        else if (type == "Receipt")
                        {
                            menu = MenuNumber.MenuSubStoreReceipt;
                        }

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StoreTransAddFlg = "";
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
                var result = strobj.GetMainList(Companyid, IsuStoreid, RcptStoreid, OrderNo, RefNo, JobNo, masid, ordtype, Frmdate,Todate);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (StoreTransferMas str in result.Value)
                {
                    if(type =="Issue"){
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyID({0},{6})\"  " + Edit + "=\"" + Edit + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return GetDelete({0},{6})\"  " + Delete + "=\"" + Delete + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return SubstoreIssuePrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", str.MasID, str.IssueStore, str.ReceiptStore, str.Transno, str.TransDate, str.RefNo, str.ChkRecpt);
                
                    }
                    else if (type == "Receipt")
                    {
                        if (str.ChkRecpt == 0)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnRecAdd\" onclick=\"return getbyRecptAddID({0})\"  " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" ><i class=\"fa fa-plus\" style=\"cursor: pointer;\"></i></button></a>'],", str.MasID, str.IssueStore, str.ReceiptStore, str.Transno, str.TransDate, str.RefNo, str.ChkRecpt);
                        }
                        else {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \" onclick=\"return getbyReceptEditID({0})\"  " + Edit + "=\"" + Edit + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return GetReceptDelete({0})\"  " + Delete + "=\"" + Delete + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return SubstoreIssuePrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", str.MasID, str.IssueStore, str.ReceiptStore, str.Transno, str.TransDate, str.RefNo, str.ChkRecpt);
                        }
                    }
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                //return Json(result, JsonRequestBehavior.AllowGet);
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }


    }
}
