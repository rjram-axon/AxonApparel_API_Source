using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ProcessInvoiceRepository : IProcessInvoiceRepository
    {
        ProcessEntities entities = new ProcessEntities();
        PurchaseEntities Purentities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<ProcessOrdMas> GetDataPrnRepDetails(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            IQueryable<ProcessOrdMas> query = (from cd in entities.Proc_Apparel_GetProcessInvAddPRNDropDetails(companyid == null ? 0 : companyid, companyunitid == null ? 0 : companyunitid, processorid == null ? 0 : processorid, processid == null ? 0 : processid, processordid == null ? 0 : processordid, ProcRecId == null ? 0 : ProcRecId, OrderType, ProcessorType, FDate == null ? "" : FDate.ToString(), DDate == null ? "" : DDate.ToString())
                                               select new ProcessOrdMas
                                           {
                                               ProcRecNo = cd.proc_recpt_no,
                                               ProcRecId = (int)cd.Proc_Recpt_Masid,
                                               ProcDcNo = cd.Recpt_Ref_no,

                                           }).AsQueryable();
            return query;
        }


        public IQueryable<ProcessOrdMas> GetDataProcessOrdNoRepDetails(int? companyid, int? companyunitid, int? processid, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            IQueryable<ProcessOrdMas> query = (from cd in entities.Proc_Apparel_GetProcessInvAddProOrdDropDetails(companyid == null ? 0 : companyid, companyunitid == null ? 0 : companyunitid, processid == null ? 0 : processid, OrderType, ProcessorType, FDate == null ? "" : FDate.ToString(), DDate == null ? "" : DDate.ToString())
                                               select new ProcessOrdMas
                                               {
                                                   processorder = cd.processorder,
                                                   processordid = (int)cd.processordid,

                                               }).AsQueryable();
            return query;
        }


        public IQueryable<ProcessOrdMas> GetDataProcessIssNoRepDetails(int? companyid, int? companyunitid, int? processid, int? ProcessOrdId, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            IQueryable<ProcessOrdMas> query = (from cd in entities.Proc_Apparel_GetProcessInvAddProdIssNoDropDetails(companyid == null ? 0 : companyid, companyunitid == null ? 0 : companyunitid, processid == null ? 0 : processid, ProcessOrdId == null ? 0 : ProcessOrdId, OrderType, ProcessorType, FDate == null ? "" : FDate.ToString(), DDate == null ? "" : DDate.ToString())
                                               select new ProcessOrdMas
                                               {
                                                   ProcIssId = (int)cd.ProcessIssueId,
                                                   ProIssNo = cd.ProcessIssueNo,

                                               }).AsQueryable();
            return query;
        }


        public IList<ProcessOrdMas> GetRepPrnAddLoad(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo, string Dcno, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            var query = (from YD in entities.Proc_Apparel_GetProcessInvAddGridDetails(companyid == null ? 0 : companyid, companyunitid == null ? 0 : companyunitid, processorid == null ? 0 : processorid, processid == null ? 0 : processid, processordid == null ? 0 : processordid, ProcRecId == null ? 0 : ProcRecId, OrderType, ProcessorType, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(Dcno) ? "" : Dcno, FDate == null ? "" : FDate.ToString(), DDate == null ? "" : DDate.ToString())
                         select new ProcessOrdMas
                         {
                             ProcDcNo = YD.DcNo,
                             ProcRecNo = YD.GRN,
                             ProcDcDate = (DateTime)YD.DcDate,
                             ProcRecId = (int)YD.Proc_Recpt_masid,
                             ProcGrnDate = (DateTime)YD.GRNDate,
                             process = YD.process,
                             processid = (int)YD.Processid,
                             processordid = (int)YD.Processorid,
                             CheckType = "N",
                         }).AsQueryable();

            return query.ToList();
        }



        public IList<ProInvDc> GetRepInvPrnItemLoad(string PMasId, int? CompId, int? SuppId, int? ProcessId, int? unitid, string PType, string Otype)
        {
            var query = (from ID in entities.Proc_Apparel_GetProcessInvEntryPrnDetails(PMasId, CompId, SuppId, ProcessId, unitid, PType, Otype)
                         select new ProInvDc
                         {
                             proc_recpt_masid = ID.proc_recpt_masid,
                             DcNo = ID.DcNo,
                             DCDate = (DateTime)ID.DcDate,
                             PrnNo = ID.proc_recpt_no,
                             Process_Inv_DcId = 0,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProInvDet> GetRepInvProItemLoad(string PMasId, int? CompId, int? SuppId, int? ProcessId, int? unitid, string PType, string Otype)
        {
            var query = (from ID in entities.Proc_Apparel_GetProcessInvEntryItemDetails(PMasId, CompId, SuppId, ProcessId, unitid, PType, Otype)
                         select new ProInvDet
                         {
                             Process_Invid = 0,
                             Process_InvDetid = 0,
                             Proc_Recpt_Detid = (int)ID.RecptDetid,
                             Proc_Recpt_Masid = (int)ID.Proc_Recpt_Masid,
                             Item = ID.Item,
                             ItemId = (int)ID.Itemid,
                             Color = ID.Color,
                             ColorId = (int)ID.Colorid,
                             Size = ID.Size,
                             SizeId = (int)ID.Sizeid,
                             Uom = ID.Uom,
                             UomId = 0,
                             GrnQty = ID.RecdQty,
                             SecQty = ID.Sec_Qty,
                             GrnRate = ID.rate,
                             DebtQty = ID.DebitQty,
                             AcptQty = ID.AcptQty,
                             BalQty = ID.RecdQty - ID.Invoice_Qty,
                             Rate = 0,
                             Invoice_Qty = 0,
                             Amount = 0,
                             Proc_recpt_no = ID.proc_recpt_no,
                             OrdQty = (decimal)ID.PJOrdQty,
                             ValidateProcessQty = Convert.ToString(ID.IsValidateProcessOrdQty),
                             AppRate = ID.AppRate
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProInvJobDet> GetRepInvProOrderLoad(string PMasId, string Otype)
        {
            var query = (from ID in entities.Proc_Apparel_GetProcessInvPrnOrderDetails(PMasId, Otype)
                         select new ProInvJobDet
                         {
                             Process_Inv_JobDetID = 0,
                             Process_InvDetid = 0,
                             Process_InvId = 0,
                             OrderNo = ID.OrderNo,
                             RefNo = ID.RefNo,
                             Style = ID.Style,
                             Job_Ord_No = ID.Job_Ord_No,
                             RecQty = (decimal)ID.Received_Qty,
                             RecRate = (decimal)ID.Rec_Rate,
                             InvoiceQty = 0,
                             OSNo = (int)ID.SNo,
                             Process_recpt_DetId = ID.PRoc_Recpt_Detid,
                             Process_recpt_JobDetId = ID.Proc_Recpt_JobDetid,
                             OrdQty = (decimal)ID.OrderQty,
                             ValidateProcessQty = Convert.ToString(ID.IsValidateProcessOrdQty),
                         }).AsQueryable();

            return query.ToList();
        }


        public bool AddDetData(Process_Inv_Mas objPInvEntry, List<Process_Inv_Dc> objPDC, List<Process_Inv_Det> objPDet, List<Process_Inv_RateDiff> objPRate, List<Process_Inv_JobDet> objPODet, List<Process_Inv_AddLess> objPADD)
        {
            int ProInvMasId = 0;
            int ProInvDcId = 0;
            int ProInvDetId = 0;
            int grndetid = 0;
            bool reserved = false;


            string Mode = "A";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    entities.Process_Inv_Mas.Add(objPInvEntry);
                    entities.SaveChanges();
                    ProInvMasId = objPInvEntry.Process_Invid;

                    foreach (var GI in objPDC)
                    {
                        GI.Process_invid = ProInvMasId;
                        entities.Process_Inv_Dc.Add(GI);
                        entities.SaveChanges();
                        ProInvDcId = GI.Process_Inv_DcId;

                        foreach (var IM in objPDet)
                        {

                            if (IM.Invoice_Qty > 0 && GI.proc_recpt_masid == IM.Proc_Recpt_masid)
                            {
                                IM.Process_Invid = ProInvMasId;
                                grndetid = (int)IM.Proc_Recpt_Detid;
                                entities.Process_Inv_Det.Add(IM);
                                entities.SaveChanges();
                                ProInvDetId = IM.Process_InvDetid;

                                //Update the prndet 
                                var Pg1 = entities.Proc_Apparel_GetProInvPrnDetUpdate(IM.Proc_Recpt_Detid, IM.Invoice_Qty);
                                entities.SaveChanges();

                                foreach (var IO in objPODet)
                                {
                                    if (IO.InvoiceQty > 0 && IO.Process_Recpt_Detid == IM.Proc_Recpt_Detid)
                                    {
                                        IO.Process_InvDetid = ProInvDetId;
                                        IO.Process_Invid = ProInvMasId;
                                        entities.Process_Inv_JobDet.Add(IO);
                                        entities.SaveChanges();

                                        var Pg5 = entities.Proc_Apparel_GetProInvPrnJobDetUpdate(IO.Process_Recpt_JobDetId, IO.InvoiceQty);
                                        entities.SaveChanges();
                                    }

                                }

                                foreach (var IR in objPRate)
                                {
                                    if (IR.Proc_Recpt_detid == IM.Proc_Recpt_Detid)
                                    {
                                        IR.Process_Invid = ProInvMasId;
                                        entities.Process_Inv_RateDiff.Add(IR);
                                        entities.SaveChanges();
                                    }

                                }


                            }

                        }
                    }



                    foreach (var Pay in objPADD)
                    {
                        Pay.Process_Invid = ProInvMasId;
                        entities.Process_Inv_AddLess.Add(Pay);
                    }
                    entities.SaveChanges();


                    int Pg = entities.Proc_PostProcessInvoiceActuals(objPInvEntry.Entry_No, "N");
                    entities.SaveChanges();

                    int mrp = entities.Proc_Apparel_UpdateProcessInvIPOPmarkuprate(objPInvEntry.Process_Invid);
                    entities.SaveChanges();


                    int PgI = entities.UpdateProcessInvRateItemstock(objPInvEntry.Entry_No, Mode);
                    entities.SaveChanges();

                    int proinvtemp = entities.Proc_Apparel_StoreTempProcessInv();
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessInvoice-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProInvMas> GetDataPrnRepDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProInvMas> query = (from cd in entities.Proc_Apparel_GetProcessInvMainDropPrn(OType, companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new ProInvMas
                                           {
                                               PrnMasId = (int)cd.ProcRecptMasid,
                                               PrnNo = cd.PrnNo,

                                           }).AsQueryable();
            return query;
        }


        public IQueryable<ProInvMas> GetDataUnitRepDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProInvMas> query = (from cd in entities.Proc_Apparel_GetProcessInvMainDropUnit(OType, companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new ProInvMas
                                           {
                                               UnitId = (int)cd.CompUnitId,
                                               Unit = cd.companyunit,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<ProInvMas> GetDataProcessRepDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProInvMas> query = (from cd in entities.Proc_Apparel_GetProcessInvMainDropProcess(OType, companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new ProInvMas
                                           {
                                               ProcessId = (int)cd.processid,
                                               Process = cd.Process,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<ProInvMas> GetDataOrderRefRepDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProInvMas> query = (from cd in entities.Proc_Apparel_GetProcessInvMainDropOrdRef(OType, companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new ProInvMas
                                           {
                                               OrderNo = cd.OrdNo,
                                               RefNo = cd.RefNo,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<ProInvMas> GetDataProcessorRepDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProInvMas> query = (from cd in entities.Proc_Apparel_GetProcessInvMainDropProcessor(OType, companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new ProInvMas
                                           {
                                               SupplierId = (int)cd.processorid,
                                               Supplier = cd.Processor,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<ProInvMas> GetDataEntryNoRepDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProInvMas> query = (from cd in entities.Proc_Apparel_GetProcessInvMainDropEntryNo(OType, companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new ProInvMas
                                           {
                                               Process_Invid = (int)cd.processinvid,
                                               Entry_No = cd.entryno,

                                           }).AsQueryable();
            return query;
        }


        public IQueryable<ProInvMas> GetDataProMainRepDetails(string OrderType, int? CompanyId, string FromDate, string ToDate, int? ProcessId, int? UnitId, int? SupplierId, int? PrnMasId, int? Process_Invid, string OrdNo, string RefNo, string MultiFlag)
        {
            IQueryable<ProInvMas> query = (from cd1 in entities.Proc_Apparel_GetProcessInvMainGridDetailsNew(OrderType, CompanyId == null ? 0 : CompanyId, UnitId == null ? 0 : UnitId, ProcessId == null ? 0 : ProcessId, SupplierId == null ? 0 : SupplierId, PrnMasId == null ? 0 : PrnMasId, Process_Invid == null ? 0 : Process_Invid, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), MultiFlag)
                                           select new ProInvMas
                                           {

                                               Process_Invid = cd1.processinvid,
                                               Inv_No = cd1.InvNo,
                                               Entry_No = cd1.entryno,
                                               Supplier = cd1.Processor,
                                               OrderType = cd1.ordertype,
                                               Process = cd1.process,
                                               Entry_Date = (DateTime)cd1.entry_date,
                                               Unit = cd1.Unit,
                                               SubBillNo = cd1.SubBillNo,
                                               Inv_Amount=cd1.Inv_Amount

                                           }).AsQueryable();
            return query;
        }


        public IQueryable<ProInvMas> GetDataRepEditProInvDetails(int Id)
        {
            IQueryable<ProInvMas> query = (from a in entities.Proc_Apparel_GetProcessInvEditDetails(Id)
                                           select new ProInvMas
                                           {
                                               CompanyId = a.companyid,
                                               Company = a.company,
                                               Process_Invid = a.Process_Invid,
                                               ProcessId = (int)a.processid,
                                               Entry_Date = (DateTime)a.Entry_Date,
                                               Entry_No = a.Entry_No,
                                               Inv_Date = (DateTime)a.Inv_Date,
                                               SupplierId = (int)a.SupplierId,
                                               Supplier = a.processor,
                                               Inv_No = a.Inv_No,
                                               OrderType = a.OrderType,
                                               Process = a.process,
                                               Remarks = a.Remarks,
                                               Unit = a.CompUnit,
                                               UnitId = a.UnitId,
                                               InternalOrExternal = a.InternalOrExternal,
                                               Passed = a.passed
                                           }).AsQueryable();

            return query;
        }


        public IList<ProInvDc> GetRepEditInvPrnItemLoad(int? InvId, int? CompId, int? SuppId)
        {
            var query = (from ID in entities.Proc_Apparel_GetProcessInvEntryPrnEditDetails(InvId)
                         select new ProInvDc
                         {
                             proc_recpt_masid = ID.proc_recpt_masid,
                             DcNo = (ID.Recpt_Ref_no == null ? "" : ID.Recpt_Ref_no),
                             DCDate = (DateTime)ID.Recpt_Ref_date,
                             PrnNo = ID.proc_recpt_no,
                             Process_Inv_DcId = ID.Process_Inv_DcId,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProInvDet> GetRepProInvEditItemLoad(int? InvId, int? PrnMasId, int? CompId, int? SuppId)
        {
            string Otype = "W";

            var query = (from ID in entities.Proc_Apparel_GetProcessInvProItemEditDetails(InvId, Otype)
                         select new ProInvDet
                         {
                             Process_Invid = (int)ID.Process_Invid,
                             Process_InvDetid = (int)ID.Process_InvDetid,
                             Proc_Recpt_Detid = (int)ID.RecptDetid,
                             Proc_Recpt_Masid = (int)ID.proc_recpt_masid,
                             Item = ID.Item,
                             ItemId = (int)ID.Itemid,
                             Color = ID.Color,
                             ColorId = (int)ID.Colorid,
                             Size = ID.Size,
                             SizeId = (int)ID.Sizeid,
                             Uom = ID.Uom,
                             UomId = 0,
                             GrnQty = ID.RecdQty,
                             SecQty = ID.Sec_Qty,
                             GrnRate = (decimal)ID.rate,
                             DebtQty = ID.DebitQty,
                             AcptQty = ID.AcptQty,
                             Rate = (decimal)ID.InvRate,
                             BalQty = ID.RecdQty,
                             Invoice_Qty = (decimal)ID.InvoicedQTy,
                             Amount = (decimal)ID.InvoicedQTy * (decimal)ID.InvRate,
                             OrdQty = (decimal)ID.PJOQty + (decimal)ID.InvoicedQTy,
                             ValidateProcessQty = Convert.ToString(ID.IsValidateProcessOrdQty),
                             AppRate = ID.AppRate,
                             Proc_recpt_no = ID.proc_recpt_no
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<ProInvJobDet> GetRepProInvEditOrdLoad(int? InvId, int? CompId, int? SuppId, int? grndetid)
        {

            string Otype = "W";

            var query = (from ID in entities.Proc_Apparel_GetProcessInvPrnOrderEditDetails(InvId, Otype)
                         select new ProInvJobDet
                         {
                             Process_Inv_JobDetID = (int)ID.Process_Inv_JobDetID,
                             Process_InvDetid = (int)ID.Process_InvDetid,
                             Process_InvId = (int)ID.process_invid,
                             OrderNo = ID.OrderNo,
                             RefNo = ID.RefNo,
                             Style = ID.Style,
                             Job_Ord_No = ID.Job_ord_No,
                             RecQty = (decimal)ID.Received_Qty,
                             RecRate = (decimal)ID.Rec_Rate,
                             InvoiceQty = (decimal)ID.invoiceQty,
                             OSNo = (int)ID.SNo,
                             Process_recpt_DetId = (int)ID.Proc_Recpt_Detid,
                             Process_recpt_JobDetId = ID.Proc_Recpt_JobDetid,
                             OrdQty = (decimal)ID.OrderQty + (decimal)ID.invoiceQty,
                             ValidateProcessQty = Convert.ToString(ID.IsValidateProcessOrdQty),

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<ProInvAddLess> GetRepInvEditAddLessLoad(int? InvId)
        {
            var query = (from IO in entities.Proc_Apparel_GetProcessInvEditAddlessDetails(InvId)
                         select new ProInvAddLess
                         {
                             pro_invid = (int)IO.Process_Invid,
                             Pro_Inv_AddlessId = (int)IO.Process_Inv_AddLessid,
                             addless_id = (int)IO.AddLessid,
                             Addless = IO.AddLess,
                             aorl = IO.Type,
                             percentage = (decimal)IO.Percentage,
                             amount = (decimal)IO.Amount,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProInvRateDiff> GetRepInvEditRateDiffLoad(int? InvId)
        {
            var query = (from IO in entities.Proc_Apparel_GetProcessInvEditRateDiffDetails(InvId)
                         select new ProInvRateDiff
                         {
                             Proc_Recpt_Detid = (int)IO.Proc_Recpt_Detid,
                             Proc_Recpt_Masid = (int)IO.Proc_Recpt_Masid,
                             Item = IO.item,
                             Color = IO.color,
                             Size = IO.size,
                             Rate = (decimal)IO.IRate,
                             Invoice_Qty = (decimal)IO.Invoice_Qty,
                             RateAmntDif = (decimal)IO.RateAmntDif,
                             QtyDiff = (decimal)IO.QtyDiff,
                             QtyAmntDif = (decimal)IO.QtyDiffAmt,
                             Grnno = IO.proc_recpt_no,
                             BalQty = (decimal)IO.Received_qty - (decimal)IO.Invoice_Qty,
                             Date = "",
                             IsChecked = IO.@checked,

                         }).AsQueryable();

            return query.ToList();
        }

        public bool UpdateDetData(Process_Inv_Mas objEPInvEntry, List<Process_Inv_Dc> objPrE, List<Process_Inv_Det> objIE, List<Process_Inv_RateDiff> objIERate, List<Process_Inv_JobDet> objOE, List<Process_Inv_AddLess> objAE)
        {
            int ProInvMasId = 0;
            int ProInvDcId = 0;
            int ProInvDetId = 0;
            int grndetid = 0;
            int Cgrndetid = 0;
            bool reserved = false;


            string Mode = "A";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    //Edit


                    foreach (var IO in objOE)
                    {

                        if (IO.InvoiceQty > 0)
                        {

                            var Pg1 = entities.Proc_Apparel_GetProInvPrnEditJobDetUpdate(IO.Process_Recpt_JobDetId, IO.Process_InvDetid);
                            entities.SaveChanges();

                        }

                    }

                    foreach (var IM in objIE)
                    {

                        if (IM.Invoice_Qty > 0)
                        {

                            var Pg1 = entities.Proc_Apparel_GetProInvPrnEditDetUpdate(IM.Proc_Recpt_Detid, IM.Process_InvDetid);
                            entities.SaveChanges();

                        }

                    }

                    int PgD = entities.UpdateProcessInvRateItemstock(objEPInvEntry.Entry_No, "D");
                    entities.SaveChanges();


                    int PgD1 = entities.Proc_PostProcessInvoiceActuals(objEPInvEntry.Entry_No, "N");
                    entities.SaveChanges();

                    var PgD2 = entities.Proc_Apparel_GetProcInvDeleAllEdit(objEPInvEntry.Process_Invid);
                    entities.SaveChanges();


                    //


                    //Add
                    entities.Process_Inv_Mas.Add(objEPInvEntry);
                    entities.SaveChanges();
                    ProInvMasId = objEPInvEntry.Process_Invid;

                    foreach (var GI in objPrE)
                    {
                        GI.Process_invid = ProInvMasId;
                        entities.Process_Inv_Dc.Add(GI);
                        entities.SaveChanges();
                        ProInvDcId = GI.Process_Inv_DcId;

                        foreach (var IM in objIE)
                        {

                            if (IM.Invoice_Qty > 0 && GI.proc_recpt_masid == IM.Proc_Recpt_masid)
                            {
                                IM.Process_Invid = ProInvMasId;
                                grndetid = (int)IM.Proc_Recpt_Detid;
                                entities.Process_Inv_Det.Add(IM);
                                entities.SaveChanges();
                                ProInvDetId = IM.Process_InvDetid;

                                //Update the prndet 
                                var Pg1 = entities.Proc_Apparel_GetProInvPrnDetUpdate(IM.Proc_Recpt_Detid, IM.Invoice_Qty);
                                entities.SaveChanges();

                                foreach (var IO in objOE)
                                {
                                    if (IO.InvoiceQty > 0 && IO.Process_Recpt_Detid == IM.Proc_Recpt_Detid)
                                    {
                                        IO.Process_InvDetid = ProInvDetId;
                                        IO.Process_Invid = ProInvMasId;
                                        entities.Process_Inv_JobDet.Add(IO);
                                        entities.SaveChanges();

                                        //Update the prndet 
                                        var Pg5 = entities.Proc_Apparel_GetProInvPrnJobDetUpdate(IO.Process_Recpt_JobDetId, IO.InvoiceQty);
                                        entities.SaveChanges();
                                    }

                                }

                                foreach (var IR in objIERate)
                                {
                                    if (IR.Proc_Recpt_detid == IM.Proc_Recpt_Detid)
                                    {
                                        IR.Process_Invid = ProInvMasId;
                                        entities.Process_Inv_RateDiff.Add(IR);
                                        entities.SaveChanges();
                                    }

                                }


                            }

                        }
                    }




                    foreach (var Pay in objAE)
                    {
                        Pay.Process_Invid = ProInvMasId;
                        entities.Process_Inv_AddLess.Add(Pay);
                    }
                    entities.SaveChanges();


                    int Pg = entities.Proc_PostProcessInvoiceActuals(objEPInvEntry.Entry_No, "N");
                    entities.SaveChanges();

                    int mrp = entities.Proc_Apparel_UpdateProcessInvIPOPmarkuprate(ProInvMasId);
                    entities.SaveChanges();

                    int PgI = entities.UpdateProcessInvRateItemstock(objEPInvEntry.Entry_No, Mode);
                    entities.SaveChanges();

                    int proinvtemp = entities.Proc_Apparel_StoreTempProcessInv();
                    entities.SaveChanges();

                    //Add


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessInvoice-UpdateDetData");
                }
            }
            return reserved;
        }


        public bool DeleteDetData(Process_Inv_Mas objDInvEntry, List<Process_Inv_Dc> objPrD, List<Process_Inv_Det> objID, List<Process_Inv_JobDet> objOD, List<Process_Inv_AddLess> objAD)
        {
            int ProInvMasId = 0;
            int ProInvDcId = 0;
            int ProInvDetId = 0;
            int grndetid = 0;
            int Cgrndetid = 0;
            bool reserved = false;



            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    //Delete


                    foreach (var IO in objOD)
                    {

                        if (IO.InvoiceQty > 0)
                        {

                            var Pg1 = entities.Proc_Apparel_GetProInvPrnEditJobDetUpdate(IO.Process_Recpt_JobDetId, IO.Process_InvDetid);
                            entities.SaveChanges();

                        }

                    }

                    int PgD1 = entities.Proc_PostProcessInvoiceActuals(objDInvEntry.Entry_No, "N");
                    entities.SaveChanges();

                    foreach (var IM in objID)
                    {

                        if (IM.Invoice_Qty > 0)
                        {

                            var Pg1 = entities.Proc_Apparel_GetProInvPrnEditDetUpdate(IM.Proc_Recpt_Detid, IM.Process_InvDetid);
                            entities.SaveChanges();

                        }

                    }

                    int PgD = entities.UpdateProcessInvRateItemstock(objDInvEntry.Entry_No, "D");
                    entities.SaveChanges();




                    var PgD2 = entities.Proc_Apparel_GetProcInvDeleAllEdit(objDInvEntry.Process_Invid);
                    entities.SaveChanges();

                    int proinvtemp = entities.Proc_Apparel_StoreTempProcessInv();
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessInvoice-DeleteDetData");
                }
            }
            return reserved;
        }

        public IList<ProInvDc> MultiGetRepInvPrnItemLoad(string PMasId, int? CompId, int? SuppId, string ProcessId, int? unitid, string PType, string Otype)
        {
            var query = (from ID in entities.Proc_Apparel_GetMultiProcessInvEntryPrnDetails(PMasId, CompId, SuppId, ProcessId, unitid, PType, Otype)
                         select new ProInvDc
                         {
                             proc_recpt_masid = ID.proc_recpt_masid,
                             DcNo = ID.DcNo,
                             DCDate = (DateTime)ID.DcDate,
                             PrnNo = ID.proc_recpt_no,
                             Process_Inv_DcId = 0,
                             Process = ID.Process,
                             ProcessId = (int)ID.Processid,

                         }).AsQueryable();

            return query.ToList();
        }
        public IList<ProInvDet> MultiGetRepInvProItemLoad(string PMasId, int? CompId, int? SuppId, string ProcessId, int? unitid, string PType, string Otype)
        {
            var query = (from ID in entities.Proc_Apparel_MultiGetProcessInvEntryItemDetails(PMasId, CompId, SuppId, ProcessId, unitid, PType, Otype)
                         select new ProInvDet
                         {
                             Process_Invid = 0,
                             Process_InvDetid = 0,
                             Proc_Recpt_Detid = (int)ID.RecptDetid,
                             Proc_Recpt_Masid = (int)ID.Proc_Recpt_Masid,
                             Item = ID.Item,
                             ItemId = (int)ID.Itemid,
                             Color = ID.Color,
                             ColorId = (int)ID.Colorid,
                             Size = ID.Size,
                             SizeId = (int)ID.Sizeid,
                             Uom = ID.Uom,
                             UomId = 0,
                             GrnQty = ID.RecdQty,
                             SecQty = ID.Sec_Qty,
                             GrnRate = ID.rate,
                             DebtQty = ID.DebitQty,
                             AcptQty = ID.AcptQty,
                             BalQty = ID.RecdQty - ID.Invoice_Qty,
                             Rate = 0,
                             Invoice_Qty = 0,
                             Amount = 0,
                             Proc_recpt_no = ID.proc_recpt_no,
                             OrdQty = (decimal)ID.PJOrdQty,
                             ValidateProcessQty = Convert.ToString(ID.IsValidateProcessOrdQty),
                             AppRate=ID.AppRate

                         }).AsQueryable();

            return query.ToList();
        }
        public IList<ProInvDc> MultiGetRepEditInvPrnItemLoad(int? InvId, int? CompId, int? SuppId)
        {
            var query = (from ID in entities.Proc_Apparel_MultiGetProcessInvEntryPrnEditDetails(InvId)
                         select new ProInvDc
                         {
                             proc_recpt_masid = ID.proc_recpt_masid,
                             DcNo = (ID.Recpt_Ref_no == null ? "" : ID.Recpt_Ref_no),
                             DCDate = (DateTime)ID.Recpt_Ref_date,
                             PrnNo = ID.proc_recpt_no,
                             Process_Inv_DcId = ID.Process_Inv_DcId,
                             Process = ID.Process,
                             ProcessId = ID.ProcessId,

                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<ProInvMas> GetDataBillRepDetails(int? CompanyId, int? SupplierId, string Inv_Date, int? BillId, string BOrdType, string BPurType, string IorE)
        {
            IQueryable<ProInvMas> query = (from cd in entities.Proc_Apparel_GetProcessInvBillNoDropPrn(CompanyId == null ? 0 : CompanyId, SupplierId == null ? 0 : SupplierId, Inv_Date == null ? "" : Inv_Date.ToString(), BillId, BOrdType, BPurType, IorE)
                                           select new ProInvMas
                                           {
                                               Inv_No = cd.supbillno,
                                               Inv_Amount = cd.amount,
                                               Inv_Date = Convert.ToDateTime(cd.billdate),
                                               BillId = cd.billid,
                                           }).AsQueryable();
            return query;
        }


        public bool AddBillDetData(int billId, string EntryNo, string MType)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    //update

                    var Plan1 = Purentities.BillEntry.Where(b => b.InvoiceNo == EntryNo).FirstOrDefault();
                    if (Plan1 != null)
                    {

                        Plan1.InvoiceNo = "";
                        Plan1.IsInvoiced = "N";
                        Purentities.SaveChanges();
                        
                    }

                    Purentities.SaveChanges();

                    //Add


                   

                    var Plan = Purentities.BillEntry.Where(b => b.BillID == billId).FirstOrDefault();
                    if (Plan != null)
                    {

                        if (MType == "Y")
                        {
                            Plan.InvoiceNo = EntryNo;
                            Plan.IsInvoiced = "Y";
                            Purentities.SaveChanges();
                        }
                        else
                        {
                            Plan.InvoiceNo = "";
                            Plan.IsInvoiced = "N";
                            Purentities.SaveChanges();
                        }
                    }

                    Purentities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessInvoice-DeleteDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProInvMas> GetDataEditBillRepDetails(int? CompanyId, int? SupplierId, string Inv_Date, string Entry_No, string BOrdType, string BPurType)
        {

            //string BPurType="";
            //string BOrdType="";

            IQueryable<ProInvMas> query = (from cd in entities.Proc_Apparel_GetProcessInvEditBillNoDropPrn(CompanyId == null ? 0 : CompanyId, SupplierId == null ? 0 : SupplierId, Inv_Date == null ? "" : Inv_Date.ToString(), Entry_No, BOrdType, BPurType)
                                               select new ProInvMas
                                               {
                                                   Inv_No = cd.supbillno,
                                                   Inv_Amount = cd.amount,
                                                   Inv_Date = Convert.ToDateTime(cd.billdate),
                                                   BillId = cd.billid,
                                               }).AsQueryable();
                return query;
            
           
        }
    }
}
