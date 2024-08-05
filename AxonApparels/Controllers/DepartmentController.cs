using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using System.Web.Mvc;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class DepartmentController : Controller
    {
        //
        // GET: /Department/
        IDepartmentBusiness deptobj = new DepartmentBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        public ActionResult DepartmentIndex()
        {
            Department dt = new Department();
            List(dt);
            return View();
        }
        [HttpPost]
        public JsonResult Add(Department str)
        {
            var result = deptobj.CreateDepartment(str);
            //if (result.Status == "SUCCESS")
            //{
            //    return Json("Data Saved", JsonRequestBehavior.AllowGet);

            //}
            //else
            //{
            //    return Json("Sorry, this name already exists", JsonRequestBehavior.AllowGet);

            //}
            return Json(result, JsonRequestBehavior.AllowGet);

                //MessageBox.Show("Your  Message");

               // this.ScriptManager.RegisterStartupScript(this.GetType(), "alert", "alert('You clicked YES!')", true);
            //    string message = "Your request is being processed.";
            //    System.Text.StringBuilder sb = new System.Text.StringBuilder();
            //    sb.Append("alert('");
            //    sb.Append(message);
            //    sb.Append("');");
            //    Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "alert", sb.ToString());

            //}

        }
        public JsonResult Update(Department str)
        {
            return Json(deptobj.UpdateDepartment(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(deptobj.GetDepartmentId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(deptobj.DeleteDepartment(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDepartment()
        {
            return Json(deptobj.GetDepartment(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Department str)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var username = Session["UserName"].ToString();
                var SUser = "";
                if (username == "superuser")
                {
                    SUser = "superuser";
                }
                var result = deptobj.GetDepartment();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                String Str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    Str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuDepartment, "'{0}','{1}','{2}'",SUser);

                    string[] StrArr = Str1.Split('$');
                    ViewBag.DepartmentAddFlg = StrArr[0];
                    Str1 = StrArr[1];

                    foreach (Department deptlist in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", deptlist.DepartmentId, deptlist.DepartmentName, deptlist.IsActive);
                        sb.AppendFormat(Str1, deptlist.DepartmentId, deptlist.DepartmentName, deptlist.IsActive);
                    }
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetDepartmentRefDetails(int DepartmentId)
        {
            var getDetails = deptobj.GetDepartmentCheckItemDetails(DepartmentId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
