using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ProcessReturnRepository : IProcessReturnRepository
    {
        ProcessEntities entities = new ProcessEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        int GMasid = 0;
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


        public IQueryable<ProcessReturn> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, int colorid, string ordtype, string ProcessorType, string OrderNo, string ReferNo, int StyleId, int BuyerId)
        {
            var query = (from YD in entities.Proc_Apparel_ProcRetLoadaddgrid(cmpid, cmunitid, processid, processorid, colorid, ordtype, ProcessorType, OrderNo, ReferNo, StyleId, BuyerId)
                         select new ProcessReturn
                         {
                             processor = YD.Processor,
                             orderqty = (decimal)YD.OOrdQty,
                             bal = YD.Bal,
                             issued = (decimal)YD.Issueqty,
                             procordid = YD.processordid,
                             prodord = YD.processorder,
                             procdate = (DateTime)YD.ProcessorDate,
                             cmpid = YD.companyid,
                             cmp = YD.Company,
                             colorid = 0,//(int)YD.Colorid,
                             color = "",//YD.Colorname,
                             cmpunitid = (int)YD.companyunitid,
                             cmpunit = YD.CompanyUnit,
                             processid = (int)YD.processid,
                             process = YD.Process,
                             processorid = (int)YD.Processorid,
                             orderno=YD.Order_no,
                             refno=YD.Ref_No,
                             buyerid=(int)YD.BuyerId,
                             buyer=YD.buyer,
                             StyleId=(int)YD.StyleId,
                             Style=YD.Style
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessReturnItemDet> LoadItmdet(string prodord)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRetLoadItmdet(prodord)
                         select new ProcessReturnItemDet
                         {
                             procjobdetid = YD.ProcessJobDetid,
                             procorddetid = YD.processorddetid,
                             procordid = YD.processordid,
                             processord = YD.processorder,
                             prodprgno = YD.ProdPrgNo,
                             jobordno = YD.job_ord_no,
                             prodprgdetid = YD.Prodprgdetid,
                             lossqty = YD.lossqty,
                             lotno = "",
                             refno = YD.Ref_no,
                             retqty = YD.retQty,
                             itm = YD.item,
                             itmid = (int)YD.itemid,
                             colorid = (int)YD.colorid,
                             color = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             style = YD.style,
                             styleid = (int)YD.styleid,
                             uomid = (int)YD.uomid,
                             proissmasid = YD.ProcessIssueId,
                             proissdetid = YD.ProcessIssueDetId,
                             proissjobid = YD.ProcessIssueJobId,
                             proissstkid = YD.ProcessIssStockId,
                             cancelqty = 0,
                             secqty = 0,
                             ordqty = (decimal)YD.Issueqty,
                             bal = (decimal)YD.BalQty,
                             plansizeid = YD.plannedsizeid,
                             Maruprate = YD.Markup_Rate,
                             Rate = YD.Rate,
                             ordno=YD.Order_No,
                             opcolorid = YD.OpColorId,
                             opsizeid = YD.OpSizeId,
                             opitmid = YD.OpItemId,
                             cuttorsew = YD.CuttingorSewing,
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessReturnItemDet> LoadOpItmdet(string prodord)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRetLoadOpItmdet(prodord)
                         select new ProcessReturnItemDet
                         {
                             procjobdetid = YD.ProcessJobDetid,
                             procorddetid = YD.ProcessOrdDetid,
                             procordid = (int)YD.ProcessOrdid,
                             processord = YD.Processorder,
                             prodprgno = YD.ProdPrgNo,
                             jobordno = YD.Job_ord_no,
                             //prodprgdetid = YD.Prodprgdetid,
                             //lossqty = YD.lossqty,
                             lotno = "",
                             //refno = YD.Ref_no,
                             //retqty = YD.retQty,
                             itm = YD.Item,
                             itmid = (int)YD.Itemid,
                             colorid = (int)YD.Colorid,
                             color = YD.Color,
                             sizeid = (int)YD.Sizeid,
                             size = YD.Size,
                             plansizeid = (int)YD.PlannedSizeid,
                             //style = YD.style,
                             //styleid = (int)YD.styleid,
                             //uomid = (int)YD.uomid,
                             //proissmasid = YD.ProcessIssueId,
                             //proissdetid = YD.ProcessIssueDetId,
                             //proissjobid = YD.ProcessIssueJobId,
                             //proissstkid = YD.ProcessIssStockId,
                             cancelqty = 0,
                             secqty = 0,
                             ordqty = YD.OrderQty,
                             bal = (decimal)YD.Bal,
                             ordno=YD.Order_No,
                             refno=YD.Ref_No,
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
            int Masid = 0;
            int proordid = 0;
            int compid = 0;
            int suppid = 0;
            int procesid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    entities.Process_Recpt_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.proc_recpt_masid;
                    GMasid = obj.proc_recpt_masid;
                    //var processid=0 ;
                    //var cmpid = 0;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            proordid = (int)item.ProcessOrdId;

                            var OQuery = entities.Process_Ord_Mas.Where(b => b.processordid == proordid).FirstOrDefault();
                            if (OQuery != null)
                            {
                                compid = OQuery.companyid;
                                suppid = (int)OQuery.processorid;
                                procesid = (int)OQuery.processid;
                            }

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

                            if (item.retqty > 0 || item.lossqty > 0)
                            {

                                var Pged = entities.Proc_Apparel_ProdutnReturnInsertItemstock(item.itmid, item.colorid, item.sizeid, item.uomid, item.retqty, item.Rate, item.Maruprate, item.jobordno, transno, procesid, item.lotno, transdate, compid, suppid, item.styleid, item.retqty, item.stockid, item.retqty, item.lossqty, remarks, stuid, cretby);
                                entities.SaveChanges();

                                var Pg1 = entities.Proc_Apparel_ProductionRetUpdProdprgDet(item.retqty, item.lossqty, item.prodprgdetid, item.itmid, item.colorid, item.plansizeid);
                                entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProcessRetUpdProdOrdDet(item.retqty, item.lossqty, item.procorddetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProcessRetUpdProdOrdJobDet(item.retqty, item.lossqty, item.procorddetid, item.procjobdetid);
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
                    exceplogg.SendExcepToDB(ex, "ProcessReturn-AddDetData");
                }
            }
            return reserved;
        }

        public bool AddDetCancelData(Process_Cancel_mas obj, List<Process_Cancel_det> itm, List<Process_Cancel_jobdet> objdet, List<Domain.ProcessCancel> canobj, string Mode, string RetNo, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            int detid = 0;
            int ProcRetId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var OQuery = entities.Process_Recpt_Mas.Where(b => b.proc_recpt_no == RetNo).FirstOrDefault();
                    if (OQuery != null)
                    {                       
                        ProcRetId = (int)OQuery.proc_recpt_masid;                        
                    }

                    obj.proc_recpt_masid = ProcRetId;
                    entities.Process_Cancel_mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.Process_Cancel_masid;


                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {
                            if (item.Canceled_qty > 0)
                            {
                                item.Process_Cancel_Masid = Masid;
                                entities.Process_Cancel_det.Add(item);
                                entities.SaveChanges();
                                detid = item.Process_Cancel_Detid;


                                var Pg6 = entities.Proc_Apparel_ProCancelOrderDetInOutUpdate(item.ProcessOrdDetid, item.itemid, item.colorid, item.sizeid, item.InorOut, item.Canceled_qty);
                                entities.SaveChanges();

                                foreach (var itemL in objdet)
                                {
                                    if (item.itemid == itemL.ItemId && item.colorid == itemL.ColorId && item.sizeid == itemL.SizeId && item.ProcessOrdDetid == itemL.ProcessOrdDetid && item.InorOut == itemL.InOrOut)
                                    {
                                        itemL.Process_Cancel_Detid = detid;
                                        entities.Process_Cancel_jobdet.Add(itemL);
                                        entities.SaveChanges();

                                    }

                                }

                            }
                        }
                        entities.SaveChanges();
                        //Update ProdPrgDet Table
                        foreach (var itemPD in objdet)
                        {
                            //if (item.itemid == itemPD.ItemId && item.colorid == itemPD.ColorId && item.sizeid == itemPD.SizeId && item.ProcessOrdDetid == itemPD.ProcessOrdDetid)
                            //{
                            if (itemPD.InOrOut == "O")
                            {
                                var Pg1 = entities.Proc_Apparel_ProcessCancelProdPrgOutUpdate(obj.process_Cancel_no, itemPD.InOrOut, itemPD.Job_Ord_No, obj.Process_Cancel_masid, itemPD.ItemId, itemPD.ColorId, itemPD.PlannedSizeid);
                                entities.SaveChanges();
                            }
                            if (itemPD.InOrOut == "I")
                            {
                                var Pg1 = entities.Proc_Apparel_ProcessCancelProdPrgInUpdate(obj.process_Cancel_no, itemPD.InOrOut, itemPD.Job_Ord_No, obj.Process_Cancel_masid, itemPD.ItemId, itemPD.ColorId, itemPD.PlannedSizeid);
                                entities.SaveChanges();
                            }

                            //}

                        }
                        //Update ProcessOrdjobDet Table
                        foreach (var itemPD1 in objdet)
                        {
                            //if (item.itemid == itemPD.ItemId && item.colorid == itemPD.ColorId && item.sizeid == itemPD.SizeId && item.ProcessOrdDetid == itemPD.ProcessOrdDetid)
                            //{
                            var Pg2 = entities.Proc_Apparel_ProCancelOrderJobDetInOutUpdate(itemPD1.ProcessOrdJobDetid, itemPD1.ProcessOrdDetid, itemPD1.ItemId, itemPD1.ColorId, itemPD1.SizeId, itemPD1.InOrOut, itemPD1.Cancel_Qty);
                            entities.SaveChanges();

                            //}

                        }
                    }




                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessCancel-AddDetData");
                }
            }
            return reserved;
        }

        public IQueryable<ProcessReceiptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid,int Userid)
        {
              string UserGroup = entities.Proc_Apparel_GetUserGroupName(Userid).FirstOrDefault().GroupName;

                string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

                if (Group != "AUDIT")
                {

                    var query = (from YD in entities.Proc_Apparel_ProcessReturnLoadMain(cmpid, processid, unitid, buyerid, masid, prodordid, processortype, type, dcno, recptno, fromdate, todate, Processorid)
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
                                     StoreName = YD.StoreName,
                                     StoreUnitID = YD.StoreUnitId,
                                     ParentUnitid = YD.Parentstoreid,
                                     Storetype = YD.StoreType

                                 }).AsQueryable();

                    return query;
                }
                else {

                    var query = (from YD in entities.Proc_Apparel_ProcessReturnLoadMainAudit(cmpid, processid, unitid, buyerid, masid, prodordid, processortype, type, dcno, recptno, fromdate, todate, Processorid)
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
                                     StoreName = YD.StoreName,
                                     StoreUnitID = YD.StoreUnitId,
                                     ParentUnitid = YD.Parentstoreid,
                                     Storetype = YD.StoreType

                                 }).AsQueryable();

                    return query;
                
                }


        }


        public IQueryable<ProcessReturnItemDet> LoadEditItmdet(int masid, string prodord)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRetEditItmLoad(masid, prodord)
                         select new ProcessReturnItemDet
                         {
                             procjobdetid = YD.ProcessJobDetid,
                             procorddetid = YD.processorddetid,
                             procordid = YD.processordid,
                             processord = YD.processorder,
                             prodprgno = YD.ProdPrgNo,
                             jobordno = YD.job_ord_no,
                             prodprgdetid = YD.Prodprgdetid,
                             lossqty = (decimal)YD.Lossqty,
                             lotno = YD.lotno,
                             refno = YD.Ref_no,
                             retqty = YD.retQty,
                             itm = YD.item,
                             itmid = (int)YD.itemid,
                             colorid = (int)YD.colorid,
                             color = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             style = YD.style,
                             styleid = (int)YD.styleid,
                             uomid = (int)YD.uomid,
                             Process_Recpt_Retid = YD.Process_Recpt_Retid,
                             cancelqty = (decimal)YD.Cancel_qty,
                             oldincancelqty = (decimal)YD.Cancel_qty,
                             proccanceljobdetid = (int)YD.Process_Cancel_JobDetid,
                             proccancelorddetid = (int)YD.Process_Cancel_Detid,
                             proccancelmasid = (int)YD.Process_Cancel_masid,
                             cmpid = YD.Companyid,
                             suppid = (int)YD.Supplierid,
                             processid = (int)YD.processId,
                             plansizeid = YD.PlanSizeid,
                             Maruprate = YD.Markup_Rate,
                             Rate = YD.rate,
                             bal = (decimal)YD.BalQty + YD.retQty,
                             proissmasid = YD.ProcessIssueId,
                             proissdetid = YD.ProcessIssueDetId,
                             proissjobid = YD.ProcessIssueJobId,
                             proissstkid = YD.ProcessIssStockId,
                             ordqty = (decimal)YD.issueqty,
                             ordno=YD.Order_No,
                             opcolorid=YD.OpColorId,
                             opsizeid=YD.OpSizeId,
                             opitmid=YD.OpItemId,
                             cuttorsew=YD.CuttingorSewing,

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
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    int id = 0;
                    int ordid = 0;
                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {

                            if (item.retqty > 0 || item.lossqty > 0)
                            {


                                //var Pg1 = entities.Proc_Apparel_ProcRetUpdPrdprg(item.lossqty, item.retqty, item.prodprgdetid, transno, item.itmid, item.colorid, item.sizeid);
                                //entities.SaveChanges();

                                //var Pgr = entities.Proc_Apparel_ProcRetUpdPrdOrdDet(item.retqty, item.lossqty, item.prodprgdetid, item.procorddetid, transno, item.itmid, item.colorid, item.sizeid);
                                //entities.SaveChanges();

                                //var Pgtr = entities.Proc_Apparel_ProcRetUpdPrdJobOrdDet(item.retqty, item.lossqty, item.procorddetid, transno, item.procjobdetid, item.itmid, item.colorid, item.sizeid, item.prodprgdetid);
                                //entities.SaveChanges();

                                //var Pd = entities.Proc_Apparel_ProducRetUpdItmstk(transno, stuid, item.itmid, item.colorid, item.sizeid, item.jobordno, item.procjobdetid);
                                //entities.SaveChanges();

                                //var Pgter = entities.Proc_Apparel_ProcessRetUpdProcEditIssJobDet(item.retqty, item.lossqty, item.procordid, item.itmid, item.colorid, item.sizeid);
                                //entities.SaveChanges();


                                var Pg1 = entities.Proc_Apparel_ProcRetUpdPrdprg(item.lossqty, item.retqty, item.prodprgdetid, transno, item.itmid, item.colorid, item.plansizeid, item.procjobdetid);
                                entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProcRetUpdPrdOrdDet(item.retqty, item.lossqty, item.prodprgdetid, item.procorddetid, transno, item.itmid, item.colorid, item.plansizeid, item.procjobdetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProcRetUpdPrdJobOrdDet(item.retqty, item.lossqty, item.procorddetid, transno, item.procjobdetid, item.itmid, item.colorid, item.plansizeid, item.prodprgdetid, item.proissjobid);
                                entities.SaveChanges();

                                var Pd = entities.Proc_Apparel_ProducRetUpdItmstk(transno, stuid, item.itmid, item.colorid, item.sizeid, item.jobordno, item.procjobdetid);
                                entities.SaveChanges();

                                //var Pgter = entities.Proc_Apparel_ProcessRetUpdProcEditIssJobDet(item.retqty, item.lossqty, item.procordid, item.itmid, item.colorid, item.plansizeid);
                                //entities.SaveChanges();


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
                    exceplogg.SendExcepToDB(ex, "ProcessReturn-DeleteDetData");
                }
            }
            return reserved;
        }


        public bool UpdDetData(Process_Recpt_Mas objupd, string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<ProcessReturnItemDet> itm, List<Process_Recpt_Return> objdet, string Mode, int unitmId = 0)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
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


                                var Pg1 = entities.Proc_Apparel_ProcRetUpdPrdprg(item.lossqty, item.retqty, item.prodprgdetid, transno, item.itmid, item.colorid, item.plansizeid,item.procjobdetid);
                                entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProcRetUpdPrdOrdDet(item.retqty, item.lossqty, item.prodprgdetid, item.procorddetid, transno, item.itmid, item.colorid, item.plansizeid, item.procjobdetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProcRetUpdPrdJobOrdDet(item.retqty, item.lossqty, item.procorddetid, transno, item.procjobdetid, item.itmid, item.colorid, item.plansizeid, item.prodprgdetid,item.proissjobid);
                                entities.SaveChanges();

                                var Pd = entities.Proc_Apparel_ProducRetUpdItmstk(transno, stuid, item.itmid, item.colorid, item.sizeid, item.jobordno, item.procjobdetid);
                                entities.SaveChanges();

                                //var Pgter = entities.Proc_Apparel_ProcessRetUpdProcEditIssJobDet(item.retqty, item.lossqty, item.procordid, item.itmid, item.colorid, item.plansizeid);
                                //entities.SaveChanges();


                            }
                        }

                    }
                    //prodreturn update 
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var st in objdet)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcessRetUpdRecptRet(st.LossQty, st.Returnqty, st.Process_Recpt_Retid);
                            entities.SaveChanges();

                        }
                    }
                    //Update 
                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {

                            if (item.retqty > 0 || item.lossqty > 0)
                            {

                                //var Pged = entities.Proc_Apparel_ProdutnReturnInsertItemstock(item.itmid, item.colorid, item.sizeid, item.uomid, item.retqty, item.Rate, item.Maruprate, item.jobordno, transno, processid, item.lotno, transdate, cmpid, item.suppid, item.styleid, item.retqty, item.stockid, item.retqty, item.lossqty, remarks, stuid, cretby);
                                //entities.SaveChanges();

                                //var Pg1 = entities.Proc_Apparel_ProductionRetUpdProdprgDet(item.retqty, item.lossqty, item.prodprgdetid, item.itmid, item.colorid, item.plansizeid);
                                //entities.SaveChanges();

                                //var Pgr = entities.Proc_Apparel_ProcessRetUpdProdOrdDet(item.retqty, item.lossqty, item.procorddetid);
                                //entities.SaveChanges();

                                //var Pgtr = entities.Proc_Apparel_ProcessRetUpdProdOrdJobDet(item.retqty, item.lossqty, item.procorddetid, item.procjobdetid);
                                //entities.SaveChanges();

                                //var Pgter = entities.Proc_Apparel_ProcessRetUpdAddProcIssJobDet(item.retqty, item.lossqty, item.procordid, item.itmid, item.colorid, item.sizeid);
                                //entities.SaveChanges();



                                var Pged = entities.Proc_Apparel_ProdutnReturnInsertItemstock(item.itmid, item.colorid, item.sizeid, item.uomid, item.retqty, item.Rate, item.Maruprate, item.jobordno, transno, processid, item.lotno, transdate, cmpid, item.suppid, item.styleid, item.retqty, item.stockid, item.retqty, item.lossqty, remarks, stuid, cretby);
                                entities.SaveChanges();

                                var Pg1 = entities.Proc_Apparel_ProductionRetUpdProdprgDet(item.retqty, item.lossqty, item.prodprgdetid, item.itmid, item.colorid, item.plansizeid);
                                entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProcessRetUpdProdOrdDet(item.retqty, item.lossqty, item.procorddetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProcessRetUpdProdOrdJobDet(item.retqty, item.lossqty, item.procorddetid, item.procjobdetid);
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
                    exceplogg.SendExcepToDB(ex, "ProcessReturn-UpdDetData");
                }
            }
            return reserved;
        }


        public int AddData(Process_Cancel_mas objEntry)
        {
            throw new NotImplementedException();
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
                             ordno=YD.Order_No,
                             refno=YD.Ref_no,

                         }).AsQueryable();

            return query;
        }


        public bool UpdateDetCancelData(Process_Cancel_mas Eobj, List<Process_Cancel_det> Eitm, List<Process_Cancel_jobdet> Eobjdet, List<ProcessCancel> Ecanobj, string Mode, int unitmId = 0)
        {

            bool reserved = false;
            int ProcDetid = 0;
            int detid = 0;
            int Masid = 0;
            int ProcRetId = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Upd = entities.Process_Cancel_mas.Where(c => c.Process_Cancel_masid == Eobj.Process_Cancel_masid).FirstOrDefault();
                    if (Upd != null)
                    {

                        Upd.process_Cancel_date = Eobj.process_Cancel_date;
                        Upd.Cancel_Ref_date = Eobj.Cancel_Ref_date;
                        Upd.OrderType = Eobj.OrderType;
                        Upd.Cancel_Ref_no = Eobj.Cancel_Ref_no;

                        entities.SaveChanges();

                    }


                    if (Eitm != null && Eitm.Count > 0)
                    {
                        foreach (var item in Eitm)
                        {
                            //if (item.Canceled_qty > 0)
                           // {

                                var Pg6 = entities.Proc_Apparel_ProCancelOrderDetInOutDelete(item.ProcessOrdDetid, Eobj.Process_Cancel_masid, item.itemid, item.colorid, item.sizeid, item.InorOut, item.Canceled_qty);
                                entities.SaveChanges();

                            //}
                        }
                        entities.SaveChanges();
                        //Update ProdPrgDet Table
                        foreach (var itemPD in Eobjdet)
                        {
                            //if (item.itemid == itemPD.ItemId && item.colorid == itemPD.ColorId && item.sizeid == itemPD.SizeId && item.ProcessOrdDetid == itemPD.ProcessOrdDetid)
                            //{
                            if (itemPD.InOrOut == "O")
                            {
                                var Pg1 = entities.Proc_Apparel_ProcessCancelProdPrgOutDelete(Eobj.process_Cancel_no, itemPD.InOrOut, itemPD.Job_Ord_No, Eobj.Process_Cancel_masid, itemPD.ItemId, itemPD.ColorId, itemPD.PlannedSizeid);
                                entities.SaveChanges();
                            }
                            if (itemPD.InOrOut == "I")
                            {
                                var Pg1 = entities.Proc_Apparel_ProcessCancelProdPrgInDelete(Eobj.process_Cancel_no, itemPD.InOrOut, itemPD.Job_Ord_No, Eobj.Process_Cancel_masid, itemPD.ItemId, itemPD.ColorId, itemPD.PlannedSizeid);
                                entities.SaveChanges();
                            }

                            //}

                        }
                        //Update ProcessOrdjobDet Table
                        foreach (var itemPD1 in Eobjdet)
                        {
                            //if (item.itemid == itemPD.ItemId && item.colorid == itemPD.ColorId && item.sizeid == itemPD.SizeId && item.ProcessOrdDetid == itemPD.ProcessOrdDetid)
                            //{
                            var Pg2 = entities.Proc_Apparel_ProCancelOrderJobDetInOutDelete(itemPD1.ProcessOrdJobDetid, itemPD1.ProcessOrdDetid, Eobj.Process_Cancel_masid, itemPD1.ItemId, itemPD1.ColorId, itemPD1.SizeId, itemPD1.InOrOut, itemPD1.Cancel_Qty);
                            entities.SaveChanges();

                            //}

                        }
                    }
                    entities.SaveChanges();

                    //Delete the process cancel det and process cancel jobet

                    var d = entities.Process_Cancel_det.Where(c => c.Process_Cancel_Masid == Eobj.Process_Cancel_masid);

                    foreach (var dbSet in d)
                    {
                        ProcDetid = dbSet.Process_Cancel_Detid;
                        var CDet1 = entities.Process_Cancel_jobdet.Where(u => u.Process_Cancel_Detid == ProcDetid);

                        foreach (var w in CDet1)
                        {
                            entities.Process_Cancel_jobdet.Remove(w);
                        }
                    }


                    var CDet = entities.Process_Cancel_det.Where(u => u.Process_Cancel_Masid == Eobj.Process_Cancel_masid);

                    foreach (var v in CDet)
                    {
                        entities.Process_Cancel_det.Remove(v);
                    }

                    entities.SaveChanges();
                    

                    //



                    if (Eitm != null && Eitm.Count > 0)
                    {

                        if (Eobj.Process_Cancel_masid == 0)
                        {
                            //var OQuery = entities.Process_Recpt_Mas.Where(b => b.proc_recpt_masid == Eobj.proc_recpt_masid).FirstOrDefault();
                            //if (OQuery != null)
                            //{
                            //    ProcRetId = (int)OQuery.proc_recpt_masid;
                            //}

                            //Eobj.proc_recpt_masid = ProcRetId;
                            entities.Process_Cancel_mas.Add(Eobj);
                            entities.SaveChanges();
                            Masid = Eobj.Process_Cancel_masid;

                        }
                        else
                        {
                            Masid = Eobj.Process_Cancel_masid;
                        }

                        foreach (var item in Eitm)
                        {
                            if (item.Canceled_qty > 0)
                            {
                                item.Process_Cancel_Masid = Masid;
                                entities.Process_Cancel_det.Add(item);
                                entities.SaveChanges();
                                detid = item.Process_Cancel_Detid;


                                var Pg6 = entities.Proc_Apparel_ProCancelOrderDetInOutUpdate(item.ProcessOrdDetid, item.itemid, item.colorid, item.sizeid, item.InorOut, item.Canceled_qty);
                                entities.SaveChanges();

                                foreach (var itemL in Eobjdet)
                                {
                                    if (item.itemid == itemL.ItemId && item.colorid == itemL.ColorId && item.sizeid == itemL.SizeId && item.ProcessOrdDetid == itemL.ProcessOrdDetid && item.InorOut == itemL.InOrOut)
                                    {
                                        itemL.Process_Cancel_Detid = detid;
                                        entities.Process_Cancel_jobdet.Add(itemL);
                                        entities.SaveChanges();

                                    }

                                }

                            }
                        }
                        entities.SaveChanges();
                        //Update ProdPrgDet Table
                        foreach (var itemPD in Eobjdet)
                        {
                            //if (item.itemid == itemPD.ItemId && item.colorid == itemPD.ColorId && item.sizeid == itemPD.SizeId && item.ProcessOrdDetid == itemPD.ProcessOrdDetid)
                            //{
                            if (itemPD.InOrOut == "O")
                            {
                                var Pg1 = entities.Proc_Apparel_ProcessCancelProdPrgOutUpdate(Eobj.process_Cancel_no, itemPD.InOrOut, itemPD.Job_Ord_No, Eobj.Process_Cancel_masid, itemPD.ItemId, itemPD.ColorId, itemPD.PlannedSizeid);
                                entities.SaveChanges();
                            }
                            if (itemPD.InOrOut == "I")
                            {
                                var Pg1 = entities.Proc_Apparel_ProcessCancelProdPrgInUpdate(Eobj.process_Cancel_no, itemPD.InOrOut, itemPD.Job_Ord_No, Eobj.Process_Cancel_masid, itemPD.ItemId, itemPD.ColorId, itemPD.PlannedSizeid);
                                entities.SaveChanges();
                            }

                            //}

                        }
                        //Update ProcessOrdjobDet Table
                        foreach (var itemPD1 in Eobjdet)
                        {
                            //if (item.itemid == itemPD.ItemId && item.colorid == itemPD.ColorId && item.sizeid == itemPD.SizeId && item.ProcessOrdDetid == itemPD.ProcessOrdDetid)
                            //{
                            var Pg2 = entities.Proc_Apparel_ProCancelOrderJobDetInOutUpdate(itemPD1.ProcessOrdJobDetid, itemPD1.ProcessOrdDetid, itemPD1.ItemId, itemPD1.ColorId, itemPD1.SizeId, itemPD1.InOrOut, itemPD1.Cancel_Qty);
                            entities.SaveChanges();

                            //}

                        }
                    }

                    entities.SaveChanges();



                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessCancel-AddDetData");
                }
            }
            return reserved;
        }


        public bool DeleteDetCancelData(Process_Cancel_mas Dobj, List<Process_Cancel_det> Ditm, List<Process_Cancel_jobdet> Dobjdet, List<ProcessCancel> Dcanobj, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int ProcDetid = 0;
            int detid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    if (Ditm != null && Ditm.Count > 0)
                    {
                        foreach (var item in Ditm)
                        {
                            //if (item.Canceled_qty > 0)
                            //{

                                var Pg6 = entities.Proc_Apparel_ProCancelOrderDetInOutDelete(item.ProcessOrdDetid, Dobj.Process_Cancel_masid, item.itemid, item.colorid, item.sizeid, item.InorOut, item.Canceled_qty);
                                entities.SaveChanges();

                           // }
                        }
                        entities.SaveChanges();
                        //Update ProdPrgDet Table
                        foreach (var itemPD in Dobjdet)
                        {
                            //if (item.itemid == itemPD.ItemId && item.colorid == itemPD.ColorId && item.sizeid == itemPD.SizeId && item.ProcessOrdDetid == itemPD.ProcessOrdDetid)
                            //{
                            if (itemPD.InOrOut == "O")
                            {
                                var Pg1 = entities.Proc_Apparel_ProcessCancelProdPrgOutDelete(Dobj.process_Cancel_no, itemPD.InOrOut, itemPD.Job_Ord_No, Dobj.Process_Cancel_masid, itemPD.ItemId, itemPD.ColorId, itemPD.PlannedSizeid);
                                entities.SaveChanges();
                            }
                            if (itemPD.InOrOut == "I")
                            {
                                var Pg1 = entities.Proc_Apparel_ProcessCancelProdPrgInDelete(Dobj.process_Cancel_no, itemPD.InOrOut, itemPD.Job_Ord_No, Dobj.Process_Cancel_masid, itemPD.ItemId, itemPD.ColorId, itemPD.PlannedSizeid);
                                entities.SaveChanges();
                            }

                            //}

                        }
                        //Update ProcessOrdjobDet Table
                        foreach (var itemPD1 in Dobjdet)
                        {
                            //if (item.itemid == itemPD.ItemId && item.colorid == itemPD.ColorId && item.sizeid == itemPD.SizeId && item.ProcessOrdDetid == itemPD.ProcessOrdDetid)
                            //{
                            var Pg2 = entities.Proc_Apparel_ProCancelOrderJobDetInOutDelete(itemPD1.ProcessOrdJobDetid, itemPD1.ProcessOrdDetid, Dobj.Process_Cancel_masid, itemPD1.ItemId, itemPD1.ColorId, itemPD1.SizeId, itemPD1.InOrOut, itemPD1.Cancel_Qty);
                            entities.SaveChanges();

                            //}

                        }
                    }
                    entities.SaveChanges();

                    //Delete the process cancel det and process cancel jobet

                    var d = entities.Process_Cancel_det.Where(c => c.Process_Cancel_Masid == Dobj.Process_Cancel_masid);

                    foreach (var dbSet in d)
                    {
                        ProcDetid = dbSet.Process_Cancel_Detid;
                        var CDet1 = entities.Process_Cancel_jobdet.Where(u => u.Process_Cancel_Detid == ProcDetid);

                        foreach (var w in CDet1)
                        {
                            entities.Process_Cancel_jobdet.Remove(w);
                        }
                    }


                    var CDet = entities.Process_Cancel_det.Where(u => u.Process_Cancel_Masid == Dobj.Process_Cancel_masid);

                    foreach (var v in CDet)
                    {
                        entities.Process_Cancel_det.Remove(v);
                    }

                    entities.SaveChanges();


                    var MDet = entities.Process_Cancel_mas.Where(u => u.Process_Cancel_masid == Dobj.Process_Cancel_masid);

                    foreach (var M in MDet)
                    {
                        entities.Process_Cancel_mas.Remove(M);
                    }

                    entities.SaveChanges();
                    //
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessCancel-AddDetData");
                }
            }
            return reserved;
        }
    }
}
