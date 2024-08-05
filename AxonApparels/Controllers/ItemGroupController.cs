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
    public class ItemGroupController : Controller
    {
        //
        // GET: /ItemGroup/
        IItemGroupBusiness obj = new ItemGroupBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult ItemGroupIndex()
        {
            ItemGroup ig = new ItemGroup();
            List(ig);
            return View();
        }
         [HttpPost]
        public JsonResult Add(ItemGroup str)
        {
            var result = obj.CreateItemGroup(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
         public JsonResult Update(ItemGroup str)
        {
            return Json(obj.UpdateItemGroup(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(obj.GetItemGroupId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(obj.DeleteItemGroup(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemGroup()
        {
            return Json(obj.GetItemGroup(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(ItemGroup str)
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
                var result = obj.GetItemGroup();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                
                string str1 = null;
                var RoleId = Convert.ToInt16(Session["RoleId"]);
                if (RoleId != 0)
                {
                    str1 = GenRights.GenerateRights(RoleId, MenuNumber.MenuItemGroup, "'{0}','{1}','{2}','{3}','{4}','{5}'",SUser);
                }

                
                string[] StrArr = str1.Split('$');
                ViewBag.ItemGroupAddFlg = StrArr[0];
                str1 = StrArr[1];

                foreach (ItemGroup iglist in result.Value)
                {
                    //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", iglist.ItemgroupId, iglist.ItemGroupName, iglist.CatHead1, iglist.CatHead2, iglist.CatHead3, iglist.IsActive);
                    sb.AppendFormat(str1, iglist.ItemgroupId, iglist.ItemGroupName, iglist.CatHead1, iglist.CatHead2, iglist.CatHead3, iglist.IsActive);
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


        public JsonResult GetItemGroupRefDetails(int ItemgroupId)
        {
            var getDetails = obj.GetItemGroupCheckItemDetails(ItemgroupId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }

    
}
