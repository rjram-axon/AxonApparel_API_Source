using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ProcessQualityRepository : IProcessQualityRepository
    {
        ProcessEntities entities = new ProcessEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IList<Domain.ProcQltyDet> GetEntryItemLoad(int RecptMasid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptQltyLoadItem(RecptMasid)
                         select new Domain.ProcQltyDet
                         {

                             itemid = YD.Itemid,
                             item = YD.Item,
                             color = YD.Color,
                             Colorid = YD.Colorid,
                             Sizeid = YD.Sizeid,
                             size = YD.Size,
                             ReProQty = YD.RecvdQty,
                             DebitQty = 0,
                             AcptQty = 0,
                             Rate = YD.Rate,
                             Amount = 0

                         }).ToList();

            return query;
        }

        public IList<Domain.ProcQltyJobDet> GetEntryJobDetLoad(int RecptMasid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptQltyLoadOrder(RecptMasid)
                         select new Domain.ProcQltyJobDet
                         {

                             itemid = YD.Itemid,
                             item = YD.Item,
                             color = YD.Color,
                             Colorid = YD.Colorid,
                             Sizeid = YD.Sizeid,
                             uomid=YD.uomid,
                             size = YD.Size,
                             lotno = YD.lotno,
                             jobordno = YD.jobordno,
                             prodprgno = YD.ProdPrgno,
                             procordno = YD.ProdOrdno,
                             Recvdqty=YD.RecvdQty,
                             DebitQty = 0,
                             AcptQty = 0,
                             Rate = YD.Rate,
                             DRate=YD.Rate,
                             Amount = 0,
                             sno=YD.JobDetid,
                             Proc_Recpt_Detid=YD.Proc_Recpt_Detid,
                             DbtProcessId=(int)YD.processid,
                             DbtProcessorId = (int)YD.processordid,
                             Proc_Recpt_jobDetid=YD.JobDetid,
                             
                         }).ToList();

            return query;
        }

        public IList<Domain.ProcQltyStock> GetEntryStockLoad(int RecptMasid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptQltyLoadStock(RecptMasid)
                         select new Domain.ProcQltyStock
                         {

                             itemid = (int)YD.Itemid,                            
                             Colorid = (int)YD.Colorid,
                             Sizeid = (int)YD.Sizeid,                             
                             lotno = YD.Lotno,
                             transdate=(DateTime)YD.Transdate,
                             transno=YD.Transno,
                             Stockid=YD.Stockid,
                             Rejectedqty=0,
                             process=YD.Process,
                             processid=YD.Processid,
                             supplier=YD.Processor,
                             balqty=(decimal)YD.BalQty,
                             Proc_Recpt_jobdetid=YD.Proc_Recpt_JobDetid,
                         }).ToList();

            return query;
        }


        public bool Add(Process_Qlty_mas obj, List<Process_Qlty_det> objdet, List<Process_Qlty_Jobdet> objobdet, List<Process_Qlty_Stock> objstkdet, List<Process_Qlty_DrCr> drcrdet, string Mode)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    int id = 0;
                    var detid = 0;
                    var odetid = 0;

                    entities.Process_Qlty_mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.Proc_qlty_Masid;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.AcptQty > 0 || item.DebitQty > 0)
                            {
                                item.Proc_qlty_Masid = Masid;
                                entities.Process_Qlty_det.Add(item);
                                entities.SaveChanges();
                                detid = item.Proc_Qlty_detid;
                            
                                foreach (var jobdt in objobdet)
                                {

                                    if (jobdt.AcptQty > 0 || jobdt.DebitQty > 0)
                                    {                                        
                                            jobdt.Proc_qlty_Masid = Masid;
                                            jobdt.Proc_qlty_Detid = detid;
                                            entities.Process_Qlty_Jobdet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.Proc_qlty_jobDetid;

                                            foreach (var stkdet in objstkdet)
                                            {
                                                if (stkdet.Rejectedqty > 0)
                                                {
                                                    if (jobdt.Proc_Recpt_jobDetid == stkdet.Proc_Recpt_jobdetid)
                                                    {                                                        
                                                        stkdet.Proc_qlty_jobDetid = odetid;
                                                        entities.Process_Qlty_Stock.Add(stkdet);

                                                    }
                                                }

                                            }                                
                                    }
                                    
                                }
                                entities.SaveChanges();

                            }
                        }

                    }

                  //debit/credit Qty 

                    if (drcrdet != null && drcrdet.Count > 0)
                    {
                        foreach (var item in drcrdet)
                        {
                            item.Proc_qlty_Masid = Masid;
                            entities.Process_Qlty_DrCr.Add(item);
                        }
                        entities.SaveChanges();
                    }

                   
                    var Pg1 = entities.UpdateRejectedQty(obj.Proc_Recpt_no, 0);
                    entities.SaveChanges();

                    var Pg2 = entities.UpdateCostDefnBOM(obj.Proc_Recpt_no, "A");
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProcQltyMas> GetDataRepQltyEditDetails(int Id)
        {
            IQueryable<ProcQltyMas> query = (from a in entities.Proc_Apparel_ProcessRecptQltyEditMain(Id)
                                             select new ProcQltyMas
                                               {
                                                   Proc_qlty_Masid = a.Proc_Qlty_Masid,
                                                   Proc_qlty_date = (DateTime)a.Proc_qlty_date,
                                                   Proc_Qlty_no = a.Proc_Qlty_no,
                                                   Proc_Recpt_no = a.Proc_Recpt_no,
                                                   Process = a.process,
                                                   Supplier = a.processor,                                                  
                                                   Remarks = a.Remarks,
                                                   DcNo=a.dcno,
                                                   Unit=a.CUnit,
                                                  
                                               }).AsQueryable();

            return query;
        }

        public IList<ProcQltyJobDet> GetRepEntryQltyEditItemLoad(int RecptMasid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptQltyEditLoadOrder(RecptMasid)
                         select new Domain.ProcQltyJobDet
                         {

                             itemid = YD.Itemid,
                             item = YD.Item,
                             color = YD.Color,
                             Colorid = YD.Colorid,
                             Sizeid = YD.Sizeid,
                             size = YD.Size,
                             lotno = YD.lotno,
                             uomid=YD.uomid,
                             Proc_Recpt_Detid=YD.Proc_Recpt_Detid,
                             DRate=(decimal)YD.Drate,
                             jobordno = YD.jobordno,
                             prodprgno = YD.ProdPrgno,
                             procordno = YD.ProdOrdno,
                             Recvdqty = YD.RecvdQty,
                             DebitQty = (decimal)YD.DebitQty,
                             AcptQty = (decimal)YD.AcptQty,
                             Rate = YD.Rate,
                             Amount = (decimal)YD.Amount,
                             sno = YD.JobDetid,
                             DbtProcessId = (int)YD.processid,
                             DbtProcessorId = (int)YD.processordid,
                             Proc_Recpt_jobDetid = YD.JobDetid,

                         }).ToList();

            return query;
        }

        public IList<ProcQltyStock> GetRepQltyEditStockLoad(int RecptMasid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptQltyEditLoadStock(RecptMasid)
                         select new Domain.ProcQltyStock
                         {

                             itemid = (int)YD.Itemid,
                             Colorid = (int)YD.Colorid,
                             Sizeid = (int)YD.Sizeid,
                             lotno = YD.Lotno,
                             transdate = (DateTime)YD.Transdate,
                             transno = YD.Transno,
                             Stockid = YD.Stockid,
                             Rejectedqty = (decimal)YD.Rejectedqty,
                             process = YD.Process,
                             processid = YD.Processid,
                             supplier = YD.Processor,
                             balqty = (decimal)YD.BalQty,
                             Proc_Recpt_jobdetid = YD.Proc_Recpt_JobDetid,
                         }).ToList();

            return query;
        }


        public bool UpdateData(Process_Qlty_mas Uobj, List<Process_Qlty_det> Uobjdet, List<Process_Qlty_Jobdet> Uobjobdet, List<Process_Qlty_Stock> Uobjstkdet, List<Process_Qlty_DrCr> Udrcrdet, string Mode)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    int id = 0;
                    var detid = 0;
                    var odetid = 0;
                    int QMasid = 0;
                    int Qdetid = 0;
                    int QJobid = 0;

                    var Pg1 = entities.UpdateRejectedQty(Uobj.Proc_Recpt_no, 1);
                    entities.SaveChanges();

                    var Pg2 = entities.UpdateCostDefnBOM(Uobj.Proc_Recpt_no, "D");
                    entities.SaveChanges();

                    ////////////////////////////////Delete Table
                    var dy = entities.Process_Qlty_mas.Where(c => c.Proc_Recpt_no == Uobj.Proc_Recpt_no);

                    foreach (var dbSet in dy)
                    {
                        QMasid = dbSet.Proc_qlty_Masid;

                        var dc = entities.Process_Qlty_DrCr.Where(c => c.Proc_qlty_Masid == QMasid);

                        foreach (var dbSetC in dc)
                        {
                            QMasid = dbSet.Proc_qlty_Masid;

                            var Det = entities.Process_Qlty_det.Where(u => u.Proc_qlty_Masid == QMasid);

                            foreach (var u in Det)
                            {
                                Qdetid = u.Proc_Qlty_detid;
                                QMasid = dbSet.Proc_qlty_Masid;

                                var JDet = entities.Process_Qlty_Jobdet.Where(J => J.Proc_qlty_Detid == Qdetid);

                                foreach (var J in JDet)
                                {
                                    QJobid = J.Proc_qlty_jobDetid;


                                    var SDet = entities.Process_Qlty_Stock.Where(S => S.Proc_qlty_jobDetid == QJobid);

                                    foreach (var S in SDet)
                                    {

                                        entities.Process_Qlty_Stock.Remove(S);

                                    }

                                    entities.Process_Qlty_Jobdet.Remove(J);

                                }

                                entities.Process_Qlty_det.Remove(u);

                            }
                            entities.Process_Qlty_DrCr.Remove(dbSetC);
                        }
                        entities.Process_Qlty_mas.Remove(dbSet);
                    }


                    entities.SaveChanges();

                    //Add in Edit Mode


                    entities.Process_Qlty_mas.Add(Uobj);
                    entities.SaveChanges();
                    Masid = Uobj.Proc_qlty_Masid;

                    if (Uobjdet != null && Uobjdet.Count > 0)
                    {
                        foreach (var item in Uobjdet)
                        {
                            if (item.AcptQty > 0 || item.DebitQty > 0)
                            {
                                item.Proc_qlty_Masid = Masid;
                                entities.Process_Qlty_det.Add(item);
                                entities.SaveChanges();
                                detid = item.Proc_Qlty_detid;

                                foreach (var jobdt in Uobjobdet)
                                {

                                    if (jobdt.AcptQty > 0 || jobdt.DebitQty > 0)
                                    {
                                        jobdt.Proc_qlty_Masid = Masid;
                                        jobdt.Proc_qlty_Detid = detid;
                                        entities.Process_Qlty_Jobdet.Add(jobdt);
                                        entities.SaveChanges();
                                        odetid = (int)jobdt.Proc_qlty_jobDetid;

                                        foreach (var stkdet in Uobjstkdet)
                                        {
                                            if (stkdet.Rejectedqty > 0)
                                            {
                                                if (jobdt.Proc_Recpt_jobDetid == stkdet.Proc_Recpt_jobdetid)
                                                {
                                                    stkdet.Proc_qlty_jobDetid = odetid;
                                                    entities.Process_Qlty_Stock.Add(stkdet);

                                                }
                                            }

                                        }
                                    }

                                }
                                entities.SaveChanges();

                            }
                        }

                    }

                    //debit/credit Qty 

                    if (Udrcrdet != null && Udrcrdet.Count > 0)
                    {
                        foreach (var item in Udrcrdet)
                        {
                            item.Proc_qlty_Masid = Masid;
                            entities.Process_Qlty_DrCr.Add(item);
                        }
                        entities.SaveChanges();
                    }


                    var Pg3 = entities.UpdateRejectedQty(Uobj.Proc_Recpt_no, 0);
                    entities.SaveChanges();

                    var Pg4 = entities.UpdateCostDefnBOM(Uobj.Proc_Recpt_no, "A");
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-AddDetData");
                }
            }
            return reserved;
        }

        public bool DeleteData(Process_Qlty_mas Dobj, List<Process_Qlty_det> Dobjdet, List<Process_Qlty_Jobdet> Dobjobdet, List<Process_Qlty_Stock> Dobjstkdet, List<Process_Qlty_DrCr> Ddrcrdet, string Mode)
        {
            bool reserved = false;
       
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                  
                    int QMasid = 0;
                    int Qdetid = 0;
                    int QJobid = 0;

                    var Pg1 = entities.UpdateRejectedQty(Dobj.Proc_Recpt_no, 1);
                    entities.SaveChanges();

                    var Pg2 = entities.UpdateCostDefnBOM(Dobj.Proc_Recpt_no, "D");
                    entities.SaveChanges();

                    ////////////////////////////////Delete Table
                    var dy = entities.Process_Qlty_mas.Where(c => c.Proc_Recpt_no == Dobj.Proc_Recpt_no);

                    foreach (var dbSet in dy)
                    {
                        QMasid = dbSet.Proc_qlty_Masid;

                        var dc = entities.Process_Qlty_DrCr.Where(c => c.Proc_qlty_Masid == QMasid);

                        foreach (var dbSetC in dc)
                        {
                            QMasid = dbSet.Proc_qlty_Masid;

                            var Det = entities.Process_Qlty_det.Where(u => u.Proc_qlty_Masid == QMasid);

                            foreach (var u in Det)
                            {
                                Qdetid = u.Proc_Qlty_detid;
                                QMasid = dbSet.Proc_qlty_Masid;

                                var JDet = entities.Process_Qlty_Jobdet.Where(J => J.Proc_qlty_Detid == Qdetid);

                                foreach (var J in JDet)
                                {
                                    QJobid = J.Proc_qlty_jobDetid;


                                    var SDet = entities.Process_Qlty_Stock.Where(S => S.Proc_qlty_jobDetid == QJobid);

                                    foreach (var S in SDet)
                                    {

                                        entities.Process_Qlty_Stock.Remove(S);

                                    }

                                    entities.Process_Qlty_Jobdet.Remove(J);

                                }

                                entities.Process_Qlty_det.Remove(u);

                            }
                            entities.Process_Qlty_DrCr.Remove(dbSetC);
                        }
                        entities.Process_Qlty_mas.Remove(dbSet);
                    }


                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-AddDetData");
                }
            }
            return reserved;
        }
    }
}
