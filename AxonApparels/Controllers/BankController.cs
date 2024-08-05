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

    public class BankController : Controller
    {
        //
        // GET: /Bank/
        IBankBusiness bankobj = new BankBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        public ActionResult BankIndex()
        {
            Bank bnk = new Bank();
            List(bnk);
            return View();
        }
        [HttpPost]
        public JsonResult Add(Bank str)
        {
            var result = bankobj.CreateBank(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Bank str)
        {
            return Json(bankobj.UpdateBank(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(bankobj.GetBankId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(bankobj.DeleteBank(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBank()
        {
            return Json(bankobj.GetBank(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Bank br)
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
                var result = bankobj.GetBank();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;
                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {

                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuBank, "'{0}','{1}','{2}','{3}','{4}' ", SUser);
                    string[] StrArr = str1.Split('$');
                    ViewBag.BankAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (Bank list in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.BankId, list.BankName, (list.Address1 + " , " + list.Address2 + " , " + list.Address3), (list.CityName == "0" ? string.Empty : list.CityName), list.IsActive);
                        sb.AppendFormat(str1 , list.BankId, list.BankName, (list.Address1 + " , " + list.Address2 + " , " + list.Address3), (list.CityName == "0" ? string.Empty : list.CityName), list.IsActive);
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

