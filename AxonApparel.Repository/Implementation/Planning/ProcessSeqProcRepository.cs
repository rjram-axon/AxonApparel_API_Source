using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Web.Mvc;
using System.Transactions;
namespace AxonApparel.Repository
{
    public class ProcessSeqProcRepository : IProcessSeqProcRepository
    {
        PlanningEntities entities = new PlanningEntities();

        int ProsId = 0;

        public IQueryable<Domain.ProcessSequenceMain> GetDataPlanDetails(int StyleIdRowID)
        {
            IQueryable<ProcessSequenceMain> query = (from a in entities.Proc_Apparel_GetProcessAddListDetails(StyleIdRowID)
                                                     select new ProcessSequenceMain
                                              {
                                                  Order_No = a.Order_No,
                                                  Ref_No = a.Ref_No,
                                                  Styleid = (int)a.Styleid,
                                                  Style = a.Style,
                                                  JobNo = a.Job_Ord_No,
                                                  BuyerId = (int)a.Buyerid,
                                                  BuyerName = a.Buyer,
                                                  CompanyId = (int)a.Companyid,
                                                  CompanyName = a.Company,
                                                  MerchandiserName = a.Employee,
                                                  Companyunitname = a.Companyunit,
                                                  EntryDate = (DateTime)a.EntryDate,
                                                  Processseqmasid = a.Proc_seq_masid,
                                                  JobNoId = a.ID,
                                                  OrdType = a.JobOrWork,
                                                  Companyunitid = (int)a.ProcessUnitID,
                                                  Despatch_Closed = a.StyleDespatch_Closed
                                              })

                                              .AsQueryable();

            return query;
        }



        public IQueryable<ProcessSequenceMain> GetDataAddList()
        {
            IQueryable<ProcessSequenceMain> query = (from cd in entities.Proc_Apparel_GetProcessSeqProcList()
                                                     select new ProcessSequenceMain
                                              {
                                                  Processid = cd.Processid,
                                                  Processname = cd.Process

                                              }).AsQueryable();


            return query;
        }



