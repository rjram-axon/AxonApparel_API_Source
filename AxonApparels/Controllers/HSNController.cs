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
    public class HSNController : Controller
    {
        //
        // GET: /HSN/
        IHsnbusiness IhsnObj = new Hsnbusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult HSNIndex()
        {
            HSNCode ah = new HSNCode();
            List(ah);
            return View();
        }
        [HttpPost]    
        public JsonResult GetHSNRefDetails(int HSNid)
        {
            var getDetails = IhsnObj.GetHSNCodeCheckItemDetails(HSNid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadGstDetail()
        {
            var getGSTDetails = IhsnObj.LoadGstDetail();
            return Json(getGSTDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadIGstDetail()
        {
            var getIGSTDetails = IhsnObj.LoadIGstDetail();
            return Json(getIGSTDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(HSNCode obacc)
        {
            var result = IhsnObj.CreateHSNCode(obacc);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getbyID(int Id)
        {
            return Json(IhsnObj.GetDataById(Id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(HSNCode obAcc)
        {
            return Json(IhsnObj.UpdateHSNCode(obAcc), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int HSNid)
        {
            return Json(IhsnObj.DeleteHSNCode(HSNid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetHashCode()
        {
            return Json(IhsnObj.GetHashCode(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(HSNCode ah)
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
                var result = IhsnObj.GetHSNCode();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                string str1 = null;

                var Roleid = Convert.ToInt16(Session["RoleId"]);
                if (Roleid != 0)
                {
                    str1 = GenRights.GenerateRights(Roleid, MenuNumber.MenuHSN, "'{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}'", SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.HSNAddFlg = StrArr[0];
                    str1 = StrArr[1];


                    foreach (HSNCode Acch in result.Value)
                    {

                        sb.AppendFormat(str1, Acch.HSNid, Acch.HSNcode, Acch.HSNdesc, Acch.Ttype, Acch.sortorder, Acch.rstatus, Acch.GSTtaxcode, Acch.IGSTtaxcode);

                    }
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }


            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }
    }
}
