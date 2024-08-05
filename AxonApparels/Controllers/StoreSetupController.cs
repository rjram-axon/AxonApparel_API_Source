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
    public class StoreSetupController : Controller
    {
        IStoreSetupBusiness strobj = new StoreSetupBusiness();
        IRoleBusiness Roleobj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        //
        // GET: /StoreSetup/

        public ActionResult StoreSetupIndex()
        {
            List(0, 0);
            return View();
        }

        public ActionResult List(int Employeeid, int Storeid)
        {
            try 
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StoreSetupAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StoreSetupAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                      
                            menu = MenuNumber.MenuStoreSetup;

                    var res = Roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StoreSetupAddFlg = "";
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
                var result = strobj.GetMainList(Employeeid, Storeid);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (EmpStoreSetup str in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" " + Edit + "=\"" + Edit + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return GetDelete({0})\"   data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" " + Delete + "=\"" + Delete + "\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", str.Employeeid, str.Employee, str.Designation);
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
        public JsonResult GetEmployeeDDl()
        {
            return Json(strobj.GetEmployeeDDl(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStoreDDL()
        {
            return Json(strobj.GetStoreDDL(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAddSetup()
        {
            return Json(strobj.GetAddSetup(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEditSetup(int id)
        {
            return Json(strobj.GetEditSetup(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStoreRights(int Userid,string Storetype,int Companyid)
        {
            return Json(strobj.GetStoreRights(Userid, Storetype, Companyid), JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult Add(EmpStoreSetup Spm)
        {
            var result = strobj.CreateSetup(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(EmpStoreSetup Spm)
        {
            return Json(strobj.UpdateSetup(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(EmpStoreSetup Spm)
        {
            return Json(strobj.DeleteSetup(Spm), JsonRequestBehavior.AllowGet);
        }

    }
}
