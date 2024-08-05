using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Data.Entity.Validation;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class CommonProductionReceiptRepository : ICommonProductionReceiptRepository
    {
        ProductionEntities entities = new ProductionEntities();

        public IQueryable<CommonProdReceipt> GetCommonProductionMultipleIssueDet(int CompanyUnitId, int ProcessId, int workdivisionId, string InterorExter, string OType, string RefNo, int StyId, string OrdNo, int CompId)
        {
            IQueryable<CommonProdReceipt> query = (from T in entities.proc_Apparel_GetMultipleIssueDetails(CompanyUnitId, ProcessId, workdivisionId, InterorExter, OType, RefNo, StyId, OrdNo, CompId)
                                                   select new CommonProdReceipt
                                                   {
                                                       ProdPrgId = T.prodprgid,
                                                       ProdprgNo = T.ProdPrgNo,
                                                       ProgDate = (DateTime)T.Progdate,
                                                       JobOrdNo = T.Job_ord_no,
                                                       CompanyUnit = T.Companyunit,
                                                       ProcessId = (int)T.Processid,
                                                       Process = T.Process,
                                                       RefNo = T.Ref_No,
                                                       ProdIssueId = T.IssueID,
                                                       ProdIssueNo = T.IssueNO
                                                   }).AsQueryable();
            return query;
        }

        public IQueryable<CommonProdReceipt> GetCommonProductionReceiptDet(string ProdIssueId)
        {
            IQueryable<CommonProdReceipt> query = (from T in entities.Proc_Apparel_GetProdReceiptList(ProdIssueId)
                                                   select new CommonProdReceipt
                                                   {
                                                       ProdPrgDetId = T.ProdPrgDetId,
                                                       ReceptDetId = T.RecptDetID,
                                                       ProdprgNo = T.ProdPrgNo,
                                                       ItemId = (int)T.ItemId,
                                                       Item = T.Item,
                                                       ColorId = (int)T.ColorId,
                                                       Color = T.Color,
                                                       SizeId = (int)T.SizeId,
                                                       Size = T.Size,
                                                       Balance = (decimal)T.Balance,
                                                       ReceivedQty = T.RecptQty,
                                                       RejectionQty = T.RejectedQty,
                                                       Rate = (decimal)T.Rate,
                                                       AppRate=(decimal)T.Apprate,
                                                       UomId = T.uomid,
                                                       Uom = T.UOM,
                                                       JobOrdNo = T.JobNo,
                                                       OrdNo = T.OrderNo,
                                                       IssueId = T.IssueId,
                                                       AcceptQty = T.AcceptedQty,
                                                       ReworkQty = T.ReworkQty
                                                   }).AsQueryable();
            return query;
        }

        public int AddProductionReceipt(ProdReceiptMas objAdd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));

                    var id = entities.Proc_Apparel_ProdReciptMasInsert(objAdd.ReceiptNo, objAdd.ReceiptDate, objAdd.CompanyId,
                        objAdd.CompanyUnitId, objAdd.Remarks, objAdd.CreatedBy, objAdd.InterorExter, objAdd.ProcessId,
                        objAdd.DcNumber, objAdd.RecptType, objAdd.JobWrkSample, objAdd.WorkDivisionId, objAdd.ReRefDate, objAdd.StoreUnitID, objParam, objAdd.Qlty_No, objAdd.Qlty_date);

                    entities.SaveChanges();
                    id = Convert.ToInt16(objParam.Value);

                    //Insert into Prod_Recpt_det and Update Prod_Prg_Det
                    var ProdRecptdetList = new List<Domain.ProdReceiptDet>();

                    if (objAdd.ProdReceiptDet.Count > 0)
                    {
                        foreach (var item in objAdd.ProdReceiptDet)
                        {
                            if (item.ReceivedQty > 0)
                            {
                                ProdRecptdetList.Add(new Domain.ProdReceiptDet
                                {
                                    Receiptid = id,
                                    Itemid = item.Itemid,
                                    ProdPrgDetid = item.ProdPrgDetid,
                                    Colorid = item.Colorid,
                                    Sizeid = item.Sizeid,
                                    ReceivedQty = item.ReceivedQty,
                                    RejectionQty = item.RejectionQty,
                                    JobOrdNo=item.JobOrdNo,
                                    Uomid = item.Uomid,
                                    Rate=item.Rate,
                                    Bundled = "N",
                                    InputRate = 0,
                                    OutputRate = 0,
                                    Issueid = item.Issueid,
                                    ProdPrgNo = item.ProdPrgNo,
                                    JobNo = item.JobNo,
                                    AcceptQty=item.AcceptQty,
                                    ReworkQty=item.ReworkQty
                                });
                            }
                        }
                        var prodissueDetresult = AddProductionReceiptDet(ProdRecptdetList, "Add", objAdd);
                    }

                    //Call MarkUpRate Updation Method here
                    var MarkUpRate = UpdateMarkUpRate(id);

                    //The Transaction will be completed
                    txscope.Complete();
                    return id = Convert.ToInt16(objParam.Value);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    throw ex;
                }
            }
        }

        public bool AddProductionReceiptDet(List<ProdReceiptDet> objProdRecptDet, string Mode, ProdReceiptMas ProductionRecptMas)
        {
            try
            {
                if (Mode == "Update")
                {
                    //foreach (var item in objShipDet)
                    //{
                    //    styleid = item.StyleId;
                    //}
                    ////delete StyleDetail Many Rows table
                    //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                    //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
                    //entities.SaveChanges();
                }

                var ProdRecptdetList = new List<Prod_Recpt_Det>();
                var ItemStockList = new List<ProductionItemStock>();
                var ProdRecptStockList = new List<Prod_Recpt_Stock>();
                int ReciptDetid = 0;

                //Update CostDefenitionBOM
                var UpdateCostDefBOM = entities.Proc_GeneralRecptUpdateActualsForAllNew(ProductionRecptMas.ReceiptNo, ProductionRecptMas.ProcessId, "A");

                foreach (var item in objProdRecptDet)
                {
                    ProdRecptdetList.Add(new Repository.Prod_Recpt_Det
                    {
                        RecptId = item.Receiptid,
                        ItemId = item.Itemid,
                        ColorId = item.Colorid,
                        SizeID = item.Sizeid,
                        Uomid = item.Uomid,
                        ReceivedQty = item.ReceivedQty,
                        RejectedQty = item.RejectionQty,
                        Bundled = item.Bundled,
                        Rate=item.Rate,
                        ExcessQty = 0,
                        CatType = "",
                        Input_Rate = item.InputRate,
                        Process_rate = item.OutputRate,
                        JobNo = item.JobNo,
                        ProgramNo = item.ProdPrgNo,
                        IssueId = item.Issueid,
                        AcceptQty = item.AcceptQty,
                        ReworkQty = item.ReworkQty
                    });

                    //Update Prod_Prg_Det Receipt,Order and Damage Qty
                    //var prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == item.ProdPrgDetid).FirstOrDefault();
                    //if (prodprgdet != null)
                    //{
                    //    prodprgdet.Receipt_Qty = ((prodprgdet.Receipt_Qty == null ? 0 : prodprgdet.Receipt_Qty) + item.ReceivedQty);
                    //   // prodprgdet.order_qty = (prodprgdet.order_qty + item.ReceivedQty);
                    //   // prodprgdet.Damage_qty = ((prodprgdet.Damage_qty == null ? 0 : prodprgdet.Damage_qty) + item.RejectionQty);
                    //}
                    //}
                    foreach (var prodrecptdetlst in ProdRecptdetList)
                    {
                        entities.Prod_Recpt_Det.Add(prodrecptdetlst);
                        entities.SaveChanges();
                        ReciptDetid = prodrecptdetlst.RecptDetID;
                    }
                    //Insert into Prod_Recpt_Reason
                    if (ProductionRecptMas.ProdReceiptReason != null)
                    {
                        if (ProductionRecptMas.ProdReceiptReason.Count > 0)
                        {
                            var ProdRecptReasonList = new List<Prod_Recpt_Reason>();

                            foreach (var itemreason in ProductionRecptMas.ProdReceiptReason)
                            {
                                if (itemreason.RecptDetId == item.ProdPrgDetid)
                                {
                                    ProdRecptReasonList.Add(new Repository.Prod_Recpt_Reason
                                    {
                                        RecptId = item.Receiptid,
                                        RecptDetId = ReciptDetid,
                                        ReasonId = itemreason.ReasonId,
                                        Quantity = itemreason.Qty,
                                        RType = "R",
                                        ReworkProcessid = itemreason.ReworkProcessid,
                                        ReworkQty = itemreason.ReworkQty
                                    });
                                }
                            }

                            foreach (var prodrecptitemReasonlst in ProdRecptReasonList)
                            {
                                entities.Prod_Recpt_Reason.Add(prodrecptitemReasonlst);
                                entities.SaveChanges();
                            }
                        }
                    }

                    //Insert into ItemStock
                    //ItemStockList.Add(new Repository.ProductionItemStock
                    //{
                    //    UnitId = ProductionRecptMas.CompanyUnitId,
                    //    Itemid = item.Itemid,
                    //    Colorid = item.Colorid,
                    //    sizeid = item.Sizeid,
                    //    joborderNo = item.JobNo,
                    //    TransType = "GPR",
                    //    Transno = ProductionRecptMas.ReceiptNo,
                    //    alloted = 0,
                    //    ItemCat = "P",
                    //    processId = ProductionRecptMas.ProcessId,
                    //    balQty = item.ReceivedQty,
                    //    qty = item.ReceivedQty,
                    //    purorprod = "RR",
                    //    CatType = "",
                    //    ItemCode = "",
                    //    BundleNo = "",
                    //    FabricGSM = "",
                    //    uomid = item.Uomid,
                    //    transdate = ProductionRecptMas.ReceiptDate,
                    //    companyid = ProductionRecptMas.CompanyId,
                    //    unit_or_other = "W",
                    //    Markup_Rate = item.InputRate,
                    //    StockDate = ProductionRecptMas.ReceiptDate,
                    //    supplierid = ProductionRecptMas.WorkDivisionId,
                    //});

                    //foreach (var prodrecptitemstocklst in ItemStockList)
                    //{
                    //    entities.ItemStock.Add(prodrecptitemstocklst);
                    //    entities.SaveChanges();

                    //    int Stockid = prodrecptitemstocklst.StockId;

                    //    //insert into Prod_Recpt_Stock
                    //    ProdRecptStockList.Add(new Repository.Prod_Recpt_Stock
                    //    {
                    //        RecptID = item.Receiptid,
                    //        RecptDetID = ReciptDetid,
                    //        StockID = Stockid,
                    //        RecptQty = item.ReceivedQty,
                    //        Closed = "N",
                    //    });

                    //    foreach (var prodrecptstocklst in ProdRecptStockList)
                    //    {
                    //        entities.Prod_Recpt_Stock.Add(prodrecptstocklst);
                    //        entities.SaveChanges();
                    //    }
                    //}
                    //}

                    ProdRecptdetList = new List<Prod_Recpt_Det>();
                    ItemStockList = new List<ProductionItemStock>();
                    ProdRecptStockList = new List<Prod_Recpt_Stock>();
                }

                return true;
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                .SelectMany(x => x.ValidationErrors)
                .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
        }

        public bool UpdateMarkUpRate(int ProdIssId)
        {
            try
            {
                var upd = entities.Proc_Apparel_UpdateCommonProdReceiptMarkUpRate(ProdIssId);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateData(ProdReceiptMas objUpd)
        {
            var result = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //Update Prod_Recpt_Mas and Prod_Recpt_Det
                    var App = entities.Prod_Recpt_Mas.Where(c => c.RecptId == objUpd.Receiptid).FirstOrDefault();
                    if (App != null)
                    {
                        App.RecptDate = objUpd.ReceiptDate;
                        App.Remarks = objUpd.Remarks==null?"":objUpd.Remarks;
                        App.DcNumber = objUpd.DcNumber;
                        App.Tostoreid = objUpd.StoreUnitID;
                        App.Qlty_date = objUpd.Qlty_date;
                        App.Qlty_No = objUpd.Qlty_No;
                    }
                    entities.SaveChanges();

                    var ProdRecptDetList = new List<Prod_Recpt_Det>();
                 
                    var prodprgdetList = new List<ProductionProd_Prg_Det>();
                    var ProdRecptReasonList = new List<Prod_Recpt_Reason>();
                    var ItemStockList = new List<ProductionItemStock>();
                    var ProdRecptstockList = new List<Prod_Recpt_Stock>();

                    ProdRecptDetList = entities.Prod_Recpt_Det.Where(c => c.RecptId == objUpd.Receiptid).ToList();
                    //if (ProdRecptDetList != null)
                    //{
                    //    foreach (var prde in ProdRecptDetList)
                    //    {
                    //        var prgid = entities.Prod_Prg_Mas.Where(m => m.ProdPrgNo == prde.ProgramNo).FirstOrDefault();

                           
                    //            prodprgdetList = entities.Prod_Prg_Det.Where(c => c.Prodprgid == prgid.ProdPrgid && c.InorOut=="O").ToList();

                    //            if (prodprgdetList != null)
                    //            {
                    //                foreach (var itemprdupd in prodprgdetList)
                    //                {

                    //                    if (prde.ItemId == itemprdupd.Itemid && prde.ColorId == itemprdupd.Colorid && prde.SizeID == itemprdupd.Sizeid)
                    //                    {

                    //                        itemprdupd.Receipt_Qty = ((itemprdupd.Receipt_Qty == null ? 0 : itemprdupd.Receipt_Qty) - (prde.AcceptQty+prde.ReworkQty));
                    //                        itemprdupd.Damage_qty = ((itemprdupd.Damage_qty == null ? 0 : itemprdupd.Damage_qty) - prde.RejectedQty);
                    //                        itemprdupd.ReWorkQty = ((itemprdupd.ReWorkQty == null ? 0 : itemprdupd.ReWorkQty) - prde.ReworkQty);
                    //                    }
                    //                }
                    //            }
                           
                    //        entities.SaveChanges();
                    //    }

                    //}

                    //Delete Prodprg patch
                    var prodprgpatchdel = entities.Proc_Apparel_CommonReceiptQty_patchforprdprg(objUpd.Receiptid, "D");
                    entities.SaveChanges();



                    //decimal issqty = 0;
                    if (ProdRecptDetList != null)
                    {
                        foreach (var item in ProdRecptDetList)
                        {
                            foreach (var newitem in (objUpd.ProdReceiptDet.Where(e => e.Receiptid == item.RecptId && e.Itemid == item.ItemId && e.Colorid == item.ColorId && e.Sizeid == item.SizeID && e.JobOrdNo == item.JobNo && e.ProdPrgNo == item.ProgramNo)))
                            {
                                item.ReceivedQty = (decimal)newitem.ReceivedQty;
                                item.RejectedQty = (decimal)newitem.RejectionQty;
                                item.AcceptQty = (decimal)newitem.AcceptQty;
                                item.ReworkQty = (decimal)newitem.ReworkQty;
                                item.Rate = newitem.Rate;
                            }

                            var reasondelete = entities.Prod_Recpt_Reason.Where(c => c.RecptId == objUpd.Receiptid && c.RecptDetId==item.RecptDetID).ToList();
                            ///rework program delete
                            foreach (var itemreason in reasondelete)
                            {
                                if (itemreason.ReworkProcessid > 0)
                                {
                                    var delprgm = entities.Proc_GenerateproductionProgramforRework_Delete(item.JobNo, itemreason.ReworkProcessid, "W", objUpd.CreatedBy, itemreason.RecptDetId);
                                    entities.SaveChanges();
                                }
                            }

                            //delete Prod_Recpt_Reason Many Rows table
                            var PRR = entities.Prod_Recpt_Reason.Where(c => c.RecptId == objUpd.Receiptid).ToList();
                            if (PRR != null)
                            {
                                var deleteprodReson = entities.Prod_Recpt_Reason.Where(d => d.RecptId == objUpd.Receiptid && d.RecptDetId==item.RecptDetID).ToList<Prod_Recpt_Reason>();
                                deleteprodReson.ForEach(c => entities.Prod_Recpt_Reason.Remove(c));
                                entities.SaveChanges();
                            }

                            if (objUpd.ProdReceiptReason != null)
                            {
                                //insert into Prod_Recpt_Reason Begin
                                ProdRecptReasonList = new List<Prod_Recpt_Reason>();
                                foreach (var itemreason in objUpd.ProdReceiptReason)
                                {
                                    //if (itemreason.RecptDetId == item.RecptDetID)
                                    //{

                                    if (itemreason.RecptDetId == item.RecptDetID)
                                    {
                                        ProdRecptReasonList.Add(new Repository.Prod_Recpt_Reason
                                        {
                                            RecptId = objUpd.Receiptid,
                                            RecptDetId = itemreason.RecptDetId,
                                            ReasonId = itemreason.ReasonId,
                                            Quantity = itemreason.Qty,
                                            RType = "R",
                                            ReworkProcessid = itemreason.ReworkProcessid,
                                            ReworkQty = itemreason.ReworkQty,
                                        });
                                    }
                                    //}
                                }

                                foreach (var prodrecptitemReasonlst in ProdRecptReasonList)
                                {
                                    entities.Prod_Recpt_Reason.Add(prodrecptitemReasonlst);
                                    entities.SaveChanges();
                                }


                                var reasonupd = entities.Prod_Recpt_Reason.Where(c => c.RecptId == objUpd.Receiptid && c.RecptDetId == item.RecptDetID).ToList();

                                foreach (var itemreason in reasonupd)
                                {
                                    if (itemreason.ReworkProcessid > 0)
                                    {
                                        var delprgm = entities.Proc_GenerateproductionProgramforRework_Update(item.JobNo, itemreason.ReworkProcessid, "W", objUpd.CreatedBy, itemreason.RecptDetId);
                                        entities.SaveChanges();
                                    }
                                }

                            }
                            //insert into Prod_Recpt_Reason End
                        }
                    }

                    //Replace Old value to Prod_prg_det
                    //foreach (var itemprd in objUpd.ProdReceiptDet)
                    //{
                    //    prodprgdetList = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == itemprd.ProdPrgDetid).ToList();

                    //    foreach (var itemnew in prodprgdetList)
                    //    {
                    //        //itemnew.order_qty = (decimal)(itemnew.order_qty - itemnew.Receipt_Qty);
                    //        itemnew.Receipt_Qty = (decimal)(itemnew.Receipt_Qty - itemnew.Receipt_Qty);
                    //        //itemnew.Damage_qty = (decimal)(itemnew.Damage_qty - itemnew.Damage_qty);
                    //        //itemnew.AcceptQty = (decimal)(itemnew.AcceptQty - itemnew.AcceptQty); 
                    //        //itemnew.ReworkQty = (decimal)(itemnew.ReworkQty - itemnew.ReworkQty); 
                    //    }
                    //}
                    //entities.SaveChanges();

                    //Update Prod_Prg_Det Receipt,Order and Damage Qty
                    //foreach (var itemprd in objUpd.ProdReceiptDet)
                    //{
                    //    prodprgdetList = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == itemprd.ProdPrgDetid).ToList();

                    //    if (prodprgdetList != null)
                    //    {
                    //        foreach (var itemprdupd in prodprgdetList)
                    //        {

                    //            if (itemprdupd.Itemid == itemprd.Itemid && itemprdupd.Colorid == itemprd.Colorid && itemprdupd.Sizeid == itemprd.Sizeid)
                    //            {


                    //                itemprdupd.Receipt_Qty = ((itemprdupd.Receipt_Qty == null ? 0 : itemprdupd.Receipt_Qty) + (itemprd.AcceptQty + itemprd.ReworkQty));
                    //                //itemprdupd.order_qty = (itemprdupd.order_qty + itemprd.ReceivedQty);
                    //                itemprdupd.Damage_qty = ((itemprdupd.Damage_qty == null ? 0 : itemprdupd.Damage_qty) + itemprd.RejectionQty);
                    //                itemprdupd.ReWorkQty = ((itemprdupd.ReWorkQty == null ? 0 : itemprdupd.ReWorkQty) + itemprd.ReworkQty);
                    //            }
                    //        }
                    //    }
                    //}
                    entities.SaveChanges();

                    if (objUpd.Type == "Qlty" && objUpd.Mod == 1)
                    {
                        //Update CostDefenitionBOM
                        var UpdateCostDefBOM = entities.Proc_GeneralRecptUpdateActualsForAllNew(objUpd.ReceiptNo, objUpd.ProcessId, "D");
                        entities.SaveChanges();

                        ////Replace Old value to ItemStock
                        //foreach (var itemprd in objUpd.ProdReceiptDet)
                        //{
                        //    ItemStockList = entities.ItemStock.Where(c => c.Transno == objUpd.ReceiptNo).ToList();

                        //    foreach (var itemnew in ItemStockList)
                        //    {
                        //        //if (itemprd.Itemid == itemnew.Itemid && itemprd.Colorid == itemnew.Colorid && itemprd.Sizeid == itemnew.sizeid)
                        //        //{
                        //        itemnew.qty = (decimal)(itemnew.qty - itemnew.qty);
                        //        itemnew.balQty = (decimal)(itemnew.balQty - itemnew.balQty);
                        //        //}   
                        //    }
                        //}
                        //entities.SaveChanges();

                        ////Update ItemStock Qty and Balqty
                        //foreach (var itemprd in objUpd.ProdReceiptDet)
                        //{
                        //    ItemStockList = entities.ItemStock.Where(c => c.Transno == objUpd.ReceiptNo).ToList();

                        //    foreach (var itemnew in ItemStockList)
                        //    {
                        //        if (itemprd.Itemid == itemnew.Itemid && itemprd.Colorid == itemnew.Colorid && itemprd.Sizeid == itemnew.sizeid && itemnew.TransType=="GPR" &&itemnew.purorprod=="RR" )
                        //        {
                        //            itemnew.qty = (decimal)(itemnew.qty + itemprd.AcceptQty);
                        //            itemnew.balQty = (decimal)(itemnew.balQty + itemprd.AcceptQty);
                        //        }
                        //        if (itemprd.Itemid == itemnew.Itemid && itemprd.Colorid == itemnew.Colorid && itemprd.Sizeid == itemnew.sizeid && itemnew.TransType == "GPR" && itemnew.purorprod == "RD")
                        //        {
                        //            itemnew.qty = (decimal)(itemnew.qty + itemprd.RejectionQty);
                        //            itemnew.balQty = (decimal)(itemnew.balQty + itemprd.RejectionQty);
                        //        }
                        //        if (itemprd.Itemid == itemnew.Itemid && itemprd.Colorid == itemnew.Colorid && itemprd.Sizeid == itemnew.sizeid && itemnew.TransType == "GPR" && itemnew.purorprod == "RE")
                        //        {
                        //            itemnew.qty = (decimal)(itemnew.qty + itemprd.ReworkQty);
                        //            itemnew.balQty = (decimal)(itemnew.balQty + itemprd.ReworkQty);
                        //        }

                        //        ProdRecptstockList = entities.Prod_Recpt_Stock.Where(c => c.StockID == itemnew.StockId).ToList();
                        //        foreach (var stckupd in ProdRecptstockList)
                        //        {
                        //            stckupd.RecptQty = (decimal)(itemprd.AcceptQty);
                        //        }
                        //    }
                        //}
                        //entities.SaveChanges();


                        var ItemStockList2 = entities.ItemStock.Where(c => c.Transno == objUpd.ReceiptNo ).ToList();

                        foreach (var itemnew in ItemStockList2)
                        {
                            if (itemnew.alloted == 0)
                            {
                                var stkremove = entities.ItemStock.Remove(itemnew);
                            }
                        }
                        entities.SaveChanges();

                        //delete Prod_Recpt_Stock Many Rows table
                        var PRStock = entities.Prod_Recpt_Stock.Where(c => c.RecptID == objUpd.Receiptid).FirstOrDefault();
                        if (PRStock != null)
                        {
                            var deleteprodReceiptStock = entities.Prod_Recpt_Stock.Where(d => d.RecptID == PRStock.RecptID).ToList<Prod_Recpt_Stock>();
                            deleteprodReceiptStock.ForEach(c => entities.Prod_Recpt_Stock.Remove(c));
                            entities.SaveChanges();
                        }


                        //var ProdRecptStockList = new List<Prod_Recpt_Stock>();

                        //ProdRecptDetList = entities.Prod_Recpt_Det.Where(c => c.RecptId == objUpd.Receiptid).ToList();

                        //foreach (var item2 in ProdRecptDetList)
                        //{
                        //    // Insert into ItemStock

                        //    var job = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == item2.JobNo).FirstOrDefault();


                        //    if (item2.AcceptQty > 0)
                        //    {

                        //        ItemStockList.Add(new Repository.ProductionItemStock
                        //        {
                        //            UnitId = objUpd.CompanyUnitId,
                        //            Itemid = item2.ItemId,
                        //            Colorid = item2.ColorId,
                        //            sizeid = item2.SizeID,
                        //            joborderNo = item2.JobNo,
                        //            TransType = "GPR",
                        //            Transno = objUpd.ReceiptNo,
                        //            alloted = 0,
                        //            ItemCat = "P",
                        //            processId = objUpd.ProcessId,
                        //            balQty = item2.AcceptQty,
                        //            qty = (decimal)item2.AcceptQty,
                        //            purorprod = "RR",
                        //            CatType = "",
                        //            ItemCode = "",
                        //            BundleNo = "",
                        //            FabricGSM = "",
                        //            uomid = item2.Uomid,
                        //            transdate = objUpd.Qlty_date,
                        //            companyid = objUpd.CompanyId,
                        //            unit_or_other = "W",
                        //            Markup_Rate = item2.Input_Rate,
                        //            StockDate = objUpd.ReceiptDate,
                        //            supplierid = objUpd.WorkDivisionId,
                        //            StoreUnitID = objUpd.StoreUnitID,
                        //            sQty = 0,
                        //            Rate = item2.Rate,
                        //            StockType = "S",
                        //            Styleid = job.Styleid,

                        //        });
                        //    }

                        //    if (item2.RejectedQty > 0)
                        //    {

                        //        ItemStockList.Add(new Repository.ProductionItemStock
                        //        {
                        //            UnitId = objUpd.CompanyUnitId,
                        //            Itemid = item2.ItemId,
                        //            Colorid = item2.ColorId,
                        //            sizeid = item2.SizeID,
                        //            joborderNo = item2.JobNo,
                        //            TransType = "GPR",
                        //            Transno = objUpd.ReceiptNo,
                        //            alloted = 0,
                        //            ItemCat = "P",
                        //            processId = objUpd.ProcessId,
                        //            balQty = item2.RejectedQty,
                        //            qty = (decimal)item2.RejectedQty,
                        //            purorprod = "RD",
                        //            CatType = "",
                        //            ItemCode = "",
                        //            BundleNo = "",
                        //            FabricGSM = "",
                        //            uomid = item2.Uomid,
                        //            transdate = objUpd.Qlty_date,
                        //            companyid = objUpd.CompanyId,
                        //            unit_or_other = "W",
                        //            Markup_Rate = item2.Input_Rate,
                        //            StockDate = objUpd.ReceiptDate,
                        //            supplierid = objUpd.WorkDivisionId,
                        //            StoreUnitID = objUpd.StoreUnitID,
                        //            sQty = 0,
                        //            Rate = item2.Rate,
                        //            StockType = "S",
                        //            Styleid = job.Styleid,

                        //        });
                        //    }

                        //    if (item2.ReworkQty > 0)
                        //    {

                        //        ItemStockList.Add(new Repository.ProductionItemStock
                        //        {
                        //            UnitId = objUpd.CompanyUnitId,
                        //            Itemid = item2.ItemId,
                        //            Colorid = item2.ColorId,
                        //            sizeid = item2.SizeID,
                        //            joborderNo = item2.JobNo,
                        //            TransType = "GPR",
                        //            Transno = objUpd.ReceiptNo,
                        //            alloted = 0,
                        //            ItemCat = "P",
                        //            processId = objUpd.ProcessId,
                        //            balQty = item2.ReworkQty,
                        //            qty = (decimal)item2.ReworkQty,
                        //            purorprod = "RE",
                        //            CatType = "",
                        //            ItemCode = "",
                        //            BundleNo = "",
                        //            FabricGSM = "",
                        //            uomid = item2.Uomid,
                        //            transdate = objUpd.Qlty_date,
                        //            companyid = objUpd.CompanyId,
                        //            unit_or_other = "W",
                        //            Markup_Rate = item2.Input_Rate,
                        //            StockDate = objUpd.ReceiptDate,
                        //            supplierid = objUpd.WorkDivisionId,
                        //            StoreUnitID = objUpd.StoreUnitID,
                        //            sQty = 0,
                        //            Rate = item2.Rate,
                        //            StockType = "S",
                        //            Styleid = job.Styleid,

                        //        });
                        //    }

                        //    foreach (var prodrecptitemstocklst in ItemStockList)
                        //    {
                        //        entities.ItemStock.Add(prodrecptitemstocklst);
                        //        entities.SaveChanges();

                        //        int Stockid = prodrecptitemstocklst.StockId;

                        //        //insert into Prod_Recpt_Stock

                        //        if (item2.AcceptQty > 0 && prodrecptitemstocklst.TransType == "GPR" && prodrecptitemstocklst.purorprod == "RR")
                        //        {
                        //            ProdRecptStockList.Add(new Repository.Prod_Recpt_Stock
                        //            {
                        //                RecptID = item2.RecptId,
                        //                RecptDetID = item2.RecptDetID,
                        //                StockID = Stockid,
                        //                RecptQty = (decimal)item2.AcceptQty,
                        //                Closed = "N",
                        //            });
                        //        }

                        //    }

                        //    foreach (var prodrecptstocklst in ProdRecptStockList)
                        //    {
                        //        entities.Prod_Recpt_Stock.Add(prodrecptstocklst);
                        //        entities.SaveChanges();
                        //    }

                        //}

                        var ProdRecptDetList3 = entities.Prod_Recpt_Det.Where(c => c.RecptId == objUpd.Receiptid).ToList();

                        foreach (var item in ProdRecptDetList3)
                        {
                            // Insert into ItemStock
                            var ProdRecptStockList = new List<Prod_Recpt_Stock>();

                            var job = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == item.JobNo).FirstOrDefault();
                            var ItemStockList3 = new List<ProductionItemStock>();

                            if (item.AcceptQty > 0)
                            {

                                ItemStockList3.Add(new Repository.ProductionItemStock
                                {
                                    UnitId = objUpd.CompanyUnitId,
                                    Itemid = item.ItemId,
                                    Colorid = item.ColorId,
                                    sizeid = item.SizeID,
                                    joborderNo = item.JobNo,
                                    TransType = "GPR",
                                    Transno = objUpd.ReceiptNo,
                                    alloted = 0,
                                    ItemCat = "P",
                                    processId = objUpd.ProcessId,
                                    balQty = item.AcceptQty,
                                    qty = (decimal)item.AcceptQty,
                                    purorprod = "RR",
                                    CatType = "",
                                    ItemCode = "",
                                    BundleNo = "",
                                    FabricGSM = "",
                                    uomid = item.Uomid,
                                    transdate = objUpd.Qlty_date,
                                    companyid = objUpd.CompanyId,
                                    unit_or_other = "W",
                                    Markup_Rate = item.Input_Rate,
                                    StockDate = objUpd.ReceiptDate,
                                    supplierid = objUpd.WorkDivisionId,
                                    StoreUnitID = objUpd.StoreUnitID,
                                    sQty = 0,
                                    Rate = item.Rate,
                                    StockType = "S",
                                    Styleid = job.Styleid,

                                });
                            }

                            if (item.RejectedQty > 0)
                            {

                                ItemStockList3.Add(new Repository.ProductionItemStock
                                {
                                    UnitId = objUpd.CompanyUnitId,
                                    Itemid = item.ItemId,
                                    Colorid = item.ColorId,
                                    sizeid = item.SizeID,
                                    joborderNo = item.JobNo,
                                    TransType = "GPR",
                                    Transno = objUpd.ReceiptNo,
                                    alloted = 0,
                                    ItemCat = "P",
                                    processId = objUpd.ProcessId,
                                    balQty = item.RejectedQty,
                                    qty = (decimal)item.RejectedQty,
                                    purorprod = "RD",
                                    CatType = "",
                                    ItemCode = "",
                                    BundleNo = "",
                                    FabricGSM = "",
                                    uomid = item.Uomid,
                                    transdate = objUpd.Qlty_date,
                                    companyid = objUpd.CompanyId,
                                    unit_or_other = "W",
                                    Markup_Rate = item.Input_Rate,
                                    StockDate = objUpd.ReceiptDate,
                                    supplierid = objUpd.WorkDivisionId,
                                    StoreUnitID = objUpd.StoreUnitID,
                                    sQty = 0,
                                    Rate = item.Rate,
                                    StockType = "S",
                                    Styleid = job.Styleid,

                                });
                            }

                            if (item.ReworkQty > 0)
                            {

                                ItemStockList3.Add(new Repository.ProductionItemStock
                                {
                                    UnitId = objUpd.CompanyUnitId,
                                    Itemid = item.ItemId,
                                    Colorid = item.ColorId,
                                    sizeid = item.SizeID,
                                    joborderNo = item.JobNo,
                                    TransType = "GPR",
                                    Transno = objUpd.ReceiptNo,
                                    alloted = 0,
                                    ItemCat = "P",
                                    processId = objUpd.ProcessId,
                                    balQty = item.ReworkQty,
                                    qty = (decimal)item.ReworkQty,
                                    purorprod = "RE",
                                    CatType = "",
                                    ItemCode = "",
                                    BundleNo = "",
                                    FabricGSM = "",
                                    uomid = item.Uomid,
                                    transdate = objUpd.Qlty_date,
                                    companyid = objUpd.CompanyId,
                                    unit_or_other = "W",
                                    Markup_Rate = item.Input_Rate,
                                    StockDate = objUpd.ReceiptDate,
                                    supplierid = objUpd.WorkDivisionId,
                                    StoreUnitID = objUpd.StoreUnitID,
                                    sQty = 0,
                                    Rate = item.Rate,
                                    StockType = "S",
                                    Styleid = job.Styleid,

                                });
                            }

                            foreach (var prodrecptitemstocklst in ItemStockList3)
                            {
                                entities.ItemStock.Add(prodrecptitemstocklst);
                                entities.SaveChanges();

                                int Stockid = prodrecptitemstocklst.StockId;

                                //insert into Prod_Recpt_Stock

                                if (item.AcceptQty > 0 && prodrecptitemstocklst.TransType == "GPR" && prodrecptitemstocklst.purorprod == "RR")
                                {
                                    ProdRecptStockList.Add(new Repository.Prod_Recpt_Stock
                                    {
                                        RecptID = item.RecptId,
                                        RecptDetID = item.RecptDetID,
                                        StockID = Stockid,
                                        RecptQty = (decimal)item.AcceptQty,
                                        Closed = "N",
                                    });
                                }
                            }
                            foreach (var prodrecptstocklst in ProdRecptStockList)
                            {
                                entities.Prod_Recpt_Stock.Add(prodrecptstocklst);
                                entities.SaveChanges();
                            }


                        }


                    }

                    if (objUpd.Type == "Qlty" && objUpd.Mod == 0)
                    {
                     

                        var ProdRecptDetList3 = entities.Prod_Recpt_Det.Where(c => c.RecptId == objUpd.Receiptid).ToList();

                        foreach (var item in ProdRecptDetList3)
                        {
                       // Insert into ItemStock
                            var ProdRecptStockList = new List<Prod_Recpt_Stock>();

                      var job= entities.Job_Ord_Mas.Where(b=>b.Job_Ord_No==item.JobNo).FirstOrDefault();
                      var  ItemStockList2 = new List<ProductionItemStock>();

                      if (item.AcceptQty > 0)
                      {

                          ItemStockList2.Add(new Repository.ProductionItemStock
                          {
                              UnitId = objUpd.CompanyUnitId,
                              Itemid = item.ItemId,
                              Colorid = item.ColorId,
                              sizeid = item.SizeID,
                              joborderNo = item.JobNo,
                              TransType = "GPR",
                              Transno = objUpd.ReceiptNo,
                              alloted = 0,
                              ItemCat = "P",
                              processId = objUpd.ProcessId,
                              balQty = item.AcceptQty,
                              qty = (decimal)item.AcceptQty,
                              purorprod = "RR",
                              CatType = "",
                              ItemCode = "",
                              BundleNo = "",
                              FabricGSM = "",
                              uomid = item.Uomid,
                              transdate = objUpd.Qlty_date,
                              companyid = objUpd.CompanyId,
                              unit_or_other = "W",
                              Markup_Rate = item.Input_Rate,
                              StockDate = objUpd.ReceiptDate,
                              supplierid = objUpd.WorkDivisionId,
                              StoreUnitID = objUpd.StoreUnitID,
                              sQty = 0,
                              Rate = item.Rate,
                              StockType = "S",
                              Styleid = job.Styleid,

                          });
                      }

                      if (item.RejectedQty > 0)
                      {

                          ItemStockList2.Add(new Repository.ProductionItemStock
                          {
                              UnitId = objUpd.CompanyUnitId,
                              Itemid = item.ItemId,
                              Colorid = item.ColorId,
                              sizeid = item.SizeID,
                              joborderNo = item.JobNo,
                              TransType = "GPR",
                              Transno = objUpd.ReceiptNo,
                              alloted = 0,
                              ItemCat = "P",
                              processId = objUpd.ProcessId,
                              balQty = item.RejectedQty,
                              qty = (decimal)item.RejectedQty,
                              purorprod = "RD",
                              CatType = "",
                              ItemCode = "",
                              BundleNo = "",
                              FabricGSM = "",
                              uomid = item.Uomid,
                              transdate = objUpd.Qlty_date,
                              companyid = objUpd.CompanyId,
                              unit_or_other = "W",
                              Markup_Rate = item.Input_Rate,
                              StockDate = objUpd.ReceiptDate,
                              supplierid = objUpd.WorkDivisionId,
                              StoreUnitID = objUpd.StoreUnitID,
                              sQty = 0,
                              Rate = item.Rate,
                              StockType = "S",
                              Styleid = job.Styleid,

                          });
                      }

                      if (item.ReworkQty > 0)
                      {

                          ItemStockList2.Add(new Repository.ProductionItemStock
                          {
                              UnitId = objUpd.CompanyUnitId,
                              Itemid = item.ItemId,
                              Colorid = item.ColorId,
                              sizeid = item.SizeID,
                              joborderNo = item.JobNo,
                              TransType = "GPR",
                              Transno = objUpd.ReceiptNo,
                              alloted = 0,
                              ItemCat = "P",
                              processId = objUpd.ProcessId,
                              balQty = item.ReworkQty,
                              qty = (decimal)item.ReworkQty,
                              purorprod = "RE",
                              CatType = "",
                              ItemCode = "",
                              BundleNo = "",
                              FabricGSM = "",
                              uomid = item.Uomid,
                              transdate = objUpd.Qlty_date,
                              companyid = objUpd.CompanyId,
                              unit_or_other = "W",
                              Markup_Rate = item.Input_Rate,
                              StockDate = objUpd.ReceiptDate,
                              supplierid = objUpd.WorkDivisionId,
                              StoreUnitID = objUpd.StoreUnitID,
                              sQty = 0,
                              Rate = item.Rate,
                              StockType = "S",
                              Styleid = job.Styleid,

                          });
                      }

                      foreach (var prodrecptitemstocklst in ItemStockList2)
                        {
                            entities.ItemStock.Add(prodrecptitemstocklst);
                            entities.SaveChanges();

                            int Stockid = prodrecptitemstocklst.StockId;

                            //insert into Prod_Recpt_Stock

                            if (item.AcceptQty > 0 && prodrecptitemstocklst.TransType == "GPR" && prodrecptitemstocklst.purorprod == "RR")
                            {
                                ProdRecptStockList.Add(new Repository.Prod_Recpt_Stock
                                {
                                    RecptID = item.RecptId,
                                    RecptDetID = item.RecptDetID,
                                    StockID = Stockid,
                                    RecptQty = (decimal)item.AcceptQty,
                                    Closed = "N",
                                });
                            }
                        }
                        foreach (var prodrecptstocklst in ProdRecptStockList)
                        {
                            entities.Prod_Recpt_Stock.Add(prodrecptstocklst);
                            entities.SaveChanges();
                        }
                       

                    }

                    }

                    //Update CostDefenitionBOM
                    var AddCostDefBOM = entities.Proc_GeneralRecptUpdateActualsForAllNew(objUpd.ReceiptNo,objUpd.ProcessId, "A");
                    entities.SaveChanges();

                    //Call MarkUpRate Updation Method here
                    var MarkUpRate = UpdateMarkUpRate(objUpd.Receiptid);
                    entities.SaveChanges();

                    //Update Markuprate in itemstock
                    var mrpupdstock = entities.Proc_Apparel_SP_PostMRPCommonRecptItemStock(objUpd.ReceiptNo);
                    entities.SaveChanges();

                    //Update Prodprg patch
                    var prodprgpatch = entities.Proc_Apparel_CommonReceiptQty_patchforprdprg(objUpd.Receiptid,"A");
                    entities.SaveChanges();

                    //The Transaction will be completed
                    txscope.Complete();
                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool DeleteReceipt(ProdReceiptMas objUpd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Result = false;

                    if (objUpd.Type == "Qlty")
                    {
                        //var PRMas3 = entities.Prod_Recpt_Mas.Where(c => c.RecptId == objUpd.Receiptid).FirstOrDefault();
                        //var prodprgdet = entities.Prod_Recpt_Det.Where(c => c.RecptId == objUpd.Receiptid).ToList();
                        //if (prodprgdet != null)
                        //{
                        //    foreach (var rejecupd in prodprgdet)
                        //    {
                        //        var prodprgmas = entities.Prod_Prg_Mas.Where(d => d.ProdPrgNo == rejecupd.ProgramNo && d.ProcessId == PRMas3.ProcessID).FirstOrDefault();
                        //        if (prodprgmas != null)
                        //        {
                        //            var prodprgdetinfo = entities.Prod_Prg_Det.Where(d => d.Prodprgid == prodprgmas.ProdPrgid && d.Itemid == rejecupd.ItemId && d.Colorid == rejecupd.ColorId && d.Sizeid == rejecupd.SizeID && d.InorOut == "O").FirstOrDefault();
                        //            if (prodprgdetinfo != null)
                        //            {
                        //                prodprgdetinfo.Receipt_Qty = prodprgdetinfo.Receipt_Qty - rejecupd.AcceptQty;
                        //                prodprgdetinfo.Damage_qty = prodprgdetinfo.Damage_qty - rejecupd.RejectedQty;
                        //                prodprgdetinfo.ReWorkQty = prodprgdetinfo.ReWorkQty - rejecupd.ReworkQty;

                        //            }
                        //        }
                        //    }
                        //}

                        //Update CostDefenitionBOM
                        var UpdateCostDefBOM = entities.Proc_GeneralRecptUpdateActualsForAllNew(objUpd.ReceiptNo, objUpd.ProcessId, "D");
                        entities.SaveChanges();

                        var ProdRecptDetList = entities.Prod_Recpt_Det.Where(c => c.RecptId == objUpd.Receiptid).ToList();


                        //Delete Prodprg patch
                        var prodprgpatchdel = entities.Proc_Apparel_CommonReceiptQty_patchforprdprg(objUpd.Receiptid, "D");
                        entities.SaveChanges();


                        ////ProdRecptDetList = entities.Prod_Recpt_Det.Where(c => c.RecptId == objUpd.Receiptid).ToList();
                        //if (ProdRecptDetList != null)
                        //{
                        //    foreach (var prde in ProdRecptDetList)
                        //    {
                        //        var prgid = entities.Prod_Prg_Mas.Where(m => m.ProdPrgNo == prde.ProgramNo).FirstOrDefault();


                        //       var prodprgdetList = entities.Prod_Prg_Det.Where(c => c.Prodprgid == prgid.ProdPrgid && c.InorOut == "O").ToList();

                        //        if (prodprgdetList != null)
                        //        {
                        //            foreach (var itemprdupd in prodprgdetList)
                        //            {

                        //                if (prde.ItemId == itemprdupd.Itemid && prde.ColorId == itemprdupd.Colorid && prde.SizeID == itemprdupd.Sizeid)
                        //                {

                        //                    itemprdupd.Receipt_Qty = ((itemprdupd.Receipt_Qty == null ? 0 : itemprdupd.Receipt_Qty) - prde.AcceptQty);
                        //                    itemprdupd.Damage_qty = ((itemprdupd.Damage_qty == null ? 0 : itemprdupd.Damage_qty) - prde.RejectedQty);
                        //                    itemprdupd.ReWorkQty = ((itemprdupd.ReWorkQty == null ? 0 : itemprdupd.ReWorkQty) - prde.ReworkQty);
                        //                }
                        //            }
                        //        }

                        //        entities.SaveChanges();
                        //    }

                        //}


                        //decimal issqty = 0;
                        if (ProdRecptDetList != null)
                        {
                            foreach (var item in ProdRecptDetList)
                            {


                                var reasondelete = entities.Prod_Recpt_Reason.Where(c => c.RecptId == objUpd.Receiptid && c.RecptDetId==item.RecptDetID).ToList();
                                ///rework program delete
                                foreach (var itemreason in reasondelete)
                                {
                                    if (itemreason.ReworkProcessid > 0)
                                    {
                                        var delprgm = entities.Proc_GenerateproductionProgramforRework_Delete(item.JobNo, itemreason.ReworkProcessid, "W", objUpd.CreatedBy, itemreason.RecptDetId);
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }

                        //delete Prod_Recpt_Reason Many Rows table
                        var PRReason = entities.Prod_Recpt_Reason.Where(c => c.RecptId == objUpd.Receiptid).ToList();
                        if (PRReason != null)
                        {
                            var deleteprodReson = entities.Prod_Recpt_Reason.Where(d => d.RecptId == objUpd.Receiptid).ToList<Prod_Recpt_Reason>();
                            deleteprodReson.ForEach(c => entities.Prod_Recpt_Reason.Remove(c));
                            entities.SaveChanges();
                        }

                        var deleteprodItemStock = entities.ItemStock.Where(d => d.Transno == objUpd.ReceiptNo).ToList<ProductionItemStock>();
                        deleteprodItemStock.ForEach(c => entities.ItemStock.Remove(c));
                        entities.SaveChanges();

                        //delete Prod_Recpt_Stock Many Rows table
                        var PRStock = entities.Prod_Recpt_Stock.Where(c => c.RecptID == objUpd.Receiptid).FirstOrDefault();
                        if (PRStock != null)
                        {
                            var deleteprodReceiptStock = entities.Prod_Recpt_Stock.Where(d => d.RecptID == PRStock.RecptID).ToList<Prod_Recpt_Stock>();
                            deleteprodReceiptStock.ForEach(c => entities.Prod_Recpt_Stock.Remove(c));
                            entities.SaveChanges();
                        }

                        if (ProdRecptDetList != null)
                        {
                            foreach (var item in ProdRecptDetList)
                            {
                                item.RejectedQty = 0;
                                item.ReworkQty = 0;
                                item.AcceptQty = 0;
                                entities.SaveChanges();
                            }
                        }
                        entities.SaveChanges();

                        var ProdRecptmas = entities.Prod_Recpt_Mas.Where(c => c.RecptId == objUpd.Receiptid).FirstOrDefault();
                        //decimal issqty = 0;
                          if (ProdRecptmas != null)
                          {
                              ProdRecptmas.Qlty_No = "";
                              ProdRecptmas.Qlty_date = null;
                              ProdRecptmas.Tostoreid=null;
                          }

                          entities.SaveChanges();

                    }

                    if (objUpd.Type == "GRN")
                    {
                        //delete ItemStock Many Rows table
                        var PRMas = entities.Prod_Recpt_Mas.Where(c => c.RecptId == objUpd.Receiptid).FirstOrDefault();
                        if (PRMas != null)
                        {
                            //var deleteprodItemStock = entities.ItemStock.Where(d => d.Transno == PRMas.RecptNo).ToList<ProductionItemStock>();
                            //deleteprodItemStock.ForEach(c => entities.ItemStock.Remove(c));
                            //entities.SaveChanges();

                            //Update Prod_Prg_Det Receipt,Order 
                            //var prodprgdet = entities.Prod_Recpt_Det.Where(c => c.RecptId == PRMas.RecptId).ToList();
                            //if (prodprgdet != null)
                            //{
                            //    foreach (var rejecupd in prodprgdet)
                            //    {
                            //        var prodprgmas = entities.Prod_Prg_Mas.Where(d => d.ProdPrgNo == rejecupd.ProgramNo && d.ProcessId == PRMas.ProcessID).FirstOrDefault();
                            //        if (prodprgmas != null)
                            //        {
                            //            var prodprgdetinfo = entities.Prod_Prg_Det.Where(d => d.Prodprgid == prodprgmas.ProdPrgid && d.Itemid == rejecupd.ItemId && d.Colorid == rejecupd.ColorId && d.Sizeid == rejecupd.SizeID && d.InorOut == "O").FirstOrDefault();
                            //            if (prodprgdetinfo != null)
                            //            {
                            //                prodprgdetinfo.Receipt_Qty = prodprgdetinfo.Receipt_Qty - rejecupd.ReceivedQty;
                            //                prodprgdetinfo.Damage_qty = prodprgdetinfo.Damage_qty - rejecupd.RejectedQty;
                            //                prodprgdetinfo.ReWorkQty = prodprgdetinfo.ReWorkQty - rejecupd.ReworkQty;

                            //            }
                            //        }
                            //    }
                            //}

                            ////delete Prod_Recpt_Stock Many Rows table
                            //var PRStock = entities.Prod_Recpt_Stock.Where(c => c.RecptID == id).FirstOrDefault();
                            //if (PRStock != null)
                            //{
                            //    var deleteprodReceiptStock = entities.Prod_Recpt_Stock.Where(d => d.RecptID == PRStock.RecptID).ToList<Prod_Recpt_Stock>();
                            //    deleteprodReceiptStock.ForEach(c => entities.Prod_Recpt_Stock.Remove(c));
                            //    entities.SaveChanges();
                            //}

                            //delete Prod_Recpt_Det Many Rows table
                            var PRDet = entities.Prod_Recpt_Det.Where(c => c.RecptId == objUpd.Receiptid).FirstOrDefault();
                            if (PRDet != null)
                            {
                                var deleteprodReceiptDet = entities.Prod_Recpt_Det.Where(d => d.RecptId == objUpd.Receiptid).ToList<Prod_Recpt_Det>();
                                deleteprodReceiptDet.ForEach(c => entities.Prod_Recpt_Det.Remove(c));
                                entities.SaveChanges();
                            }

                            ////delete Prod_Recpt_Mas Many Rows table
                            //var PRMaster = entities.Prod_Recpt_Mas.Where(c => c.RecptId == id).FirstOrDefault();
                            //if (PRMaster != null)
                            //{
                            //    var deleteprodReceiptMas = entities.Prod_Recpt_Mas.Where(d => d.RecptId == PRStock.RecptID).ToList<Prod_Recpt_Mas>();
                            //    deleteprodReceiptMas.ForEach(c => entities.Prod_Recpt_Mas.Remove(c));
                            //    entities.SaveChanges();
                            //}
                            entities.Prod_Recpt_Mas.Remove(PRMas);
                            entities.SaveChanges();
                        }
                    }

                    //The Transaction will be completed
                    txscope.Complete();
                    Result = true;
                    return Result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }
        //public bool AddProductionReceiptReason(List<ProdReceiptReason> objProdRecptReason, string Mode)
        //{
        //    try
        //    {

        //        if (Mode == "Update")
        //        {
        //            //foreach (var item in objShipDet)
        //            //{
        //            //    styleid = item.StyleId;
        //            //}
        //            ////delete StyleDetail Many Rows table
        //            //var deletestyledet = entities.StyleDetails.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

        //            //deletestyledet.ForEach(c => entities.StyleDetails.Remove(c));
        //            //entities.SaveChanges();
        //        }

        //       var ProdRecptReasonList = new List<Prod_Recpt_Reason>();

        //        //int ProdIssueDetId = 0;

        //       foreach (var item in objProdRecptReason)
        //        {
        //            ProdRecptReasonList.Add(new Repository.Prod_Recpt_Reason
        //            {
        //                RecptId = item.RecptId,
        //                RecptDetId=item.RecptDetId,
        //                ReasonId=item.ReasonId,
        //                Quantity=item.Quantity,
        //                RType=item.RType,
        //            });
        //        }

        //       foreach (var prodrecptreasonlst in ProdRecptReasonList)
        //       {
        //           entities.Prod_Recpt_Reason.Add(prodrecptreasonlst);
        //           entities.SaveChanges();
        //       }
        //        return true;
        //    }
        //    catch (DbEntityValidationException ex)
        //    {
        //        // Retrieve the error messages as a list of strings.
        //        var errorMessages = ex.EntityValidationErrors
        //        .SelectMany(x => x.ValidationErrors)
        //        .Select(x => x.ErrorMessage);

        //        // Join the list to a single string.
        //        var fullErrorMessage = string.Join("; ", errorMessages);

        //        // Combine the original exception message with the new one.
        //        var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

        //        // Throw a new DbEntityValidationException with the improved exception message.
        //        throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
        //    }
        //}

        public IList<ProductionReceiptMainDetail> GetMainData(int ID, string FromDate, string ToDate, string InterExter, string DcNo, int Recptid, string OType, string OrdNo, string Refno, int ProcessId, int processorid)
        {
            var query = (from a in entities.Proc_Apparel_ProductionReceiptMainList(ID, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), InterExter, DcNo, Recptid, OType, OrdNo, ProcessId, processorid, Refno)
                         select new ProductionReceiptMainDetail
                         {
                             ReceiptDate = (DateTime)a.RecptDate,
                             ReceiptNo = a.RecptNo,
                             ReceiptId = a.RecptID,
                             ProcessId = (int)a.ProcessId,
                             Process = a.Process,
                             DcNumber = a.DcNumber,
                             Company = a.Company,
                             CompanyId = a.CompanyId,
                             CompanyUnitId = a.CompanyUnitID,
                             CompanyUnit = a.CompanyUnit,
                             JobWorkSample = a.Job_Work_Sample,
                             WorkDivId = (int)a.WorkDivID,
                             WorkDiv = a.WorkDivision,
                             Remarks = a.Remarks,
                             JobNo=a.Job_Ord_No,
                             OrdNo=a.Order_No,
                             RefNo=a.Ref_No,
                             Qlty_No=a.Qlty_No
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<ProductionReceiptMainDetail> GetMainDatalist(int ID, string FromDate, string ToDate, string InterExter, string DcNo, int Recptid, string OType, string OrdNo, string Refno, int ProcessId, int processorid)
        {
            var query = (from a in entities.Proc_Apparel_ProductionReceiptMainListload(ID, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), InterExter, DcNo, Recptid, OType, OrdNo, ProcessId, processorid, Refno)
                         select new ProductionReceiptMainDetail
                         {
                             ReceiptDate = (DateTime)a.RecptDate,
                             ReceiptNo = a.RecptNo,
                             ReceiptId = a.RecptID,
                             ProcessId = (int)a.ProcessId,
                             Process = a.Process,
                             DcNumber = a.DcNumber,
                             Company = a.Company,
                             CompanyId = a.CompanyId,
                             CompanyUnitId = a.CompanyUnitID,
                             CompanyUnit = a.CompanyUnit,
                             JobWorkSample = a.Job_Work_Sample,
                             WorkDivId = (int)a.WorkDivID,
                             WorkDiv = a.WorkDivision,
                             Remarks = a.Remarks,
                             JobNo = a.Job_Ord_No,
                             OrdNo = a.Order_No,
                             RefNo = a.Ref_No,
                             Qlty_No = a.Qlty_No
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProdReceiptReason> GetReceiptReasonforEditMode(int ReceiptDetId)
        {
            var query = (from a in entities.Proc_Apparel_GetProdReceiptReason(ReceiptDetId)
                         select new ProdReceiptReason
                         {
                             RecptReasonId = a.RecptReasonId,
                             RecptDetId = (int)a.RecptDetId,
                             ReasonId = (int)a.ReasonId,
                             Reason = a.Reason,
                             Qty = a.Quantity,
                             ReworkProcessid=a.ReworkProcessid,
                             ReworkQty=a.ReworkQty,
                             Process=a.Process
                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<CommonProdReceipt> GetReceiptDetforEditMode(int ReceiptId)
        {
            IQueryable<CommonProdReceipt> query = (from T in entities.Proc_Apparel_GetProdReceptGridDetail(ReceiptId)
                                                   select new CommonProdReceipt
                                                   {
                                                       ReceiptId = ReceiptId,
                                                       ProdPrgDetId = T.ProdPrgDetID,
                                                       ReceptDetId = T.RecptDetId,
                                                       ProdprgNo = T.ProdPrgNo,
                                                       ItemId = (int)T.ItemId,
                                                       Item = T.Item,
                                                       ColorId = (int)T.ColorId,
                                                       Color = T.Color,
                                                       SizeId = (int)T.SizeId,
                                                       Size = T.Size,
                                                       Balance = (decimal)T.Balance,
                                                       ReceivedQty = T.RecptQty,
                                                       RejectionQty = T.RejectedQty,
                                                       Rate = (decimal)T.Rate,
                                                       AppRate=(decimal)T.Apprate,
                                                       UomId = T.uomid,
                                                       Uom = T.UOM,
                                                       JobOrdNo = T.jobno,
                                                       OrdNo = T.OrderNo,
                                                       IssueId = (int)T.IssueId,
                                                       AcceptQty = T.AcceptQty,
                                                       ReworkQty = T.ReworkQty
                                                   }).AsQueryable();
            return query;
        }

        public IQueryable<ProdReceiptReason> GetReasonDetforEditMode(int ReceiptDetId)
        {
            IQueryable<ProdReceiptReason> query = (from T in entities.Proc_Apparel_GetProdReceiptReason(ReceiptDetId)
                                                   select new ProdReceiptReason
                                                   {
                                                       RecptReasonId = T.RecptReasonId,
                                                       RecptDetId = (int)T.RecptDetId,
                                                       Reason = T.Reason,
                                                       ReasonId = (int)T.ReasonId,
                                                       Qty = T.Quantity,
                                                       ReworkProcessid = T.ReworkProcessid,
                                                       ReworkQty = T.ReworkQty,
                                                       Process = T.Process
                                                   }).AsQueryable();
            return query;
        }

        public IQueryable<ProdReceiptMas> GetCommProdReceptHeaderInfo(int ProdRecptId)
        {
            IQueryable<ProdReceiptMas> query = (from T in entities.Proc_Apparel_GetProdReceiptHeaderDet(ProdRecptId)
                                                select new ProdReceiptMas
                                                {
                                                    ReceiptNo = T.RecptNo,
                                                    ReceiptDate = (DateTime)T.RecptDate,
                                                    Remarks = T.Remarks,
                                                    WorkDivisionId = (int)T.WorkDivisionId,
                                                    CompanyId = T.CompanyId,
                                                    ProcessId = (int)T.processid,
                                                    DcNumber = T.DcNumber,
                                                    CompanyUnitId = T.CompanyUnitId,
                                                    InterorExter = T.InternalOrExternal,
                                                    Processor=T.WorkDivision,
                                                    JobWrkSample=T.Job_Work_Sample,
                                                    ParentUnitid = T.Parentstoreid,
                                                    Storetype = T.StoreType,
                                                    StoreName = T.StoreName,
                                                    StoreUnitID = T.StoreUnitId,
                                                    Qlty_No=T.Qlty_No,
                                                    Qlty_date=T.Qlty_date
                                                }).AsQueryable();
            return query;
        }

        public bool GetCommProdReceptItemstock(string ProdRecptNo)
        {
            bool res = false;

            var result = entities.ItemStock.Where(x => x.Transno == ProdRecptNo).FirstOrDefault();
            if (result != null)
            {
                if (result.alloted > 0)
                {
                    res = true;
                }
            }
            else
            {
                res = false;
            }
            return res;
        }
    }
}
