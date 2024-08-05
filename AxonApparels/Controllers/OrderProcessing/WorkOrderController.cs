using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;


namespace AxonApparels.Controllers
{
    public class WorkOrderController : Controller
    {
        //
        // GET: /WorkOrder/
        IWorkOrderBusiness woobj = new WorkOrderBusiness();

        IBuyOrderStyleBusiness BuyOrdobj = new BuyOrdStyleBusiness();

        public ActionResult WorkOrderIndex()
        {
            return View();
        }

        //public JsonResult GetbyID(int ID)
        //{
        //    return Json(woobj.GetDataById(ID), JsonRequestBehavior.AllowGet);
        //}

        public JsonResult GetWorkOrder(int Id)
        {
            //var getWorkOrder = woobj.GetDataByWorkOrder(Id).Value.ToList();
            return Json(woobj.GetDataByWorkOrder(Id), JsonRequestBehavior.AllowGet);
            //return Json(getWorkOrder, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetWorkNo()
        {
            var result = woobj.GetWorkOrderNoList();
            return Json(result, JsonRequestBehavior.AllowGet);
            
        }
        public JsonResult GetPlanningMasEntry(int Id)
        {
            return Json(woobj.GetPlanningChecking(Id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProdShipWorkOrder(int Id)
        {
            var getProdShipWorkOrder = woobj.GetProdShipWO(Id).Value.ToList();
            //return Json(woobj.GetProdShipWO(Id), JsonRequestBehavior.AllowGet);
            return Json(getProdShipWorkOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProdItemWorkOrder(int Id)
        {
            var getProdItemWorkOrder = woobj.GetProdItemWO(Id).Value.ToList();
            return Json(getProdItemWorkOrder, JsonRequestBehavior.AllowGet);
            //return Json(test, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(ProductionWorkOrder Spm)
        {
            var result = woobj.CreateWorkOrder(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(ProductionWorkOrder str)
        {
            return Json(woobj.UpdateWorkOrder(str), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(WorkOrder br)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                //var result = woobj.GetWorkOrder();
                var result = BuyOrdobj.GetBuyOrderStyle();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (BuyOrderStyle list in result.Value)
                {
                    //sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", list.Stylerowid, list.StyleId, list.Stylename, list.Quantity);
                    sb.AppendFormat("['{0}','{1}','{2}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", list.StyleRowid, list.order_no, list.styleName);
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

        public JsonResult Delete(int id)
        {
            return Json(woobj.DeleteWorkOrder(id), JsonRequestBehavior.AllowGet);
        }

    }
}
