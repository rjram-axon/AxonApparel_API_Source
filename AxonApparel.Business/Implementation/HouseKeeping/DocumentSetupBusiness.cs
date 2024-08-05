using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class DocumentSetupBusiness : IDocumentSetupBusiness
    {
        IDocumentSetupRepository AlRep = new DocumentSetupRepository();

        public Common.Response<IList<Domain.ReportPrefix>> GetRptOption()
        {
            try
            {
                var ProductWO = AlRep.GetRptOption();

                return new Response<IList<Domain.ReportPrefix>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ReportPrefix>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.ReportFooterSetup>> GetRptDet(string docname)
        {
            try
            {
                var ProductWO = AlRep.GetRptDet(docname);

                return new Response<IQueryable<Domain.ReportFooterSetup>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ReportFooterSetup>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateData(Domain.ReportFooterSetup objupd)
        {
            try
            {
                AxonApparel.Repository.Report_Footer_Setup ProcUpd = new AxonApparel.Repository.Report_Footer_Setup
                {
                    //Rpt_Setupid = objupd.Rpt_PID,
                    //Rpt_Title = objupd.rpttitle,
                    //Doc_Title = objupd.Doc_Title,

                    Rpt_Setupid = objupd.Rpt_Setupid,
                    Rpt_Title = objupd.Rpt_Title,
                    Doc_Title = objupd.Doc_Title,
                    Rpt_StdCode = objupd.Rpt_StdCode==null?"":objupd.Rpt_StdCode,
                    RPT_STDCODE2 = objupd.RPT_STDCODE2==null?"":objupd.RPT_STDCODE2,
                    Rpt_forwarded = objupd.Rpt_forwarded,
                    Rpt_Prepared = objupd.Rpt_Prepared,
                    Rpt_Verified = objupd.Rpt_Verified,
                    Rpt_Approved = objupd.Rpt_Approved,
                    Rpt_Remarks = objupd.Rpt_Remarks==null?"":objupd.Rpt_Remarks,
                    Rpt_RefNo = objupd.Rpt_RefNo,
                    Rpt_Style = objupd.Rpt_Style,
                    Rpt_Buyer = objupd.Rpt_Buyer,
                    Rpt_BuyerRefNo = objupd.Rpt_BuyerRefNo,
                    Rpt_BuyLookup = objupd.Rpt_BuyLookup,
                    rpt_Header = objupd.rpt_Header==null?"":objupd.rpt_Header,
                    Rpt_JobNo = objupd.Rpt_JobNo,
                    Rpt_Orderno = objupd.Rpt_Orderno,
                    Rpt_StyleQty = objupd.Rpt_StyleQty,

                };

                //var ItmList = new List<Domain.ReportFooterSetup>();

                //foreach (var PItem in objupd.RptDet)
                //{
                //    ItmList.Add(new ReportFooterSetup
                //    {
                //        Rpt_Setupid = PItem.Rpt_Setupid,
                //        Rpt_Title = PItem.Rpt_Title,
                //        Doc_Title = PItem.Doc_Title,
                //        Rpt_StdCode = PItem.Rpt_StdCode,
                //        RPT_STDCODE2 = PItem.RPT_STDCODE2,
                //        Rpt_forwarded = PItem.Rpt_forwarded,
                //        Rpt_Prepared = PItem.Rpt_Prepared,
                //        Rpt_Verified = PItem.Rpt_Verified,
                //        Rpt_Approved = PItem.Rpt_Approved,
                //        Rpt_Remarks = PItem.Rpt_Remarks,
                //        Rpt_RefNo = PItem.Rpt_RefNo,
                //        Rpt_Style = PItem.Rpt_Style,
                //        Rpt_Buyer = PItem.Rpt_Buyer,
                //        Rpt_BuyerRefNo = PItem.Rpt_BuyerRefNo,
                //        Rpt_BuyLookup = PItem.Rpt_BuyLookup,
                //        rpt_Header = PItem.rpt_Header,
                //        Rpt_JobNo = PItem.Rpt_JobNo,
                //        Rpt_Orderno = PItem.Rpt_Orderno,
                //        Rpt_StyleQty = PItem.Rpt_StyleQty,

                //    });

                //}



                var Itm = new List<Domain.ReportOption>();
                if (objupd.RptOptDet != null)
                {
                    foreach (var Item in objupd.RptOptDet)
                    {
                        Itm.Add(new Domain.ReportOption
                        {

                            optionid = Item.optionid,
                            option = Item.option,
                            optionvalue = Item.optionvalue,
                            setupid = Item.setupid

                        });

                    }
                }
                var ProcItm = new List<Domain.Report_Footer_Process>();
                if (objupd.RptProcDet != null)
                {
                    foreach (var proc in objupd.RptProcDet)
                    {
                        ProcItm.Add(new Domain.Report_Footer_Process
                        {

                            Processid = proc.Processid,
                            Rpt_Processid = proc.Rpt_Processid,
                            Rpt_Ins = proc.Rpt_Ins,
                            Rpt_Setupid = proc.Rpt_Setupid

                        });

                    }
                }

                var EmailItm = new List<Domain.Report_Footer_Email>();

                if (objupd.RptEmailDet != null)
                {
                    foreach (var proc in objupd.RptEmailDet)
                    {
                        EmailItm.Add(new Domain.Report_Footer_Email
                        {

                            Rpt_EmpId = proc.Rpt_EmpId,
                            Employeeid = proc.Employeeid,
                            Rpt_Setupid = proc.Rpt_Setupid

                        });

                    }
                }

                var result = AlRep.UpdDetData(ProcUpd, Itm, EmailItm, ProcItm, "Upd");

                return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<Domain.Report_Footer_Email>> GetRptEmpDet(string docname)
        {
            try
            {
                var ProductWO = AlRep.GetRptEmpDet(docname);

                return new Response<IQueryable<Domain.Report_Footer_Email>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Report_Footer_Email>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
