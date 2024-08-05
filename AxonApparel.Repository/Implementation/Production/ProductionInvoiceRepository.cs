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
    public class ProductionInvoiceRepository : IProductionInvoiceRepository
    {
        ProductionEntities entities = new ProductionEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IList<ProdInvMas> GetRepPrdAddLoad(int? Companyid, int? CompanyUnitId, int? Processorid, string Processid, int? BuyerId, string OrdNo, string OrdRefNo, string OrderType, string InternalOrExternal)
        {
            var query = (from YD in entities.Proc_Apparel_GetProdInvAddGridDetails(Companyid == null ? 0 : Companyid, CompanyUnitId == null ? 0 : CompanyUnitId, Processorid == null ? 0 : Processorid, BuyerId == null ? 0 : BuyerId, OrderType, InternalOrExternal, Processid, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(OrdRefNo) ? "" : OrdRefNo)
                         select new ProdInvMas
                         {
                             GrnNo = YD.GrnNo,
                             GrnId = YD.GrnId,
                             GrnDate = (DateTime)YD.GrnDate,
                             DcDate = (DateTime)YD.GrnRefDate,
                             DcNo = YD.GrnRefNo,
                             Process = YD.Process,
                             Processid = YD.processid,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProdInvDc> GetRepInvPrdItemLoad(string PMasId, int? SuppId, int? ProcessId)
        {
            var query = (from ID in entities.Proc_Apparel_GetProdInvEntryPrdDetails(PMasId, SuppId, ProcessId)
                         select new ProdInvDc
                         {
                             prod_recpt_masid = ID.GrnId,
                             DcNo = ID.GrnRefNo,
                             DCDate = (DateTime)ID.GrnRefDate,
                             GrnNo = ID.GrnNo,
                             GrnDate = (DateTime)ID.GrnDate,
                             ProdInvDcId = 0,
                             process = ID.Process,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProdInvDet> GetRepInvPrdEntryItemLoad(string PMasId, int? SuppId, int? ProcessId)
        {
            var query = (from ID in entities.Proc_Apparel_GetProdInvEntryItemDetails(PMasId, SuppId, ProcessId)
                         select new ProdInvDet
                         {
                             ProdInvId = 0,
                             ProdInvDetid = 0,
                             Grndetid = (int)ID.GrnDetId,
                             GrnMasid = (int)ID.GrnId,
                             Item = ID.Item,
                             ItemId = (int)ID.ItemId,
                             Color = ID.Color,
                             ColorId = (int)ID.ColorId,
                             Size = ID.Size,
                             SizeId = (int)ID.SizeId,
                             Uom = ID.Uom,
                             UomId = 0,
                             GrnQty = ID.Qty,
                             GrnRate = (decimal)ID.GrnRate,
                             BalQty = (decimal)ID.BalQty,
                             InvoiceQty = 0,
                             InvoiceRate = 0,
                             Amount = 0,
                             LotNo = ID.LotNo,
                             BundleNo = ID.BundleNo,
                             RejectdQty = ID.RejectedQty,
                             RejectdRate = ID.RejectedRate,
                             Apprate = ID.AppRate,
                             Processid = (int)ID.ProcessId
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProdInvJobDet> GetRepInvPrdEntryOrderLoad(string PMasId, int? SuppId, int? ProcessId)
        {
            var query = (from ID in entities.Proc_Apparel_GetProdInvEntryOrderDetails(PMasId, SuppId, ProcessId)
                         select new ProdInvJobDet
                         {
                             Prood_Inv_JobDetID = 0,
                             Prod_InvDetid = 0,
                             Prod_InvId = 0,
                             OrderNo = ID.Order_No,
                             RefNo = ID.Ref_No,
                             Style = ID.Style,
                             Job_Ord_No = ID.JobNo,
                             RecQty = (decimal)ID.Qty,
                             RecRate = (decimal)ID.GrnRate,
                             InvoiceQty = 0,
                             OSNo = 0,//(int)ID.SNo,
                             Prod_recpt_DetId = ID.GrnDetId,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool AddDetData(ProductionInvoiceMas objPDInvEntry, List<ProductionInvoiceDc> objPDDC, List<ProductionInvoiceDet> objPDDet, List<ProductionInvoiceRateDiff> objPDRateDiff, List<ProductionInvoiceOrdDet> objPDODet, List<ProductionInvoiceAddless> objPDADD)
        {
            int ProdInvMasId = 0;
            int ProdInvDcId = 0;
            int ProdInvDetId = 0;
            int grndetid = 0;
            bool reserved = false;
    


            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    entities.ProductionInvoiceMas.Add(objPDInvEntry);
                    entities.SaveChanges();
                    ProdInvMasId = objPDInvEntry.ProdInvid;

                    foreach (var GI in objPDDC)
                    {
                        GI.Prodinvid = ProdInvMasId;
                        entities.ProductionInvoiceDc.Add(GI);
                        entities.SaveChanges();
                        ProdInvDcId = GI.ProdInvDcId;

                        foreach (var IM in objPDDet)
                        {

                            if (IM.InvoiceQty > 0 && GI.prod_recpt_masid == IM.Grnmasid)
                            {
                                IM.ProdInvId = ProdInvMasId;
                                grndetid = (int)IM.Grndetid;
                                entities.ProductionInvoiceDet.Add(IM);
                                entities.SaveChanges();
                                ProdInvDetId = IM.ProdInvDetid;

                                //Update the prndet 


                                var Invtype = entities.Proc_Apparel_GetProdProcessSetup(ProdInvMasId, IM.Grndetid, IM.Processid).FirstOrDefault();


                                if (Invtype == "C")
                                {
                                    var Pg1 = entities.Proc_Apparel_GetProdInvCutDetUpdate(IM.Grndetid, IM.InvoiceQty);
                                    entities.SaveChanges();
                                }
                                else if (Invtype == "B") {
                                    var Pg1 = entities.Proc_Apparel_GetProdInvCutDetUpdate(IM.Grndetid, IM.InvoiceQty);
                                    entities.SaveChanges();
                                }
                                else if (Invtype == "S")
                                {
                                    var Pg1 = entities.Proc_Apparel_GetProdInvSewDetUpdate(IM.Grndetid, IM.InvoiceQty);
                                    entities.SaveChanges();
                                }
                                else
                                {
                                    var Pg1 = entities.Proc_Apparel_GetProdInvCommDetUpdate(IM.Grndetid, IM.InvoiceQty);
                                    entities.SaveChanges();
                                }

                                foreach (var IO in objPDODet)
                                {
                                    if (IO.InvoiceQty > 0 && IO.Prod_Recpt_Detid == IM.Grndetid)
                                    {
                                        IO.ProdInvDetid = ProdInvDetId;
                                        IO.ProdInvid = ProdInvMasId;
                                        entities.ProductionInvoiceOrdDet.Add(IO);
                                        entities.SaveChanges();
                                    }

                                }

                                foreach (var IR in objPDRateDiff)
                                {
                                    if (IR.Grndetid == IM.Grndetid)
                                    {
                                        IR.ProdInvId = ProdInvMasId;
                                        entities.ProductionInvoiceRateDiff.Add(IR);
                                        entities.SaveChanges();
                                    }

                                }


                            }

                        }
                    }



                    foreach (var Pay in objPDADD)
                    {
                        Pay.ProdInvId = ProdInvMasId;
                        entities.ProductionInvoiceAddless.Add(Pay);
                    }
                    entities.SaveChanges();


                    var Prodinvdet = entities.ProductionInvoiceDet.Where(h => h.ProdInvId == ProdInvMasId).ToList();

                    foreach (var invdet in Prodinvdet)
                    {
                        var Invtype = entities.Proc_Apparel_GetProdProcessSetup(ProdInvMasId, invdet.Grndetid, invdet.Processid).FirstOrDefault();

                        if (Invtype == "C")
                        {
                            var Pg1 = entities.Proc_UpdateCuttingActuals(ProdInvMasId, "A", "N", invdet.Grndetid, invdet.Processid);
                            entities.SaveChanges();
                        }
                        else if (Invtype == "S")
                        {
                            var Pg1 = entities.Proc_UpdateSewingActuals(ProdInvMasId, "A", "N", invdet.Grndetid, invdet.Processid);
                            entities.SaveChanges();
                        }
                        else
                        {
                            var Pg1 = entities.Proc_UpdateGeneralActuals(ProdInvMasId, "A", "N", invdet.Grndetid, invdet.Processid);
                            entities.SaveChanges();
                        }
                    }

                    int prodinvtemp = entities.Proc_Apparel_StoreTempProdInv();
                    entities.SaveChanges();

                    int ipoprate = entities.Proc_Apparel_UpdateProdInvIPOPrate(ProdInvMasId);
                    entities.SaveChanges();
                    int mrprateitemstock = entities.UpdateProdInvRateItemstock(ProdInvMasId, "A");
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionInvoice-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProdInvMas> GetDataEntryRepDetails(int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProdInvMas> query = (from cd in entities.Proc_Apparel_GetProdInvMainDropEntryNo(companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                            select new ProdInvMas
                                           {
                                               ProdInvid = (int)cd.ProdInvMasid,
                                               InvNo = cd.EntryNo,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<ProdInvMas> GetDataUnitRepDetails(int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProdInvMas> query = (from cd in entities.Proc_Apparel_GetProdInvMainDropUnit(companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                            select new ProdInvMas
                                           {
                                               CompanyUnitId = (int)cd.CompanyUnitId,
                                               CompanyUnit = cd.CompanyUnit,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<ProdInvMas> GetDataOrderRefRepDetails(int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProdInvMas> query = (from cd in entities.Proc_Apparel_GetProdInvMainDropOrdeRef(companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                            select new ProdInvMas
                                           {
                                               BMasId = (int)cd.BMasId,
                                               OrdNo = cd.OrderNo,
                                               OrdRefNo = cd.RefNo,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<ProdInvMas> GetDataWkDivRepDetails(int? companyid, string PType, string FromDate, string ToDate)
        {
            IQueryable<ProdInvMas> query = (from cd in entities.Proc_Apparel_GetProdInvMainDropWokDiv(companyid == null ? 0 : companyid, PType, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new ProdInvMas
                                           {
                                               Processorid = (int)cd.ProcessorId,
                                               Processor = cd.Processor,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<ProdInvMas> GetDataWkOrderRepDetails(int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProdInvMas> query = (from cd in entities.Proc_Apparel_GetProdInvMainDropWokOrd(companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new ProdInvMas
                                           {
                                               JobId = (int)cd.JobId,
                                               WorkOrder = cd.JobNo,

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<ProdInvMas> GetDataProcessRepDetails(int? companyid, string FromDate, string ToDate)
        {
            IQueryable<ProdInvMas> query = (from cd in entities.Proc_Apparel_GetProdInvMainDropProcess(companyid == null ? 0 : companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new ProdInvMas
                                           {
                                               Processid = (int)cd.ProcessId,
                                               Process = cd.Process,

                                           }).AsQueryable();
            return query;
        }


        public IQueryable<ProdInvMas> GetDataProdMainRepDetails(string OrderType, string PType, int? CompanyId, string FromDate, string ToDate, int? ProcessId, int? UnitId, int? SupplierId, int? PrdMasId, string OrdNo, string RefNo, string JobNo)
        {
            IQueryable<ProdInvMas> query = (from cd1 in entities.Proc_Apparel_GetProdInvMainDetails(OrderType, PType, CompanyId == null ? 0 : CompanyId, UnitId == null ? 0 : UnitId, ProcessId == null ? 0 : ProcessId, SupplierId == null ? 0 : SupplierId, PrdMasId == null ? 0 : PrdMasId, string.IsNullOrEmpty(OrdNo) ? "" : OrdNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(JobNo) ? "" : JobNo, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                            select new ProdInvMas
                                           {

                                               ProdInvid = cd1.ProdInvId,
                                               InvNo = cd1.PEntryno,
                                               RefNo = cd1.InvNo,
                                               Processor = cd1.Supplier,
                                               OrderType = cd1.OrderType,
                                               Process = cd1.Process,
                                               InvDate = (DateTime)cd1.EntryDate,
                                               CompanyUnit = cd1.CompanyUnit,

                                           }).AsQueryable();
            return query;
        }


        public IQueryable<ProdInvMas> GetDataRepEditProdInvDetails(int Id)
        {
            IQueryable<ProdInvMas> query = (from a in entities.Proc_Apparel_GetProdInvEditDetails(Id)
                                            select new ProdInvMas
                                           {
                                               Companyid = a.CompanyId,
                                               Company = a.Company,
                                               CompanyUnit = a.CompanyUnit,
                                               CompanyUnitId = (int)a.CompanyUnitId,
                                               ProdInvid = a.ProdInvId,
                                               Processid = (int)a.ProcessId,
                                               Process = a.Process,
                                               InvDate = (DateTime)a.entryDate,
                                               InvNo = a.PEntryno,
                                               RefDate = (DateTime)a.invdate,                                            
                                               Processor = a.Supplier,
                                               RefNo = a.InvNo,
                                               OrderType = a.OrderType,                                             
                                               Remarks = a.remarks,                                       
                                               InternalOrExternal = a.InternalOrExternal,
                                               PaymentAmt=a.PaymentAmt,
                                               InvAmount=a.InvAmount,
                                               InvoiceType=a.InvoiceType,
                                               Processorid = (int)a.ProcessorId,
                                               Passed = a.passed
                                           }).AsQueryable();

            return query;
        }

        public IList<ProdInvDc> GetRepEditInvItemLoad(int? InvId, int? CompId, int? SuppId)
        {
            var query = (from ID in entities.Proc_Apparel_GetProdInvEntryPrnEditDetails(InvId)
                         select new ProdInvDc
                         {
                             prod_recpt_masid = ID.RecptId,
                             DcNo = ID.DcNumber,
                             DCDate = (DateTime)ID.Recpt_Ref_Date,
                             GrnNo = ID.RecptNo,
                             ProdInvDcId = ID.ProdInvDcId,
                             GrnDate = (DateTime)ID.RecptDate,
                             process = ID.Process,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProdInvDet> GetRepInvPrdEntryEditItemLoad(int InvId, int? GrnMasId, int? CompId, int? SuppId)
        {

            var query = (from ID in entities.Proc_Apparel_GetProdInvItemEditDetails(InvId)
                         select new ProdInvDet
                         {
                             ProdInvId = (int)ID.ProdInvid,
                             ProdInvDetid = (int)ID.ProdInvDetid,
                             Grndetid = (int)ID.CuttingRecptDetID,
                             GrnMasid = (int)ID.CuttingRecptId,
                             Item = ID.item,
                             ItemId = (int)ID.itemid,
                             Color = ID.color,
                             ColorId = (int)ID.ColorID,
                             Size = ID.size,
                             SizeId = (int)ID.Sizeid,
                             Uom = ID.uom,
                             UomId = 0,
                             GrnQty = ID.RecptQty,
                             GrnRate = (decimal)ID.Rate,
                             BalQty = (decimal)ID.BalQty + (decimal)ID.InvoiceQty,
                             InvoiceQty = (decimal)ID.InvoiceQty,
                             InvoiceRate = (decimal)ID.Irate,
                             Amount = (decimal)ID.InvoiceQty * (decimal)ID.Irate,
                             LotNo = "",
                             BundleNo = "",
                             RejectdQty = 0,
                             RejectdRate = 0,
                             Apprate=ID.AppRate,
                             Processid = (int)ID.ProcessId,
                             ReciptNo = ID.RecptNo

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<ProdInvJobDet> GetRepInvPrdEntryEditOrderLoad(int InvId, int? CompId, int? SuppId, int? ProdRecptDetId)
        {
            var query = (from ID in entities.Proc_Apparel_GetProdInvPrnOrderEditDetails(InvId)
                         select new ProdInvJobDet
                         {
                             Prood_Inv_JobDetID = (int)ID.ProdInvJobDetID,
                             Prod_InvDetid = (int)ID.ProdInvDetid,
                             Prod_InvId = (int)ID.ProdInvid,
                             OrderNo = ID.OrderNo,
                             RefNo = ID.RefNo,
                             Style = ID.Style,
                             Job_Ord_No = ID.Job_ord_No,
                             RecQty = (decimal)ID.Received_Qty,
                             RecRate = (decimal)ID.Rec_Rate,
                             InvoiceQty = (decimal)ID.invoiceQty,
                             OSNo =(int)ID.SNo,
                             Prod_recpt_DetId = ID.Grndetid,

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<ProdInvRatediff> GetRepInvPrdEntryEditRateDiffLoad(int InvId)
        {
            var query = (from IO in entities.Proc_Apparel_GetProdInvEditRateDiffDetails(InvId)
                         select new ProdInvRatediff
                         {
                             Proc_Recpt_Detid = (int)IO.RecptDetID,
                             Proc_Recpt_Masid = (int)IO.RecptId,
                             Item = IO.item,
                             Color = IO.color,
                             Size = IO.size,
                             Rate = (decimal)IO.IRate,
                             Invoice_Qty = (decimal)IO.InvoiceQty,
                             RateAmntDif = (decimal)IO.RateAmntDif,
                             QtyDiff = (decimal)IO.QtyDiff,
                             QtyAmntDif = (decimal)IO.QtyDiffAmt,
                             Grnno = IO.Grnno,
                             BalQty = (decimal)IO.ReceivedQty - (decimal)IO.InvoiceQty,
                             Date = "",
                             IsChecked ="Y",
                             RateDiff=IO.RateDiff

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<ProdInvAddless> GetRepInvPrdEntryEditAddlessLoad(int InvId)
        {
            var query = (from IO in entities.Proc_Apparel_GetProdInvEditAddlessDetails(InvId)
                         select new ProdInvAddless
                         {
                             ProdInvId = (int)IO.AddlessId,
                             ProdInvAddLessid = (int)IO.AddlessId,
                             addless_id = (int)IO.AddlessId,
                             Addless= IO.Addless,
                             aorl = IO.Type,
                             percentage = (decimal)IO.Percentage,
                             amount = (decimal)IO.Amount,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetData(ProductionInvoiceMas objPDEInvEntry, List<ProductionInvoiceDc> objEPDDC, List<ProductionInvoiceDet> objEPDDet, List<ProductionInvoiceRateDiff> objEPDRateDiff, List<ProductionInvoiceOrdDet> objEPDODet, List<ProductionInvoiceAddless> objEPDADD)
        {
            int ProdInvMasId = 0;
            int ProdInvDcId = 0;
            int ProdInvDetId = 0;
            int grndetid = 0;
            bool reserved = false;


            string Mode = "A";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //Edit
                    int mrprateitemstock = entities.UpdateProdInvRateItemstock(objPDEInvEntry.ProdInvid, "D");
                    entities.SaveChanges(); 

                    foreach (var IM in objEPDDet)
                    {

                        //if (IM.InvoiceQty > 0)
                        //{
                        var InvtypeDel = entities.Proc_Apparel_GetProdProcessSetup(objPDEInvEntry.ProdInvid, IM.Grndetid, IM.Processid).FirstOrDefault();

                        if (InvtypeDel == "C")
                            {
                                var Pg5 = entities.Proc_Apparel_GetProdInvGrnCuttEditDetUpdate(IM.Grndetid, IM.ProdInvDetid);
                                entities.SaveChanges();
                            }
                        else if (InvtypeDel == "B")
                        {
                            var Pg5 = entities.Proc_Apparel_GetProdInvGrnCuttEditDetUpdate(IM.Grndetid, IM.ProdInvDetid);
                            entities.SaveChanges();
                        }
                        else if (InvtypeDel == "S")
                            {
                                var Pg6 = entities.Proc_Apparel_GetProdInvGrnSewEditDetUpdate(IM.Grndetid, IM.ProdInvDetid);
                                entities.SaveChanges();
                            }
                            else
                            {
                                var Pg7 = entities.Proc_Apparel_GetProdInvGrnCommEditDetUpdate(IM.Grndetid, IM.ProdInvDetid);
                                entities.SaveChanges();
                            }

                        //}

                    }


                    var Prodinvdet = entities.ProductionInvoiceDet.Where(h => h.ProdInvId == objPDEInvEntry.ProdInvid).ToList();

                     foreach (var invdet in Prodinvdet)
                     {
                         var Invtype = entities.Proc_Apparel_GetProdProcessSetup(objPDEInvEntry.ProdInvid, invdet.Grndetid, invdet.Processid).FirstOrDefault();



                         if (Invtype == "C")
                         {
                             var Pg1 = entities.Proc_UpdateCuttingActuals(invdet.ProdInvId, "E", "N", invdet.Grndetid, invdet.Processid);
                             entities.SaveChanges();
                         }
                         else if (Invtype == "B")
                         {
                             var Pg1 = entities.Proc_UpdateCuttingActuals(invdet.ProdInvId, "E", "N", invdet.Grndetid, invdet.Processid);
                             entities.SaveChanges();
                         }
                         else if (Invtype == "S")
                         {
                             var Pg1 = entities.Proc_UpdateSewingActuals(invdet.ProdInvId, "E", "N", invdet.Grndetid, invdet.Processid);
                             entities.SaveChanges();
                         }
                         else
                         {
                             var Pg1 = entities.Proc_UpdateGeneralActuals(invdet.ProdInvId, "E", "N", invdet.Grndetid, invdet.Processid);
                             entities.SaveChanges();
                         }
                     }

                         var PgD2 = entities.Proc_Apparel_GetProdInvDeleAllEdit(objPDEInvEntry.ProdInvid);
                         entities.SaveChanges();
                    

                      
                    //Add
                    entities.ProductionInvoiceMas.Add(objPDEInvEntry);
                    entities.SaveChanges();
                    ProdInvMasId = objPDEInvEntry.ProdInvid;

                    foreach (var GI in objEPDDC)
                    {
                        GI.Prodinvid = ProdInvMasId;
                        entities.ProductionInvoiceDc.Add(GI);
                        entities.SaveChanges();
                        ProdInvDcId = GI.ProdInvDcId;

                        foreach (var IM in objEPDDet)
                        {

                            if (IM.InvoiceQty > 0 && GI.prod_recpt_masid == IM.Grnmasid)
                            {
                                IM.ProdInvId = ProdInvMasId;
                                grndetid = (int)IM.Grndetid;
                                entities.ProductionInvoiceDet.Add(IM);
                                entities.SaveChanges();
                                ProdInvDetId = IM.ProdInvDetid;

                                //Update the prndet 

                                var Invtypeadd = entities.Proc_Apparel_GetProdProcessSetup(ProdInvMasId, IM.Grndetid, IM.Processid).FirstOrDefault();

                                if (Invtypeadd == "C")
                                {
                                    var Pg1 = entities.Proc_Apparel_GetProdInvCutDetUpdate(IM.Grndetid, IM.InvoiceQty);
                                    entities.SaveChanges();
                                }
                                else if (Invtypeadd == "B")
                                {
                                    var Pg1 = entities.Proc_Apparel_GetProdInvCutDetUpdate(IM.Grndetid, IM.InvoiceQty);
                                    entities.SaveChanges();
                                }
                                else if (Invtypeadd == "S")
                                {
                                    var Pg1 = entities.Proc_Apparel_GetProdInvSewDetUpdate(IM.Grndetid, IM.InvoiceQty);
                                    entities.SaveChanges();
                                }
                                else
                                {
                                    var Pg1 = entities.Proc_Apparel_GetProdInvCommDetUpdate(IM.Grndetid, IM.InvoiceQty);
                                    entities.SaveChanges();
                                }

                                foreach (var IO in objEPDODet)
                                {
                                    if (IO.InvoiceQty > 0 && IO.Prod_Recpt_Detid == IM.Grndetid)
                                    {
                                        IO.ProdInvDetid = ProdInvDetId;
                                        IO.ProdInvid = ProdInvMasId;
                                        entities.ProductionInvoiceOrdDet.Add(IO);
                                        entities.SaveChanges();
                                    }

                                }

                                foreach (var IR in objEPDRateDiff)
                                {
                                    if (IR.Grndetid == IM.Grndetid)
                                    {
                                        IR.ProdInvId = ProdInvMasId;
                                        entities.ProductionInvoiceRateDiff.Add(IR);
                                        entities.SaveChanges();
                                    }

                                }


                            }

                        }
                    }



                    foreach (var Pay in objEPDADD)
                    {
                        Pay.ProdInvId = ProdInvMasId;
                        entities.ProductionInvoiceAddless.Add(Pay);
                    }
                    entities.SaveChanges();


                     var Prodinvdetupd = entities.ProductionInvoiceDet.Where(h => h.ProdInvId == ProdInvMasId).ToList();

                     foreach (var invdet in Prodinvdetupd)
                     {
                         var Invtypeupd = entities.Proc_Apparel_GetProdProcessSetup(ProdInvMasId, invdet.Grndetid, invdet.Processid).FirstOrDefault();

                         if (Invtypeupd == "C")
                         {
                             var Pg1 = entities.Proc_UpdateCuttingActuals(ProdInvMasId, "A", "N", invdet.Grndetid, invdet.Processid);
                             entities.SaveChanges();
                         }
                         else if (Invtypeupd == "B")
                         {
                             var Pg1 = entities.Proc_UpdateCuttingActuals(ProdInvMasId, "A", "N", invdet.Grndetid, invdet.Processid);
                             entities.SaveChanges();
                         }
                         else if (Invtypeupd == "S")
                         {
                             var Pg1 = entities.Proc_UpdateSewingActuals(ProdInvMasId, "A", "N", invdet.Grndetid, invdet.Processid);
                             entities.SaveChanges();
                         }
                         else
                         {
                             var Pg1 = entities.Proc_UpdateGeneralActuals(ProdInvMasId, "A", "N", invdet.Grndetid, invdet.Processid);
                             entities.SaveChanges();
                         }
                     }

                     int prodinvtemp = entities.Proc_Apparel_StoreTempProdInv();
                     entities.SaveChanges();

                     int ipoprate = entities.Proc_Apparel_UpdateProdInvIPOPrate(ProdInvMasId);
                     entities.SaveChanges();
                     int mrprateitemstockert = entities.UpdateProdInvRateItemstock(objPDEInvEntry.ProdInvid, "A");
                     entities.SaveChanges(); 


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionInvoice-UpdateDetData");
                }
            }
            return reserved;
        }

        public bool DeleteDetData(ProductionInvoiceMas objDPDInvEntry, List<ProductionInvoiceDc> objDPDDC, List<ProductionInvoiceDet> objDPDDet, List<ProductionInvoiceRateDiff> objDPDRateDiff, List<ProductionInvoiceOrdDet> objDPDODet, List<ProductionInvoiceAddless> objDPDADD)
        {
            int ProdInvMasId = 0;
            int ProdInvDcId = 0;
            int ProdInvDetId = 0;
            int grndetid = 0;
            bool reserved = false;


            string Mode = "A";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    int mrprateitemstock = entities.UpdateProdInvRateItemstock(objDPDInvEntry.ProdInvid,"D");
                    entities.SaveChanges();

                    //Edit
                    foreach (var IM in objDPDDet)
                    {

                        //if (IM.InvoiceQty > 0)
                        //{
                        var InvtypeDel = entities.Proc_Apparel_GetProdProcessSetup(objDPDInvEntry.ProdInvid, IM.Grndetid, IM.Processid).FirstOrDefault();

                        if (InvtypeDel == "C")
                            {
                                var Pg5 = entities.Proc_Apparel_GetProdInvGrnCuttEditDetUpdate(IM.Grndetid, IM.ProdInvDetid);
                                entities.SaveChanges();
                            }
                        else if (InvtypeDel == "B")
                        {
                            var Pg5 = entities.Proc_Apparel_GetProdInvGrnCuttEditDetUpdate(IM.Grndetid, IM.ProdInvDetid);
                            entities.SaveChanges();
                        }
                        else if (InvtypeDel == "S")
                            {
                                var Pg6 = entities.Proc_Apparel_GetProdInvGrnSewEditDetUpdate(IM.Grndetid, IM.ProdInvDetid);
                                entities.SaveChanges();
                            }
                            else
                            {
                                var Pg7 = entities.Proc_Apparel_GetProdInvGrnCommEditDetUpdate(IM.Grndetid, IM.ProdInvDetid);
                                entities.SaveChanges();
                            }

                        //}

                    }

                    var Prodinvdetupd = entities.ProductionInvoiceDet.Where(h => h.ProdInvId == objDPDInvEntry.ProdInvid).ToList();

                    foreach (var invdet in Prodinvdetupd)
                    {
                        var Invtypeupd = entities.Proc_Apparel_GetProdProcessSetup(objDPDInvEntry.ProdInvid, invdet.Grndetid, invdet.Processid).FirstOrDefault();

                        if (Invtypeupd == "C")
                        {
                            var Pg1 = entities.Proc_UpdateCuttingActuals(objDPDInvEntry.ProdInvid, "E", "N",invdet.Grndetid, invdet.Processid);
                            entities.SaveChanges();
                        }
                        else if (Invtypeupd == "B")
                        {
                            var Pg1 = entities.Proc_UpdateCuttingActuals(objDPDInvEntry.ProdInvid, "E", "N", invdet.Grndetid, invdet.Processid);
                            entities.SaveChanges();
                        }
                        else if (Invtypeupd == "S")
                        {
                            var Pg1 = entities.Proc_UpdateSewingActuals(objDPDInvEntry.ProdInvid, "E", "N", invdet.Grndetid, invdet.Processid);
                            entities.SaveChanges();
                        }
                        else
                        {
                            var Pg1 = entities.Proc_UpdateGeneralActuals(objDPDInvEntry.ProdInvid, "E", "N", invdet.Grndetid, invdet.Processid);
                            entities.SaveChanges();
                        }
                    }

                    var PgD2 = entities.Proc_Apparel_GetProdInvDeleAllEdit(objDPDInvEntry.ProdInvid);
                    entities.SaveChanges();

                    int prodinvtemp = entities.Proc_Apparel_StoreTempProdInv();
                    entities.SaveChanges();     

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionInvoice-DeleteDetData");
                }
            }
            return reserved;
        }
    }
}
