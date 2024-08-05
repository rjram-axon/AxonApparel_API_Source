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
    public class StateController : Controller
    {
        //
        // GET: /State/
        IStateBusiness obj = new StateBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult StateIndex()
        {
            State st = new State();
            List(st);
            return View();
        }
        [HttpPost]
        public JsonResult Add(State Spm)
        {
            var result = obj.Create(Spm);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            return Json(obj.GetId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(State Spm)
        {
            return Json(obj.Update(Spm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(obj.Delete(ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetState()
        {
            return Json(obj.GetAllBusState(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(State Spm)
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
                var result = obj.GetAllBusState();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != null)
                {

                        string str = null;
                        str = GenRights.GenerateRights(roleid, MenuNumber.MenuState, "'{0}','{1}','{2}','{3}'",SUser);
                        string[] StrArr = str.Split('$');
                        ViewBag.StateAddFlg = StrArr[0];
                        str = StrArr[1];

                        foreach( State mode in result.Value)
                        {
                                sb.AppendFormat(str, mode.id, mode.state, mode.lookup, mode.isactive);
                        }
                    
                       
                    //foreach (State mode in result.Value)
                    //{
                    //    sb.AppendFormat("['{0}','{1}','{2}','{3}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", mode.id, mode.state, mode.lookup, mode.isactive);
                    //}
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
    }
}
