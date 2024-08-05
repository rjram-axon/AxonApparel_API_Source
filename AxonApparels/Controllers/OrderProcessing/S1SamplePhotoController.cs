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
    public class S1SamplePhotoController : Controller
    {
        //
        // GET: /S1SamplePhoto/
        IS1SamplePhotoBusiness S1sampleobj = new S1SamplePhotoBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult S1SamplePhotoIndex()
        {
            S1SamplePhoto s = new S1SamplePhoto();
            List(s);
            return View();
        }

        public ActionResult List(S1SamplePhoto br)
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
                var result = S1sampleobj.GetData();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;

                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.S1SampleEntry, "'{0}','{1}','{2}','{3}'", SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.S1SampleEntryAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (S1SamplePhoto list in result.Value)
                    {                        
                        sb.AppendFormat(str1, list.S1EntryId, list.RefNo, list.Remarks, list.IsActive);
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

        public JsonResult Add(S1SamplePhoto Spm)
        {
            var result = S1sampleobj.Create(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyEditID(int ID)
        {
            return Json(S1sampleobj.GetId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(S1SamplePhoto Spm)
        {
            return Json(S1sampleobj.Update(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(S1sampleobj.Delete(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetS1Entry()
        {
            return Json(S1sampleobj.GetS1Entry(), JsonRequestBehavior.AllowGet);
        }

    }
}
