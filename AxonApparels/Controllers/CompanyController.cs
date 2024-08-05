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
    public class CompanyController : Controller
    {
        //
        // GET: /Company/
        ICompanyBusiness compobj = new CompanyBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();


        public ActionResult CompanyIndex()
        {
            Company tt = new Company();
            List(tt);
            return View();
        }
        [HttpPost]
        public JsonResult Add(Company str)
        {
            var result = compobj.CreateCompany(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Company st)
        {
            return Json(compobj.UpdateCompany(st), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(compobj.GetCompanyId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(compobj.DeleteCompany(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCompany()
        {
            return Json(compobj.GetCompany(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Company br)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                //ViewBag.CompAddFlg = "false";
                ViewBag.CompanyCityAddFlg = "disabled";

                var username = Session["UserName"].ToString();
                var SUser = "";
                if (username == "superuser")
                {
                    SUser = "superuser";
                }

                int menu = 0;
                if (username == "superuser")
                {
                    ViewBag.CompanyCityAddFlg = "";
                
                }
                else
                {
                    int roleidchk = Convert.ToInt16(Session["RoleId"]);
                    if (roleidchk != 0)
                    menu = MenuNumber.MenuCity;
                    var res = roleobj.GetRolebyId(roleidchk, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();
                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.CompanyCityAddFlg = "";
                    }
                }

                var result = compobj.GetCompany();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                //Get Role for assinging rights
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)
                {
                    //var roleoj = roleobj.GetRolebyId(roleid);
                    //var res = roleoj.Value;
                    string str = null;

                    str = GenRights.GenerateRights(roleid, MenuNumber.MenuCompany, "'{0}','{1}','{2}','{3}','{4}'", SUser);

                    string[] StrArr = str.Split('$');
                    ViewBag.CompAddFlg = StrArr[0];
                    str = StrArr[1];

                    foreach (Company complist in result.Value)
                    {
                        sb.AppendFormat(str, complist.CompanyId, complist.CompanyName, (complist.Address1 + " , " + complist.Address2 + " , " + complist.Address3), (complist.CityName == "0" ? string.Empty : complist.CityName), complist.IsActive);
                    }

                    /* foreach (var list in res.RoleDetList)
                    {
                        if (list.AddFlg == 1 && list.MenuId == MenuNumber.MenuCompany)
                        {
                            ViewBag.CompAddFlg = "true";
                        }

                        if (list.MenuId == MenuNumber.MenuCompany && (list.EditFlg == 0 && list.DelFlg == 0))
                        {
                            foreach (Company complist in result.Value)
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"> " + 
                                " <button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" disabled=\"disabled\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  "+
                                " <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\">"+
                                " <button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" disabled=\"disabled\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'], "+
                                " ", complist.CompanyId, complist.CompanyName, (complist.Address1 + " , " + complist.Address2 + " , " + complist.Address3), (complist.CityName == "0" ? string.Empty : complist.CityName), complist.IsActive);
                            }
                        }
                        else if (list.MenuId == MenuNumber.MenuCompany && (list.EditFlg == 0 && list.DelFlg == 1))
                        {
                            foreach (Company complist in result.Value)
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" "+
                                "onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\">"+
                                "<button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" disabled=\"disabled\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button> </a>   " +
                                " <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"> "+ 
                                " <button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">   "+ 
                                " <i class=\"fa fa-times\"></i> </button></a>'],", complist.CompanyId, complist.CompanyName, (complist.Address1 + " , " + complist.Address2 + " , " + complist.Address3), (complist.CityName == "0" ? string.Empty : complist.CityName), complist.IsActive);
                            }
                        }
                        else if (list.MenuId == MenuNumber.MenuCompany && (list.EditFlg == 1 && list.DelFlg == 0))
                        {
                            foreach (Company complist in result.Value)
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" "+ 
                                " onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\">"+
                                " <button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\"  style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">   "+
                                " <i class=\"fa fa-pencil-square-o\"></i> </button></a>  "+
                                " <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"> "+ 
                                " <button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" disabled=\"disabled\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>']," +
                                "" , complist.CompanyId, complist.CompanyName, (complist.Address1 + " , " + complist.Address2 + " , " + complist.Address3), (complist.CityName == "0" ? string.Empty : complist.CityName), complist.IsActive);
                            }
                        }
                        else if (list.MenuId == MenuNumber.MenuCompany && (list.EditFlg == 1 && list.DelFlg == 1))
                        {
                            foreach (Company complist in result.Value)
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" "+
                                " onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"> "+
                                " <button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\"  style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> "+
                                " <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"> "+ 
                                "<button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  "+ 
                                " <i class=\"fa fa-times\"></i> </button></a>'],", complist.CompanyId, complist.CompanyName, (complist.Address1 + " , " + complist.Address2 + " , " + complist.Address3), (complist.CityName == "0" ? string.Empty : complist.CityName), complist.IsActive);
                            }
                        }
                    }*/
                }

                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
                //StringBuilder sb = new StringBuilder();
                //var result = compobj.GetCompany();
                //if (result == null || result.Value == null)
                //    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                //foreach (Company complist in result.Value)
                //{
                //    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", complist.CompanyId, complist.CompanyName, (complist.Address1 + " , " + complist.Address2 + " , " + complist.Address3), (complist.CityName == "0" ? string.Empty : complist.CityName), complist.IsActive);
                //}
                //string tableValue = sb.ToString();
                //tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                //return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetCountDetails(int CityId)
        {
            return Json(compobj.GetDataCountDetails(CityId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCompRefDetails(int CompanyId)
        {
            var getDetails = compobj.GetCompCheckItemDetails(CompanyId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

    }
}
