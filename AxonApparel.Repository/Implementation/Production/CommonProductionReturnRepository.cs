using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Data.Entity.Validation;
using System.Data.SqlTypes;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class CommonProductionReturnRepository : ICommonProductionReturnRepository
    {
        ProductionEntities entities = new ProductionEntities();

        public IQueryable<CommonProdReturn> GetCommonProductionMultipleIssueDet(string InterorExter, int CompanyId, int Processorid, string OrderType, int OrdNo, int RefNo, int SupplierId, int StyleId, int IssueId)
        {
            IQueryable<CommonProdReturn> query = (from T in entities.Proc_Apparel_GetProdReturnAddDetails(InterorExter, CompanyId, Processorid, OrderType, OrdNo, RefNo, SupplierId, StyleId, IssueId)
                                                  select new CommonProdReturn
                                                  {
                                                      StyleId = (int)T.Styleid,
                                                      JobOrderNo = T.Job_ord_no,
                                                      ProdPrgId = T.prodprgid,
                                                      ProdPrgNo = T.ProdPrgNo,
                                                      ProdIssueId = T.ProdIssueId,
                                                      ProdIssueNo = T.ProdIssueNo,
                                                      ProdIssueDate = (DateTime)T.ProdIssueDate,
                                                      OrderNo = T.Order_No,
                                                      Style = T.Style,
                                                      Processor = T.Processor,
                                                      Orderqty = (decimal)T.OrderQty,
                                                      Issueqty = (decimal)T.IssueQty,
                                                      Balqty = (decimal)T.BalQty
                                                  }).AsQueryable();
            return query;
        }

        public IQueryable<CommonProdReturn> GetCommonProductionReceiptDet(string ProdIssueId)
        {
            IQueryable<CommonProdReturn> query = (from T in entities.Proc_Apparel_GetProdReturnReceiptList(ProdIssueId)
                                                  select new CommonProdReturn
                                                  {
                                                      StyleId = T.StyleId,
                                                      UomId = T.UomId,
                                                      Balqty = (decimal)T.BalQty,//((decimal)T.IssueQty - (decimal)T.BalQty),
                                                      UnitId = (int)T.UnitId,
                                                      SupplierId = T.SupplierID,
                                                      ProdPrgId = T.ProdPrgid,
                                                      ProdPrgNo = T.ProdPrgNo,
                                                      Prodprgdetid = T.Prodprgdetid,
                                                      Prodissdetid = T.ProdIssueDetId,
                                                      ProcessId = T.ProcessId,
                                                      ProdIssueId = T.IssueId,
                                                      ProdIssueNo = T.IssueNo,
                                                      JobNo = T.JobNo,
                                                      ItemId = T.ItemId,
                                                      ColorId = T.ColorId,
                                                      SizeId = T.SizeId,
                                                      Item = T.Item,
                                                      Color = T.Color,
                                                      Size = T.Size,
                                                      Issueqty = (decimal)T.IssueQty,
                                                      Returnqty = T.ReturnQty,
                                                      RejectQty=0,
                                                      ReworkQty = 0,
                                                  }).AsQueryable();
            return query;
        }

        public IQueryable<CommonProdReturn> GetCommonProdRecptDetEditMode(int ReturnId)
        {
            IQueryable<CommonProdReturn> query = (from T in entities.Proc_Apparel_GetProdReturnReceiptDetails(ReturnId)
                                                  select new CommonProdReturn
                                                  {
                                                      StyleId = T.StyleId,
                                                      UomId = T.UomId,
                                                      ItemStockid=T.ItemStockId,
                                                      UnitId = (int)T.UnitId,
                                                      SupplierId = T.Supplierid,
                                                      ProdPrgId = T.ProdPrgid,
                                                      ProdPrgNo = T.ProdPrgNo,
                                                      Prodprgdetid = T.Prodprgdetid,
                                                      Prodissdetid = T.ProdIssueDetId,
                                                      ProcessId = T.ProcessId,
                                                      ProdIssueId = T.ProdIssueId,
                                                      ProdIssueNo = T.ProdIssueNo,
                                                      JobNo = T.JobNo,
                                                      ItemId = T.ItemId,
                                                      ColorId = T.ColorId,
                                                      SizeId = T.SizeId,
                                                      Item = T.Item,
                                                      Color = T.Color,
                                                      Size = T.Size,
                                                      Issueqty = (decimal)T.IssueQty,
                                                      Returnqty = T.ReturnQty,
                                                      Balqty = (decimal)T.BalQty,
                                                      RejectQty = T.RejectQty,
                                                      ReworkQty = T.ReworkQty,
                                                      ReturnDetID=T.ReturnDetID
                                                  }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.Prod_Return_Reason> GetCommonProdRetReasonEditMode(int ReturnId)
        {
            IQueryable<Domain.Prod_Return_Reason> query = (from a in entities.Proc_Apparel_GetProdReturnRework(ReturnId)
                                                           select new Domain.Prod_Return_Reason
                                                  {
                                                      ReasonId = a.ReasonId,
                                                      ProdPrgDetId = (int)a.ProdPrgDetId,
                                                      Retreasondetid = (int)a.Retreasondetid,
                                                      Reason = a.Reason,
                                                      Quantity = a.Quantity,
                                                      ReworkProcessid = a.ReworkProcessid,
                                                      ReworkQty = a.ReworkQty,
                                                      Process = a.Process
                                                  }).AsQueryable();
            return query;
        }


        public bool UpdateProductionReturn(ProductionReturnMas objUpd)
        {
            bool Res = false;
            int Stockid = 0;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //Update ProdReturnMas 
                    var App = entities.ProdReturnMas.Where(c => c.ReturnID == objUpd.ReturnId).FirstOrDefault();
                    if (App != null)
                    {
                        App.RefNo = objUpd.RefNo;
                        App.Remarks = objUpd.Remarks;
                        App.RefDate = objUpd.RefDate;
                        App.StoreUnitID = objUpd.StoreUnitId;
                    }
                    entities.SaveChanges();

                  


                    if (objUpd.ProdReturnDet != null)
                    {
                        foreach (var prodrturnlst in objUpd.ProdReturnDet)
                        {
                            //Update Return Qty in Prod_Prg_Det 
                            var prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == prodrturnlst.Prodprgdetid).FirstOrDefault();
                            if (prodprgdet != null)
                            {
                                prodprgdet.Return_Qty = prodprgdet.Return_Qty - prodrturnlst.ReturnQty;
                                prodprgdet.Damage_qty = prodprgdet.Damage_qty - prodrturnlst.RejectQty;
                                prodprgdet.ReWorkQty = prodprgdet.ReWorkQty - prodrturnlst.ReworkQty;
                            }
                            entities.SaveChanges();

                            //Update Return Qty in Prod_Iss_Det 
                            var prodissdet = entities.Prod_iss_det.Where(c => c.ProdIssueDetId == prodrturnlst.Prodissdetid).FirstOrDefault();
                            if (prodissdet != null)
                            {
                                prodissdet.ReturnQty = prodissdet.ReturnQty - prodrturnlst.ReturnQty;
                            }
                            entities.SaveChanges();

                           // Update NewStockId in ProdReturnDet
                            var prodreturndet = entities.ProdReturnDet.Where(c => c.ReturnID == objUpd.ReturnId && c.IssueDetID == prodrturnlst.Prodissdetid).FirstOrDefault();
                            if (prodreturndet != null)
                            {
                                prodreturndet.ReturnQty = prodrturnlst.ReturnQty;
                                prodreturndet.RejectQty = prodrturnlst.RejectQty;
                                prodreturndet.ReworkQty = prodrturnlst.ReworkQty;
                            }
                            entities.SaveChanges();

                        }

                    }

                    //delete ProdReturnMas Many Rows table
                    var PRMas = entities.ProdReturnMas.Where(c => c.ReturnID == objUpd.ReturnId).FirstOrDefault();
                    if (PRMas != null)
                    {
                        var deleteprodItemStock = entities.ItemStock.Where(d => d.Transno == PRMas.ReturnNo).ToList<ProductionItemStock>();
                        deleteprodItemStock.ForEach(c => entities.ItemStock.Remove(c));
                        entities.SaveChanges();
                    }


                    if (objUpd.ProdReturnDet != null && objUpd.ProdReturnDet.Count > 0)
                    {
                        //foreach (var item in objUpd.ProdReturnDet)
                        //{
                        //    var ProdPrgDet = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == item.Prodprgdetid
                        //        && c.Itemid == item.ItemId && c.Colorid == item.colorId && c.Sizeid == item.SizeId).FirstOrDefault();
                        //    if (ProdPrgDet != null)
                        //    {
                        //        ProdPrgDet.Return_Qty = ((ProdPrgDet.Return_Qty == null ? 0 : ProdPrgDet.Return_Qty) - (item.ReturnQty == 0 ? ProdPrgDet.Return_Qty : item.ReturnQty));
                        //    }

                        //    var ProdIssDet = entities.Prod_iss_det.Where(c => c.ProdIssueDetId == item.Prodissdetid).FirstOrDefault();
                        //    if (ProdIssDet != null)
                        //    {
                        //        ProdIssDet.ReturnQty = ((ProdIssDet.ReturnQty == null ? 0 : ProdIssDet.ReturnQty) - (item.ReturnQty == 0 ? ProdIssDet.ReturnQty : item.ReturnQty));
                        //    }

                        //    var IssueStock = entities.ItemStock.Where(c => c.StockId == item.IssStockId).FirstOrDefault();
                        //    if (IssueStock != null)
                        //    {
                        //        IssueStock.qty = item.ReturnQty;
                        //        IssueStock.balQty = (item.ReturnQty - IssueStock.alloted);
                        //    }

                        //    //Update NewStockId in ProdReturnDet
                        //    var prodreturndet = entities.ProdReturnDet.Where(c => c.ReturnID == objUpd.ReturnId).FirstOrDefault();
                        //    if (prodreturndet != null)
                        //    {
                        //        prodreturndet.ReturnQty = item.ReturnQty;
                        //    }
                        //    entities.SaveChanges();
                        //}



                        foreach (var item in objUpd.ProdReturnDet)
                        {
                            var ProdPrgDet = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == item.Prodprgdetid
                                && c.Itemid == item.ItemId && c.Colorid == item.colorId && c.Sizeid == item.SizeId).FirstOrDefault();
                            if (ProdPrgDet != null)
                            {
                                ProdPrgDet.Return_Qty = ((ProdPrgDet.Return_Qty == null ? 0 : ProdPrgDet.Return_Qty) + item.ReturnQty);
                                //ProdPrgDet.Return_Qty = item.ReturnQty;
                            }
                            entities.SaveChanges();

                            var ProdIssDet = entities.Prod_iss_det.Where(c => c.ProdIssueDetId == item.Prodissdetid).FirstOrDefault();
                            if (ProdIssDet != null)
                            {
                                ProdIssDet.ReturnQty = ((ProdIssDet.ReturnQty == null ? 0 : ProdIssDet.ReturnQty) + item.ReturnQty);
                                //ProdIssDet.ReturnQty =  item.ReturnQty;
                            }
                            entities.SaveChanges();

                            //var IssueStock = entities.ItemStock.Where(c => c.StockId == item.ItemStockid).FirstOrDefault();
                            //if (IssueStock != null)
                            //{
                            //    IssueStock.qty = item.ReturnQty;
                            //    IssueStock.balQty = (item.ReturnQty - IssueStock.alloted);
                            //}

                            //Update NewStockId in ProdReturnDet
                            //var prodreturndet = entities.ProdReturnDet.Where(c => c.ReturnID == objUpd.ReturnId
                            //    && c.ItemId == item.ItemId && c.ColorId == item.colorId && c.SizeId == item.SizeId && c.NewStockID==item.ItemStockid).FirstOrDefault();
                            //if (prodreturndet != null)
                            //{
                            //    prodreturndet.ReturnQty = item.ReturnQty;
                            //}
                            //entities.SaveChanges();

                            var reasondelete = entities.Prod_Return_Reason.Where(c => c.RecptId == objUpd.ReturnId && c.ProdPrgDetId == item.Prodprgdetid).ToList();
                            ///rework program delete
                            foreach (var itemreason in reasondelete)
                            {
                                if (itemreason.ReworkProcessid > 0)
                                {
                                    var delprgm = entities.Proc_GenerateproductionProgramforReturnRework_Delete(item.JobNo, itemreason.ReworkProcessid, "W", objUpd.CreatedBy, item.ReturnDetId);
                                    entities.SaveChanges();
                                }
                            }


                            //delete Prod_Recpt_Reason Many Rows table
                            var PRR = entities.Prod_Return_Reason.Where(c => c.RecptId == objUpd.ReturnId).ToList();
                            if (PRR != null)
                            {
                                var deleteprodReson = entities.Prod_Return_Reason.Where(d => d.RecptId == objUpd.ReturnId && d.ProdPrgDetId == item.Prodprgdetid).ToList<Prod_Return_Reason>();
                                deleteprodReson.ForEach(c => entities.Prod_Return_Reason.Remove(c));
                                entities.SaveChanges();
                            }

                        }

                       


                    }




                   // var proddet = entities.ProdReturnDet.Where(c => c.ReturnID == objUpd.ReturnId).ToList();

                    foreach (var item in objUpd.ProdReturnDet)
                    {
                        var ItemStockList = new List<Repository.ProductionItemStock>();
                        var itemrate = entities.Proc_Apparel_GetStockRate(item.Prodissdetid).FirstOrDefault();
                        //Insert into ItemStock
                        ItemStockList.Add(new Repository.ProductionItemStock
                        {
                            UnitId = itemrate.UnitId,
                            Itemid = item.ItemId,
                            Colorid = item.colorId,
                            sizeid = item.SizeId,
                            qty = item.ReturnQty,
                            balQty = item.ReturnQty,
                            alloted = 0,
                            processId = item.ProcessId,
                            joborderNo = item.JobNo,
                            TransType = "PDR",
                            ItemCat = "P",
                            Transno = objUpd.ReturnNo,
                            purorprod = "RR",
                            BundleNo = "",
                            FabricGSM = "",
                            transdate = objUpd.ReturnDate,
                            companyid = objUpd.CompanyId,
                            supplierid = objUpd.WorkDivId,
                            uomid = item.UomId,
                            Styleid = item.StyleId,
                            unit_or_other = "W",
                            CatType = "",
                            ItemCode = "",
                            StoreUnitID = objUpd.StoreUnitId,
                            StockDate = objUpd.ReturnDate,
                            StockType = "S",
                            Rate = itemrate.Rate,
                            Markup_Rate = itemrate.Markup_Rate,
                        });

                        foreach (var prodrturnlst in ItemStockList)
                        {
                            entities.ItemStock.Add(prodrturnlst);
                            entities.SaveChanges();
                            Stockid = prodrturnlst.StockId;
                        }

                        //Update NewStockId in ProdReturnDet
                        var prodreturndet = entities.ProdReturnDet.Where(c => c.ReturnDetID ==item.ReturnDetId).FirstOrDefault();
                        if (prodreturndet != null)
                        {
                            prodreturndet.NewStockID = Stockid;
                        }
                        entities.SaveChanges();

                        var updpgmqty = entities.Proc_Apparel_GetQtyDetforReturn(item.Prodissdetid).FirstOrDefault();
                        var prgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == updpgmqty.Prodprgdetid).FirstOrDefault();
                        prgdet.Damage_qty = updpgmqty.RejectQty;
                        prgdet.Return_Qty = updpgmqty.ReturnQty;
                        prgdet.ReWorkQty = updpgmqty.ReworkQty;

                        entities.SaveChanges();

                       // ProdRetDetList = new List<Repository.ProdReturnDet>();
                        ItemStockList = new List<Repository.ProductionItemStock>();

                    }


                    var ProdRetReasonList = new List<Prod_Return_Reason>();

                    if (objUpd.Prodretreason != null && objUpd.Prodretreason.Count > 0)
                    {
                        ProdRetReasonList = new List<Prod_Return_Reason>();
                        foreach (var itemreason in objUpd.Prodretreason)
                        {
                            ProdRetReasonList.Add(new Repository.Prod_Return_Reason
                            {
                                RecptId = objUpd.ReturnId,
                                ProdPrgDetId = itemreason.ProdPrgDetId,
                                ReasonId = itemreason.ReasonId,
                                Quantity = itemreason.Quantity,
                                RType = "R",
                                ReworkProcessid = itemreason.ReworkProcessid,
                                ReworkQty = itemreason.ReworkQty,
                            });
                        }

                        foreach (var prodrecptitemReasonlst in ProdRetReasonList)
                        {
                            entities.Prod_Return_Reason.Add(prodrecptitemReasonlst);
                            entities.SaveChanges();
                        }
                    }


                    if (objUpd.ProdReturnDet != null && objUpd.ProdReturnDet.Count > 0)
                    {

                        foreach (var item in objUpd.ProdReturnDet)
                        {
                            var rejlist = entities.Prod_Return_Reason.Where(p => p.RecptId == objUpd.ReturnId && p.ProdPrgDetId == item.Prodprgdetid && p.Quantity > 0).ToList();
                            var rwklist = entities.Prod_Return_Reason.Where(p => p.RecptId == objUpd.ReturnId && p.ProdPrgDetId == item.Prodprgdetid && p.ReworkQty > 0).ToList();

                            var reasonItemStockList = new List<Repository.ProductionItemStock>();

                            if (rejlist != null)
                            {
                                foreach (var rej in rejlist)
                                {
                                    var itemrate = entities.Proc_Apparel_GetStockRate(item.Prodissdetid).FirstOrDefault();
                                    reasonItemStockList.Add(new Repository.ProductionItemStock
                                    {
                                        UnitId = itemrate.UnitId,
                                        Itemid = item.ItemId,
                                        Colorid = item.colorId,
                                        sizeid = item.SizeId,
                                        qty = rej.Quantity,
                                        balQty = rej.Quantity,
                                        alloted = 0,
                                        processId = item.ProcessId,
                                        joborderNo = item.JobNo,
                                        TransType = "PDR",
                                        ItemCat = "P",
                                        Transno = objUpd.ReturnNo,
                                        purorprod = "RD",
                                        BundleNo = "",
                                        FabricGSM = "",
                                        transdate = objUpd.ReturnDate,
                                        companyid = objUpd.CompanyId,
                                        supplierid = objUpd.WorkDivId,
                                        uomid = item.UomId,
                                        Styleid = item.StyleId,
                                        unit_or_other = "W",
                                        CatType = "",
                                        ItemCode = "",
                                        StoreUnitID = objUpd.StoreUnitId,
                                        StockDate = objUpd.ReturnDate,
                                        StockType = "S",
                                        Rate = itemrate.Rate,
                                        Markup_Rate = itemrate.Markup_Rate,
                                    });
                                }

                            }


                            if (rwklist != null)
                            {
                                foreach (var rwk in rwklist)
                                {
                                    var itemrate = entities.Proc_Apparel_GetStockRate(item.Prodissdetid).FirstOrDefault();
                                    reasonItemStockList.Add(new Repository.ProductionItemStock
                                    {
                                        UnitId = itemrate.UnitId,
                                        Itemid = item.ItemId,
                                        Colorid = item.colorId,
                                        sizeid = item.SizeId,
                                        qty = (decimal)rwk.ReworkQty,
                                        balQty = (decimal)rwk.ReworkQty,
                                        alloted = 0,
                                        processId = item.ProcessId,
                                        joborderNo = item.JobNo,
                                        TransType = "PDR",
                                        ItemCat = "P",
                                        Transno = objUpd.ReturnNo,
                                        purorprod = "RE",
                                        BundleNo = "",
                                        FabricGSM = "",
                                        transdate = objUpd.ReturnDate,
                                        companyid = objUpd.CompanyId,
                                        supplierid = objUpd.WorkDivId,
                                        uomid = item.UomId,
                                        Styleid = item.StyleId,
                                        unit_or_other = "W",
                                        CatType = "",
                                        ItemCode = "",
                                        StoreUnitID = objUpd.StoreUnitId,
                                        StockDate = objUpd.ReturnDate,
                                        StockType = "S",
                                        Rate = itemrate.Rate,
                                        Markup_Rate = itemrate.Markup_Rate,
                                    });
                                }

                            }

                            foreach (var prodrturnlst in reasonItemStockList)
                            {
                                entities.ItemStock.Add(prodrturnlst);
                                entities.SaveChanges();
                                Stockid = prodrturnlst.StockId;
                            }

                            var retdetid = entities.ProdReturnDet.Where(d => d.ReturnID == objUpd.ReturnId && d.ItemId == item.ItemId && d.ColorId == item.colorId && d.SizeId == item.SizeId && d.IssueDetID == item.Prodissdetid).FirstOrDefault();

                            var reasonupd = entities.Prod_Return_Reason.Where(c => c.RecptId == objUpd.ReturnId && c.ProdPrgDetId == item.Prodprgdetid).ToList();

                            foreach (var itemreason in reasonupd)
                            {
                                if (itemreason.ReworkProcessid > 0)
                                {
                                    var delprgm = entities.Proc_GenerateproductionProgramforReturnRework_Update(item.JobNo, itemreason.ReworkProcessid, "W", objUpd.CreatedBy, retdetid.ReturnDetID);
                                    entities.SaveChanges();
                                }
                            }
                           
                        }


                       


                    }



                    //The Transaction will be completed
                    txscope.Complete();
                    Res = true;
                    return Res;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
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
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool AddProductionReturn(ProductionReturnMas objAdd)
        {
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int Stockid = 0;
                    int ProdRetDetId = 0;
                    var ProdRetMas = new Repository.ProdReturnMas();
                    var ProdRetDetList = new List<Repository.ProdReturnDet>();
                    var ItemStockList = new List<Repository.ProductionItemStock>();

                    ProdRetMas.ReturnNo = objAdd.ReturnNo;
                    ProdRetMas.ReturnDate = objAdd.ReturnDate;
                    ProdRetMas.RefNo = objAdd.RefNo;
                    ProdRetMas.RefDate = objAdd.RefDate;
                    ProdRetMas.CompanyId = objAdd.CompanyId;
                    ProdRetMas.ProcessID = objAdd.ProcessId;
                    ProdRetMas.WorkDivID = objAdd.WorkDivId;
                    ProdRetMas.Remarks = objAdd.Remarks;
                    ProdRetMas.InternalOrExternal = objAdd.InterExter;
                    ProdRetMas.StoreUnitID = (objAdd.StoreUnitId == 0 ? null : objAdd.StoreUnitId);
                    ProdRetMas.IssueType = objAdd.IssueType;

                    entities.ProdReturnMas.Add(ProdRetMas);
                    entities.SaveChanges();

                    var retid = ProdRetMas.ReturnID;

                    if (objAdd.ProdReturnDet != null && objAdd.ProdReturnDet.Count > 0)
                    {
                        foreach (var item in objAdd.ProdReturnDet)
                        {
                            if (item.ReturnQty > 0)
                            {
                                ProdRetDetList.Add(new Repository.ProdReturnDet
                                {
                                    ReturnID = ProdRetMas.ReturnID,
                                    ItemId = item.ItemId,
                                    ColorId = item.colorId,
                                    SizeId = item.SizeId,
                                    ReturnQty = item.ReturnQty,
                                    Bundled = "N",
                                    ProdPrgNo = item.ProdPrgNo,
                                    IssueDetID = item.Prodissdetid,
                                    RejectQty=item.RejectQty,
                                    ReworkQty=item.ReworkQty
                                });

                                //Update Prod_Prg_Det Return Qty
                                var prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == item.Prodprgdetid).FirstOrDefault();
                                if (prodprgdet != null)
                                {
                                    prodprgdet.Return_Qty = ((prodprgdet.Return_Qty == null ? 0 : prodprgdet.Return_Qty) + item.ReturnQty);
                                    prodprgdet.Damage_qty = ((prodprgdet.Damage_qty == null ? 0 : prodprgdet.Damage_qty) + item.RejectQty);
                                    prodprgdet.ReWorkQty = ((prodprgdet.ReWorkQty == null ? 0 : prodprgdet.ReWorkQty) + item.ReworkQty);
                                }
                                entities.SaveChanges();

                                //Update Prod_Iss_Det Return qty
                                var prodissdet = entities.Prod_iss_det.Where(c => c.ProdIssueDetId == item.Prodissdetid).FirstOrDefault();
                                if (prodissdet != null)
                                {
                                    prodissdet.ReturnQty = ((prodissdet.ReturnQty == null ? 0 : prodissdet.ReturnQty) + item.ReturnQty);
                                  
                                }
                                entities.SaveChanges();

                                foreach (var prodrturnlst in ProdRetDetList)
                                {
                                    entities.ProdReturnDet.Add(prodrturnlst);
                                    entities.SaveChanges();

                                    ProdRetDetId = prodrturnlst.ReturnDetID;
                                    //int Stockid=AddItemStock(objAdd, ProdRetDetId);
                                }

                                var itemrate = entities.Proc_Apparel_GetStockRate(item.Prodissdetid).FirstOrDefault();

                                //Insert into ItemStock
                                ItemStockList.Add(new Repository.ProductionItemStock
                                {
                                    UnitId = itemrate.UnitId,
                                    Itemid = item.ItemId,
                                    Colorid = item.colorId,
                                    sizeid = item.SizeId,
                                    qty = item.ReturnQty,
                                    balQty = item.ReturnQty,
                                    alloted = 0,
                                    processId = item.ProcessId,
                                    joborderNo = item.JobNo,
                                    TransType = "PDR",
                                    ItemCat = "P",
                                    Transno = objAdd.ReturnNo,
                                    purorprod = "RR",
                                    BundleNo = "",
                                    FabricGSM = "",
                                    transdate = objAdd.ReturnDate,
                                    companyid = objAdd.CompanyId,
                                    supplierid = objAdd.WorkDivId,
                                    uomid = item.UomId,
                                    Styleid = item.StyleId,
                                    unit_or_other = "W",
                                    CatType = "",
                                    ItemCode = "",
                                    StoreUnitID = objAdd.StoreUnitId,
                                    StockDate = objAdd.ReturnDate,
                                    StockType = "S",
                                    Rate = itemrate.Rate,
                                    Markup_Rate = itemrate.Markup_Rate,
                                });

                                foreach (var prodrturnlst in ItemStockList)
                                {
                                    entities.ItemStock.Add(prodrturnlst);
                                    entities.SaveChanges();
                                    Stockid = prodrturnlst.StockId;
                                }

                                //Update NewStockId in ProdReturnDet
                                var prodreturndet = entities.ProdReturnDet.Where(c => c.ReturnDetID == ProdRetDetId).FirstOrDefault();
                                if (prodreturndet != null)
                                {
                                    prodreturndet.NewStockID = Stockid;
                                }
                                entities.SaveChanges();

                                ProdRetDetList = new List<Repository.ProdReturnDet>();
                                ItemStockList = new List<Repository.ProductionItemStock>();
                            }
                        }
                    }

                    var ProdRetReasonList = new List<Prod_Return_Reason>();

                    if (objAdd.Prodretreason != null && objAdd.Prodretreason.Count > 0)
                    {
                        ProdRetReasonList = new List<Prod_Return_Reason>();
                        foreach (var itemreason in objAdd.Prodretreason)
                        {
                            //if (itemreason.RecptDetId == item.RecptDetID)
                            //{

                           // if (itemreason.ProdPrgDetId == item.RecptDetID)
                           // {
                            ProdRetReasonList.Add(new Repository.Prod_Return_Reason
                                {
                                    RecptId = retid,
                                    ProdPrgDetId = itemreason.ProdPrgDetId,
                                    ReasonId = itemreason.ReasonId,
                                    Quantity = itemreason.Quantity,
                                    RType = "R",
                                    ReworkProcessid = itemreason.ReworkProcessid,
                                    ReworkQty = itemreason.ReworkQty,
                                });
                           // }
                            //}
                        }

                        foreach (var prodrecptitemReasonlst in ProdRetReasonList)
                        {
                            entities.Prod_Return_Reason.Add(prodrecptitemReasonlst);
                            entities.SaveChanges();
                        }



                        if (objAdd.ProdReturnDet != null && objAdd.ProdReturnDet.Count > 0)
                        {

                            foreach (var item in objAdd.ProdReturnDet)
                            {
                                var rejlist = entities.Prod_Return_Reason.Where(p => p.RecptId == retid && p.ProdPrgDetId == item.Prodprgdetid && p.Quantity > 0).ToList();
                                var rwklist = entities.Prod_Return_Reason.Where(p => p.RecptId == retid && p.ProdPrgDetId == item.Prodprgdetid && p.ReworkQty > 0).ToList();

                                var reasonItemStockList = new List<Repository.ProductionItemStock>();

                                if (rejlist != null)
                                {
                                    foreach (var rej in rejlist)
                                    {
                                        var itemrate = entities.Proc_Apparel_GetStockRate(item.Prodissdetid).FirstOrDefault();

                                        reasonItemStockList.Add(new Repository.ProductionItemStock
                                         {
                                             UnitId = itemrate.UnitId,
                                             Itemid = item.ItemId,
                                             Colorid = item.colorId,
                                             sizeid = item.SizeId,
                                             qty = rej.Quantity,
                                             balQty = rej.Quantity,
                                             alloted = 0,
                                             processId = item.ProcessId,
                                             joborderNo = item.JobNo,
                                             TransType = "PDR",
                                             ItemCat = "P",
                                             Transno = objAdd.ReturnNo,
                                             purorprod = "RD",
                                             BundleNo = "",
                                             FabricGSM = "",
                                             transdate = objAdd.ReturnDate,
                                             companyid = objAdd.CompanyId,
                                             supplierid = objAdd.WorkDivId,
                                             uomid = item.UomId,
                                             Styleid = item.StyleId,
                                             unit_or_other = "W",
                                             CatType = "",
                                             ItemCode = "",
                                             StoreUnitID = objAdd.StoreUnitId,
                                             StockDate = objAdd.ReturnDate,
                                             StockType = "S",
                                             Rate = itemrate.Rate,
                                             Markup_Rate = itemrate.Markup_Rate,
                                         });
                                    }

                                }


                                if (rwklist != null)
                                {
                                    foreach (var rwk in rwklist)
                                    {
                                        var itemrate = entities.Proc_Apparel_GetStockRate(item.Prodissdetid).FirstOrDefault();
                                        reasonItemStockList.Add(new Repository.ProductionItemStock
                                        {
                                            UnitId = itemrate.UnitId,
                                            Itemid = item.ItemId,
                                            Colorid = item.colorId,
                                            sizeid = item.SizeId,
                                            qty = (decimal)rwk.ReworkQty,
                                            balQty = (decimal)rwk.ReworkQty,
                                            alloted = 0,
                                            processId = item.ProcessId,
                                            joborderNo = item.JobNo,
                                            TransType = "PDR",
                                            ItemCat = "P",
                                            Transno = objAdd.ReturnNo,
                                            purorprod = "RE",
                                            BundleNo = "",
                                            FabricGSM = "",
                                            transdate = objAdd.ReturnDate,
                                            companyid = objAdd.CompanyId,
                                            supplierid = objAdd.WorkDivId,
                                            uomid = item.UomId,
                                            Styleid = item.StyleId,
                                            unit_or_other = "W",
                                            CatType = "",
                                            ItemCode = "",
                                            StoreUnitID = objAdd.StoreUnitId,
                                            StockDate = objAdd.ReturnDate,
                                            StockType="S",
                                            Rate = itemrate.Rate,
                                            Markup_Rate = itemrate.Markup_Rate,
                                        });
                                    }

                                }

                                foreach (var prodrturnlst in reasonItemStockList)
                                {
                                    entities.ItemStock.Add(prodrturnlst);
                                    entities.SaveChanges();
                                    Stockid = prodrturnlst.StockId;
                                }

                                var retdetid = entities.ProdReturnDet.Where(d => d.ReturnID == retid && d.ItemId == item.ItemId && d.ColorId == item.colorId && d.SizeId == item.SizeId && d.IssueDetID == item.Prodissdetid).FirstOrDefault();

                                var reasonupd = entities.Prod_Return_Reason.Where(c => c.RecptId == retid && c.ProdPrgDetId == item.Prodprgdetid).ToList();

                                foreach (var itemreason in reasonupd)
                                {
                                    if (itemreason.ReworkProcessid > 0)
                                    {
                                        var delprgm = entities.Proc_GenerateproductionProgramforReturnRework_Update(item.JobNo, itemreason.ReworkProcessid, "W", objAdd.CreatedBy, retdetid.ReturnDetID);
                                        entities.SaveChanges();
                                    }
                                }

                            }
                        }


                    }




                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
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
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool DeleteReturn(int id, List<ProductionReturnDet> returndetail)
        {
            var Result = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //Reverse Retun qty in Prod_Prg_det and Prod_iss_det
                    if (returndetail != null)
                    {
                        foreach (var prodrturnlst in returndetail)
                        {
                            //Update Return Qty in Prod_Prg_Det 
                            var prodprgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == prodrturnlst.Prodprgdetid).FirstOrDefault();
                            if (prodprgdet != null)
                            {
                                prodprgdet.Return_Qty = prodprgdet.Return_Qty - prodrturnlst.ReturnQty;
                            }
                            entities.SaveChanges();

                            //Update Return Qty in Prod_Iss_Det 
                            var prodissdet = entities.Prod_iss_det.Where(c => c.ProdIssueDetId == prodrturnlst.Prodissdetid).FirstOrDefault();
                            if (prodissdet != null)
                            {
                                prodissdet.ReturnQty = prodissdet.ReturnQty - prodrturnlst.ReturnQty;
                            }
                            entities.SaveChanges();



                            var reasondelete = entities.Prod_Return_Reason.Where(c => c.RecptId == id && c.ProdPrgDetId == prodrturnlst.Prodprgdetid).ToList();
                            ///rework program delete
                            foreach (var itemreason in reasondelete)
                            {
                                if (itemreason.ReworkProcessid > 0)
                                {
                                    var delprgm = entities.Proc_GenerateproductionProgramforReturnRework_Delete(prodrturnlst.JobNo, itemreason.ReworkProcessid, "W", 1, prodrturnlst.ReturnDetId);
                                    entities.SaveChanges();
                                }
                            }

                        }

                    }

                    //delete ProdReturnMas Many Rows table
                    var PRMas = entities.ProdReturnMas.Where(c => c.ReturnID == id).FirstOrDefault();
                    if (PRMas != null)
                    {
                        var deleteprodItemStock = entities.ItemStock.Where(d => d.Transno == PRMas.ReturnNo).ToList<ProductionItemStock>();
                        deleteprodItemStock.ForEach(c => entities.ItemStock.Remove(c));
                        entities.SaveChanges();


                        //delete ProdReturnDet Many Rows table
                        var PRD = entities.ProdReturnMas.Where(c => c.ReturnID == id).FirstOrDefault();
                        if (PRD != null)
                        {
                            var deleteprodReturnDet = entities.ProdReturnDet.Where(d => d.ReturnID == PRD.ReturnID).ToList<ProdReturnDet>();
                            deleteprodReturnDet.ForEach(c => entities.ProdReturnDet.Remove(c));
                            entities.SaveChanges();
                        }

                        //delete Prod_Recpt_Reason Many Rows table
                        var PRR = entities.Prod_Return_Reason.Where(c => c.RecptId == PRD.ReturnID).ToList();
                        if (PRR != null)
                        {
                            var deleteprodReson = entities.Prod_Return_Reason.Where(d => d.RecptId == PRD.ReturnID).ToList<Prod_Return_Reason>();
                            deleteprodReson.ForEach(c => entities.Prod_Return_Reason.Remove(c));
                            entities.SaveChanges();
                        }

                        entities.ProdReturnMas.Remove(PRMas);
                        entities.SaveChanges();
                    }

                    if (returndetail != null)
                    {
                        foreach (var prodrturnlst in returndetail)
                        {

                            var updpgmqty = entities.Proc_Apparel_GetQtyDetforReturn(prodrturnlst.Prodissdetid).FirstOrDefault();
                            var prgdet = entities.Prod_Prg_Det.Where(c => c.Prodprgdetid == updpgmqty.Prodprgdetid).FirstOrDefault();
                            prgdet.Damage_qty = updpgmqty.RejectQty;
                            prgdet.Return_Qty = updpgmqty.ReturnQty;
                            prgdet.ReWorkQty = updpgmqty.ReworkQty;

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

        public IList<ProductionReturnMainDetail> GetMainData(int ID, string FromDate, string ToDate, string InterExter, string OrderNo, int ProcessId, string RefNo, int ReturnId, string PrgNo, string OType)
        {
            var query = (from a in entities.Proc_Apparel_ProductionReturnMainList(ID, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), InterExter, OrderNo, ProcessId, RefNo, ReturnId, PrgNo, OType)
                         select new ProductionReturnMainDetail
                         {
                             ReturnDate = (DateTime)a.ReturnDate,
                             ReturnNo = a.ReturnNo,
                             OrderNo = a.Order_No,
                             ReturnId = a.ReturnId,
                             RefNo = a.RefNo,
                             RefDate = (DateTime)a.RefDate,
                             ProcessId = (int)a.ProcessId,
                             Process = a.Process,
                             ProgramNo = a.PrgNo,
                             WorkDivision = a.WorkDivision,
                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<ProductionReturnMas> GetCommonProductionHeaderInfo(int ReturnId)
        {
            IQueryable<ProductionReturnMas> query = (from T in entities.Proc_Apparel_ProductionReturnHeaderInfo(ReturnId)
                                                     select new ProductionReturnMas
                                                     {
                                                         ReturnId = T.ReturnID,
                                                         ReturnNo = T.ReturnNo,
                                                         ReturnDate = (DateTime)T.ReturnDate,
                                                         RefDate = (DateTime)T.RefDate,
                                                         RefNo = T.RefNo,
                                                         CompanyId = (int)T.CompanyId,
                                                         ProcessId = (int)T.ProcessID,
                                                         StoreUnitId = T.StoreUnitID,
                                                         Remarks = T.Remarks,
                                                         WorkDivId = (int)T.WorkDivID,
                                                         Processor=T.WorkDivision
                                                     }).AsQueryable();
            return query;
        }
    }
}
