using System;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Common;

namespace AxonApparels.Controllers.OrderProcessing
{
    public class TestingDCCancelController : Controller
    {
        //
        // GET: /TestingDCCancel/
        ITestingDCCancelBusiness TestingDCobj = new TestingDCCancelBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult TestingDCCancelIndex()
        {
            TestingDCMas s = new TestingDCMas();
            List(s);
            return View();
        }

        public JsonResult Cancel(TestingDCMas str)
        {
            var result = TestingDCobj.Update(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(TestingDCMas br)
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
                var result = TestingDCobj.GetTestingDC();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;

                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuTestingDCCancel, "'{0}','{1}','{2}','{3}','{4}','{5}'", SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.TestingDCCancelAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (TestingDCMas list in result.Value)
                    {                        
                        sb.AppendFormat(str1, list.TestingDCId, list.DCNo, list.DCDate, list.OrderNo, list.Supplier, list.Buyer);
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

        public JsonResult GetDCReceiptDetails(int id)
        {
            return Json(TestingDCobj.GetTestingDCReceiptDetails(id), JsonRequestBehavior.AllowGet);
        }
    }
}
