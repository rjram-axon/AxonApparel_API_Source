using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using System.Data.Entity;
using System.Transactions;
namespace AxonApparel.Repository
{
    public class ProcessSeqRepository : IProcessSeqRepository
    {
        PlanningEntities entities = new PlanningEntities();

        public IQueryable<ProcessSequenceMain> GetDataMainList(int? CompanyId, int? BuyerId, int? Styleid, string Order_No, string Ref_No, string JobNo, string FDate, string ToDate, string OrdType)
        {
            IQueryable<ProcessSequenceMain> query = (from cd in entities.Proc_Apparel_GetProcessSeqMList(CompanyId == null ? 0 : CompanyId, BuyerId == null ? 0 : BuyerId, Styleid == null ? 0 : Styleid, string.IsNullOrEmpty(Order_No) ? "" : Order_No, string.IsNullOrEmpty(Ref_No) ? "" : Ref_No, string.IsNullOrEmpty(JobNo) ? "" : JobNo, FDate == null ? "" : FDate.ToString(), ToDate == null ? "" : ToDate.ToString(), OrdType)
                                                     select new ProcessSequenceMain
                                                     {
                                                         Order_No = cd.Order_No,
                                                         BuyerId = (int)cd.buyerid,
                                                         BuyerName = cd.Buyer,
                                                         Ref_No = cd.Ref_No,
                                                         JobNo = cd.JobNo,
                                                         Styleid = (int)cd.styleid,
                                                         Style = cd.style,
                                                         CompanyId = (int)cd.companyid,
                                                         Companyunitid = (int)cd.company_unitid,
                                                         EntryDate = cd.Entrydate,
                                                         MerchandiserId = (int)cd.Merchandiserid,
                                                         MerchandiserName = cd.Merchandiser,
                                                         OrdType = cd.ordertype,
                                                         Processseqmasid = cd.Proc_seq_masid,
                                                         Stylerowid = (int)cd.Stylerowid,
                                                         CPrgNo = cd.CPrgno,

                                                     })
                                                     .ToList()
                                                     .AsQueryable();
            return query;
        }




        public bool DeleteData(int Id)
        {
            bool reserved = false;
            int ProcessId = 0;
            int Procseqmasid = 0;
            int PrgId = 0;
            string JobNo = "";

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    //ProgNo Delete


                    var Pqd = entities.ProcessSeq.Where(u => u.Proc_seq_masid == Id);

                    foreach (var G in Pqd)
                    {
                        ProcessId = (int)G.Processid;
                        Procseqmasid = (int)G.Proc_seq_masid;

                        var ProcessS = entities.ProcessSeq_Mas.Where(b => b.Proc_seq_masid == Procseqmasid).FirstOrDefault();
                        if (ProcessS != null)
                        {
                            JobNo = ProcessS.Job_ord_no;


                        }
                        var ProgNo = entities.Prod_Prg_Mas.Where(b => b.Job_ord_no == JobNo && b.ProcessId == ProcessId).FirstOrDefault();
                        if (ProgNo != null)
                        {
                            PrgId = ProgNo.ProdPrgid;

                        }
                        var Pget = entities.Prod_Prg_Det.Where(u => u.Prodprgid == PrgId);

                        foreach (var Pd in Pget)
                        {
                            entities.Prod_Prg_Det.Remove(Pd);
                        }

                        var Pgas = entities.Prod_Prg_Mas.Where(c => c.ProdPrgid == PrgId).FirstOrDefault();
                        if (Pgas != null)
                        {
                            entities.Prod_Prg_Mas.Remove(Pgas);
                        }
                        entities.SaveChanges();
                    }
                    //



                    var Det = entities.ProcessSeq.Where(u => u.Proc_seq_masid == Id);

                    foreach (var u in Det)
                    {
                        entities.ProcessSeq.Remove(u);
                    }
                    var Mas = entities.ProcessSeq_Mas.Where(c => c.Proc_seq_masid == Id).FirstOrDefault();
                    if (Mas != null)
                    {
                        entities.ProcessSeq_Mas.Remove(Mas);
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


        public IQueryable<ProcessSequenceMain> GetDataOrderRepDetails(string fromDate, string toDate)
        {
            IQueryable<ProcessSequenceMain> query = (from cd in entities.Proc_Apparel_GetPlanningProcSeqDropdownDetails(fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString())
                                                     select new ProcessSequenceMain
                                              {

                                                  Order_No = cd.OrdNo,
                                                  Ref_No = cd.RefNo,
                                                  Style = cd.Style,
                                                  Styleid = cd.StyId,
                                                  BuyerName = cd.Buyer,
                                                  BuyerId = (int)cd.buyId,
                                                  JobNo = cd.JobNo,
                                                  CompanyId = (int)cd.ComId,
                                                  CompanyName = cd.Company,
                                                  Companyunitname = cd.ComUnit,
                                                  Companyunitid = (int)cd.company_unitid,

                                              }).AsQueryable();
            return query;
        }
    }
}
