using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class GeneralProcessReturnRepository : IGeneralProcessReturnRepository
    {
        ProcessEntities entities = new ProcessEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.ProcessReturn> Getprocess(int cmpid, int cmunitid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcReturnLoadProcess(cmpid, cmunitid)
                         select new ProcessReturn
                         {

                             processid = YD.ProcessId,
                             process = YD.Process

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReturn> Getsupp()
        {
            var query = (from YD in entities.Proc_Apparel_ProcReturnLoadSupp()
                         select new ProcessReturn
                         {

                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReturn> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessRetLoadaddgrid(cmpid, cmunitid, processid, processorid)
                         select new ProcessReturn
                         {
                             processor = YD.Processor,
                             orderqty = (decimal)YD.Orderqty,
                             bal = YD.Bal,
                             issued = (decimal)YD.Issued,
                             procordid = YD.processordid,
                             prodord = YD.processorder,
                             procdate = (DateTime)YD.ProcessorDate


                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessReturnItemDet> LoadItmdet(string prodord)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessRetLoadItmdet(prodord)
                         select new ProcessReturnItemDet
                         {
                             procjobdetid = YD.ProcessJobDetid,
                             procorddetid = YD.processorddetid,
                             procordid = YD.processordid,
                             processord = YD.processorder,
                             prodprgno = (YD.ProdPrgNo == null ? "" : YD.ProdPrgNo),
                             jobordno = (YD.job_ord_no == null ? "" : YD.job_ord_no),
                             prodprgdetid = (int)(YD.Prodprgdetid == null ? 0 : YD.Prodprgdetid),
                             lossqty = YD.lossqty,
                             lotno = YD.lotno,
                             refno = (YD.Ref_no == null ? "" : YD.Ref_no),
                             retqty = YD.retQty,
                             itm = YD.item,
                             itmid = (int)YD.itemid,
                             colorid = (int)YD.colorid,
                             color = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             style = (YD.style == null ? "" : YD.style),
                             styleid = (int)(YD.styleid == null ? 0 : YD.styleid),
                             uomid = (int)YD.uomid,
                             proissmasid = YD.ProcessIssueId,
                             proissdetid = YD.ProcessIssueDetId,
                             proissjobid = YD.ProcessIssueJobId,
                             proissstkid = YD.ProcessIssStockId,
                             bal = YD.BalQty,
                             Maruprate=YD.Markup_Rate,
                             suppid=(int)YD.Supplierid

                         }).AsQueryable();

            return query;
        }


        public int AddData(Process_Recpt_Mas objEntry)
        {
            var id = entities.Process_Recpt_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.proc_recpt_masid;
        }

        public bool AddDetData(Process_Recpt_Mas obj, string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0)
        {

            bool reserved = false;
            var Masid = 0;
            int compid = 0;
            int suppid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    entities.Process_Recpt_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.proc_recpt_masid;



                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {

                            if (item.Returnqty > 0 || item.LossQty > 0)
                            {
                                item.Process_Recpt_masid = Masid;
                                entities.Process_Recpt_Return.Add(item);
                            }
                        }
                        entities.SaveChanges();
                    }



                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {
                            var OQuery = entities.Process_Ord_Mas.Where(b => b.processordid == item.procordid).FirstOrDefault();
                            if (OQuery != null)
                            {
                                compid = OQuery.companyid;
                                suppid = (int)OQuery.processorid;
                            }

                            if (item.retqty > 0 || item.lossqty > 0)
                            {

                                var Pged = entities.Proc_Apparel_GenProdutnReturnInsertItemstock(item.itmid, item.colorid, item.sizeid, item.uomid, item.retqty, item.jobordno, transno, processid, item.lotno, transdate, compid, item.suppid, item.styleid, item.retqty, item.stockid, item.retqty, item.lossqty, remarks, stuid, cretby,item.Maruprate);
                                entities.SaveChanges();


                                var Pgr = entities.Proc_Apparel_GenProcessRetUpdProdOrdDet(item.retqty, item.lossqty, item.procorddetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_GenProcessRetUpdProdOrdJobDet(item.retqty, item.lossqty, item.procorddetid, item.procjobdetid);
                                entities.SaveChanges();

                                var Pgter = entities.Proc_Apparel_ProcessRetUpdProcIssJobDet(item.retqty, item.lossqty, item.proissjobid);
                                entities.SaveChanges();
                            }
                        }

                    }



                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GenProcessReturn-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProcessReceiptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessRecptLoadMain(cmpid, processid, unitid, buyerid, masid, prodordid, processortype, type, dcno, recptno, fromdate, todate)
                         select new ProcessReceiptMas
                         {
                             company = YD.company,
                             companyid = YD.Companyid,
                             buyerid = YD.buyerid,
                             buyer = YD.buyer,
                             unitid = YD.Id,
                             unit = YD.CompanyUnit,
                             proc_recpt_masid = YD.ProcessRecptid,
                             processordid = YD.processordid,
                             processorder = YD.processorder,
                             Recpt_Ref_no = YD.Recpt_Ref_no,
                             proc_recpt_no = YD.proc_recpt_no,
                             proc_recpt_date = (DateTime)YD.ProcessRecptdate,
                             processid = YD.Processid,
                             process = YD.Process,
                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier,

                             type = YD.type,
                             remarks = YD.remarks,
                             Recpt_Ref_date = (DateTime)YD.Recpt_Ref_date,
                             CancelMasId = (int)YD.Process_Cancel_masid,
                             Canceldate = (DateTime)YD.process_Cancel_date,
                             CancelRefDate = (DateTime)YD.Cancel_Ref_date,
                             CancelNo = YD.process_Cancel_no,
                             CancelRefNo = YD.Cancel_Ref_no,
                             ParentUnitid = YD.Parentstoreid,
                             Storetype = YD.StoreType,
                             StoreName = YD.StoreName,
                             StoreUnitID = YD.StoreUnitId,


                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessReturnItemDet> LoadEditItmdet(int masid, string prodord)
        {
            var query = (from YD in entities.Proc_Apparel_GenProcessRetEditItmLoad(masid, prodord)
                         select new ProcessReturnItemDet
                         {
                             procjobdetid = YD.ProcessJobDetid,
                             procorddetid = YD.processorddetid,
                             procordid = YD.processordid,
                             processord = YD.processorder,
                             prodprgno = YD.ProdPrgNo,
                             jobordno = YD.job_ord_no,
                             prodprgdetid = (int)(YD.Prodprgdetid == null ? 0 : YD.Prodprgdetid),
                             lossqty = (decimal)YD.Lossqty,
                             lotno = YD.lotno,
                             refno = (YD.Ref_no == null ? "" : YD.Ref_no),
                             retqty = YD.retQty,
                             itm = YD.item,
                             itmid = (int)YD.itemid,
                             colorid = (int)YD.colorid,
                             color = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             style = (YD.style == null ? "" : YD.style),
                             styleid = (int)(YD.styleid == null ? 0 : YD.styleid),
                             uomid = (int)YD.uomid,
                             Process_Recpt_Retid = YD.Process_Recpt_Retid,
                             bal = YD.BalQty + (decimal)YD.retQty,
                             cancelqty = (decimal)YD.Cancel_qty,
                             oldincancelqty = (decimal)YD.Cancel_qty,
                             proccanceljobdetid = (int)YD.Process_Cancel_JobDetid,
                             proccancelorddetid = (int)YD.Process_Cancel_Detid,
                             proccancelmasid = (int)YD.Process_Cancel_masid,
                             Maruprate = YD.Markup_Rate,
                             suppid = (int)YD.Supplierid
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessReturnItemDet> LoadRepEditOutdet(int masid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRetEditOutItmLoad(masid)
                         select new ProcessReturnItemDet
                         {
                             procjobdetid = YD.ProcessJobDetid,
                             procorddetid = YD.processorddetid,
                             procordid = (int)YD.processordid,
                             processord = YD.processorder,
                             prodprgno = YD.ProdPrgNo,
                             jobordno = YD.job_ord_no,
                             //prodprgdetid = YD.Prodprgdetid,
                             //lossqty = YD.lossqty,
                             //lo = "",
                             //refno = YD.Ref_no,
                             //retqty = YD.retQty,
                             itm = YD.item,
                             itmid = (int)YD.itemid,
                             colorid = (int)YD.colorid,
                             color = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             //style = YD.style,
                             //styleid = (int)YD.styleid,
                             //uomid = (int)YD.uomid,
                             proccancelorddetid = (int)YD.Process_Cancel_Detid,
                             proccanceljobdetid = YD.Process_Cancel_JobDetid,
                             proccancelmasid = YD.Process_Cancel_masid,
                             //proissstkid = YD.ProcessIssStockId,
                             cancelqty = (decimal)YD.Cancel_Qty,
                             oldoutcancelqty = (decimal)YD.Cancel_Qty,
                             secqty = 0,
                             ordqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.BalQty + (decimal)YD.Cancel_Qty,
                             plansizeid = YD.PlanSizeid,
                             ordno = YD.Order_No,
                             refno = YD.Ref_no,

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

        public bool DeleteDetData(string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0)
        {
            int id = 0;
            int ordid = 0;

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {

                            if (item.retqty > 0 || item.lossqty > 0)
                            {


                                var Pg1 = entities.Proc_Apparel_ProcRetUpdPrdprg(item.lossqty, item.retqty, item.prodprgdetid, transno, item.itmid, item.colorid, item.sizeid, item.procjobdetid);
                                entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProcRetUpdPrdOrdDet(item.retqty, item.lossqty, item.prodprgdetid, item.procorddetid, transno, item.itmid, item.colorid, item.sizeid, item.procjobdetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProcRetUpdPrdJobOrdDet(item.retqty, item.lossqty, item.procorddetid, transno, item.procjobdetid, item.itmid, item.colorid, item.sizeid, item.prodprgdetid, item.proissjobid);
                                entities.SaveChanges();

                                var Pd = entities.Proc_Apparel_GenprocRetUpdItmstk(transno, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();

                                var Pgter = entities.Proc_Apparel_GenProcessRetUpdProcEditIssJobDet(item.retqty, item.lossqty, item.procordid, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();


                            }
                        }

                    }

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.Process_Recpt_masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Process_Recpt_Return.Where(d => d.Process_Recpt_masid == id).ToList<Process_Recpt_Return>();

                    deletedetad.ForEach(c => entities.Process_Recpt_Return.Remove(c));
                    entities.SaveChanges();
                    ordid = id;
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
                    exceplogg.SendExcepToDB(ex, "GenProcessReturn-DeleteDetData");
                }
            }
            return reserved;
        }




        public bool UpdDetData(Process_Recpt_Mas objupd, string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int compid = 0;
            int suppid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
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

                    }

                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {

                            if (item.retqty > 0 || item.lossqty > 0)
                            {


                                //var Pg1 = entities.Proc_Apparel_ProcRetUpdPrdprg(item.lossqty, item.retqty, item.prodprgdetid, transno, item.itmid, item.colorid, item.sizeid);
                                //entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProcRetUpdPrdOrdDet(item.retqty, item.lossqty, item.prodprgdetid, item.procorddetid, transno, item.itmid, item.colorid, item.sizeid, item.procjobdetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProcRetUpdPrdJobOrdDet(item.retqty, item.lossqty, item.procorddetid, transno, item.procjobdetid, item.itmid, item.colorid, item.sizeid, item.prodprgdetid, item.proissjobid);
                                entities.SaveChanges();

                                var Pd = entities.Proc_Apparel_GenprocRetUpdItmstk(transno, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();

                                var Pgter = entities.Proc_Apparel_GenProcessRetUpdProcEditIssJobDet(item.retqty, item.lossqty, item.procordid, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();


                            }
                        }

                    }
                    //prodreturn update 
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var st in objdet)
                        {
                            var Pg1 = entities.GenProc_Apparel_ProcessRetUpdRecptRet(st.LossQty, st.Returnqty, st.Process_Recpt_Retid);
                            entities.SaveChanges();

                        }
                    }
                    //Update 
                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {
                            var OQuery = entities.Process_Ord_Mas.Where(b => b.processordid == item.procordid).FirstOrDefault();
                            if (OQuery != null)
                            {
                                compid = OQuery.companyid;
                                suppid = (int)OQuery.processorid;
                            }


                            if (item.retqty > 0 || item.lossqty > 0)
                            {

                                var Pged = entities.Proc_Apparel_GenProdutnReturnInsertItemstock(item.itmid, item.colorid, item.sizeid, item.uomid, item.retqty, item.jobordno, transno, processid, item.lotno, transdate, cmpid, item.suppid, item.styleid, item.retqty, item.stockid, item.retqty, item.lossqty, remarks, stuid, cretby,item.Maruprate);
                                entities.SaveChanges();

                                //var Pg1 = entities.Proc_Apparel_ProductionRetUpdProdprgDet(item.retqty, item.lossqty, item.prodprgdetid, item.itmid, item.colorid, item.sizeid);
                                //entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_GenProcessRetUpdProdOrdDet(item.retqty, item.lossqty, item.procorddetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_GenProcessRetUpdProdOrdJobDet(item.retqty, item.lossqty, item.procorddetid, item.procjobdetid);
                                entities.SaveChanges();

                                var Pgter = entities.Proc_Apparel_GenProcessRetUpdAddProcIssJobDet(item.retqty, item.lossqty, item.procordid, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();
                            }
                        }

                    }



                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GenProcessReturn-UpdDetData");
                }
            }
            return reserved;
        }
    }
}
