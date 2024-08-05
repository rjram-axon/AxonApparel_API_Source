using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class AlertSetupController : Controller
    {
        IAlertSetupBusiness strobj = new AlertSetupBusiness();
        IRoleBusiness Roleobj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        //
        // GET: /StoreSetup/

        public ActionResult AlertSetupIndex()
        {
            List("",0);
            return View();
        }

        public ActionResult List( string Alerttype,int Alertid)
        {
            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.AlertSetupAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.AlertSetupAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuGrantRights;

                    var res = Roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.AlertSetupAddFlg = "";
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
                var result = strobj.GetMainList(Alerttype,Alertid);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (AlertType str in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" " + Edit + "=\"" + Edit + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> '],", str.AlertID,str.AlertName,str.AlertCategory);
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

        public JsonResult GetAlertDDL(String Type)
        {
            return Json(strobj.GetDDlList(Type), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAlertEditbyid(int Alertid)
        {
            return Json(strobj.GetAlertEditbyid(Alertid), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAlertDetails(string Alertname,string Category,string Orderno)
        {
            return Json(strobj.GetAlertDetails(Alertname, Category, Orderno), JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
       
        public JsonResult Update(List<User_Grant_AlertRights> Spm)
        {
            return Json(strobj.UpdateSetup(Spm), JsonRequestBehavior.AllowGet);
        }
      

    }
}