        public bool UpdateDetData(ProcessSeq_Mas objAd, List<ProcessSeq> objCDet)
        {

            bool reserved = false;
            int Pseqmasid = 0;
            int Pseqid = 0;
            int ProSeqId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {



                    ////////////////////////////////Delete Yarn Table
                    var dy = entities.ProcessSeq_Mas.Where(c => c.Proc_seq_masid == objAd.Proc_seq_masid);

                    foreach (var dbSet in dy)
                    {
                        Pseqmasid = dbSet.Proc_seq_masid;
                        var Det = entities.ProcessSeq.Where(u => u.Proc_seq_masid == Pseqmasid);

                        foreach (var u in Det)
                        {

                            entities.ProcessSeq.Remove(u);

                        }
                        entities.ProcessSeq_Mas.Remove(dbSet);
                    }


                    entities.SaveChanges();



                    entities.ProcessSeq_Mas.Add(objAd);
                    entities.SaveChanges();
                    ProSeqId = objAd.Proc_seq_masid;

                    foreach (var PSeq in objCDet)
                    {
                        PSeq.Proc_seq_masid = ProSeqId;
                        entities.ProcessSeq.Add(PSeq);
                    }
                    entities.SaveChanges();

                    //var App = entities.ProcessSeq_Mas.Where(c => c.Proc_seq_masid == objAd.Proc_seq_masid).FirstOrDefault();
                    //if (App != null)
                    //{

                    //    App.Job_ord_no = objAd.Job_ord_no;
                    //    App.EntryDate = objAd.EntryDate;
                    //    App.OrderType = objAd.OrderType;
                    //    App.CreatedBy = objAd.CreatedBy;

                    //}
                    //entities.SaveChanges();

                    //foreach (var i in objCDet)
                    //{
                    //    //var c = entities.ProcessSeqs.Where(a => a.Proc_seq_masid.Equals(i.Proc_seq_masid)).FirstOrDefault();
                    //    //if (c != null)
                    //    //{
                    //    //    c.Processid = i.Processid;
                    //    //    c.Proc_seq_masid = i.Proc_seq_masid;
                    //    //    c.PSeqId = i.PSeqId;
                    //    //}

                    //    var PgSeqDet = entities.Proc_Apparel_GetPlanningSeqUpdate(i.Proc_seq_masid, i.Processid, i.ProcessSeqid, objAd.Job_ord_no);
                    //    entities.SaveChanges();
                    //}

                    //entities.SaveChanges();
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




        public IList<ProcessList> GetProcSeqDetList(int StyleRowID)
        {
            var query = (from Ec in entities.Proc_Apparel_GetProcEditSeqList(StyleRowID)
                         select new ProcessList
                         {
                             Processid = Ec.Processid,
                             Processname = Ec.Process,
                             ProcessSeqid = Ec.ProcessSeqid,
                             Processseqmasid = (int)Ec.Proc_seq_masid,

                         }).AsQueryable();

            return query.ToList();
        }




        public bool AddDetData(ProcessSeq_Mas objPlan, List<ProcessSeq> objPDet)
        {
            int ProSeqId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    entities.ProcessSeq_Mas.Add(objPlan);
                    entities.SaveChanges();
                    ProSeqId = objPlan.Proc_seq_masid;

                    foreach (var PSeq in objPDet)
                    {
                        PSeq.Proc_seq_masid = ProSeqId;
                        entities.ProcessSeq.Add(PSeq);
                    }
                    entities.SaveChanges();

                    var res = AmendData(objPlan, objPDet);
                    entities.SaveChanges();

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


        public bool AmendData(ProcessSeq_Mas objPlan, List<ProcessSeq> objPDet)
        {
            
            int AmdProSeqId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    Repository.ProcessSeq_Mas_Amend masamd = new Repository.ProcessSeq_Mas_Amend();
                    if (objPlan != null)
                    {

                        masamd.Job_ord_no = objPlan.Job_ord_no;
                        masamd.OrderType = objPlan.OrderType;
                        masamd.EntryDate = objPlan.EntryDate;
                        masamd.CreatedBy = objPlan.CreatedBy;
                    }

                    var id = entities.ProcessSeq_Mas_Amend.Add(masamd);
                    entities.SaveChanges();
                    AmdProSeqId = masamd.AmdProc_seq_masid;


                    var List = new List<Repository.ProcessSeq_Amend>();
                    foreach (var ad in objPDet)
                    {
                        List.Add(new Repository.ProcessSeq_Amend
                        {
                            Processid = ad.Processid,
                            ProcessSeqid = ad.ProcessSeqid,
                            AmdProc_seq_masid = AmdProSeqId,
                        });
                    }

                    foreach (var PSeq in List)
                    {
                        entities.ProcessSeq_Amend.Add(PSeq);
                    }
                    entities.SaveChanges();

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


        public IQueryable<ProcessSequenceMain> GetStylerowid(int pid)
        {
            var query = (from Ec in entities.Proc_Apparel_GetStylerowidList(pid)
                         select new ProcessSequenceMain
                         {
                             Stylerowid = (int)Ec.StyleRowid,

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessSequenceMain> GetRepProSeq(List<ProcessSeq> objProDet, string JobNo)
        {


            foreach (var PSeq in objProDet)
            {
                ProsId = (int)PSeq.Processid;

            }

            var query = (from Ec in entities.Proc_Apparel_GetProcessSeqCheck(ProsId, JobNo)
                         select new ProcessSequenceMain
                         {
                             Processseqmasid = (int)Ec.Proc_seq_masid,
                             Processid = (int)Ec.processid,

                         }).AsQueryable();

            return query;
        }



        public bool GetRepAutoPrg(List<ProcessSeq> objProDet, string JobNo, int UserId)
        {

            bool reserved = false;



            string OType = "";

            var OQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == JobNo).FirstOrDefault();
            if (OQuery != null)
            {
                OType = OQuery.JobOrWork;
            }
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var PSeq in objProDet)
                    {
                        ProsId = (int)PSeq.Processid;

                    }
                    var Pg1 = entities.Proc_GenerateproductionProgram(JobNo, ProsId, OType, UserId);
                    entities.SaveChanges();

                    //var res = AutoAmendData(objProDet, JobNo, UserId);
                    //entities.SaveChanges();

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
        public bool AutoAmendData(List<ProcessSeq> objProDet, string JobNo, int UserId)
        {

            bool reserved = false;            
            string OType = "";

            var OQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == JobNo).FirstOrDefault();
            if (OQuery != null)
            {
                OType = OQuery.JobOrWork;
            }
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var PSeq in objProDet)
                    {
                        ProsId = (int)PSeq.Processid;

                    }
                    var Pg1 = entities.Proc_GenerateproductionProgramAmd(JobNo, ProsId, OType, UserId);
                    entities.SaveChanges();

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


        public IQueryable<ProcessSequenceMain > GetRepPrgProSeq(List<ProcessSeq> objProDet, string JobNo)
        {
            foreach (var PSeq in objProDet)
            {
                ProsId = (int)PSeq.Processid;

            }

            var query = (from Ec in entities.Proc_Apparel_GetProcessSeqProgCheck(ProsId, JobNo)
                         select new ProcessSequenceMain
                         {
                             ChkProcPrgid = (int)Ec.ProdPrgid,
                             Processid = (int)Ec.processid,

                         }).AsQueryable();

            return query;
        }
    }
}
