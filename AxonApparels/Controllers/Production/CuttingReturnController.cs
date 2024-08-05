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
    public class CuttingReturnController : Controller
    {
        //
        // GET: /CuttingReturn/
        ICuttingOrderReturnBusiness CuttRetBA = new CuttingOrderReturnBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult CuttingReturnIndex()
        {
            GetMaindt(0, "", "I", "", "", "", "", "", 0, 0);
            return View();
        }

        public ActionResult ListCuttingOrderReturn(int CompanyId, int CompanyUnitId, string OrdType, string refno, int styleid, string OrderNo, int buyerid, string jobordno, string inorext)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttRetBA.GetCuttingReturnDetails(CompanyId,CompanyUnitId,OrdType,refno,styleid,OrderNo,buyerid,jobordno,inorext);
                if (result == null || result.Value == null)
                {
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ListCuttingReturnHeaderDet(string JobOrdno)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttRetBA.GetCuttingReturnHeadDetails(JobOrdno);
                if (result == null || result.Value == null)
                {
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ListCuttingReturnDetDetails(int Issueid)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttRetBA.GetCuttingReturnDetDetails(Issueid);
                if (result == null || result.Value == null)
                {
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ListCuttingReturnOpDetDetails(int Issueid)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttRetBA.GetCuttingReturnOpDetDetails(Issueid);
                if (result == null || result.Value == null)
                {
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult ListCuttingReturnWastageDetailsEdit(int RetId)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttRetBA.ListCuttingReturnWastageDetailsEdit(RetId);
                if (result == null || result.Value == null)
                {
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }



        public ActionResult ListCuttingReturnOpDetEditDetails(int IssueId, int RetId)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttRetBA.GetCuttingReturnOpDetEditDetails( IssueId, RetId);
                if (result == null || result.Value == null)
                {
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public JsonResult Add(CuttingReturn Spm)
        {
            var result = CuttRetBA.CreateCuttingReturn(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(CuttingReturn Spm)
        {
            var result = CuttRetBA.UpdateCuttingOrderReturn(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaindt(int CompanyId, string OrderType, string InterExternal, string Fromdate, string Todate, string jobordno, string orderno, string refno,int supplierid,int employeeid)
        {

            ViewBag.CuttingRetAddFlg = "disabled";
            ViewBag.CuttingRetEditFlg = "disabled";
            ViewBag.CuttingRettDeleteFlg = "disabled";
            ViewBag.CuttingRetPrintFlg = "disabled";

            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.CuttingRetAddFlg = "";
                ViewBag.CuttingRetEditFlg = "";
                ViewBag.CuttingRettDeleteFlg = "";
                ViewBag.CuttingRetPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuCuttingReturn;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.CuttingRetAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.CuttingRetEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.CuttingRettDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.CuttingRetPrintFlg = "";
                }
            }


            var getProdItemWorkOrder = CuttRetBA.GetMaindt(CompanyId, OrderType, InterExternal, Fromdate, Todate, jobordno, orderno, refno, supplierid,employeeid).Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        }

        //For Edit Mode
        public JsonResult ReceiptHeaderInfo(int ReturnID, string JobOrdNo, string CuttingRetNo, int IssueId)
        {
            return Json(CuttRetBA.ReturnHeaderInformation(ReturnID, JobOrdNo, CuttingRetNo, IssueId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(CuttRetBA.DeleteCuttingOrder(id), JsonRequestBehavior.AllowGet);
        }
    }
}
