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
    public class ProcessProgramController : Controller
    {
        //
        // GET: /ProcessProgram/
        IProcessProgramBusiness ProProgobj = new ProcessProgramBusiness();
        IRoleBusiness roleobj = new RoleBusiness();

        public ActionResult ProcessProgramIndex()
        {
            List("", "", 0, 0, "", 0, "", "", "", "", "", "N");
            return View();
        }


        //public JsonResult GetProdProgrammingList()
        public JsonResult GetProdProgrammingList(string FromDate, string ToDate, int? CompanyId, int? buyerid, string orderno, int? cmpnyunitid, string refno, string prgmtype, string Ordertype, string DispatchClosed)
        {
            var ProdProgramming = ProProgobj.GetProcessProgram(FromDate, ToDate, CompanyId, buyerid, orderno, cmpnyunitid, refno, prgmtype, Ordertype, DispatchClosed);

            //return Json(ProProgobj.GetProductionProgrammingBuss(JobOrderNo), JsonRequestBehavior.AllowGet);
            return Json(ProdProgramming, JsonRequestBehavior.AllowGet);
        }



        public JsonResult GetProdProgrammingListAdd(int? cmpnyid, int? buyerid, int? cmpnyunitid, string orderno, string refno, string ordertype, string prgmtype, int? mode)
        {
            var Programminglist = ProProgobj.GetProcessProgramAddList(cmpnyid, buyerid, cmpnyunitid, orderno, refno, ordertype, prgmtype, mode);

            //return Json(ProProgobj.GetProductionProgrammingBuss(JobOrderNo), JsonRequestBehavior.AllowGet);
            return Json(Programminglist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProcessList(string JobOrderNo)
        {
            var Processdrop = ProProgobj.GetLastProcessBuss(JobOrderNo);

            //return Json(ProProgobj.GetProductionProgrammingBuss(JobOrderNo), JsonRequestBehavior.AllowGet);
            return Json(Processdrop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCopyProcessList(string Orderno,int Styleid)
        {
            var Processdrop = ProProgobj.GetCopyProcessList(Orderno, Styleid);

            //return Json(ProProgobj.GetProductionProgrammingBuss(JobOrderNo), JsonRequestBehavior.AllowGet);
            return Json(Processdrop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetIOProcessList(string OrderNo, string ioType)
        {
            var Processdrop = ProProgobj.GetIOTableProcessBuss(OrderNo, ioType);

            return Json(Processdrop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetLastProcessdllList(string JobOrdNo, int ProdPgmNo)
        {
            var Processdrop = ProProgobj.GetLastProcessdllList(JobOrdNo, ProdPgmNo);

            return Json(Processdrop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetlastProcessPgmList(int ProdPgmNo, string Iotype)
        {
            var Processdrop = ProProgobj.GetlastProcessPgmList(ProdPgmNo, Iotype);

            return Json(Processdrop, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetProdPlanning(string JobOrderNo, string Ordertype, string Programtype)
        {

            var Processdrop = ProProgobj.GetProductionProgrammingBuss(JobOrderNo, Ordertype, Programtype);

            return Json(Processdrop, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdPlanningList(string JobOrderNo, string Ordertype, string Programtype)
        {
            var ProdProgramming = ProProgobj.GetProductionProgrammingBuss(JobOrderNo, Ordertype, Programtype).Value.ToList();
            StringBuilder sb = new StringBuilder();
            foreach (ProductionProgramming prg in ProdProgramming)
            {
                if (prg.ProProgNo == "")
                {
                    if (prg.Iscomp == false)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  | <a id=\" {0} \" onclick=\"return getbyItemID({0},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnprodplanadd\"> Prod Add </button></a>  <a id=\" {0} \" onclick=\"return getbyItemID({0},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect\" hidden=\"hidden\"> Comp Add </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate);
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a  style=\"display: none;\" id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btnprodplanadd btn btn_round btn-success\"> <i class=\"fa fa-plus\"></i> </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-primary\"  style=\"display: none;\"> Comp Add </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                    }
                    else
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return getbyItemID({0},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect\" hidden=\"hidden\"> Prod Add </button></a>  <a id=\" {0} \" onclick=\"return getbyItemID({0},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btncompplanadd\"> Comp Add </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate);
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-success\" style=\"display: none;\"> Prod Add </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Comp Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btncompplanadd btn btn_round btn-success\"> <i class=\"fa fa-plus\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);

                    }
                }
                else
                {

                    if (prg.Iscomp == false)
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  | <a id=\" {0} \" onclick=\"return getbyItemID({0},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnprodplanadd\"> Prod Add </button></a>  <a id=\" {0} \" onclick=\"return getbyItemID({0},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect\" hidden=\"hidden\"> Comp Add </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate);
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btnprodplanaddedit btn btn_round btn-warning\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-primary\"  style=\"display: none;\"> Comp Add </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                    }
                    else
                    {
                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return getbyItemID({0},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect\" hidden=\"hidden\"> Prod Add </button></a>  <a id=\" {0} \" onclick=\"return getbyItemID({0},{4})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btncompplanadd\"> Comp Add </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate);
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-success\" style=\"display: none;\"> Prod Add </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\" ></i><button type=\"button\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Comp Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btncompplanedit btn btn_round btn-warning\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);

                    }
                }


            }

            string tableValue = sb.ToString();
            tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            // return Json(ProdProgramming, JsonRequestBehavior.AllowGet);


            return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetProdPlanningEdit(int Id)
        {
            var Prod = ProProgobj.GetProductionProgrammingBussEdit(Id);


            return Json(Prod, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdPlanningEditOpenList(int Id, int MaxId)
        {
            var Prod = ProProgobj.GetProductionProgrammingBussEditOpenmax(Id, MaxId);

            return Json(Prod, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProdPlanningEditOpen(int Id, int MaxId)
        {
            var ProdProgramming = ProProgobj.GetProductionProgrammingBussEditOpenmax(Id, MaxId).Value.ToList();
            StringBuilder sb = new StringBuilder();
            foreach (ProductionProgramming prg in ProdProgramming)
            {
                if (prg.ProProgNo == "" )
                {
                    if (prg.Iscomp == false)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btnprodplaneditadd btn btn_round btn-success\" > <i class=\"fa fa-plus\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Comp Edit </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                    }
                    else
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Prod Edit </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i onclick=\"return getbyidedit({0})\" class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Comp Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btncompplaneditadd btn btn_round btn-success\"> <i class=\"fa fa-plus\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);

                    }
                }
                else
                {
                    if (prg.Iscomp == false)
                    {
                        if (prg.MaxChk == MaxId)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btnprodplanedit btn btn_round btn-warning\" > <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Comp Edit </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                        }
                    }
                    else
                    {

                        if (prg.MaxChk == MaxId)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Prod Edit </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i onclick=\"return getbyidedit({0})\" class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Comp Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btncompplanedit btn btn_round btn-warning\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                        }
                    }

                }
            }

            string tableValue = sb.ToString();
            tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            // return Json(ProdProgramming, JsonRequestBehavior.AllowGet);


            return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetProdPlanningEditAppOpen(int Id, int MaxId, string GAppType)
        {
            var ProdProgramming = ProProgobj.GetProductionProgrammingBussEditOpenmax(Id, MaxId).Value.ToList();
            StringBuilder sb = new StringBuilder();
            foreach (ProductionProgramming prg in ProdProgramming)
            {
                
                if (GAppType == "P")
                {

                    if (prg.MaxChk == MaxId)
                    {
                        if (prg.ProProgNo == "")
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}',''],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                        }
                        else
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btnprodplanedit btn btn_round btn-success\" > <i class=\"fa fa-plus\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Comp Edit </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                        }
                    }
                }
                else
                {
                    if (prg.MaxChk == MaxId)
                    {

                        if (prg.Approved == "N")
                        {
                            if (prg.ProProgNo == "")
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}',''],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                            }
                            else
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btnprodplanedit btn btn_round btn-success\" > <i class=\"fa fa-plus\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Comp Edit </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                            }
                        }
                        else
                        {
                            if (prg.ProProgNo == "")
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}',''],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                            }
                            else
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btnprodplanedit btn btn_round btn-warning\" > <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Comp Edit </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                            }
                        }
                    
                    }
                }
               
            }

            string tableValue = sb.ToString();
            tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            // return Json(ProdProgramming, JsonRequestBehavior.AllowGet);


            return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProdEdit(int Id)
        {
            var Prod = ProProgobj.GetProdprgedit(Id);


            return Json(Prod, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProdEditList(int Id)
        {
            var Prod = ProProgobj.GetProdprgeditlist(Id);


            return Json(Prod, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetProdAutoItemList(int Id, string JobNo)
        {
            var Prod = ProProgobj.GetProdprgAutolist(Id, JobNo);


            return Json(Prod, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCompEditList(int Id)
        {
            var Prod = ProProgobj.GetCompprgeditlist(Id);


            return Json(Prod, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ChkProcessOrder(int Id)
        {
            var Prod = ProProgobj.ChkProcessOrd(Id);


            return Json(Prod, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemList(string JobOrderNo, int styleid, string JoborWrk)
        {
            var Item = ProProgobj.GetItem(JobOrderNo, styleid, JoborWrk);


            return Json(Item, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetColorList(string JobOrderNo, int styleid, string JoborWrk, int itemid)
        {
            var Color = ProProgobj.GetColor(JobOrderNo, styleid, JoborWrk, itemid);


            return Json(Color, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetComponentList(string JobOrderNo, int styleid, string JoborWrk, int itemid, int colorid)
        {
            var Color = ProProgobj.GetComponent(JobOrderNo, styleid, JoborWrk, itemid, colorid);


            return Json(Color, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetComponentDetList(string JobOrderNo, int styleid, int itemid, int colorid, int componentid)
        {
            var det = ProProgobj.GetComponentDet(JobOrderNo, styleid, itemid, colorid, componentid);


            return Json(det, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProdPlanningEditList(int Id, string AppprgType, string AppType)
        {

            var Add = "disabled";
            var Edit = "disabled";
            var Delete = "disabled";
            var Print = "disabled";
         
            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                
                Add = "";
                Edit = "";
                Delete = "";
                Print = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)
                    if (AppprgType == "A")
                    {
                        menu = MenuNumber.MenuProcessProgramApproval;
                    }
                    else if (AppprgType == "P")
                    {
                        menu = MenuNumber.MenuProcessProgramApproval;
                    }
                    else if (AppprgType == null)
                    {
                        menu = MenuNumber.MenuProcessProgram;
                    }

                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
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


            var ProdProgramming = ProProgobj.GetProductionProgrammingBussEdit(Id).Value.ToList();
            StringBuilder sb = new StringBuilder();
            foreach (ProductionProgramming prg in ProdProgramming)
            {
                if (AppprgType == "A")
                {

                    if (prg.Approved == "Y")
                    {
                        if (prg.ProProgNo != "")
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\"  " + Edit + "=\"" + Edit + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\"  " + Edit + "=\"" + Edit + "\"  class=\" btn btn_round btn-warning\" style=\"display: none;\"> Prod Edit </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i onclick=\"return DCCheck({0},{5})\" class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Comp Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btncompplaneditaddApp btn btn_round btn-warning\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);


                        }
                    }
                    else if (prg.Approved == "N")
                    {
                        if (prg.ProProgNo != "")
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\"  " + Edit + "=\"" + Edit + "\"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"  " + Add + "=\"" + Add + "\"  class=\"btnprodplanAppadd btn btn_round btn-success\" > <i class=\"fa fa-plus\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Comp Edit </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);


                        }
                    }


                }
                else if (AppprgType == "P")
                {
                    if (AppType == "N")
                    {
                        if (prg.Approved == "N")
                        {
                            if (prg.ProProgNo != "")
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"  " + Add + "=\"" + Add + "\"  class=\"btnprodplanAppadd btn btn_round btn-success\" > <i class=\"fa fa-plus\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Comp Edit </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                            }

                        }
                    }

                }

                else if (prg.ProProgNo == "")
                {
                    if (prg.Iscomp == false)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Add\"  " + Add + "=\"" + Add + "\"  style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btnprodplaneditadd btn btn_round btn-success\" > <i class=\"fa fa-plus\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Comp Edit </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                    }
                    else
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Prod Edit </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i onclick=\"return getbyidedit({0})\" class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Comp Add\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"  " + Add + "=\"" + Add + "\"  class=\"btncompplaneditadd btn btn_round btn-success\"> <i class=\"fa fa-plus\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);

                    }
                }
                else
                {
                    if (prg.Iscomp == false)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"  " + Edit + "=\"" + Edit + "\"  class=\"btnprodplanedit btn btn_round btn-warning\" > <i class=\"fa fa-pencil-square-o\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Comp Edit </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                    }
                    else
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyidedit({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect btn btn_round btn-warning\" style=\"display: none;\"> Prod Edit </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i onclick=\"return getbyidedit({0})\"  " + Edit + "=\"" + Edit + "\"  class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Comp Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" class=\"btncompplanedit btn btn_round btn-warning\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);

                    }

                }
            }

            string tableValue = sb.ToString();
            tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            // return Json(ProdProgramming, JsonRequestBehavior.AllowGet);


            return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetProdPlanningDeleteList(int Id)
        {
            var ProdProgramming = ProProgobj.GetProductionProgrammingBussEdit(Id).Value.ToList();
            StringBuilder sb = new StringBuilder();
            foreach (ProductionProgramming prg in ProdProgramming)
            {
                if (prg.ProProgNo == "")
                {
                    if (prg.Iscomp == false)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyiddelete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnprodplandelete btn btn-round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Delete\" disabled=\"disabled\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" > <i class=\"fa fa-times\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect\"style=\"display: none;\"> Comp Delete </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                    }
                    else
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyiddelete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect\" style=\"display: none;\"> Prod Delete </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i onclick=\"return getbyiddelete({0})\" class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  class=\"btncompplandelete btn btn-round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" disabled=\"disabled\" title=\"Comp Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-times\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);

                    }
                }
                else
                {

                    if (prg.Iscomp == false)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyiddelete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnprodplandelete btn btn-round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" > <i class=\"fa fa-times\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect\"style=\"display: none;\"> Comp Delete </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                    }
                    else
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyiddelete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect\" style=\"display: none;\"> Prod Delete </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i onclick=\"return getbyiddelete({0})\" class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btncompplandelete btn btn-round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Comp Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-times\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);

                    }
                }
            }

            string tableValue = sb.ToString();
            tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            // return Json(ProdProgramming, JsonRequestBehavior.AllowGet);


            return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetProdPlanningDeleteListOpen(int Id, int Maxno)
        {
            var ProdProgramming = ProProgobj.GetProductionProgrammingBussEditOpenmax(Id, Maxno).Value.ToList();
            StringBuilder sb = new StringBuilder();
            foreach (ProductionProgramming prg in ProdProgramming)
            {
                if (prg.ProProgNo == "")
                {
                    if (prg.Iscomp == false)
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyiddelete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnprodplandelete btn btn-round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Delete\" disabled=\"disabled\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" > <i class=\"fa fa-times\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect\"style=\"display: none;\"> Comp Delete </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                    }
                    else
                    {
                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyiddelete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect\" style=\"display: none;\"> Prod Delete </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i onclick=\"return getbyiddelete({0})\" class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\"  class=\"btncompplandelete btn btn-round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" disabled=\"disabled\" title=\"Comp Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-times\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);

                    }
                }
                else
                {

                    if (prg.Iscomp == false)
                    {

                        if (prg.MaxChk == Maxno)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyiddelete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>   <a id=\" {0} \" onclick= data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnprodplandelete btn btn-round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Prod Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" > <i class=\"fa fa-times\"></i> </button></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btnSelect\"style=\"display: none;\"> Comp Delete </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                        }
                    }
                    else
                    {
                        if (prg.MaxChk == Maxno)
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a style=\"display: none;\" id=\" {0} \" onclick=\"return getbyiddelete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a>  <a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><button type=\"button\" class=\"btnSelect\" style=\"display: none;\"> Prod Delete </button></a>  <a id=\" {0} \" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i onclick=\"return getbyiddelete({0})\" class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" class=\"btncompplandelete btn btn-round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Comp Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-times\"></i> </button></a> '],", prg.Id, prg.ProcessId, prg.Process, prg.ProProgNo, prg.ProProgDate, prg.MaxChk);
                        }
                    }
                }
            }

            string tableValue = sb.ToString();
            tableValue = tableValue.Substring(0, Math.Max(0, tableValue.Length - 1));
            // return Json(ProdProgramming, JsonRequestBehavior.AllowGet);


            return Json(new { data = tableValue }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDeleteList(int Id)
        {
            var Prod = ProProgobj.GetProductionProgrammingBussEdit(Id);


            return Json(Prod, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult GetDeleteListOpen(int Id)
        //{
        //    var Prod = ProProgobj.GetProductionProgrammingBussEditOpen(Id);


        //    return Json(Prod, JsonRequestBehavior.AllowGet);
        //}


        public JsonResult GetDeleteListOpen(int Id, int MaxId)
        {
            var Prod = ProProgobj.GetProductionProgrammingBussEditOpenmax(Id, MaxId);

            return Json(Prod, JsonRequestBehavior.AllowGet);
        }




        [HttpPost]
        public JsonResult AddProdMas(ProdPrgMas mas)
        {
            var ProdMas = ProProgobj.CreateProdMas(mas);
            return Json(ProdMas, JsonRequestBehavior.AllowGet);
        }


        public JsonResult UpdateProd(ProdPrgMas mas)
        {
            var ProdMas = ProProgobj.UpdateProd(mas);
            return Json(ProdMas, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateProdApp(ProdPrgMas mas)
        {
            var ProdMas = ProProgobj.UpdateProdApp(mas);
            return Json(ProdMas, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateComp(CompPrgMas mas)
        {
            var CompMas = ProProgobj.UpdateComp(mas);
            return Json(CompMas, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddCompMas(CompPrgMas det)
        {
            var CompMas = ProProgobj.CreateCompMas(det);
            return Json(CompMas, JsonRequestBehavior.AllowGet);
        }

        public ActionResult List(string FromDate, string ToDate, int? CompanyId, int? buyerid, string orderno, int? cmpnyunitid, string refno, string prgmtype, string Ordertype, string AppprgType, string AppType, string DispatchClosed)
        {
            try
            {

            var Add = "disabled";
            var Edit = "disabled";
            var Delete = "disabled";
            var Print = "disabled";
            ViewBag.ProgramAddFlg = "disabled";
            int menu = 0;
            var username = Session["UserName"].ToString();

            if (username == "superuser")
            {
                ViewBag.ProgramAddFlg = "";
                Add = "";
                Edit = "";
                Delete = "";
                Print = "";
            }
            else
            {
                int roleid = Convert.ToInt16(Session["RoleId"]);
                if (roleid != 0)
                    if (AppprgType == "A")
                    {
                        menu = MenuNumber.MenuProcessProgramApproval;
                    }
                    else if (AppprgType == "P")
                    {
                        menu = MenuNumber.MenuProcessProgramApproval;
                    }
                    else if (AppprgType == null)
                    {
                        menu = MenuNumber.MenuProcessProgram;
                    }

                var res = roleobj.GetRolebyId(roleid, menu, 0);
                var ret = res.Value.RoleDetList.ToList();

                // ViewBag.OrderAddFlg = ret[0].AddFlg;

                if (ret[0].AddFlg == 1)
                {
                    ViewBag.ProgramAddFlg = "";
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
                var result = ProProgobj.GetProcessProgram(FromDate, ToDate, CompanyId, buyerid, orderno, cmpnyunitid, refno, prgmtype, Ordertype, DispatchClosed);
                if (result == null || result.Value == null) return Json(new { data = "" }, JsonRequestBehavior.AllowGet);
                foreach (ProcessProgram ProsProg in result.Value)
                {

                    if (AppprgType == "A")
                    {
                        if (AppType == "Y")
                        {
                            if (ProsProg.Approved == "Y")
                            {
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0},{6})\"  " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a> '],", ProsProg.JMasId, ProsProg.orderno, ProsProg.RefNo, ProsProg.Style, ProsProg.CompanyUnit, ProsProg.Quantity, ProsProg.ProcSeqMNo);
                            }
                        }
                        else
                        {
                            if (ProsProg.Approved == "N")
                            {
                                //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getbyAddID({0},{6})\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ShipAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0})\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button><a></a><button type=\"button\" id=\"btnPrint\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({0})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", ProsProg.JMasId, ProsProg.orderno, ProsProg.RefNo, ProsProg.Style, ProsProg.CompanyUnit, ProsProg.Quantity, ProsProg.ProcSeqMNo);
                                sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getbyAddID({0},{6})\"  " + Add + "=\"" + Add + "\"   class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ShipAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a> '],", ProsProg.JMasId, ProsProg.orderno, ProsProg.RefNo, ProsProg.Style, ProsProg.CompanyUnit, ProsProg.Quantity, ProsProg.ProcSeqMNo);

                            
                            }
                        }

                    }
                    else if (AppprgType == "P")
                    {
                        if (ProsProg.Approved == "N")
                        {
                            sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" onclick=\"return getbyAddID({0})\"  " + Add + "=\"" + Add + "\"  class=\"btnSelect btn btn_round btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"ShipAdd\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\" >  <i class=\"fa fa-plus\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0})\"  " + Delete + "=\"" + Delete + "\"  class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button><a></a><button type=\"button\" id=\"btnPrint\"  " + Print + "=\"" + Print + "\"   class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({0},{6})\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", ProsProg.JMasId, ProsProg.orderno, ProsProg.RefNo, ProsProg.Style, ProsProg.CompanyUnit, ProsProg.Quantity, ProsProg.ProcSeqMNo);
                        }
                    }
                    else
                    {

                        //sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','<a id=\" {0} \" onclick=\"return getbyID({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-pencil-square-o\" style=\"cursor: pointer;\"></i></a> | <a id=\" {0} \" onclick=\"return Delete({0})\" data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"fa fa-trash-o\" style=\"cursor: pointer;\"></i></a>'],", ProsProg.JMasId,ProsProg.orderno, ProsProg.RefNo, ProsProg.Style, ProsProg.CompanyUnit, ProsProg.Quantity);

                        sb.AppendFormat("['{0}','{1}','{2}','{3}','{4}','{5}','{6}','<a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnEdit\" onclick=\"return getbyID({0},{6},)\" " + Edit + "=\"" + Edit + "\"  class=\"btnSelect btn btn_round btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Edit\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-pencil-square-o\"></i> </button></a><a id=\" {0} \"  data-toggle=\"modal\" data-target=\".bs-example-modal-sm\" data-id=\"{0}\"><i class=\"\" style=\"cursor: pointer;\"></i><button type=\"button\" id=\"btnDelete\" onclick=\"return Delete({0},{6})\" " + Delete + "=\"" + Delete + "\" class=\"btnSelect btn btn_round btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;\"> <i class=\"fa fa-minus\"></i> </button><a></a><button type=\"button\" id=\"btnPrint\"  class=\"btnSelect btn btn_round btn-success\" onclick=\"return Buy_ord_Print({0},{6})\" " + Print + "=\"" + Print + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"print\" style=\"width: 20px;padding: 0px;height: 20px;border-radius:10px;background-color:#636160;border-color:#636160;\" >  <i class=\"fa fa-print\"></i> </button></a> '],", ProsProg.JMasId, ProsProg.orderno, ProsProg.RefNo, ProsProg.Style, ProsProg.CompanyUnit, ProsProg.Quantity, ProsProg.ProcSeqMNo);
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
        public JsonResult ListEdit(string FromDate, string ToDate, int? CompanyId, int? buyerid, string orderno, int? cmpnyunitid, string refno, string prgmtype, string Ordertype, string DispatchClosed)
        {
            var det = ProProgobj.GetProcessProgram(FromDate, ToDate, CompanyId, buyerid, orderno, cmpnyunitid, refno, prgmtype, Ordertype, DispatchClosed);
            return Json(det, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Proddelete(int Id)
        {
            var Prod = ProProgobj.DeleteProd(Id);
            return Json(Prod, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Compdelete(int Id)
        {
            var Prod = ProProgobj.DeleteComp(Id);
            return Json(Prod, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadCheckPrgInpMadeEntryDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid)
        {
            var getDetails = ProProgobj.GetPrgEntryIndCheckItemDetails(Job_ord_no, ProdPrgNo, ProcessId, Itemid, Colorid, Sizeid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadCheckPrgOutMadeEntryDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid)
        {
            var getDetails = ProProgobj.GetPrgEntryOutCheckItemDetails(Job_ord_no, ProdPrgNo, ProcessId, Itemid, Colorid, Sizeid).Value.ToList();
            return Json(getDetails, JsonRequestBehavior.AllowGet);
        }
    }
}
