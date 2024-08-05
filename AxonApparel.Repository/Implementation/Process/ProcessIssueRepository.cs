using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ProcessIssueRepository : IProcessIssueRepository
    {
        ProcessEntities entities = new ProcessEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.ProcessIssueAddgrid> Getprocess()
        {
            var query = (from YD in entities.Proc_Apparel_ProcIssLoadProcess()
                         select new ProcessIssueAddgrid
                         {

                             process = YD.process,
                             processid = YD.ProcessId

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessIssueAddgrid> Getsupp()
        {
            var query = (from YD in entities.Proc_Apparel_ProcIssLoadSupp()
                         select new ProcessIssueAddgrid
                         {

                             suppid = YD.supplierid,
                             supp = YD.supplier

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessIssueAddgrid> Loadgrid(int cmpunitid, int procid, string ordertype, string processortype, int buyerid, string refno, string ordno, int procserid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcIssueLoadaddgrid(cmpunitid, procid, ordertype, processortype, buyerid, refno, ordno, procserid)
                         select new ProcessIssueAddgrid
                         {

                             companyid = YD.Companyid,
                             cmpunitid=(int)YD.companyunitid,
                             cmpunit=YD.CompanyUnit,
                             buyerid=YD.buyerid,
                             buyer=YD.Buyer,
                             processid=(int)YD.Processid,
                             process=YD.Process,
                             processordid = YD.processordid,
                             processorid = (int)YD.processorid,
                             processor = YD.processer,
                             procdate = (DateTime)YD.processordate,
                             processorder = YD.processorder,
                             qty = (decimal)YD.Quantity,
                             bal = (decimal)YD.BalanceQuantity,
                             issueqty = (decimal)YD.IssuedQuantity,
                             refno=YD.refno,
                             orderno=YD.orderno

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessIssueDet> Loaditmsgrid(int procid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcIssueLoadItm(procid)
                         select new ProcessIssueDet
                         {

                             itemid = (int)YD.itemid,
                             colorid = (int)YD.colorid,
                             sizeid = (int)YD.sizeid,
                             item = YD.item,
                             color = YD.color,
                             size = YD.size,
                             orderqty = YD.OrderedQuantity,
                             bal = (decimal)YD.BalanceQuantity,
                             IssueQty = 0,//YD.IssuedQuantity,
                             processorddetid = YD.processorddetid,
                             sno = YD.processorddetid,
                             OutputUom = YD.uomid,
                             ip_op = YD.inp_op

                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessIssueJobdet> LoadJobdetgrid(int procid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessIssueLoadJobdet(procid)
                         select new ProcessIssueJobdet
                         {

                             itemid = (int)YD.ItemId,
                             colorid = (int)YD.Colorid,
                             sizeid = (int)YD.SizeId,
                             bal = (decimal)YD.BalanceQuantity,
                             IssueQty = YD.issued_qty,
                             processorddetid = (int)YD.ProcessOrddetid,
                             Job_ord_no = YD.Job_ord_no,
                             ProdPrgNo = YD.ProdPrgNo,
                             processordjobdetid = YD.ProcessJobDetid,
                             sno = YD.ProcessJobDetid,
                             jmasid = YD.jmasid,
                             ip_op = YD.ip_op

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessIssueStock> LoadStkdet(string jmasid, int cmpid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcIssLoadStkdet(jmasid, cmpid)
                         select new ProcessIssueStock
                         {
                             LotNo = YD.lotNo,
                             ItemStockId = YD.StockId,
                             IssueQty = 0,
                             balqty = (decimal)YD.BalQty,
                             process = YD.Process,
                             Job_ord_no = YD.joborderNo,
                             Itemid = (int)YD.Itemid,
                             Colorid = (int)YD.Colorid,
                             Sizeid = (int)YD.Sizeid,
                             jmasid = YD.jmasid

                         }).AsQueryable();

            return query;
        }


        public int AddIssData(Process_Issue_Mas objEntry)
        {
            var id = entities.Process_Issue_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.ProcessIssueId;
        }

        public bool AddIssDetData(Process_Issue_Mas obj, DateTime transdate, List<Domain.ProcessIssueJobdet> jdet, int processordid, string issueno, List<Process_Issue_Det> objdet, List<Process_Issue_Jobdet> objobdet, List<Process_Issue_Stock> objstkdet, string Mode, int unitmId = 0)
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

                    entities.Process_Issue_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.ProcessIssueId;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.IssueQty > 0)
                            {
                                item.ProcessIssueId = Masid;
                                entities.Process_Issue_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.ProcessIssueDetId;
                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.IssueQty > 0)
                                    {
                                        if (item.itemid == jobdt.itemid && item.colorid == jobdt.colorid && item.sizeid == jobdt.sizeid && item.ip_op == jobdt.ip_op)
                                        {
                                            jobdt.ProcessIssueId = Masid;
                                            jobdt.ProcessIssueDetId = detid;
                                            entities.Process_Issue_Jobdet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessIssueJobId;

                                            foreach (var stkdet in objstkdet)
                                            {
                                                if (stkdet.IssueQty > 0)
                                                {
                                                    if (jobdt.itemid == stkdet.Itemid && jobdt.colorid == stkdet.Colorid && jobdt.sizeid == stkdet.Sizeid)
                                                    {
                                                        stkdet.ProcessIssueId = Masid;
                                                        stkdet.ProcessIssueNo = issueno;
                                                        stkdet.ProcessIssueJobid = odetid;
                                                        entities.Process_Issue_Stock.Add(stkdet);

                                                    }
                                                }

                                            }

                                        }
                                    }
                                    // }
                                }
                                entities.SaveChanges();

                            }
                        }

                    }

                    //if (objobdet != null && objobdet.Count > 0)
                    //{

                    //}



                    foreach (var det in objdet)
                    {
                        if (det.IssueQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcIssUpdProcorddet(det.IssueQty, det.itemid, det.colorid, det.sizeid, processordid);
                            entities.SaveChanges();
                        }

                    }

                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdProcordjobdet(jobdt.IssueQty, jobdt.processordjobdetid);
                            entities.SaveChanges();

                            var Pg6 = entities.Proc_Apparel_ProcIssUpdProdprgdet(jobdt.IssueQty, jobdt.itemid, jobdt.colorid, jobdt.sizeid, jobdt.ProdPrgNo);
                            entities.SaveChanges();

                        }
                    }

                    foreach (var stk in objstkdet)
                    {
                        if (stk.IssueQty > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdItmstk(stk.IssueQty, stk.ItemStockId);
                            entities.SaveChanges();


                            var Pg8 = entities.Proc_Apparel_ProcessIssueInsertstkoutward(stk.ProcessIssueJobid, stk.ItemStockId, stk.IssueQty, stk.ProcessIssStockId);
                            entities.SaveChanges();

                        }


                    }


                    bool UCMR1 = MarkUpRateIssUpdation(processordid);

                    bool UCMR = MarkUpRateOrdUpdation(processordid);

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessIssue-AddIssDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProcessIssueAddgrid> LoadMaingrid(int? cmpid, string issueno, int processid, string ordno, int? masid, string procordno, int? unitid, string refno, string ordtype, string fromdate, string todate)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessIssueLoadMainGrid(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(issueno) ? "" : issueno, processid == null ? 0 : processid, string.IsNullOrEmpty(ordno) ? "" : ordno, masid == null ? 0 : masid, string.IsNullOrEmpty(procordno) ? "" : procordno, unitid == null ? 0 : unitid, string.IsNullOrEmpty(refno) ? "" : refno, string.IsNullOrEmpty(ordtype) ? "" : ordtype, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString())
                         select new ProcessIssueAddgrid
                         {
                             companyid = YD.Companyid,
                             company = YD.Company,
                             cmpunitid = YD.Id,
                             cmpunit = YD.CompanyUnit,
                             refno = YD.ref_no,
                             orderno = YD.Order_no,
                             ordtype = YD.Ordertype,
                             processissue = YD.ProcessIssueNo,
                             processorder = YD.ProcessOrder,
                             processordid = (int)YD.ProcessOrdId,
                             procdate = (DateTime)YD.ProcessIssueDate,
                             processid = YD.Processid,
                             process = YD.Process,
                             processissueid = YD.ProcessIssueId,
                             supp = YD.Supplier,
                             remarks = YD.Remarks
                         }).AsQueryable();

            return query;
        }


        public bool UpdateData(Process_Issue_Mas objupd)
        {
            try
            {
                var result = false;
                var Upd = entities.Process_Issue_Mas.Where(c => c.ProcessIssueId == objupd.ProcessIssueId).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.ProcessIssueId = objupd.ProcessIssueId;
                    Upd.ProcessIssueNo = objupd.ProcessIssueNo;
                    Upd.ProcessOrdId = objupd.ProcessOrdId;
                    Upd.ProcessIssueDate = objupd.ProcessIssueDate;
                    Upd.Remarks = objupd.Remarks;
                    Upd.IssueStoreid = objupd.IssueStoreid;
                    Upd.GatePassVehicle = objupd.GatePassVehicle;
                    Upd.EWayNo = objupd.EWayNo;
                    Upd.EWayDate = objupd.EWayDate;
                    Upd.CreatedBy = objupd.CreatedBy;

                    entities.SaveChanges();
                    result = true;
                }
                else { result = false; }

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool DeleteDetData(DateTime transdate, List<Domain.ProcessIssueJobdet> jdet, int processordid, string issueno, List<Process_Issue_Det> objdet, List<Process_Issue_Jobdet> objobdet, List<Process_Issue_Stock> objadlsdet, string Mode, int unitmId = 0)
        {

            int id = 0;
            int issid = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var stkdet in objadlsdet)
                        {
                            var Py = entities.Proc_Apparel_ProcIssDelitmstkOutwrd(stkdet.ItemStockId, stkdet.ProcessIssueNo, stkdet.Job_ord_no);
                            entities.SaveChanges();

                            var Pg3 = entities.Proc_Apparel_ProcessIssueItmStkUpdate(stkdet.ItemStockId, processordid, stkdet.ProcessIssStockId);
                            entities.SaveChanges();
                        }
                    }


                    foreach (var det in objdet)
                    {
                        if (det.IssueQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcessIssUpdProcorddet(det.IssueQty, det.itemid, det.colorid, det.sizeid, processordid);
                            entities.SaveChanges();
                        }

                    }

                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0 && jobdt.processordjobdetid > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcessIssUpdProcordjobdet(jobdt.IssueQty, jobdt.processordjobdetid);
                            entities.SaveChanges();


                        }
                    }

                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0)
                        {
                            var Pg6 = entities.Proc_Apparel_ProcessIssUpdProdprgdet(jobdt.IssueQty, jobdt.itemid, jobdt.colorid, jobdt.sizeid, jobdt.ProdPrgNo, jobdt.ProcessIssueJobId);
                            entities.SaveChanges();


                        }
                    }

                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var stk in objadlsdet)
                        {
                            id = (int)stk.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetstk = entities.Process_Issue_Stock.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Stock>();

                    deletedetstk.ForEach(c => entities.Process_Issue_Stock.Remove(c));
                    entities.SaveChanges();


                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Process_Issue_Jobdet.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Jobdet>();

                    deletedet.ForEach(c => entities.Process_Issue_Jobdet.Remove(c));
                    entities.SaveChanges();

                    issid = id;
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Process_Issue_Det.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Det>();

                    deletedetad.ForEach(c => entities.Process_Issue_Det.Remove(c));
                    entities.SaveChanges();

                    var Mas = entities.Process_Issue_Mas.Where(u => u.ProcessIssueId == issid);

                    foreach (var v in Mas)
                    {
                        entities.Process_Issue_Mas.Remove(v);
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessIssue-DeleteDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProcessIssueDet> Loadedititmsgrid(int procid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcIssLoadEditItem(procid)
                         select new ProcessIssueDet
                         {

                             itemid = (int)YD.itemid,
                             colorid = (int)YD.colorid,
                             sizeid = (int)YD.sizeid,
                             item = YD.item,
                             color = YD.color,
                             size = YD.size,
                             orderqty = YD.OrderedQuantity,
                             bal = (decimal)YD.BalanceQuantity + YD.IssuedQuantity,
                             IssueQty = YD.IssuedQuantity,
                             processorddetid = YD.processorddetid,
                             sno = YD.processorddetid,
                             //OutputUom = (int)YD.uomid,
                             OutputUom = (int)(YD.uomid == null ? 0 : YD.uomid),
                             ip_op = YD.inp_op,
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessIssueJobdet> LoadeditJobdetgrid(int procid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessIssLoadEditJobOrderdet(procid)
                         select new ProcessIssueJobdet
                         {

                             itemid = (int)YD.ItemId,
                             colorid = (int)YD.Colorid,
                             sizeid = (int)YD.SizeId,
                             bal = (decimal)YD.BalanceQuantity + (decimal)YD.issued_qty,
                             IssueQty = (decimal)YD.issued_qty,
                             processorddetid = (int)YD.processorddetid,
                             Job_ord_no = YD.Job_ord_no,
                             ProdPrgNo = YD.ProdPrgNo,
                             processordjobdetid = YD.ProcessJobDetid,
                             sno = YD.ProcessJobDetid,
                             jmasid = YD.jmasid,
                             ip_op = YD.inp_op
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessIssueStock> LoadeditStkdet(string jmasid, int cmpid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcIssLoadEditStkdet(jmasid, cmpid)
                         select new ProcessIssueStock
                         {
                             LotNo = YD.lotNo,
                             ItemStockId = YD.StockId,
                             IssueQty = (decimal)YD.issued_qty,
                             balqty = (decimal)YD.BalQty,
                             process = YD.Process,
                             Job_ord_no = YD.joborderNo,
                             Itemid = (int)YD.Itemid,
                             Colorid = (int)YD.Colorid,
                             Sizeid = (int)YD.Sizeid,
                             jmasid = YD.jmasid

                         }).AsQueryable();

            return query;
        }


        public bool UpdIssDetData(Process_Issue_Mas objupd, DateTime transdate, List<ProcessIssueJobdet> jdet, int processordid, string issueno, List<Process_Issue_Det> objdet, List<Process_Issue_Jobdet> objobdet, List<Process_Issue_Stock> objstkdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            var detid = 0;
            var odetid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {


                    var Upd = entities.Process_Issue_Mas.Where(c => c.ProcessIssueId == objupd.ProcessIssueId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.ProcessIssueId = objupd.ProcessIssueId;
                        Upd.ProcessIssueNo = objupd.ProcessIssueNo;
                        Upd.ProcessOrdId = objupd.ProcessOrdId;
                        Upd.ProcessIssueDate = objupd.ProcessIssueDate;
                        Upd.Remarks = objupd.Remarks;
                        Upd.IssueStoreid = objupd.IssueStoreid;
                        Upd.GatePassVehicle = objupd.GatePassVehicle;
                        Upd.EWayNo = objupd.EWayNo;
                        Upd.EWayDate = objupd.EWayDate;
                        Upd.CreatedBy = objupd.CreatedBy;

                        entities.SaveChanges();

                    }



                    //Process Iss

                    if (objstkdet != null && objstkdet.Count > 0)
                    {
                        foreach (var stkdet in objstkdet)
                        {
                            var Py = entities.Proc_Apparel_ProcIssDelitmstkOutwrd(stkdet.ItemStockId, stkdet.ProcessIssueNo, stkdet.Job_ord_no);
                            entities.SaveChanges();

                            var Pg3 = entities.Proc_Apparel_ProcessIssueItmStkUpdate(stkdet.ItemStockId, processordid, stkdet.ProcessIssStockId);
                            entities.SaveChanges();
                        }
                    }



                    foreach (var det in objdet)
                    {
                        if (det.IssueQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcessIssUpdProcorddet(det.IssueQty, det.itemid, det.colorid, det.sizeid, processordid);
                            entities.SaveChanges();
                        }

                    }

                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0 && jobdt.processordjobdetid > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcessIssUpdProcordjobdet(jobdt.IssueQty, jobdt.processordjobdetid);
                            entities.SaveChanges();


                        }
                    }

                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0)
                        {
                            var Pg6 = entities.Proc_Apparel_ProcessIssUpdProdprgdet(jobdt.IssueQty, jobdt.itemid, jobdt.colorid, jobdt.sizeid, jobdt.ProdPrgNo,jobdt.ProcessIssueJobId);
                            entities.SaveChanges();


                        }
                    }

                    if (objstkdet != null && objstkdet.Count > 0)
                    {
                        foreach (var item in objstkdet)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Process_Issue_Stock.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Stock>();

                    deletedet.ForEach(c => entities.Process_Issue_Stock.Remove(c));
                    entities.SaveChanges();

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetjob = entities.Process_Issue_Jobdet.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Jobdet>();

                    deletedetjob.ForEach(c => entities.Process_Issue_Jobdet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }
                    var isod = id;
                    var delete = entities.Process_Issue_Det.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Det>();

                    delete.ForEach(c => entities.Process_Issue_Det.Remove(c));
                    entities.SaveChanges();








                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.IssueQty > 0)
                            {

                                entities.Process_Issue_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.ProcessIssueDetId;
                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.IssueQty > 0)
                                    {
                                        if (item.itemid == jobdt.itemid && item.colorid == jobdt.colorid && item.sizeid == jobdt.sizeid && item.ip_op == jobdt.ip_op)
                                        {

                                            jobdt.ProcessIssueDetId = detid;
                                            entities.Process_Issue_Jobdet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessIssueJobId;

                                            foreach (var stkdet in objstkdet)
                                            {
                                                if (stkdet.IssueQty > 0)
                                                {
                                                    if (jobdt.itemid == stkdet.Itemid && jobdt.colorid == stkdet.Colorid && jobdt.sizeid == stkdet.Sizeid)
                                                    {
                                                        stkdet.ProcessIssueNo = issueno;
                                                        stkdet.ProcessIssueJobid = odetid;
                                                        entities.Process_Issue_Stock.Add(stkdet);

                                                    }
                                                }

                                            }

                                        }
                                    }
                                    // }
                                }
                                entities.SaveChanges();

                            }
                        }

                    }

                    //if (objobdet != null && objobdet.Count > 0)
                    //{

                    //}



                    foreach (var det in objdet)
                    {
                        if (det.IssueQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcIssUpdProcorddet(det.IssueQty, det.itemid, det.colorid, det.sizeid, processordid);
                            entities.SaveChanges();
                        }

                    }

                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdProcordjobdet(jobdt.IssueQty, jobdt.processordjobdetid);
                            entities.SaveChanges();

                            var Pg6 = entities.Proc_Apparel_ProcIssUpdProdprgdet(jobdt.IssueQty, jobdt.itemid, jobdt.colorid, jobdt.sizeid, jobdt.ProdPrgNo);
                            entities.SaveChanges();

                        }
                    }

                    foreach (var stk in objstkdet)
                    {
                        if (stk.IssueQty > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdItmstk(stk.IssueQty, stk.ItemStockId);
                            entities.SaveChanges();


                            var Pg8 = entities.Proc_Apparel_ProcessIssueInsertstkoutward(stk.ProcessIssueJobid, stk.ItemStockId, stk.IssueQty, stk.ProcessIssStockId);
                            entities.SaveChanges();

                        }


                    }



                    bool UCMR1 = MarkUpRateIssUpdation(processordid);

                    bool UCMR = MarkUpRateOrdUpdation(processordid);

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessIssue-UpdIssDetData");
                }
            }
            return reserved;
        }


        public bool MarkUpRateOrdUpdation(int ProcOrderId)
        {
            var upd = entities.Proc_Apparel_UpdateProcessOrdMarkUpRate(ProcOrderId);
            return true;
        }

        public bool MarkUpRateIssUpdation(int ProcOrderId)
        {
            var upd = entities.Proc_Apparel_UpdateProcessIssMarkUpRate(ProcOrderId);
            return true;
        }
    }
}
