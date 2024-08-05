using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Common;

namespace AxonApparels.Controllers.Process
{
    public class GroupProcessOrderController : Controller
    {
        //
        // GET: /GroupProcessOrder/
        IGroupProcessOrderBusiness obj = new GroupProcessOrderBusiness();
        IRoleBusiness roleobj = new RoleBusiness();
        public ActionResult GroupProcessOrderIndex()
        {
            LoadMain(0, 0, 0, 0, 0, "", "");
            return View();
        }
        [HttpPost]
        public JsonResult LoadOutputitmsgrid(string closed, string jobordno, string procid)
        {

            return Json(obj.LoadOutputitmsgrid(closed, jobordno, procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadInputitmsgrid(string closed, string jobordno, string procid)
        {

            return Json(obj.LoadInputitmsgrid(closed, jobordno, procid), JsonRequestBehavior.AllowGet);

        }
        public JsonResult AddProdMas(Group_Prod_Prg_Mas mas)
        {
            var ProdMas = obj.CreateProdMas(mas);
            return Json(ProdMas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateProdMas(Group_Prod_Prg_Mas mas)
        {
            var ProdMas = obj.UpdateProdMas(mas);
            return Json(ProdMas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteProdMas(Group_Prod_Prg_Mas mas)
        {
            var ProdMas = obj.DeleteProdMas(mas);
            return Json(ProdMas, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadMain(int? Ordid, int? Refid, int? Style, int? Process, int? Groupid, string FDt, string TDt)
        {

            ViewBag.GrpPrcAddFlg = "disabled";
            ViewBag.GrpPrcEditFlg = "disabled";
            ViewBag.GrpPrcDeleteFlg = "disabled";
          
            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.GrpPrcAddFlg = "";
                ViewBag.GrpPrcEditFlg = "";
                ViewBag.GrpPrcDeleteFlg = "";
              
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)
                    
                        menu = MenuNumber.MenuGroupProcessOrder;
                    

                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();


                if (ret[0].AddFlg == 1)
                {
                    ViewBag.GrpPrcAddFlg="";
                }
                if (ret[0].EditFlg == 1)
                {
                    ViewBag.GrpPrcEditFlg = "";
                }
                if (ret[0].DelFlg == 1)
                {
                    ViewBag.GrpPrcDeleteFlg = "";
                }
              
            }



            return Json(obj.LoadMain(Ordid, Refid, Style, Process, Groupid, FDt, TDt), JsonRequestBehavior.AllowGet);
        }
        //public JsonResult LoadMain()
        //{

        //    return Json(obj.LoadMain(), JsonRequestBehavior.AllowGet);
        //}

        public JsonResult GetGrpProcMas(int masid)
        {

            return Json(obj.GetGrpProcMas(masid), JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetIpGrpProc(int masid)
        {
            
            return Json(obj.GetIpGrpProc(masid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOpGrpProc(int masid)
        {
            
            return Json(obj.GetOpGrpProc(masid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetIpPrgdet(int masid)
        {
            
            return Json(obj.GetIpPrgdet(masid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOpPrgdet(int masid)
        {
            
            return Json(obj.GetOpPrgdet(masid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGroupDropdwon(int? BMasId, int? JobId, int? Styleid, int? RefNo)
        {

            return Json(obj.GetGroupDropdwon(BMasId, JobId, Styleid, RefNo), JsonRequestBehavior.AllowGet);

        }
        public JsonResult AddGrpProc(Group_Prod_Prg_Mas Procobj, string procid)
        {

            return Json(obj.AddGrpProc(Procobj, procid), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetProcessDropdwon( int? JobId)
        {

            return Json(obj.GetProcessDropdwon(JobId), JsonRequestBehavior.AllowGet);

        }

    }
}
