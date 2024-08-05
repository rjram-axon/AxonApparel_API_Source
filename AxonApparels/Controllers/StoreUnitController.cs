using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class StoreUnitController : Controller
    {
        //
        // GET: /StoreUnit/
        IStoreUnitBusiness StoreUnitobj = new StoreUnitBusiness();
        IRoleBusiness Roleobj = new RoleBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();


        public ActionResult StoreUnitIndex()
        {
            StoreUnit su = new StoreUnit();
            List(su);
            return View();
        }
        [HttpPost]
        public JsonResult Add(StoreUnit str)
        {
            var result = StoreUnitobj.CreateStore(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(StoreUnit str)
        {
            return Json(StoreUnitobj.UpdateStore(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(StoreUnitobj.GetStoreId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            return Json(StoreUnitobj.DeleteStore(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getstores()
        {
            return Json(StoreUnitobj.GetStore(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(StoreUnit str)
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
                string str1 = null;
                var result = StoreUnitobj.GetStore();

                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                int roleid = Convert.ToInt16(Session["Roleid"]);
                if (roleid != 0)
                {
                    var Rolobj = Roleobj.GetRolebyIdAll(roleid);
                    var res = Rolobj.Value;

                    str1 = GenRights.GenerateRights(roleid, MenuNumber.MenuStore, "'{0}','{1}','{2}' ",SUser);
                    string[] StrArr = str1.Split('$');
                    ViewBag.StoreunitAddFlg = StrArr[0]; 
                    str1 = StrArr[1];
                    
                    foreach (StoreUnit storelist in result.Value)
                    {
                        sb.AppendFormat(str1, storelist.StoreUnitId, storelist.StoreName, storelist.IsActive);
                    }

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

        public JsonResult GetStoreRefDetails(int StoreUnitId)
        {
            var getDetails = StoreUnitobj.GetStoreUnitCheckItemDetails(StoreUnitId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }


    }
}
