using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class ItemRateController : Controller
    {
        //
        // GET: /ItemRate/

        IItemRateBusiness oblPur = new ItemRateBusiness();

        public ActionResult ItemRateIndex()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Add(ItemRate Spm)
        {
            var result = oblPur.CreateItemRate(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult List()
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
                var result = oblPur.GetItemRateTemplate();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

              
                foreach (ItemRate Stylemode in result.Value)
                {

                    sb.AppendFormat("['{0}','{1}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a> <a id=\" {0} \" onclick=\"return view({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn-round btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"View\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-eye\"></i> </button></a>'],", Stylemode.BuyerId, Stylemode.BuyerName);
                }
                string tableValue = sb.ToString();
                tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
                //return Json(result, JsonRequestBehavior.AllowGet);
                return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.Write(ex.InnerException.ToString());
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }

           
        }
        public JsonResult GetRateItemEdit(int id)
        {
            var result = oblPur.GetRateEditBus(id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ItemRate ObjPE)
        {
            return Json(oblPur.UpdateItemRateEntry(ObjPE), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(oblPur.DeleteItem(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteInv(int id)
        {
            return Json(oblPur.DeleteInv(id), JsonRequestBehavior.AllowGet);
        }
    }
}
