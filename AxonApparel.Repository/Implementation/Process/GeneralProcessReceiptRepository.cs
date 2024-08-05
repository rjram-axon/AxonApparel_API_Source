using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class GeneralProcessReceiptRepository : IGeneralProcessReceiptRepository
    {
        ProcessEntities entities = new ProcessEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();


        public IQueryable<Domain.ProcessReceiptMas> Getprocess(int cmpid, int cmunitid, string ordtype)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadproc(cmpid, cmunitid, ordtype)
                         select new ProcessReceiptMas
                         {

                             processid = YD.ProcessId,
                             process = YD.Process

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReceiptMas> Getprocessor()
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadsupp()
                         select new ProcessReceiptMas
                         {

                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReceiptMas> Getwrkdiv()
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadwrkdiv()
                         select new ProcessReceiptMas
                         {

                             wrkdivid = YD.WorkDivisionId,
                             wrkdiv = YD.WorkDivision
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReceiptMas> Getissueno(int cmpid, int cmunitid, int processid, int processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadprocord(cmpid, cmunitid, processid, processorid)
                         select new ProcessReceiptMas
                         {

                             processordid = YD.processordid,
                             processorder = YD.processorder

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReceiptMas> Loadcolor(int cmpid, int cmunitid, int processid, int processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadcolor(cmpid, cmunitid, processid, processorid)
                         select new ProcessReceiptMas
                         {

                             colorid = YD.Colorid,
                             color = YD.color

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReceiptMas> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed)
        {
            var query = (from YD in entities.Proc_Apparel_ProcReceiptLoadaddgrid(cmpid, cmunitid, processid, processorid, ordtype, closed)
                         select new ProcessReceiptMas
                         {

                             processordid = YD.processordid,
                             processorder = YD.processorder,
                             processor = YD.Processor,
                             proddate = (DateTime)YD.ProcessorDate,
                             ordqty = (decimal)YD.OrderQty,
                             recvdqty = (decimal)YD.Received,
                             bal = (decimal)YD.Bal

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessReceiptDet> LoadItmgrid(string pid)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessOrderLoadItmdettab(pid)
                         select new ProcessReceiptDet
                         {

                             itemid = YD.ItemId,
                             item = YD.Item,
                             color = YD.Color,
                             colorid = YD.Colorid,
                             sizeid = YD.SizeId,
                             size = YD.size,
                             procordid = YD.processordid,
                             processorder = YD.processorder,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.bal,
                             rate = (decimal)YD.rate,
                             sno = YD.processorddetid,
                             ProcessOrdDetid = YD.processorddetid,
                             Received_qty = 0
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessReceiptJobdet> Loadjobdetgrid(string pid)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessnOrderLoadJob(pid)
                         select new ProcessReceiptJobdet
                         {

                             Itemid = YD.ItemId,
                             Colorid = YD.Colorid,
                             Sizeid = YD.SizeId,
                             processordid = (int)YD.ProcessOrdid,
                             ProdPrgNo = YD.ProdPrgno,
                             Job_Ord_No = YD.job_ord_no,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.bal,
                             Received_Qty = 0,
                             sno = (int)YD.ProcessOrddetid,
                             ProcessOrdDetid = (int)YD.ProcessOrddetid,
                             ProcessOrdJobDetid = YD.ProcessJobDetid
                         }).AsQueryable();

            return query;
        }


        public int AddData(Process_Recpt_Mas objEntry)
        {
            var id = entities.Process_Recpt_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.proc_recpt_masid;
        }

        public bool AddDetData(Process_Recpt_Mas obj, string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, string Mode, int unitmId = 0)
        {

            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {

                try
                {
                    int id = 0;
                    var detid = 0;

                    //Mas
                    entities.Process_Recpt_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.proc_recpt_masid;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Received_qty > 0)
                            {
                                item.Proc_Recpt_Masid = Masid;
                                entities.Process_Recpt_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.Proc_Recpt_Detid;

                                var upd = entities.Proc_Apparel_UpdateProcRecptMarkuprate(item.ProcessOrdId);
                                entities.SaveChanges();

                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.Received_Qty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                        {
                                            jobdt.Proc_Recpt_Masid = Masid;
                                            jobdt.Proc_Recpt_Detid = detid;
                                            entities.Process_Recpt_Jobdet.Add(jobdt);
                                            entities.SaveChanges();

                                        }
                                    }

                                }
                                entities.SaveChanges();

                            }
                        }

                    }


                    //if (objdet.Count > 0)
                    //{
                    //    var Py = entities.UpdateProcessActuals(transno, "A");
                    //    entities.SaveChanges();


                    //}

                    ///Insert into Itemstock
                    var Pg1 = entities.Proc_Apparel_GetGeneralProcessReceiptStockOrderInsert(transno);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GenProcessRecpt-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProcessReceiptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int processorid)
        {

            var query = (from YD in entities.Proc_Apparel_GenProcessRecptLoadMainGrid(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate, processorid)
                         select new ProcessReceiptMas
                         {
                             company = YD.company,
                             companyid = YD.Companyid,
                             buyerid = YD.buyerid,
                             buyer = YD.buyer,
                             unitid = YD.Id,
                             unit = YD.CompanyUnit,
                             proc_recpt_masid = YD.ProcessRecptMasid,
                             processordid = YD.processordid,
                             processorder = YD.processorder,
                             Recpt_Ref_no = YD.Recpt_Ref_no,
                             proc_recpt_no = YD.proc_recpt_no,
                             proc_recpt_date = (DateTime)YD.ProcessRecptdate,
                             processid = YD.Processid,
                             process = YD.Process,
                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier,
                             jobordno = (YD.Job_ord_no == null ? "" : YD.Job_ord_no),
                             type = YD.type,
                             remarks = YD.remarks,
                             Recpt_Ref_date = (DateTime)YD.Recpt_Ref_date,
                             ParentUnitid = YD.Parentstoreid,
                             Storetype = YD.StoreType,
                             StoreName = YD.StoreName,
                             StoreUnitID = YD.StoreUnitId,
                     
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessReceiptDet> LoadEditItmgrid(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessRecptItemdetEdit(pid)
                         select new ProcessReceiptDet
                         {

                             itemid = YD.Itemid,
                             item = YD.Item,
                             color = YD.Color,
                             colorid = YD.Colorid,
                             sizeid = YD.Sizeid,
                             size = YD.Size,
                             procordid = (int)YD.processordid,
                             processorder = YD.processorder,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.Bal + YD.Received,
                             rate = YD.Rate,
                             sno = YD.processorddetid,
                             Received_qty = YD.Received,
                             Proc_Recpt_Detid = YD.Proc_Recpt_Detid,
                             ProcessOrdDetid=YD.processorddetid,
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessReceiptJobdet> LoadEditjobdetgrid(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessRecptJobdetEdit(pid)
                         select new ProcessReceiptJobdet
                         {

                             Itemid = (int)YD.Itemid,
                             Colorid = (int)YD.Colorid,
                             Sizeid = (int)YD.Sizeid,
                             processordid = (int)YD.ProcessOrdId,
                             ProdPrgNo = YD.ProdPrgNo,
                             Job_Ord_No = YD.Job_Ord_No,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.bal,
                             Received_Qty = YD.Received_Qty,
                             sno = (int)YD.ProcessOrdDetid,
                             ProcessOrdDetid = (int)YD.ProcessOrdDetid,
                             ProcessOrdJobDetid = (int)YD.ProcessOrdJobDetid,
                             Proc_Recpt_Detid = (int)YD.Proc_Recpt_Detid,
                             Proc_Recpt_JobDetid = YD.Proc_Recpt_JobDetid
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessReceiptDet> ChkDC(string recpt, int pid)
        {

            var query = (from YD in entities.Proc_Apparel_ProcessRecptDCChk(recpt, pid)
                         select new ProcessReceiptDet
                         {

                             recptno = YD.Recpt_Ref_no,
                             Proc_Recpt_Masid = (int)YD.Proc_Recpt_Masid

                         }).AsQueryable();

            return query;
        }


        public bool UpdateData(Process_Recpt_Mas objupd)
        {
            try
            {
                var result = false;
                var Upd = entities.Process_Recpt_Mas.Where(c => c.proc_recpt_masid == objupd.proc_recpt_masid).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.proc_recpt_masid = objupd.proc_recpt_masid;
                    Upd.proc_recpt_no = objupd.proc_recpt_no;
                    Upd.proc_recpt_date = objupd.proc_recpt_date;
                    Upd.OrderType = objupd.OrderType;
                    Upd.InwardNo = objupd.InwardNo;
                    Upd.InspNo = objupd.InspNo;
                    Upd.InspDate = objupd.InspDate;
                    Upd.CreatedBy = objupd.CreatedBy;
                    Upd.EWayDate = objupd.EWayDate;
                    Upd.EWayNo = objupd.EWayNo;
                    Upd.Recpt_Ref_no = objupd.Recpt_Ref_no;
                    Upd.Recpt_Ref_date = objupd.Recpt_Ref_date;
                    Upd.remarks = objupd.remarks;
                    Upd.StoreUnitID = objupd.StoreUnitID;
                    Upd.SupplierInvoiceNo = objupd.SupplierInvoiceNo;
                    Upd.ExcldetoInv = objupd.ExcldetoInv;


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

        public bool DeleteDetData(string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, string Mode, int unitmId = 0)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    int ordid = 0;

                    //if (objdet != null && objdet.Count > 0)
                    //{
                    //    foreach (var it in objdet)
                    //    {
                    //        var Py = entities.Proc_Apparel_ProcessRecptUpdRecvdqty6(it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate);
                    //        //var result = this.entities.Database.SqlQuery<string>("exec Proc_Apparel_ProdRecptUpdRecvdqty3 {0}, {1}, {2}, {3}, {4},{5}", it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate).FirstOrDefault();

                    //        entities.SaveChanges();
                    //    }

                    //}

                    if (objdet != null && objdet.Count > 0)
                    {
                        //foreach (var it in objdet)
                        //{
                        var Py = entities.Proc_Apparel_ProcessRecptDelItmstk(transno);
                        entities.SaveChanges();
                        //}
                    }
                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.Proc_Recpt_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Process_Recpt_Jobdet.Where(d => d.Proc_Recpt_Masid == id).ToList<Process_Recpt_Jobdet>();

                    deletedet.ForEach(c => entities.Process_Recpt_Jobdet.Remove(c));
                    entities.SaveChanges();

                    ordid = id;
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.Proc_Recpt_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Process_Recpt_Det.Where(d => d.Proc_Recpt_Masid == id).ToList<Process_Recpt_Det>();

                    deletedetad.ForEach(c => entities.Process_Recpt_Det.Remove(c));
                    entities.SaveChanges();

                    var Mas = entities.Process_Recpt_Mas.Where(u => u.proc_recpt_masid == ordid);

                    foreach (var v in Mas)
                    {
                        entities.Process_Recpt_Mas.Remove(v);
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GenProcessRecpt-DeleteDetData");
                }
            }
            return reserved;
        }

        public bool MarkUpRateRecptUpdation(int ProcOrderId)
        {
            var upd = entities.Proc_Apparel_UpdateProcRecptMarkuprate(ProcOrderId);
            return true;
        }

        public bool UpdDetData(Process_Recpt_Mas objupd, string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, string Mode, int unitmId = 0)
        {

            bool reserved = false;

            int id = 0;
            var detid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {

                try
                {

                    var result = false;
                    var Upd = entities.Process_Recpt_Mas.Where(c => c.proc_recpt_masid == objupd.proc_recpt_masid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.proc_recpt_masid = objupd.proc_recpt_masid;
                        Upd.proc_recpt_no = objupd.proc_recpt_no;
                        Upd.proc_recpt_date = objupd.proc_recpt_date;
                        Upd.OrderType = objupd.OrderType;
                        Upd.InwardNo = objupd.InwardNo;
                        Upd.InspNo = objupd.InspNo;
                        Upd.InspDate = objupd.InspDate;
                        Upd.CreatedBy = objupd.CreatedBy;
                        Upd.EWayDate = objupd.EWayDate;
                        Upd.EWayNo = objupd.EWayNo;
                        Upd.Recpt_Ref_no = objupd.Recpt_Ref_no;
                        Upd.Recpt_Ref_date = objupd.Recpt_Ref_date;
                        Upd.remarks = objupd.remarks;
                        Upd.StoreUnitID = objupd.StoreUnitID;
                        Upd.SupplierInvoiceNo = objupd.SupplierInvoiceNo;
                        Upd.ExcldetoInv = objupd.ExcldetoInv;


                        entities.SaveChanges();
                        result = true;
                    }






                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var it in objdet)
                        {
                            var Py = entities.Proc_Apparel_ProcessRecptUpdRecvdqty6(it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Proc_Recpt_Masid, it.rate,it.Proc_Recpt_Detid);
                            //var result = this.entities.Database.SqlQuery<string>("exec Proc_Apparel_ProdRecptUpdRecvdqty3 {0}, {1}, {2}, {3}, {4},{5}", it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate).FirstOrDefault();

                            entities.SaveChanges();
                        }

                    }

                    if (objdet != null && objdet.Count > 0)
                    {
                        //foreach (var it in objdet)
                        //{
                        var Py = entities.Proc_Apparel_ProcessRecptDelItmstk(transno);
                        entities.SaveChanges();
                        //}
                    }



                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.Proc_Recpt_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Process_Recpt_Jobdet.Where(d => d.Proc_Recpt_Masid == id).ToList<Process_Recpt_Jobdet>();

                    deletedet.ForEach(c => entities.Process_Recpt_Jobdet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Received_qty > 0)
                            {


                                detid = item.Proc_Recpt_Detid;
                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.Received_Qty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                        {

                                            jobdt.Proc_Recpt_Detid = detid;
                                            entities.Process_Recpt_Jobdet.Add(jobdt);
                                            entities.SaveChanges();

                                        }
                                    }

                                }
                                entities.SaveChanges();

                            }
                        }

                    }

                    ///Insert into Itemstock
                    var Pg1 = entities.Proc_Apparel_GetGeneralProcessReceiptStockOrderInsert(transno);
                    entities.SaveChanges();

                    foreach (var item in objdet)
                    {
                        int oid = (int)item.ProcessOrdId;
                        bool UCMR = MarkUpRateRecptUpdation(oid);
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GenProcessRecpt-UpdDetData");
                }
            }
            return reserved;
        }
    }
}
