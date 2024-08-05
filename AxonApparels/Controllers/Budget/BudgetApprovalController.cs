using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Domain;
using AxonApparel.Common;
namespace AxonApparels.Controllers
{
    public class BudgetApprovalController : Controller
    {
        //
        // GET: /BudgetApproval/
        IBudgetApprovalBusiness obj = new BudgetApprovalBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult BudgetApprovalIndex()
        {
            LoadMaingrid(0, 0, "", "", "", "", "", "");
            return View();
        }
        public JsonResult LoadMaingrid(int? cmpid, int? styleid, string ordno, string refno, string type,string ordtype, string fromdate, string todate)
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
                       
                            menu = MenuNumber.MenuBudgetApproval;
                       
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
                var result = obj.LoadMaingrid( type,ordtype, fromdate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (BudgetApproval App in result)
                {
                    if (App.type == "BUDGET")
                    {

                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \" onclick=\"return getbyAddID({0,7})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" disabled=\"disabled\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\"  " + Delete + "=\"" + Delete + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i></a>'],", App.stylerwid, App.buyer, App.orderno, App.style, App.refno, App.date, App.qty, App.styleid);
                    }
                    else if (App.type == "APPROVED")
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \" onclick=\"return getbyAddID({0,7})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" " + Add + "=\"" + Add + "\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" disabled=\"disabled\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" " + Delete + "=\"" + Delete + "\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i></a><a><button type=\"button\" id=\"btnPrint\" " + Print + "=\"" + Print + "\"   class=\"btnSelect btn btn_round btn-success\" onclick=\"return SubPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.stylerwid, App.buyer, App.orderno, App.style, App.refno, App.date, App.qty, App.styleid);

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
        public JsonResult LoadMaingriddet(int? cmpid, int? styleid, string ordno, string refno, string type,string ordtype, string fromdate, string todate)
        {

            return Json(obj.LoadMaingrid( type, ordtype, fromdate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadpcsWt(string ordno, int styleid)
        {

            return Json(obj.LoadPcsWt(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadBomdet(string ordno, int styleid)
        {

            return Json(obj.LoadBomdet(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadProcessdet(string ordno, int styleid)
        {

            return Json(obj.LoadProcessdet(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadProdtundet(string ordno, int styleid)
        {

            return Json(obj.LoadProductndet(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(Cost_Defn_Mas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadBomdetEdit(string ordno, int styleid)
        {

            return Json(obj.LoadBomdetEdit(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadProcessdetEdit(string ordno, int styleid)
        {

            return Json(obj.LoadProcessdetEdit(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadProdtundetEdit(string ordno, int styleid)
        {

            return Json(obj.LoadProductndetEdit(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadChkbom(string ordno, int styleid)
        {

            return Json(obj.LoadChkbom(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadChkProcess(string ordno, int styleid)
        {

            return Json(obj.LoadChkProcess(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadChkProdutnOrd(string ordno, int styleid)
        {

            return Json(obj.LoadChkProdutnOrd(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadChkprod(string ordno, int styleid)
        {

            return Json(obj.LoadChkprod(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadChkCutting(string ordno, int styleid)
        {

            return Json(obj.LoadChkCutting(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(Cost_Defn_Mas str)
        {
            var result = obj.UpdateData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Revert(Cost_Defn_Mas str)
        {
            var result = obj.RevertData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Lock(Cost_Defn_Mas str)
        {
            var result = obj.LockData(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }



        public JsonResult LoadCommdet(string ordno, int styleid)
        {

            return Json(obj.LoadCommdet(ordno, styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadCommdetEdit(string ordno, int styleid)
        {

            return Json(obj.LoadCommdetEdit(ordno, styleid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadLockDet(string ordno, int styleid,string Type)
        {

            return Json(obj.LoadLockDet(ordno, styleid,Type), JsonRequestBehavior.AllowGet);

        }

    }
}
