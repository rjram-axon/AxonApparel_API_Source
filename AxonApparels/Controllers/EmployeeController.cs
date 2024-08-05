using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class EmployeeController : Controller
    {
        IEmployeeBusiness empobj=new EmployeeBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        //
        // GET: /Employee/

        public ActionResult EmployeeIndex()
        {
            Employee em = new Employee();
            List(em);
            return View();
        }

        [HttpPost]
        public JsonResult Add(Employee Spm)
        {
            var result = empobj.CreateEmployee(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(empobj.GetEmployeeId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEmployee()
        {
            return Json(empobj.GetEmployee(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Employee Spm)
        {
            return Json(empobj.UpdateEmployee(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(empobj.DeleteEmployee(ID), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Employee Spm)
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
                var result = empobj.GetEmployee();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuEmployee, "'{0}','{1}','{2}','{3}','{4}','{5}'",SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.EmployeeAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (Employee Employeemode in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delele({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Employeemode.EmpId, Employeemode.EmpName, (Employeemode.Address1 + " , " + Employeemode.Address2 + " , " + Employeemode.Address3), Employeemode.DepartmentName, Employeemode.DesignationName, Employeemode.IsActive);
                        sb.AppendFormat(str1 , Employeemode.EmpId, Employeemode.EmpName, (Employeemode.Address1 + " , " + Employeemode.Address2 + " , " + Employeemode.Address3), Employeemode.DepartmentName, Employeemode.DesignationName, Employeemode.IsActive);
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
        public JsonResult GetEmployeeRefDetails(int EmpId)
        {
            var getDetails = empobj.GetEmployeeCheckItemDetails(EmpId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
