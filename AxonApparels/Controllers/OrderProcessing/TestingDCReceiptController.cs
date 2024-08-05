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
    public class TestingDCReceiptController : Controller
    {
        //
        // GET: /TestingDCReceipt/
        ITestingDCReceiptBusiness TestingDCReceiptobj = new TestingDCReceiptBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult TestingDCReceiptIndex()
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
                var result = TestingDCReceiptobj.GetTestingDCReceipt();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                string str1 = null;

                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuTestingDCReceipt, "'{0}','{1}','{2}','{3}','{4}','{5}'", SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.TestingDCReceiptAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (TestingDCReceiptMas list in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.SizeId, list.SizeName, list.IsActive);
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

        [HttpPost]
        public JsonResult Add(TestingDCReceiptMas DCReceiptObj)
        {
            var result = TestingDCReceiptobj.CreateTestingDCReceipt(DCReceiptObj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(TestingDCReceiptMas str)
        {
            var result = TestingDCReceiptobj.Update(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int id)
        {
            return Json(TestingDCReceiptobj.GetTestingDCReceiptId(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(TestingDCReceiptobj.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}
