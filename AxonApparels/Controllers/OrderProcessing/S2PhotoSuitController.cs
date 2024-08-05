using System;
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
    public class S2PhotoSuitController : Controller
    {
        //
        // GET: /S2PhotoSuit/

        IS2PhotoSuitBusiness S2sampleobj = new S2PhotoSuitBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult S2PhotoSuitIndex()
        {
            S2PhotoSuit s = new S2PhotoSuit();
            List(s);
            return View();
        }

        public ActionResult List(S2PhotoSuit br)
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
                var result = S2sampleobj.GetData();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;

                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.S2PhotoSuitEntry, "'{0}','{1}','{2}','{3}'", SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.S2SampleEntryAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (S2PhotoSuit list in result.Value)
                    {
                        sb.AppendFormat(str1, list.S2EntryId, list.RefNo, list.Remarks, list.IsActive);
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

        public JsonResult Add(S2PhotoSuit Spm)
        {
            var result = S2sampleobj.Create(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyEditID(int ID)
        {
            return Json(S2sampleobj.GetId(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(S2PhotoSuit Spm)
        {
            return Json(S2sampleobj.Update(Spm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            return Json(S2sampleobj.Delete(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetS2Entry()
        {
            return Json(S2sampleobj.GetS2Entry(), JsonRequestBehavior.AllowGet);
        }
    }
}
