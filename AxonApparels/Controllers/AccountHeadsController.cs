using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using AxonApparel.Common;
namespace AxonApparels.Controllers
{
    public class AccountHeadsController : Controller
    {
        //
        // GET: /AccountHeads/
        IAccountHeadsBusiness AccheaObj = new AccountHeadsBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();
        public ActionResult AccountHeadsIndex()
        {
            AccountHeads ah = new AccountHeads();
            List(ah);
            return View();
        }
        [HttpPost]
        public JsonResult Add(AccountHeads obacc)
        {       
            var result = AccheaObj.CreateAccountHeads(obacc);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(AccheaObj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(AccountHeads obAcc)
        {
            return Json(AccheaObj.UpdateAccountHeads(obAcc), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(AccheaObj.DeleteAccountHeads(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAccountHeads()
        {
            return Json(AccheaObj.GetAccountHeads(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(AccountHeads obAcc)
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

                var result = AccheaObj.GetAccountHeads();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;

                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuAccountHeads, "'{0}','{1}','{2}','{3}','{4}','{5}'", SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.AccountHeadsAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (AccountHeads Acch in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", Acch.addlessid, Acch.addless, Acch.AddlessType, Acch.Lookup, Acch.per, Acch.IsActive);
                        sb.AppendFormat(str1 , Acch.addlessid, Acch.addless, Acch.AddlessType, Acch.Lookup, Acch.per, Acch.IsActive);
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
        public JsonResult GetAccountHeadsRefDetails(int addlessid)
        {
            var getDetails = AccheaObj.GetAccountHeadsCheckItemDetails(addlessid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
