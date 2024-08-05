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
    public class TestingDCController : Controller
    {
        //
        // GET: /TestingDC/
        ITestingDCBusiness TestingDCobj = new TestingDCBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult TestingDCIndex()
        {
            TestingDCMas s = new TestingDCMas();
            List(s);
            return View();
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
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuTestingDC, "'{0}','{1}','{2}','{3}','{4}','{5}'", SUser);

                    string[] StrArr = str1.Split('$');
                    ViewBag.TestingDCAddFlg = StrArr[0];
                    str1 = StrArr[1];

                    foreach (TestingDCMas list in result.Value)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", list.SizeId, list.SizeName, list.IsActive);
                        sb.AppendFormat(str1, list.TestingDCId, list.DCNo, list.DCDate, list.OrderNo,list.Supplier,list.Buyer);
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

        public JsonResult GetGatePassNoCont()
        {
            //var tt= TestingDCobj.GetGatePassNoBuss();
            //int gatepass = tt.Value;
            //return gatepass;
            return Json(TestingDCobj.GetGatePassNoBuss(), JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult Add(TestingDCMas testObj)
        {
            var result = TestingDCobj.CreateTestingDC(testObj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int id)
        {
            return Json(TestingDCobj.GetTestingDCId(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDCNO()
        {
            return Json(TestingDCobj.GetTestingDC(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(TestingDCobj.Delete(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(TestingDCMas str)
        {
            var result = TestingDCobj.Update(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
