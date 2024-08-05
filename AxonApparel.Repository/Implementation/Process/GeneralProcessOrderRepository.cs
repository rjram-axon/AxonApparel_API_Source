using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class GeneralProcessOrderRepository : IGeneralProcessOrderRepository
    {
        ProcessEntities entities = new ProcessEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.GeneralProcOrdStk> Getstkdet(int itmid, int clrid, int sizeid, int cmpid, int strunitid)
        {
            var query = (from YD in entities.proc_Apparel_GeneralProcOrdLoadstk(itmid, clrid, sizeid, cmpid, strunitid)
                         select new GeneralProcOrdStk
                         {

                             transno = YD.Transno,
                             transdate = YD.Transdate,
                             Itemid = (int)YD.itemid,
                             Colorid = (int)YD.colorid,
                             Sizeid = (int)YD.sizeid,
                             ItemStockId = YD.StockId,
                             sno = (int)YD.Snumb,
                             stock = YD.BalQty,
                             IssueQty = 0,//YD.BalQty,
                             Markup_Rate = YD.Markuprate,
                             supplier = YD.Supplier,
                             LotNo = YD.LotNo,
                             secqty = 1,
                         }).AsQueryable();

            return query;
        }


        public int AddData(Process_Ord_Mas objEntry)
        {
            var id = entities.Process_Ord_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.processordid;
        }


        public bool AddIss(Process_Ord_Mas obj, List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int processordid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {


                try
                {
                    int id = 0;
                    int issid = 0;
                    var detid = 0;
                    var odetid = 0;
                    int Masid = 0;
                    processordid = (int)objmasiss[0].ProcessOrdId;

                    //Mas
                    entities.Process_Ord_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.processordid;


                    //Process Ord Add
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.received_qty > 0 || item.order_output_qty > 0)
                            {
                                item.processordid = Masid;
                                entities.Process_Ord_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.processorddetid;
                                processordid = (int)item.processordid;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.issued_qty > 0 || jobdt.OrderQty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid && item.inp_op == jobdt.ip_op)
                                        {
                                            jobdt.ProcessOrdid = Masid;
                                            jobdt.ProcessOrddetid = detid;
                                            entities.Process_Ord_JobDet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessJobDetid;
                                        }
                                    }
                                    // }
                                }
                                entities.SaveChanges();

                            }
                        }

                    }


                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {

                            entities.Process_Ord_AddLess.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    //Process  Issue

                    var issueno = "";

                    if (objmasiss != null && objmasiss.Count > 0)
                    {
                        foreach (var it in objmasiss)
                        {
                            it.ProcessOrdId = processordid;
                            issueno = it.ProcessIssueNo;
                            entities.Process_Issue_Mas.Add(it);
                            entities.SaveChanges();
                            issid = it.ProcessIssueId;
                        }

                    }
                    if (objdetiss != null && objdetiss.Count > 0)
                    {
                        foreach (var item in objdetiss)
                        {
                            if (item.IssueQty > 0 && item.ip_op == "I")
                            {
                                item.ProcessIssueId = issid;
                                entities.Process_Issue_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.ProcessIssueDetId;
                                //odetid = 0;
                                foreach (var jobdt in objobdetiss)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.IssueQty > 0)
                                    {
                                        if (item.itemid == jobdt.itemid && item.colorid == jobdt.colorid && item.sizeid == jobdt.sizeid && item.ip_op == jobdt.ip_op)
                                        {
                                            jobdt.ProcessIssueId = issid;
                                            jobdt.ProcessIssueDetId = detid;
                                            entities.Process_Issue_Jobdet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessIssueJobId;

                                            foreach (var stkdet in objstkdetiss)
                                            {
                                                if (stkdet.IssueQty > 0)
                                                {
                                                    if (jobdt.itemid == stkdet.Itemid && jobdt.colorid == stkdet.Colorid && jobdt.sizeid == stkdet.Sizeid)
                                                    {
                                                        stkdet.ProcessIssueId = issid;
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
                    foreach (var stk in objstkdetiss)
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
                    exceplogg.SendExcepToDB(ex, "GenProcessOrder-AddIss");
                }
            }
            return reserved;
        }

        

        public bool MarkUpRateIssUpdation(int ProcOrderId)
        {
            var upd = entities.Proc_Apparel_UpdateProcessIssMarkUpRate(ProcOrderId);
            return true;
        }

        public IQueryable<ProcessOrderAddScreen> LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate)
        {
            var query = (from YD in entities.Proc_Apparel_GProcessLoadMainGrid(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(closed) ? "" : closed, string.IsNullOrEmpty(buyrsamp) ? "" : buyrsamp, string.IsNullOrEmpty(processortype) ? "" : processortype, prodordid == null ? 0 : prodordid, string.IsNullOrEmpty(prodord) ? "" : prodord, string.IsNullOrEmpty(type) ? "" : type, processorid == null ? 0 : processorid, unitid == null ? 0 : unitid, processid == null ? 0 : processid, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString())
                         select new ProcessOrderAddScreen
                         {
                             cmpid = YD.Companyid,
                             company = YD.CompanyName,
                             cmpunitid = YD.Id,
                             cmpnyunit = YD.CompanyUnit,
                             processid = YD.Processid,
                             process = YD.Process,
                             processorid = YD.ProcessorId,
                             processor = YD.Processor,
                             prodnord = YD.processorder,
                             productionordid = YD.procordid,
                             type = YD.Ordertype,
                             proddate = (DateTime)YD.ProcessOrdate,
                             delidate = (DateTime)YD.DelidateTime,
                             remarks = YD.remarks,
                             DispatchLocType=YD.DispLocType,
                             DispatchLocId=YD.DispLoc,
                             StoreUnitId = YD.StoreUnitId,
                             Vehicleno=YD.Vehicleno
                         }).AsQueryable();

            return query;

        }


        public IQueryable<ProcessOrderDetInfo> LoadEditOutputitmsgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessOrderEditOutputItemDet(prodid)
                         select new ProcessOrderDetInfo
                         {
                             itmid = (int)YD.ItemId,
                             itm = YD.Item,
                             sizeid = (int)YD.SizeId,
                             size = YD.Size,
                             clrid = (int)YD.ColorId,
                             clr = YD.Color,
                             inrout = YD.inp_op,
                             bal = (decimal)YD.Order_output_Qty,
                             ordqty = (decimal)YD.Order_output_Qty,
                             rate = (decimal)YD.Rate,
                             sno = (int)YD.Processorddetid,
                             prgopqty = (decimal)YD.Order_output_Qty,
                             isdeci = "",//YD.Isdecimal
                             plansizeid = (int)YD.SizeId,
                             opuom=YD.Abbreviation,
                             SecQty = YD.OrdSecQty,
                             SlNo = (int)YD.SNo,
                             opuomid = (int)YD.Uomid,
                             IssSize=YD.IssSize,
                             IssSizeid=YD.IsizeId,
                             AllowPer=YD.AllowPer,
                             QtywithoutAllow=YD.QtywithoutAllow
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessOrderDetInfo> LoadEditInputitmsgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessOrderEditIputItemDet(prodid)
                         select new ProcessOrderDetInfo
                         {
                             itmid = (int)YD.ItemId,
                             itm = YD.Item,
                             sizeid = (int)YD.SizeId,
                             size = YD.Size,
                             clrid = (int)YD.ColorId,
                             clr = YD.Color,
                             inrout = YD.inp_op,
                             bal = (decimal)YD.Order_output_Qty,
                             ordqty = (decimal)YD.Order_output_Qty,
                             rate = (decimal)YD.Rate,
                             sno = (int)YD.Processorddetid,
                             prgopqty = (decimal)YD.Order_output_Qty,
                             isdeci = "",//YD.Isdecimal,
                             issqty = (decimal)YD.Issued_Qty,
                             plansizeid = (int)YD.planSizeId,
                             ipuom = YD.Abbreviation,
                             SecQty=YD.OrdSecQty,
                             SlNo=(int)YD.SNo,
                             ipuomid = (int)YD.Uomid,

                         }).AsQueryable();

            return query;
        }


        public IQueryable<GeneralProcOrdStk> Getstkdetedit(int processordid)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessOrdLoadEditStock(processordid)
                         select new GeneralProcOrdStk
                         {

                             transno = YD.Transno,
                             transdate = YD.Transdate,
                             Itemid = (int)YD.itemid,
                             Colorid = (int)YD.colorid,
                             Sizeid = (int)YD.sizeid,
                             ItemStockId = YD.StockId,
                             sno = (int)YD.Snumb,
                             stock = YD.BalQty + YD.IssueQty,
                             IssueQty = YD.IssueQty,
                             Markup_Rate = YD.Markuprate,
                             supplier = YD.Supplier,
                             LotNo = YD.LotNo,
                             secqty = 1,
                         }).AsQueryable();

            return query;
        }


        public bool UpdateData(Process_Ord_Mas objupd)
        {
            try
            {
                var result = false;
                var Upd = entities.Process_Ord_Mas.Where(c => c.processordid == objupd.processordid).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.processordid = objupd.processordid;
                    Upd.processorder = objupd.processorder;
                    Upd.processordate = objupd.processordate;
                    Upd.processorid = objupd.processorid;
                    Upd.processid = objupd.processid;
                    Upd.remarks = objupd.remarks;
                    Upd.companyid = objupd.companyid;
                    Upd.companyunitid = objupd.companyunitid;
                    Upd.ProcessorType = objupd.ProcessorType;
                    Upd.OrderType = objupd.OrderType;
                    Upd.Closed = objupd.Closed;
                    Upd.OrderCumIssue = objupd.OrderCumIssue;
                    Upd.DelidateTime = objupd.DelidateTime;
                    Upd.ComboIds = objupd.ComboIds;
                    Upd.DispLocType = objupd.DispLocType;
                    Upd.DispLoc = objupd.DispLoc;
                    Upd.IssueLocType = objupd.IssueLocType;
                    Upd.IssueLoc = objupd.IssueLoc;
                    Upd.Teamid = objupd.Teamid;
                    Upd.CreatedBy = objupd.CreatedBy;
                    Upd.StoreUnitId = objupd.StoreUnitId;
                    Upd.Phoneno = objupd.Phoneno;
                    Upd.contactperson = objupd.contactperson;
                    Upd.amount = objupd.amount;
                    Upd.taxamount = objupd.taxamount;
                    Upd.IGST = objupd.IGST;
                    Upd.TotIGST = objupd.TotIGST;
                    Upd.SGST = objupd.SGST;
                    Upd.TotSGST = objupd.TotSGST;
                    Upd.IGST = objupd.IGST;
                    Upd.TotIGST = objupd.TotIGST;
                    Upd.saccode = objupd.saccode;
                    Upd.ModuleType = objupd.ModuleType;
                    Upd.Vehicleno = objupd.Vehicleno;

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


        public bool DeleteIssueDetData(List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    int masid = 0;
                    //int issid = 0;
                    var processordid = objdet[0].processordid;


                    if (objstkdetiss != null && objstkdetiss.Count > 0)
                    {
                        foreach (var stkdet in objstkdetiss)
                        {
                            var Py = entities.Proc_Apparel_GenProcIssDelitmstkOutwrd(stkdet.ItemStockId, objmasiss[0].ProcessIssueNo);
                            entities.SaveChanges();

                            var Pg3 = entities.Proc_Apparel_GenProcessIssueItmStkUpdate(stkdet.ItemStockId, processordid);
                            entities.SaveChanges();
                        }
                    }



                    if (objstkdetiss != null && objstkdetiss.Count > 0)
                    {
                        foreach (var item in objstkdetiss)
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

                    if (objobdetiss != null && objobdetiss.Count > 0)
                    {
                        foreach (var item in objobdetiss)
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


                    if (objdetiss != null && objdetiss.Count > 0)
                    {
                        foreach (var item in objdetiss)
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


                    var Mas = entities.Process_Issue_Mas.Where(u => u.ProcessIssueId == isod);

                    foreach (var v in Mas)
                    {
                        entities.Process_Issue_Mas.Remove(v);
                    }
                    entities.SaveChanges();


                    //Process Ord


                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProcessOrdid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetob = entities.Process_Ord_JobDet.Where(d => d.ProcessOrdid == id).ToList<Process_Ord_JobDet>();

                    deletedetob.ForEach(c => entities.Process_Ord_JobDet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.processordid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetord = entities.Process_Ord_Det.Where(d => d.processordid == id).ToList<Process_Ord_Det>();

                    deletedetord.ForEach(c => entities.Process_Ord_Det.Remove(c));
                    entities.SaveChanges();


                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            id = (int)item.Process_Ord_id;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Process_Ord_AddLess.Where(d => d.Process_Ord_id == id).ToList<Process_Ord_AddLess>();

                    deletedetad.ForEach(c => entities.Process_Ord_AddLess.Remove(c));
                    entities.SaveChanges();

                    masid = id;


                    var Masi = entities.Process_Ord_Mas.Where(u => u.processordid == masid);

                    foreach (var v in Masi)
                    {
                        entities.Process_Ord_Mas.Remove(v);
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GenProcessOrder-DeleteIssueDetData");
                }
            }
            return reserved;
        }


        public IQueryable<GeneralProcOrdStk> LoadProcess()
        {
            var query = (from YD in entities.Proc_Apparel_GenprocordLoadProcess()
                         select new GeneralProcOrdStk
                         {
                             processid = YD.processid,
                             process = YD.process

                         }).AsQueryable();

            return query;
        }

        public bool MarkUpRateOrdUpdation(int ProcOrderId)
        {

            var upd = entities.Proc_Apparel_UpdateProcessOrdMarkUpRate(ProcOrderId);
            return true;
        }


        public bool UpdIss(Process_Ord_Mas objupd, List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int processordid = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    int issid = 0;
                    var detid = 0;
                    var odetid = 0;
                    processordid = (int)objmasiss[0].ProcessOrdId;

                    var Upd = entities.Process_Ord_Mas.Where(c => c.processordid == objupd.processordid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.processordid = objupd.processordid;
                        Upd.processorder = objupd.processorder;
                        Upd.processordate = objupd.processordate;
                        Upd.processorid = objupd.processorid;
                        Upd.processid = objupd.processid;
                        Upd.remarks = objupd.remarks;
                        Upd.companyid = objupd.companyid;
                        Upd.companyunitid = objupd.companyunitid;
                        Upd.ProcessorType = objupd.ProcessorType;
                        Upd.OrderType = objupd.OrderType;
                        Upd.Closed = objupd.Closed;
                        Upd.OrderCumIssue = objupd.OrderCumIssue;
                        Upd.DelidateTime = objupd.DelidateTime;
                        Upd.ComboIds = objupd.ComboIds;
                        Upd.DispLocType = objupd.DispLocType;
                        Upd.DispLoc = objupd.DispLoc;
                        Upd.IssueLocType = objupd.IssueLocType;
                        Upd.IssueLoc = objupd.IssueLoc;
                        Upd.Teamid = objupd.Teamid;
                        Upd.CreatedBy = objupd.CreatedBy;
                        Upd.StoreUnitId = objupd.StoreUnitId;
                        Upd.Phoneno = objupd.Phoneno;
                        Upd.contactperson = objupd.contactperson;
                        Upd.amount = objupd.amount;
                        Upd.taxamount = objupd.taxamount;
                        Upd.IGST = objupd.IGST;
                        Upd.TotIGST = objupd.TotIGST;
                        Upd.SGST = objupd.SGST;
                        Upd.TotSGST = objupd.TotSGST;
                        Upd.IGST = objupd.IGST;
                        Upd.TotIGST = objupd.TotIGST;
                        Upd.saccode = objupd.saccode;
                        Upd.ModuleType = objupd.ModuleType;
                        Upd.Vehicleno = objupd.Vehicleno;

                        entities.SaveChanges();

                    }





                    //Process Iss

                    if (objstkdetiss != null && objstkdetiss.Count > 0)
                    {
                        foreach (var stkdet in objstkdetiss)
                        {
                            var Py = entities.Proc_Apparel_GenProcIssDelitmstkOutwrd(stkdet.ItemStockId, objmasiss[0].ProcessIssueNo);
                            entities.SaveChanges();

                            var Pg3 = entities.Proc_Apparel_GenProcessIssueItmStkUpdate(stkdet.ItemStockId, processordid);
                            entities.SaveChanges();
                        }
                    }



                    if (objstkdetiss != null && objstkdetiss.Count > 0)
                    {
                        foreach (var item in objstkdetiss)
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

                    if (objobdetiss != null && objobdetiss.Count > 0)
                    {
                        foreach (var item in objobdetiss)
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


                    if (objdetiss != null && objdetiss.Count > 0)
                    {
                        foreach (var item in objdetiss)
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


                    var Mas = entities.Process_Issue_Mas.Where(u => u.ProcessIssueId == isod);

                    foreach (var v in Mas)
                    {
                        entities.Process_Issue_Mas.Remove(v);
                    }
                    entities.SaveChanges();


                    //Process Ord
                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var rt in objobdet)
                        {
                            if (rt.ip_op == "I")
                            {
                                var Py = entities.proc_Apparel_ProcessUpdateProdprgdetInput(rt.ProcessOrdid, rt.ProdPrgNo, rt.Job_ord_no, rt.Itemid, rt.Colorid, rt.Sizeid);
                                entities.SaveChanges();
                            }
                            if (rt.ip_op == "O")
                            {
                                var Py = entities.proc_Apparel_ProcessUpdateProdprgdetOut(rt.ProcessOrdid, rt.ProdPrgNo, rt.Job_ord_no, rt.Itemid, rt.Colorid, rt.Sizeid);
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProcessOrdid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetob = entities.Process_Ord_JobDet.Where(d => d.ProcessOrdid == id).ToList<Process_Ord_JobDet>();

                    deletedetob.ForEach(c => entities.Process_Ord_JobDet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.processordid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetord = entities.Process_Ord_Det.Where(d => d.processordid == id).ToList<Process_Ord_Det>();

                    deletedetord.ForEach(c => entities.Process_Ord_Det.Remove(c));
                    entities.SaveChanges();


                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            id = (int)item.Process_Ord_id;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Process_Ord_AddLess.Where(d => d.Process_Ord_id == id).ToList<Process_Ord_AddLess>();

                    deletedetad.ForEach(c => entities.Process_Ord_AddLess.Remove(c));
                    entities.SaveChanges();


                    //Process Ord Add
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.received_qty > 0 || item.order_output_qty > 0)
                            {

                                entities.Process_Ord_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.processorddetid;
                                processordid = (int)item.processordid;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.issued_qty > 0 || jobdt.OrderQty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid && item.inp_op == jobdt.ip_op)
                                        {

                                            jobdt.ProcessOrddetid = detid;
                                            entities.Process_Ord_JobDet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessJobDetid;



                                        }
                                    }
                                    // }
                                }
                                entities.SaveChanges();

                            }
                        }

                    }


                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {

                            entities.Process_Ord_AddLess.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    //Process  Issue

                    var issueno = "";

                    if (objmasiss != null && objmasiss.Count > 0)
                    {
                        foreach (var it in objmasiss)
                        {
                            it.ProcessOrdId = processordid;
                            issueno = it.ProcessIssueNo;
                            entities.Process_Issue_Mas.Add(it);
                            entities.SaveChanges();
                            issid = it.ProcessIssueId;
                        }

                    }
                    if (objdetiss != null && objdetiss.Count > 0)
                    {
                        foreach (var item in objdetiss)
                        {
                            if (item.IssueQty > 0 && item.ip_op == "I")
                            {
                                item.ProcessIssueId = issid;
                                entities.Process_Issue_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.ProcessIssueDetId;
                                //odetid = 0;
                                foreach (var jobdt in objobdetiss)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.IssueQty > 0)
                                    {
                                        if (item.itemid == jobdt.itemid && item.colorid == jobdt.colorid && item.sizeid == jobdt.sizeid && item.ip_op == jobdt.ip_op)
                                        {
                                            jobdt.ProcessIssueId = issid;
                                            jobdt.ProcessIssueDetId = detid;
                                            entities.Process_Issue_Jobdet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessIssueJobId;

                                            foreach (var stkdet in objstkdetiss)
                                            {
                                                if (stkdet.IssueQty > 0)
                                                {
                                                    if (jobdt.itemid == stkdet.Itemid && jobdt.colorid == stkdet.Colorid && jobdt.sizeid == stkdet.Sizeid)
                                                    {
                                                        stkdet.ProcessIssueId = issid;
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
                    foreach (var stk in objstkdetiss)
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
                    exceplogg.SendExcepToDB(ex, "GenProcessOrder-UpdIss");
                }
            }
            return reserved;
        }
    }
}
