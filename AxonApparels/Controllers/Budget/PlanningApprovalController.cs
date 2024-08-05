using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Budget
{
    public class PlanningApprovalController : Controller
    {
        //
        // GET: /PlanningApproval/
        IPlanningApprovalBusiness obj = new PlanningApprovalBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        public ActionResult PlanningApprovalIndex()
        {
            LoadMaingrid(0, 0, "", "", "", "", "", "");
            return View();
        }
        public JsonResult LoadMaingrid(int? cmpid, int? styleid, string ordno, string refno, string type, string ordtype, string fromdate, string todate)
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

                        menu = MenuNumber.MenuPlanningApproval;

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
                var result = obj.LoadMaingrid(cmpid, styleid, ordno, refno, type, ordtype, fromdate, todate).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (PlanningApproval App in result)
                {
                    if (App.type == "PENDING")
                    {

                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \" onclick=\"return getbyAddID({0,7})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" disabled=\"disabled\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i></a>'],", App.stylerwid, App.buyer, App.orderno, App.style, App.refno, App.date, App.qty, App.styleid);
                    }
                    else if (App.type == "APPROVED")
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','<a id=\" {0} \" onclick=\"return getbyAddID({0,7})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" disabled=\"disabled\" data-placement=\"top\" title=\"Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyEditID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \" onclick=\"return getbyDeleteID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i></a>'],", App.stylerwid, App.buyer, App.orderno, App.style, App.refno, App.date, App.qty, App.styleid);

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
        public JsonResult LoadMaingriddet(int? cmpid, int? styleid, string ordno, string refno, string type, string ordtype, string fromdate, string todate)
        {

            return Json(obj.LoadMaingrid(cmpid, styleid, ordno, refno, type, ordtype, fromdate, todate), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadBomdet(string ordno, int styleid,int Itemid )
        {

            return Json(obj.LoadBomdet(ordno, styleid, Itemid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(PlanningApproval str)
        {
            var result = obj.CreateAppEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadBomdetEdit(string ordno, int styleid,int Itemid)
        {

            return Json(obj.LoadBomdetEdit(ordno, styleid, Itemid), JsonRequestBehavior.AllowGet);

        }
    }
}
