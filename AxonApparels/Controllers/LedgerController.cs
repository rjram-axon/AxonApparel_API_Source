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
    public class LedgerController : Controller
    {
        //
        // GET: /Ledger/

        ILedgerBusiness obj = new LedgerBusiness();
        IGenerateRightsBusiness Genrights = new GenerateRightsBusiness();

        public ActionResult LedgerIndex()
        {
            Ledger ld = new Ledger();
            List(ld);
            return View();

        }
        [HttpPost]
        public JsonResult Add(Ledger str)
        {
            var result = obj.CreateLedger(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Ledger str)
        {
            return Json(obj.UpdateLedger(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(obj.GetLedgerId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(obj.DeleteLedger(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLedger()
        {
            return Json(obj.GetLedger(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Ledger str)
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
                var result = obj.GetLedger();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string st1 = null;
                var RoleId = Convert.ToInt16(Session["roleId"]);
                if (RoleId != 0)
                {
                    st1 = Genrights.GenerateRights(RoleId, MenuNumber.MenuLedger, "'{0}','{1}','{2}'",SUser);
                    string[] StrArr = st1.Split('$');
                    ViewBag.LedgerAddFlg = StrArr[0];
                    st1 = StrArr[1];

   
                    foreach (Ledger list in result.Value)
                    {
                       // sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.LedgerId, list.LedgerName, list.IsActive);
                        sb.AppendFormat(st1 , list.LedgerId, list.LedgerName, list.IsActive);
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

    }
}
