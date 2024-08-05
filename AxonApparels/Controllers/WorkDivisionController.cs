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
    public class WorkDivisionController : Controller
    {
        //
        // GET: /WorkDivision/
        IWorkDivisionBusiness workUnit = new WorkDivisionBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        
        public ActionResult WorkDivisionIndex()
        {
            WorkDivision wd = new WorkDivision();
            List(wd);
            return View();
        }
         public JsonResult Add(WorkDivision wrk)
        {
            return Json(workUnit.CreateWorkDivision(wrk),JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int Id)
        {
            return Json(workUnit.GetWorkDivisionId(Id),JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(WorkDivision wrk)
        {
            return Json(workUnit.UpdateWorkDivision(wrk),JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int Id)
        {
            return Json(workUnit.DeleteWorkDivision(Id),JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetWorkDivisions()
        {
            return Json(workUnit.GetWorkDivision(),JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(WorkDivision wrk)
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
                var result = workUnit.GetWorkDivision();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)
                {


                    var roleoj = roleobj.GetRolebyIdAll(roleid);
                    var res = roleoj.Value;
                    string str = null;

                    str = GenRights.GenerateRights(roleid, MenuNumber.MenuWorkdivision, "'{0}','{1}','{2}','{3}' ",SUser);
                    string[] StrArr = str.Split('$');
                    str = StrArr[1];
                    ViewBag.WorkDivionAddFlg = StrArr[0];
                    foreach (WorkDivision WorkDivisionmode in result.Value)
                    {
                        sb.AppendFormat(str, WorkDivisionmode.WorkDivisionId, WorkDivisionmode.WorkDivisionName, WorkDivisionmode.DivisionType, WorkDivisionmode.IsActive);
                    }


                   // foreach (WorkDivision WorkDivisionmode in result.Value)
                     /*foreach (var list in res.RoleDetList)
                    {
                        if (list.MenuId == MenuNumber.MenuWorkdivision)
                        {
                            str = "['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" "+
                                " data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\">"+
                                " <button type=\"button\"  id=\"btnEdit\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" ";
                            if (list.EditFlg == 0)
                            {
                                str+= " disabled=\"disabled\"  " ;
                            }
                            str += "  style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  " +
                            " <i class=\"fa fa-pencil-square-o\"></i> </button></a>  " +
                            " <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"> " +
                            " <button type=\"button\"  id=\"btnDelete\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" ";
                            if (list.DelFlg == 0)
                            {
                            str+= " disabled=\"disabled\" ";
                            }
                                str+= " style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> "+
                                " <i class=\"fa fa-times\"></i> </button></a>'],";
                        
                            foreach (WorkDivision WorkDivisionmode in result.Value)
                            {
                                sb.AppendFormat(str , WorkDivisionmode.WorkDivisionId, WorkDivisionmode.WorkDivisionName, WorkDivisionmode.DivisionType, WorkDivisionmode.IsActive);
                            }
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", WorkDivisionmode.WorkDivisionId, WorkDivisionmode.WorkDivisionName, WorkDivisionmode.DivisionType, WorkDivisionmode.IsActive);
                        }
                    }
                      * */
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
    }

    
}
