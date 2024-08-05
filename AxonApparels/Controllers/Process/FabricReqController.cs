using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;

namespace AxonApparels.Controllers.Process
{
    public class FabricReqController : Controller
    {
        //
        // GET: /FabricReq/
        IFabricReqBusiness obj = new FabricReqBusiness();
        public ActionResult FabricReqIndex()
        {
            return View();
        }
        public JsonResult LoadItemDet(int Bmasid, int Styleid)
        {

            return Json(obj.LoadItemDet(Bmasid, Styleid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Add(AxonApparel.Domain.FabricMas str)
        {
            var result = obj.CreateUnitEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadMaingrid(int? bmasid, int? styleid, int? fabid, string processortype, string fromdate, string todate, string Otype, int ProcessorId)
        {

            try
            {
                StringBuilder sb = new StringBuilder();
                var result = obj.LoadMaingrid(bmasid, styleid, fabid, processortype, fromdate, todate, Otype, ProcessorId).Value.ToList();
                if (result == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                foreach (FabricMas App in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0})\" class=\"btnSelect btn btn_round btn-warning\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" onclick=\"return getDeleteID({0})\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>  <a id=\" {0} \"<button type=\"button\" id=\"btnPrint\" class=\"btnSelect btn btn_round btn-success\" onclick=\"return ProcRetPrint({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button>'],", App.Fabric_Req_Masid, App.Fabric_Req_no, App.Fabric_Req_date, App.orderno, App.refno, App.style);

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
        public JsonResult LoadMaingriddet(int? bmasid, int? styleid, int? fabid, string processortype, string fromdate, string todate, string Otype, int ProcessorId)
        {

            return Json(obj.LoadMaingrid(bmasid, styleid, fabid, processortype, fromdate, todate, Otype, ProcessorId), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadEditItemDet(int Masid)
        {

            return Json(obj.LoadEditItemDet(Masid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult Update(AxonApparel.Domain.FabricMas str)
        {
            var result = obj.UpdateEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(AxonApparel.Domain.FabricMas str)
        {
            var result = obj.DeleteEntry(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
