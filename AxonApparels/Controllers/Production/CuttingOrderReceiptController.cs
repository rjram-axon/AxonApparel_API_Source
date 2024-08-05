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
    public class CuttingOrderReceiptController : Controller
    {
        //
        // GET: /CuttingOrderReceipt/
        //int CompanyId = 0;
        //int CompanyUnitId = 0;
        //string OrdType = "";
        //string refno = "";
        //int styleid = 0;
        //string OrderNo = "";
        ICuttingOrderReceiptBusiness CuttRecBA = new CuttingOrderReceiptBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult CuttingOrderReceiptIndex()
        {
            GetMaindt(0, "", "", "", "", 0, "", "", "", 0, 0);
            return View();
        }

        [HttpPost]
        public JsonResult Add(CuttingReceipt Spm)
        {
            var result = CuttRecBA.CreateCuttingReceipt(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCuttingReceiptNo()
        {
            return Json(CuttRecBA.GetCuttingReceiptInfo(), JsonRequestBehavior.AllowGet);
        }

        //For Edit Mode
        public JsonResult ReceiptHeaderInfo(int ID, int CuttingOrderID)
        {
            return Json(CuttRecBA.ReceiptHeaderInformation(ID, CuttingOrderID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaindt(int Id, string OrderType, string InterExternal, string Fromdate, string Todate, int companyid, string jobordno,
            string orderno, string refno, int employeeid, int unitid)
        {

            ViewBag.CuttingRecptAddFlg = "disabled";
            ViewBag.CuttingRecptEditFlg = "disabled";
            ViewBag.CuttingRecptDeleteFlg = "disabled";
            ViewBag.CuttingRecptPrintFlg = "disabled";


            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.CuttingRecptAddFlg = "";
                ViewBag.CuttingRecptEditFlg = "";
                ViewBag.CuttingRecptDeleteFlg = "";
                ViewBag.CuttingRecptPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuCuttingReceipt;


                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.CuttingRecptAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.CuttingRecptEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.CuttingRecptDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.CuttingRecptPrintFlg = "";
                }
            }



            var getProdItemWorkOrder = CuttRecBA.GetMaindt(Id, OrderType, InterExternal, Fromdate, Todate, companyid, jobordno, orderno, refno, employeeid, unitid).Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListCuttingOrder(int CompanyId, int CompanyUnitId, string OrdType,string refno,int styleid,string OrderNo,int buyerid,string jobordno,string inorext )
        {

            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttRecBA.GetCuttingOrderDetails(CompanyId, CompanyUnitId, OrdType, refno, styleid, OrderNo, buyerid, jobordno, inorext);
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
            //var getDetails = CuttRecBA.GetCuttingOrderDetails(CompanyId, CompanyUnitId, OrdType).Value.ToList();
            //return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListCuttingOrderdetails(int ID)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttRecBA.GetCuttingDetails(ID);
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

        public ActionResult ListCuttingGrammage(string OrderNo, int StyleId, string JobNo)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttRecBA.GetCuttingGrammageDet(OrderNo, StyleId, JobNo);
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

        public JsonResult Update(CuttingReceipt Spm)
        {
            var result = CuttRecBA.UpdateCuttingReceipt(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id, int Styleid, string CuttRcptno, string OrderNo)
        {
            return Json(CuttRecBA.DeleteCuttingOrderReceipt(id, Styleid, CuttRcptno, OrderNo), JsonRequestBehavior.AllowGet);
        }
    }
}
