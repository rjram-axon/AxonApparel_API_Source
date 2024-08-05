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
    public class SupplierController : Controller
    {
        //
        // GET: /Supplier/
        ISupplierBusiness supobj = new SupplierBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult SupplierIndex()
        {
            Supplier sup = new Supplier();
            List(sup);
            return View();
        }
        [HttpPost]
        public JsonResult Add(Supplier str)
        {
            var result = supobj.CreateSupplier(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Supplier st)
        {
            return Json(supobj.UpdateSupplier(st), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(supobj.GetSupplierId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(supobj.DeleteSupplier(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getsupp()
        {
            return Json(supobj.GetSupplier(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Supplier br)
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
                var result = supobj.GetSupplier();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;
                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuSupplier, "'{0}','{1}','{2}','{3}','{4}'",SUser);
                    string[] StrArr = str1.Split('$');
                    str1 = StrArr[1];
                    ViewBag.SupplierAddFlag = StrArr[0]; 

                    foreach (Supplier suplist in result.Value)
                    {
                       // sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", suplist.SupplierId, suplist.SupplierName, (suplist.Address1 + " , " + suplist.Address2 + " , " + suplist.Address3), (suplist.CityName == "0" ? string.Empty : suplist.CityName), suplist.IsActive);
                        sb.AppendFormat(str1, suplist.SupplierId, suplist.SupplierName, (suplist.Address1 + " , " + suplist.Address2 + " , " + suplist.Address3), (suplist.CityName == "0" ? string.Empty : suplist.CityName), suplist.IsActive);
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

        public JsonResult GetSuppRefDetails(int SupplierId)
        {
            var getDetails = supobj.GetSuppCheckItemDetails(SupplierId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetSupplierSetup(int Processid,string Type)
        {
            var getDetails = supobj.GetSupplierSetup(Processid, Type).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

    }
}
