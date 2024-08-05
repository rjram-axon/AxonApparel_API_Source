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
    public class CompanyUnitController : Controller
    {
        ICompanyUnitBusiness compUnit = new CompanyUnitBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        
        //
        // GET: /CompanyUnit/

        public ActionResult CompanyUnitIndex()
        {
            CompanyUnit tt = new CompanyUnit();
            List(tt);
            return View();
        }

        [HttpPost]
        public JsonResult Add(CompanyUnit Spm)
        {
            var result = compUnit.CreateCompanyUnit(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(compUnit.GetCompanyUnitId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(CompanyUnit Spm)
        {
            return Json(compUnit.UpdateCompanyUnit(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(compUnit.DeleteCompanyUnit(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCompanyUnits()
        {
            return Json(compUnit.GetCompanyUnit(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(CompanyUnit Spm)
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
                ViewBag.CompUnitAddFlg = "false";
                //string str = null;
                var result = compUnit.GetCompanyUnit();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)
                {
                    var roleoj = roleobj.GetRolebyIdAll(roleid);
                    var res = roleoj.Value;
                    string str=null ;

                    str = GenRights.GenerateRights(roleid, MenuNumber.MenuCompanyUnit, "'{0}','{1}','{2}','{3}','{4}'",SUser);
                    string[] StrArr = str.Split('$');
                    ViewBag.CompUnitAddFlg = StrArr[0];
                    str = StrArr[1];


                    foreach (CompanyUnit CompanyUnitmode in result.Value)
                    {
                        sb.AppendFormat(str, CompanyUnitmode.Id, CompanyUnitmode.CompanyUnitName, CompanyUnitmode.CompanyUnitLookup,
                                        CompanyUnitmode.Address1 + "," + CompanyUnitmode.Address2 + "," + CompanyUnitmode.Address3, CompanyUnitmode.IsActive);
                    }
                    /* foreach (var list in res.RoleDetList)
                    {
                        if (list.AddFlg == 1 && list.MenuId == MenuNumber.MenuCompany)
                        {
                            ViewBag.CompUnitAddFlg = "true";
                        }

                        if (list.MenuId== MenuNumber.MenuCompanyUnit)
                        {
                            str = "['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" " +
                                 " onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\">" +
                                " <button type=\"button\" id=\"btnEdit\"  class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\"  ";
                            if (list.EditFlg == 0)
                            {
                             str+= " disabled=\"disabled\"  " ;
                            }
                             str+= "   style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  " +
                                " <i class=\"fa fa-pencil-square-o\"></i> </button></a> " +
                                " <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"> " +
                                " <button type=\"button\" id=\"btnDelete\" class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" ";
                            if (list.DelFlg == 0)
                            {
                            str+= " disabled=\"disabled\" ";
                            }
                            str+= " style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  " +
                                " <i class=\"fa fa-times\"></i> </button></a>'],"  ;  
                            
                            foreach (CompanyUnit CompanyUnitmode in result.Value)
                            {
                                sb.AppendFormat(str , CompanyUnitmode.Id, CompanyUnitmode.CompanyUnitName, CompanyUnitmode.CompanyUnitLookup, 
                                    CompanyUnitmode.Address1 + "," + CompanyUnitmode.Address2 + "," + CompanyUnitmode.Address3, CompanyUnitmode.IsActive);
                            }
                        } 
                    } */
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
        public JsonResult GetCompUnitRefDetails(int Id)
        {
            var getDetails = compUnit.GetCompUnitCheckItemDetails(Id).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
