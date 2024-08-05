using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;

using AxonApparel.Common;

namespace AxonApparels.Controllers
{
    public class JobOrderController : Controller
    {
        //
        // GET: /JobOrder/
        IJobOrderDetailBusiness joborderdet = new JobOrderDetailBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult JobOrder()
        { 
            JobOrderDetList ObjNom =new JobOrderDetList ();
            ListDetails(ObjNom);

            return View();
        }

        public JsonResult GetJobOrder(int Id)
        {
            return Json(joborderdet.GetDataofJobOrder(Id), JsonRequestBehavior.AllowGet);
            //return Json(getWorkOrder, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetJobOrderShipmentList(string OrderNo, int StyleId)
        {
            //return Json(joborderdet.GetJobOrderShipDetail(OrderNo,StyleId), JsonRequestBehavior.AllowGet);
            ////return Json("test", JsonRequestBehavior.AllowGet);          

            var getDetails = joborderdet.GetJobOrderShipDetail(OrderNo, StyleId).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetJobOrderItemList(string JobOrderNo)
        {
            //return Json(joborderdet.GetJobOrderItemDetail(JobOrderNo), JsonRequestBehavior.AllowGet);

            var getDetails = joborderdet.GetJobOrderItemDetail(JobOrderNo).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    
        public ActionResult ListDetails(JobOrderDetList ObjNom)
        {
            try
            {
                var Add = "disabled";
                var Edit = "disabled";
                var Delete = "disabled";
                var Print = "disabled";
                //ViewBag.woekAddFlg = "disabled";
                int menu = 0;
                var username = Session["UserName"].ToString();

                if (username == "superuser")
                {
                   // ViewBag.OrderAddFlg = "true";
                    Add = "";
                    Edit = "";
                    Delete = "";
                    Print = "";
                }
                else
                {
                    int roleid = Convert.ToInt16(Session["RoleId"]);
                    if (roleid != 0)
                       
                      menu = MenuNumber.MenuWorkOrder;
                       

                    var res = roleobj.GetRolebyId(roleid, menu, 0);
                    var ret = res.Value.RoleDetList.ToList();

                  
                    if (ret[0].AddFlg == 1)
                    {
                       // ViewBag.OrderAddFlg = "";
                        Add = "";
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
                var result = joborderdet.GetJobOrderDetail();
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (JobOrderDetList List in result.Value)
                {
                    sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','<a id=\"{0}\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnEdit\"  onclick=\"return getbyID({0})\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\"{0}\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" id=\"btnDelete\" " + Delete + "=\"" + Delete + "\"  onclick=\"return Delete({0})\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\">  <i class=\"fa fa-times\"></i> </button><button type=\"button\" " + Print + "=\"" + Print + "\"   class=\"btnSelect btn btn_round btn-success\" onclick=\"return Job_ord_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"background-color:#636160;border-color:#636160;width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-print\"></i> </button></a>'],",
                        List.JobOrderId, List.OrderNo, List.Buyer, List.JobOrderNo, List.StyleName, List.RefNo, List.JobOrdDate.ToString("dd/MM/yyyy"), List.Quantity,List.companyid);
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
