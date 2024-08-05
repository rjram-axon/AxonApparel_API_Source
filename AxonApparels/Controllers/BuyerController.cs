using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class BuyerController : Controller
    {
        //
        // GET: /Buyer/
        IBuyerBusiness buyerobj = new BuyerBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult BuyerIndex()
        {
            Buyer BY = new Buyer();
            List(BY);
            return View();
        }
         [HttpPost]
        public JsonResult Add(Buyer str)
        {
            var result = buyerobj.CreateBuyer(str);
            return Json(result,JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Buyer str)
        {
            return Json(buyerobj.UpdateBuyer(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(buyerobj.GetBuyerId(id),JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(buyerobj.DeleteBuyer(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBuyers()
        {
            return Json(buyerobj.GetBuyer(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(Buyer br)
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
                string str =null;
                var result = buyerobj.GetBuyer();
                

                if (result == null || result.Value == null)
                
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                
                int roleid = Convert.ToInt16(Session["RoleId"]);

                str = GenRights.GenerateRights(roleid, MenuNumber.MenuBuyer,"'{0}','{1}','{2}','{3}','{4}'",SUser);

                string[] StrArr = str.Split('$');
                str = StrArr[1];
                ViewBag.BuyerAddFlag = StrArr[0]; 

                foreach (Buyer buyerlist in result.Value)
                {
                    //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", buyerlist.BuyerId, buyerlist.BuyerName, (buyerlist.Address1 + " , " + buyerlist.Address2 + " , " + buyerlist.Address3), (buyerlist.CityName == "0" ? string.Empty : buyerlist.CityName), buyerlist.IsActive);
                    //sb.AppendFormat(str,  buyerlist.BuyerId, buyerlist.BuyerName, (buyerlist.Address1 + " , " + buyerlist.Address2 + " , " + buyerlist.Address3), (buyerlist.CityName == "0" ? string.Empty : buyerlist.CityName), buyerlist.IsActive);
                    sb.AppendFormat(str, buyerlist.BuyerId, buyerlist.BuyerName, (buyerlist.Address1 + " , " + buyerlist.Address2 + " , " + buyerlist.Address3), (buyerlist.CityName == "0" ? string.Empty : buyerlist.CityName), buyerlist.IsActive);
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

        public JsonResult GetBuyerRefDetails(int BuyerId)
        {
            var getDetails = buyerobj.GetBuyerCheckItemDetails(BuyerId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

    }
}
