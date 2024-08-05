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
    public class BuyerItemRateController : Controller
    {
        //
        // GET: /BuyerItemRate/
        IBuyerItemRateBusiness BWIR = new BuyerItemRateBusiness();
        public ActionResult BuyerItemRateIndex()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ListMainDetails(int? BuyerId, int? ItemId, int? ColorId, int? SizeId, int? SupplierId)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                var result = BWIR.GetListDetails(BuyerId , ItemId, ColorId, SizeId, SupplierId).Value.ToList();
                if (result == null ) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (BuyerItemRate List in result)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", List.BuyerId, List.BuyerName, List.ItemId, List.Item, List.ColorId, List.Color, List.SizeId,List.Size,List.Rate,List.SupplierId,List.Supplier);
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
    }
    
}
