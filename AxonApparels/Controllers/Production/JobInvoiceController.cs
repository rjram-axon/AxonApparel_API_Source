using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class JobInvoiceController : Controller
    {
        //
        // GET: /JobInvoice/
        IJobInvoiceBusiness obj = new JobInvoiceBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        public ActionResult JobInvoiceIndex()
        {
            GetMaindt(0, 0, 0, "", "", "", "");
            return View();
        }

        public JsonResult LoadSndJobOrdgrid(int cmpid, int suppid, string jobordno, int recptid, string recptno, string rrefno, string refno, string orderno)
        {

            return Json(obj.Loadgrid(cmpid, suppid, jobordno, recptid, recptno, rrefno, refno, orderno), JsonRequestBehavior.AllowGet);

        }

        public JsonResult LoadThirdHeaderInfo(string ReceptNo)
        {
            return Json(obj.ThirdPageHeader(ReceptNo), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadThirdPagFstGridInfo(string ReceptNo)
        {
            return Json(obj.ThirdPageFirstGrid(ReceptNo), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadThirdPagFstGridInfoforEdit(int JobInvId)
        {
            return Json(obj.ThirdPageFirstGridforEdit(JobInvId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadThirdPagScndGridInfo(string ReceptNo)
        {
            return Json(obj.ThirdPageScndGrid(ReceptNo), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadThirdPagScndGridInfoforEdit(int JobInvId)
        {
            return Json(obj.ThirdPageScndGridforEdit(JobInvId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(obj.DeleteJobInv(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(JobInvoiceMas Spm)
        {
            var result = obj.CreateJobInvoice(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(JobInvoiceMas Spm)
        {
            return Json(obj.UpdateJobInv(Spm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaindt(int CompanyId, int SupplierId, int InvoiceId, string InvRefNo, string FromDate, string ToDate, string JobOrdNo)
        {
            ViewBag.JobInvAddFlg = "disabled";
            ViewBag.JobInvEditFlg = "disabled";
            ViewBag.JobInvDeleteFlg = "disabled";
            ViewBag.JobInvPrintFlg = "disabled";


            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.JobInvAddFlg = "";
                ViewBag.JobInvEditFlg = "";
                ViewBag.JobInvDeleteFlg = "";
                ViewBag.JobInvPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuJobInvoice;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.JobInvAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.JobInvEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.JobInvDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.JobInvPrintFlg = "";
                }
            }

            var getProdItemWorkOrder = obj.GetMaindt(CompanyId, SupplierId, InvoiceId, InvRefNo, FromDate, ToDate, JobOrdNo).Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadEditAddlessgrid(int Invid)
        {
            return Json(obj.LoadEditAddlessgrid(Invid), JsonRequestBehavior.AllowGet);

        }
    }
}
