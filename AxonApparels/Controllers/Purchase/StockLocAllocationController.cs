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
    public class StockLocAllocationController : Controller
    {
        //
        // GET: /StockLocAllocation/
        IStockLocAllocationBusiness OsBus = new StockLocAllocationBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        public ActionResult StockLocAllocationIndex()
        {
            LoadMaingrid(0, "", "", 0, "", "", "", 0, "", "",0);
            return View();
        }
        public JsonResult GetStkStoreunit(int cmpid)
        {
            return Json(OsBus.GetStkStoreunit(cmpid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Gettranstype()
        {
            return Json(OsBus.Gettranstype(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetOrderno(int cmpid)
        {
            return Json(OsBus.GetOrderno(cmpid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetStyle(string orderno)
        {
            return Json(OsBus.GetStyle(orderno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetJobordno(string orderno)
        {
            return Json(OsBus.GetJobordno(orderno), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetTransno(int compid,int strunitid)
        {
            return Json(OsBus.GetTransno(compid, strunitid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadItem(int compid, int suppid, string ordno, string refno, int strunitid, string transtype, string transno, string jobordno, int styleid, int itmgrpid)
        {
            return Json(OsBus.LoadItem(compid, suppid, ordno, refno, strunitid, transtype, transno, jobordno, styleid, itmgrpid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(StockAllocationMas opj)
        {
            var result = OsBus.CreateUnitEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadMaingrid(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate, int AllocationID)
        {

            try
            {

                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                ViewBag.StkAllocAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                    ViewBag.StkAllocAddFlg = "";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)

                        menu = MenuNumber.MenuStockAllocation;


                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                    // ViewBag.OrderAddFlg = ret[0].AddFlg;

                    if (ret[0].AddFlg == 1)
                    {
                        ViewBag.StkAllocAddFlg = "";
                    }
                    if (ret[0].EditFlg == 1)
                    {
                        Edit = "";
                    }
                    if (ret[0].DelFlg == 1)
                    {
                        Delete = "";
                    }
                    if (ret[0].PrintFlg == 1)
                    {
                        Print = "";
                    }
                }



                StringBuilder sb = new StringBuilder();
                var result = OsBus.LoadMaingrid(cmpid, orderno, refno, strunitid, ordtype, stktype, jobordno, styleid, fromdate, todate, AllocationID).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (StockAllocationMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getbyDelete({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-minus\"></i> </button></a><a id=\" {0} \"  button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return StoreGenMemoPrint({0})\"  " + Print + "=\"" + Print + "\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a>'],", App.AllocationID, App.SubStore, App.AllocationNo, App.AllocationDate, App.AllocationRefNo);

                }

                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult LoadMaingridddl(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate)
        {
            var result = OsBus.LoadMaingriddrop(cmpid, orderno, refno, strunitid, ordtype, stktype, jobordno, styleid, fromdate, todate);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetEditHeaderDet(int masid)
        {
            return Json(OsBus.GetEditHeaderDet(masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetEditLoadItem(int masid, int compid, int strunitid)
        {
            return Json(OsBus.GetEditLoadItem(masid, compid, strunitid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetEditSectionDet(int masid)
        {
            return Json(OsBus.GetEditSectionDet(masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(AxonApparel.Domain.StockAllocationMas opj)
        {
            var result = OsBus.UpdateEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(AxonApparel.Domain.StockAllocationMas opj)
        {
            var result = OsBus.DeleteEntry(opj);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetAlloStore(int? substoreid, int? entryid)
        {
            return Json(OsBus.GetDataGetAlloStore(substoreid, entryid), JsonRequestBehavior.AllowGet);
        }
    }
}
