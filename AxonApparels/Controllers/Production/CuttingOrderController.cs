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
    public class CuttingOrderController : Controller
    {
        //
        // GET: /CuttingOrder/
        ICuttingOrderBusiness CuttBA = new CuttingOrderBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult CuttingOrderIndex()
        {
            GetMaindt(0, 0, 0, 0, 0, "", "", "I", "", "", "", "", "", 0);
            return View();
        }

        [HttpPost]
        public JsonResult Add(CuttingOrder Spm)
        {
            var result = CuttBA.CreateCuttingOrder(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCuttingOrderNo()
        {
            return Json(CuttBA.GetCuttingOrderInfo(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateDet(CuttingOrder Spm)
        {
            var resultupdate = CuttBA.UpdateCuttingOrder(Spm);
            return Json(resultupdate, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult GetMaindt(int CompanyId, string Fromdate, string Todate)
        //{
        //    var getProdItemWorkOrder = CuttBA.GetMaindt(CompanyId, Fromdate, Todate).Value.ToList();
        //    return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult GetMaindt(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string cuttingordno, string jobordno, string FromDate, string ToDate,int supplierid)
        {

            ViewBag.CuttingOrderAddFlg = "disabled";
            ViewBag.CuttingOrderEditFlg = "disabled";
            ViewBag.CuttingOrderDeleteFlg = "disabled";
            ViewBag.CuttingOrderPrintFlg = "disabled";
           

            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.CuttingOrderAddFlg = "";
                ViewBag.CuttingOrderEditFlg = "";
                ViewBag.CuttingOrderDeleteFlg = "";
                ViewBag.CuttingOrderPrintFlg = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)

                    menu = MenuNumber.MenuCuttingIssue;
                  

                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.CuttingOrderAddFlg = "";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.CuttingOrderEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.CuttingOrderDeleteFlg = "";
                }
                if (ret[0].PrintFlg == 1)
                {
                    ViewBag.CuttingOrderPrintFlg = "";
                }
            }


            var getProdItemWorkOrder = CuttBA.GetMaindt(compid, unitid, buyerid, masid, empid, refno, orderno, supptype, ordtype, cuttingordno, jobordno, FromDate, ToDate, supplierid).Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCuttingHeaderDet(string JobOrdNo)
        {
            var getProdItemWorkOrder = CuttBA.GetCuttingHeaderDetails(JobOrdNo).Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCuttingHeaderInfo(int ID)
        {
            var getProdItemWorkOrder = CuttBA.GetCuttingHeaderInformation(ID).Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInputItemStockEditMode(int ID, int ItemID, int ColorID, int SizeID)
        {
            var getItemStockInfo = CuttBA.GetInputItemStockInfoEditMode(ID, ItemID, ColorID, SizeID).Value;
            if (getItemStockInfo == null)
            {
                return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(getItemStockInfo, JsonRequestBehavior.AllowGet);
            }

            //return Json(getItemStockInfo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInputItemStock(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId,int Supplierid,string Processortype)
        {
            var getItemStockInfo = CuttBA.GetInputItemStockInfo(JobOrdNo, CompanyId, IssueStoreId, StyleId, ColorId, ItemId, SizeId, Supplierid, Processortype).Value;
            if (getItemStockInfo == null)
            {
                return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(getItemStockInfo, JsonRequestBehavior.AllowGet);
            }

            //return Json(getItemStockInfo, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListCuttingOrder(int CompanyId, int CompanyUnitId, string OrderType, string RefNo, int StyleId, string OrderNo, int Buyerid)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                var result = CuttBA.GetCuttingOrderDetails(CompanyId, CompanyUnitId, OrderType, RefNo, StyleId, OrderNo, Buyerid);
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

        public JsonResult GetInOutDet(int Prodprgid, string JobOrdNo, string Ordertype)
        {
            return Json(CuttBA.GetInputOutDet(Prodprgid, JobOrdNo, Ordertype), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInOutDetEdit(int CuttingOrdMasId, int Prodprgid)
        {
            return Json(CuttBA.GetInputOutDetEdit(CuttingOrdMasId, Prodprgid), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(CuttBA.DeleteCuttingOrder(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllIssueNo()
        {
            var getProdItemWorkOrder = CuttBA.GetAllIssueNo().Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
        }

    }
}
