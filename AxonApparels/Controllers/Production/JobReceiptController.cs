using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class JobReceiptController : Controller
    {
        //
        // GET: /JobReceipt/
        IJobReceiptBusiness Jobrecpt = new JobReceiptBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult JobReceiptIndex()
        {
            GetMaindetail(0, "", "", "", 0, "", "", 0, "", "", "", "");
            return View();
        }

        public JsonResult GetMaindetail(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string dcno, string refno, int styleid, string entryno, string fromdate, string todate, string UnitorOther)
        {
            ViewBag.JobRecptAddFlg = "disabled";
            ViewBag.JobRecptEditFlg = "disabled";
            ViewBag.JobRecptDeleteFlg = "disabled";
            ViewBag.JobRecptPrintFlg = "disabled";


            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.JobRecptAddFlg = "";
                ViewBag.JobRecptEditFlg = "";
                ViewBag.JobRecptDeleteFlg = "";
                ViewBag.JobRecptPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuJobReceipt;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.JobRecptAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.JobRecptEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.JobRecptDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.JobRecptPrintFlg = "";
                }
            }



            var getJobRecptMainDet = Jobrecpt.GetMaindt(compid, orderno, jobordno, jobrecptno, supplierid, dcno, refno, styleid, entryno, fromdate, todate, UnitorOther).Value.ToList();
            return Json(getJobRecptMainDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSndGridDet(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string UnitorOther, string refno)
        {
            var getJobRecptMainDet = Jobrecpt.GetSndGridDet(compid, orderno, jobordno, jobrecptno, supplierid,UnitorOther, refno).Value.ToList();
            return Json(getJobRecptMainDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetThrdGridDet(string jobordno, string UnitorOther)
        {
            var getJobRecptMainDet = Jobrecpt.GetthirdGridDet(jobordno, UnitorOther).Value.ToList();
            return Json(getJobRecptMainDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetThrdGridDetonEditMode(int JobRecptId)
        {
            var getJobRecptMainDet = Jobrecpt.GetthirdGridDetonEditMode(JobRecptId).Value.ToList();
            return Json(getJobRecptMainDet, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(JobReceiptMain Spm)
        {
            var result = Jobrecpt.CreateJobRecpt(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(JobReceiptMain Spm)
        {
            var result = Jobrecpt.UpdateJobRecpt(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetThrdGridDespatchDet(string strOrdNo)
        {
            var getJobRecptMainDet = Jobrecpt.GetthirdGridDespatchDet(strOrdNo).Value.ToList();
            return Json(getJobRecptMainDet, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(Jobrecpt.DeleteJobRecpt(id), JsonRequestBehavior.AllowGet);
        }
    }
}
