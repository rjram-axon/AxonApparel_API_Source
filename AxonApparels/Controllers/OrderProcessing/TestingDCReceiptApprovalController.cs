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

namespace AxonApparels.Controllers.OrderProcessing
{
    public class TestingDCReceiptApprovalController : Controller
    {
        //
        // GET: /TestingDCReceiptApproval/
        ITestingDCReceiptApprovalBusiness TestDCRecptAppobj = new TestingDCReceiptApprovalBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult TesDCReceiptApprovalIndex()
        {
            TestingDCReceiptMas s = new TestingDCReceiptMas();
            List(s);
            return View();
        }

        public ActionResult List(TestingDCReceiptMas br)
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
                var result = TestDCRecptAppobj.GetTestingDCReceiptApproval();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;

                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuTestingDCApproval, "'{0}','{1}','{2}','{3}','{4}','{5}'", SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.TestingDCReceiptApprovalAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (TestingDCReceiptMas list in result.Value)
                    {
                        sb.AppendFormat(str1, list.TestingDCReceiptId, list.DCReceiptNo, list.DCReceiptDate, list.OrderNo, list.Supplier, list.TestingDCNo);
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

        public JsonResult Approve(int id)
        {
            return Json(TestDCRecptAppobj.ApproveBus(id), JsonRequestBehavior.AllowGet);
        }
    }
}
