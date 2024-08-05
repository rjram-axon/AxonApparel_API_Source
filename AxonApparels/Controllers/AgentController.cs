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
    public class AgentController : Controller
    {
        //
        // GET: /Agent/
        IAgentBusiness agentobj = new AgentBusiness();
        IGenerateRightsBusiness GenRights = new GenerateRightsBusiness();

        public ActionResult Index()
        {
            Agent ag = new Agent();
            List(ag);
            return View();
        }
        [HttpPost]
        public JsonResult Add(Agent str)
        {
            var result = agentobj.CreateAgent(str);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Agent str)
        {
            return Json(agentobj.UpdateAgent(str), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyId(int id)
        {
            return Json(agentobj.GetAgentId(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(agentobj.DeleteAgent(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAgent()
        {
            return Json(agentobj.GetBAgent(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSAgent()
        {
            return Json(agentobj.GetSAgent(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult List(Agent br)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                string str = null;


                var username = Session["UserName"].ToString();
                var SUser = "";
                if (username == "superuser")
                {
                    SUser = "superuser";
                }

                var result = agentobj.GetAgent();
                if (result == null || result.Value == null)
                    return Json(new { data = "" }, JsonRequestBehavior.AllowGet);

                //            if (Convert.ToInt16(Session["RoleId"]) != null)
                //              {
                //                    roleid = Convert.ToInt16(Session["RoleId"]);
                //}
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)
                {
                    str = GenRights.GenerateRights(roleid, MenuNumber.MenuAgent, "'{0}','{1}','{2}','{3}','{4}','{5}'", SUser);
                    string[] StrArr = str.Split('$');
                    str = StrArr[1];
                    ViewBag.AgeintAddFlag = StrArr[0];

                    foreach (Agent agntlist in result.Value)
                    {
                        //if (Type == "")
                        //{
                            //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a> <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-danger\"   data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button></a>'],", agntlist.AgentId, agntlist.AgentName, (agntlist.Address1 + " , " + agntlist.Address2 + " , " + agntlist.Address3), (agntlist.CityName == "0" ? string.Empty : agntlist.CityName), agntlist.IsActive);
                        sb.AppendFormat(str, agntlist.AgentId, agntlist.AgentName, (agntlist.Address1 + " , " + agntlist.Address2 + " , " + agntlist.Address3), ((agntlist.CityName == "0" ? string.Empty : agntlist.CityName) + ", " + (agntlist.CountryName == "0" ? string.Empty : agntlist.CountryName)), agntlist.Type == "B" ? "BuyerAgent" : "ShippingAgent", agntlist.IsActive);
                        //}
                        //else if (Type == "B" && agntlist.Type=="B") {
                        //    sb.AppendFormat(str, agntlist.AgentId, agntlist.AgentName, (agntlist.Address1 + " , " + agntlist.Address2 + " , " + agntlist.Address3), (agntlist.CityName == "0" ? string.Empty : agntlist.CityName), agntlist.Type == "B" ? "BuyerAgent" : "ShippingAgent", agntlist.IsActive);

                        //}
                        //else if (Type == "S" && agntlist.Type == "S")
                        //{
                        //    sb.AppendFormat(str, agntlist.AgentId, agntlist.AgentName, (agntlist.Address1 + " , " + agntlist.Address2 + " , " + agntlist.Address3), (agntlist.CityName == "0" ? string.Empty : agntlist.CityName), agntlist.Type == "B" ? "BuyerAgent" : "ShippingAgent", agntlist.IsActive);

                        //}
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
        public JsonResult GetAgentRefDetails(int AgentId)
        {
            var getDetails = agentobj.GetAgentCheckItemDetails(AgentId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

    }
}
