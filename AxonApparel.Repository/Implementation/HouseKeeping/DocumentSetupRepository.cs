using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class DocumentSetupRepository : IDocumentSetupRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();



        public IList<Domain.ReportPrefix> GetRptOption()
        {

            var query = (from YD in entities.Proc_Apparel_GetDocumentSetupMaingrid()
                         select new Domain.ReportPrefix
                         {
                             Rpt_PID = YD.Rpt_PID,
                             Doc_Title = YD.Doc_Title,
                             Doc_Type = YD.Doc_Type
                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<Domain.ReportFooterSetup> GetRptDet(string docname)
        {
            int setupid = 0;
            var DocPre = entities.Report_Footer_Setup.Where(c => c.Doc_Title == docname).FirstOrDefault();

            if (DocPre != null)
            {
                setupid = DocPre.Rpt_Setupid;
            }

            var query = (from YD in entities.Proc_Apparel_GetDocumSetupDetails(setupid)
                         select new Domain.ReportFooterSetup
                         {
                             Rpt_Setupid = setupid,
                             Rpt_Title = YD.Rpt_Title,
                             Doc_Title = YD.Doc_Title,
                             Rpt_Approved = YD.Rpt_Approved,
                             Rpt_forwarded = YD.Rpt_forwarded,
                             Rpt_Prepared = YD.Rpt_Prepared,
                             Rpt_Verified = YD.Rpt_Verified,
                             optionid = YD.optionid,
                             optionname = YD.option_name,
                             optionvalue = (bool)YD.option_value,
                             rpt_Header=YD.rpt_Header,
                             Rpt_Remarks=YD.Rpt_Remarks,
                             Rpt_StdCode=YD.RPT_STDCODE,
                             RPT_STDCODE2=YD.RPT_STDCODE2
                         }).AsQueryable();

            return query;
        }


        public bool UpdDetData(Report_Footer_Setup obj,  List<Domain.ReportOption> objdet, List<Domain.Report_Footer_Email> objemaildet, List<Domain.Report_Footer_Process> objprocdet,string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            int ids = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var Upd = entities.Report_Footer_Setup.Where(c => c.Rpt_Setupid == obj.Rpt_Setupid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Rpt_Title = obj.Rpt_Title;
                        Upd.Rpt_forwarded = obj.Rpt_forwarded;
                        Upd.Rpt_Prepared = obj.Rpt_Prepared;
                        Upd.Rpt_Approved = obj.Rpt_Approved;
                        Upd.Rpt_Verified = obj.Rpt_Verified;
                        Upd.Rpt_StdCode = obj.Rpt_StdCode;
                        Upd.RPT_STDCODE2 = obj.RPT_STDCODE2;
                        //Upd.Rpt_Buyer = obj.Rpt_Buyer;
                        //Upd.Rpt_BuyerRefNo = obj.Rpt_BuyerRefNo;
                        //Upd.Rpt_JobNo = obj.Rpt_JobNo;
                        //Upd.Rpt_Orderno = obj.Rpt_Orderno;
                        //Upd.Rpt_RefNo = obj.Rpt_RefNo;
                        Upd.Rpt_Remarks = obj.Rpt_Remarks;
                        Upd.rpt_Header = obj.rpt_Header;

                        entities.SaveChanges();

                    }                   


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var im in objdet)
                        {

                            var Pg1 = entities.Proc_Apparel_UpdateRptOption(im.setupid);
                            entities.SaveChanges();

                        }

                        foreach (var item in objdet)
                        {

                            var Pg1 = entities.Proc_Apparel_UpdRptOption(item.optionvalue, item.optionid, item.setupid);
                            entities.SaveChanges();

                        }
                    }

                    //Delete Footer_Email
                    if (objemaildet != null && objemaildet.Count > 0)
                    {
                        foreach (var itmdel in objemaildet)
                        {
                            id = (int)itmdel.Rpt_Setupid;

                        }

                        var deletedetad = entities.Report_Footer_Email.Where(d => d.Rpt_Setupid == id).ToList<Report_Footer_Email>();

                        deletedetad.ForEach(c => entities.Report_Footer_Email.Remove(c));
                        entities.SaveChanges();
                       
                    }
                    //Delete Footer_Process
                    if (objprocdet != null && objprocdet.Count > 0)
                    {
                        foreach (var itmdel in objprocdet)
                        {
                            ids = (int)itmdel.Rpt_Setupid;

                        }
                        var deletedetadpr = entities.Report_Footer_Process.Where(d => d.Rpt_Setupid == ids).ToList<Report_Footer_Process>();

                        deletedetadpr.ForEach(c => entities.Report_Footer_Process.Remove(c));
                        entities.SaveChanges();

                    }
                    //Insert Email
                    if (objemaildet != null && objemaildet.Count > 0)
                    {
                        foreach (var itm in objemaildet)
                        {

                            var Pg1 = entities.Proc_Apparel_UpdReportEmail(itm.Employeeid,itm.Rpt_Setupid );
                            entities.SaveChanges();

                        }
                    }
                                                        
                    //Insert Process
                    if (objprocdet != null && objprocdet.Count > 0)
                    {
                        foreach (var itm in objprocdet)
                        {

                            var Pg1 = entities.Proc_Apparel_UpdReportProcess(itm.Processid, itm.Rpt_Setupid, itm.Rpt_Ins);
                            entities.SaveChanges();

                        }
                    }
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public IQueryable<Domain.Report_Footer_Email> GetRptEmpDet(string docname)
        {
            int setupid = 0;
            var DocPre = entities.Report_Footer_Setup.Where(c => c.Doc_Title == docname).FirstOrDefault();

            if (DocPre != null)
            {
                setupid = DocPre.Rpt_Setupid;
            }
            var query = (from YD in entities.Proc_Apparel_GetDocSetupEmpDetails(setupid)
                         select new Domain.Report_Footer_Email
                         {
                             Employeeid = YD.Employeeid,
                             Employee = YD.Employee,
                             Rpt_EmpId = YD.Rpt_EmpId,
                             Rpt_Setupid = YD.Rpt_Setupid,
                             SlNo=(long)YD.Snumb
                         }).AsQueryable();

            return query;
        }
    }
}
