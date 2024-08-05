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
    public class DespatchBuyerOrderRepository : IDespatchBuyerOrderRepository
    {
        ProductionEntities entities = new ProductionEntities();

        public IQueryable<DespatchAddGridDetail> GetDespatchAddGridDet(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid)
        {
            IQueryable<DespatchAddGridDetail> query = (from T in entities.Proc_Apparel_GetDespatchAddGridDetail(CompanyId, OrderType, RefNo, storeid, OrderNo, Buyerid)
                                                       select new DespatchAddGridDetail
                                                       {
                                                           ShipRowID = T.ShiprowID,
                                                           BuyOrdShip = T.Buy_ord_Ship,
                                                           Buyer = T.Buyer,
                                                           OrderNo = T.Order_No,
                                                           RefNo = T.Ref_No,
                                                           Style = T.style,
                                                           Destination = T.country,
                                                           ShipDate = (DateTime)T.ShipDate,
                                                           ProductionQty = (decimal)T.ProductionQty,
                                                           BalanceQty = (decimal)T.BalanceQty,
                                                       }).AsQueryable();
            return query;
        }

        public IQueryable<DespatchInnerDetail> GetDespatchInnerHeaderInfo(int ShipRowId)
        {
            ProductionEntities entities = new ProductionEntities();

            IQueryable<DespatchInnerDetail> query = (from S in entities.Proc_Apparel_GetDespatchInnerHeaderDet(ShipRowId)
                                                     select new DespatchInnerDetail
                                                     {
                                                         //ShipRowID = S.Shiprowid,
                                                         OrderNo = S.order_no,
                                                         Buyer = S.Buyer,
                                                         BuyerID = (int)S.buyerid,
                                                         RefNo = S.ref_no,
                                                         Style = S.Style,
                                                         StyleID = S.Styleid,
                                                         DestinationID = S.countryid,
                                                         //Merchendiser = S.Merchandiser,
                                                         MerchendiserId = (int)S.Merchandiserid,
                                                         System = S.System,
                                                         SystemId = S.SystemId,
                                                         MOSid = S.Mode_of_Shipmentid,
                                                         ShipMode = S.mode_of_shipment,
                                                         Company = S.Company,
                                                         CompanyID = (int)S.CompanyId,
                                                         ShipDate = (DateTime)S.Ship_date,
                                                         // Manager=S.Manager,
                                                         ManagerID = (int)S.Managerid,
                                                         BuyOrdShip = S.Buy_Ord_Ship,
                                                     }).AsQueryable();
            return query;
        }

        public IQueryable<DespatchInnerDetail> GetDespatchInnerItemDetail(int ShipRowId, string OrderNo, string ShipNo)
        {
            ProductionEntities entities = new ProductionEntities();

            IQueryable<DespatchInnerDetail> query = (from T in entities.Proc_Apparel_GetDespatchInnerItemDet(ShipRowId, OrderNo, ShipNo)
                                                     select new DespatchInnerDetail
                                                     {
                                                         Sno = (long)T.Sno,
                                                         DespatchDetId = T.DespatchDetId,
                                                         ItemId = T.itemid,
                                                         Item = T.Item,
                                                         Color = T.Color,
                                                         ColorId = T.colorid,
                                                         Size = T.size,
                                                         SizeId = T.sizeid,
                                                         IsDecimal = T.isdecimal,
                                                         Quantity = (decimal)T.Quantity,
                                                         Productionqty = (decimal)T.ProductionQty,
                                                         BalQty = (decimal)T.BalQty,
                                                         Rate = (decimal)T.Rate,
                                                         DespatchQty = T.DespatchQty,
                                                     }).AsQueryable();
            return query;
        }

        public bool AddDespatch(Domain.DespatchMas objAdd)
        {
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int DespatchDetId = 0;
                    var DespatchMas = new Repository.DespatchMas();
                    var DespatchDetList = new List<Repository.DespatchDet>();
                    var DespatchStockList = new List<Repository.DespatchStock>();
                    var ItemStockList = new List<Repository.ItemStock>();

                    DespatchMas.DespatchNo = objAdd.DespatchNo;
                    DespatchMas.DespatchDate = objAdd.DespatchDate;
                    DespatchMas.CompanyId = objAdd.CompanyId;
                    DespatchMas.Order_No = objAdd.OrderNo;
                    DespatchMas.StyleId = objAdd.StyleId;
                    DespatchMas.Buy_Ord_Ship = objAdd.BuyOrdShip;
                    DespatchMas.ShipmentMode = objAdd.ShipMode;
                    DespatchMas.SystemId = objAdd.SystemId;
                    DespatchMas.ShipmentType = objAdd.ShipType;
                    DespatchMas.DocRefNo = objAdd.DocRefNo;
                    DespatchMas.DocRefDate = objAdd.DocRefDate;
                    DespatchMas.InvRefNo = objAdd.InvRefNo;
                    DespatchMas.InvRefDate = objAdd.InvRefDate;
                    DespatchMas.IssueStoreid = objAdd.IssStoreId;
                    DespatchMas.OrderType = objAdd.OrderType;
                    DespatchMas.PreCarriageby = objAdd.PreCarrBy;
                    DespatchMas.PlaceofReceipt = objAdd.PlaceofRecpt;
                    DespatchMas.VesselFlight = objAdd.VesselFlightNo;
                    DespatchMas.MarksNos = objAdd.MarksNo;
                    DespatchMas.PortOfDischargeID = objAdd.PortofDischargeId;
                    DespatchMas.Cartons = objAdd.Cartons;
                    DespatchMas.CreatedBy = objAdd.CreatedBy;
                    DespatchMas.CBMQty = objAdd.CBMQty;
                    DespatchMas.SupplierID = objAdd.SupplierId;
                    DespatchMas.SalesInvid = objAdd.SalesInvid;

                    entities.DespatchMas.Add(DespatchMas);
                    entities.SaveChanges();

                    //Insert into DespatchDet
                    if (objAdd.DespatchDet != null && objAdd.DespatchDet.Count > 0)
                    {
                        foreach (var item in objAdd.DespatchDet)
                        {
                            if (item.DespatchQty > 0)
                            {
                                DespatchDetList.Add(new Repository.DespatchDet
                                {
                                    DespatchId = DespatchMas.DespatchId,
                                    ItemId = item.ItemId,
                                    ColorId = item.ColorId,
                                    Sizeid = item.SizeId,
                                    DispatchQty = item.DespatchQty,
                                    SalesRate = item.Rate,
                                });

                                foreach (var detlst in DespatchDetList)
                                {
                                    entities.DespatchDet.Add(detlst);
                                    entities.SaveChanges();

                                    DespatchDetId = detlst.DespatchDetId;
                                }

                                //Insert into DespatchStock
                                foreach (var stck in objAdd.DespatchStock)
                                {
                                    if (stck.DespatchQty > 0 && stck.ItemId == item.ItemId && stck.ColorId == item.ColorId && stck.SizeId == item.SizeId)
                                    {
                                        DespatchStockList.Add(new Repository.DespatchStock
                                        {
                                            DespatchId = DespatchMas.DespatchId,
                                            DespatchDetId = DespatchDetId,
                                            StockId = stck.StockId,
                                            DespatchQty = stck.DespatchQty,
                                        });
                                    }
                                }

                                foreach (var stcklst in DespatchStockList)
                                {
                                    entities.DespatchStock.Add(stcklst);
                                    entities.SaveChanges();
                                }

                                string closed = "N";
                                if (objAdd.ShipType == "F")
                                {
                                    closed = "Y";
                                }

                                //Update Buy_Ord_Ship Despatch_Closed
                                var BuyOrdShip = entities.Buy_Ord_Ship.Where(c => c.Order_No == objAdd.OrderNo && c.Buy_Ord_Ship1 == objAdd.BuyOrdShip && c.StyleId == objAdd.StyleId).FirstOrDefault();
                                if (BuyOrdShip != null)
                                {
                                    BuyOrdShip.Despatch_Closed = closed;
                                }
                                entities.SaveChanges();

                                //Update Buy_Ord_Style Return qty
                                var BuyOrdstyle = entities.buy_ord_style.Where(c => c.order_no == objAdd.OrderNo && c.Styleid == objAdd.StyleId).FirstOrDefault();
                                if (BuyOrdstyle != null)
                                {
                                    BuyOrdstyle.Despatch_Closed = closed;
                                }
                                entities.SaveChanges();

                                //DespatchMas = new Repository.DespatchMa();
                                DespatchDetList = new List<Repository.DespatchDet>();
                                DespatchStockList = new List<Repository.DespatchStock>();
                                ItemStockList = new List<Repository.ItemStock>();
                            }
                        }
                    }

                    //Update Buy_Ord_Ship,Buy_ord_Det
                    var updatebundleqty = entities.Proc_Apparel_PostDespatchStock(objAdd.DespatchNo, "A", "B");

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

        public IQueryable<DespatchInnerDetail> GetDespatchInnerItemStockDetail(string OrderNo, string JobOrderNo, int itemId, int ColorId, int SizeId, int StoreUnitId)
        {
            //AxonApparelEntities entities = new AxonApparelEntities();

            IQueryable<DespatchInnerDetail> query = (from T in entities.Proc_Apparel_GetDespatchInnerItemStockDet(OrderNo, JobOrderNo, StoreUnitId)
                                                     select new DespatchInnerDetail
                                                     {
                                                         StockId = T.Stockid,
                                                         LotNo = T.LotNo,
                                                         BundleNo = T.BundleNo,
                                                         TransNo = T.TransNo,
                                                         Process = T.Process,
                                                         ProcessId = T.Processid,
                                                         SupplierId = T.SupplierId,
                                                         Supplier = T.Supplier,
                                                         TransDate = (DateTime)T.TransDate,
                                                         BalQty = (decimal)T.BalQty,
                                                         ItemId = (int)T.Itemid,
                                                         ColorId = (int)T.ColorId,
                                                         SizeId = (int)T.SizeId,
                                                         DespatchQty = T.DespatchQty,
                                                     }).AsQueryable();
            return query;
        }

        public IList<DespatchMainGridProperty> GetMainData(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid, string ShipType)
        {
           // AxonApparelEntities entities = new AxonApparelEntities();

            var query = (from a in entities.proc_Apparel_GetDespatchMainDet(CompanyId, Fromdate, Todate, OrderType, RefNo, OrderNo, Buyerid, ShipType)
                         select new DespatchMainGridProperty
                         {
                             DespatchID = a.despatchid,
                             DespatchNo = a.Despatchno,
                             DespatchDate = (DateTime)a.DespatchDate,
                             Destination = a.country,
                             OrderNo = a.order_no,
                             RefNo = a.Ref_no,
                             Style = a.Style,
                             Buyer = a.Buyer,
                             BuyerID = a.buyerid,
                             DesQty = (decimal)a.Quantity,
                             DocRefNo = a.DocRefNo,
                             Company = a.company,
                             CompanyID = (int)a.companyid,
                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Domain.DespatchMas> GetDespatchHeaderInfo(int DespatchId)
        {
            IQueryable<Domain.DespatchMas> query = (from T in entities.Proc_Apparel_GetDespatchInfoForEditMode(DespatchId)
                                             select new Domain.DespatchMas
                                             {
                                                 DespatchNo = T.DespatchNo,
                                                 DespatchDate = (DateTime)T.DespatchDate,
                                                 DocRefNo = T.Docrefno,
                                                 BuyerId = (int)T.buyerid,
                                                 OrderNo = T.order_no,
                                                 RefNo = T.ref_no,
                                                 StyleId = T.Styleid,
                                                 CompanyId = (int)T.CompanyId,
                                                 BuyOrdShip = T.Buy_Ord_Ship,
                                                 ShipDate = (DateTime)T.Ship_date,
                                                 MerchenId = T.merId,
                                                 IssStoreId = T.IssueStoreid,
                                                 ManagerId = T.Manid,
                                                 ShipType = T.shipmenttype,
                                                 DocRefDate = T.docrefdate,
                                                 ShipMode = T.mode_of_shipmentid,
                                                 InvRefNo = T.invrefno,
                                                 InvRefDate = T.invrefdate,
                                                 Cartons = T.Cartons,
                                                 SystemId = T.systemid,
                                                 PreCarrBy = T.Precarriageby,
                                                 PlaceofRecpt = T.Placeofreceipt,
                                                 VesselFlightNo = T.VesselFlightNo,
                                                 MarksNo = T.marksnos,
                                                 PortofDischargeId = T.Portofdischargeid,
                                                 SupplierId = T.supplierID,
                                                 DespatchDet = GetDespatchItemInfo(DespatchId),
                                                 DespatchStock = GetDespatchStockInfo(DespatchId),
                                                 SalesInvid=T.SalesInvid
                                             }).AsQueryable();
            return query;
        }

        public bool DeleteDespatch(int id)
        {
            var Result = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //delete Despatchmas Many Rows table
                    var DesMas = entities.DespatchMas.Where(c => c.DespatchId == id).FirstOrDefault();
                    if (DesMas != null)
                    {

                        //Update Buy_Ord_Ship,Buy_ord_Det
                        var updatebundleqty = entities.Proc_Apparel_PostDespatchStock(DesMas.DespatchNo, "D", "B");

                        var deletedespatchStock = entities.DespatchStock.Where(d => d.DespatchId == DesMas.DespatchId).ToList<DespatchStock>();
                        deletedespatchStock.ForEach(c => entities.DespatchStock.Remove(c));
                        entities.SaveChanges();


                        string closed = "N";
                        //if (objUpd.ShipType == "F")
                        //{
                        //    closed = "Y";
                        //}

                        //Update Buy_Ord_Ship Despatch_Closed
                        var BuyOrdShip = entities.Buy_Ord_Ship.Where(c => c.Order_No == DesMas.Order_No && c.Buy_Ord_Ship1 == DesMas.Buy_Ord_Ship && c.StyleId == DesMas.StyleId).FirstOrDefault();
                        if (BuyOrdShip != null)
                        {
                            BuyOrdShip.Despatch_Closed = closed;
                        }
                        entities.SaveChanges();

                        //Update Buy_Ord_Style Return qty
                        var BuyOrdstyle = entities.buy_ord_style.Where(c => c.order_no == DesMas.Order_No && c.Styleid == DesMas.StyleId).FirstOrDefault();
                        if (BuyOrdstyle != null)
                        {
                            BuyOrdstyle.Despatch_Closed = closed;
                        }
                        entities.SaveChanges();



                        //delete Despatchdet Many Rows table
                        var PRD = entities.DespatchDet.Where(c => c.DespatchId == id).FirstOrDefault();
                        if (PRD != null)
                        {
                            var deleteDespatchDet = entities.DespatchDet.Where(d => d.DespatchId == id).ToList<DespatchDet>();
                            deleteDespatchDet.ForEach(c => entities.DespatchDet.Remove(c));
                            entities.SaveChanges();
                        }

                        //delete Despatchaddless Many Rows table

                        //delete DespatchMas Many Rows table
                        entities.DespatchMas.Remove(DesMas);
                        entities.SaveChanges();
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

        public bool UpdateDespatch(Domain.DespatchMas objUpd)
        {
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {                    
                    var DespatchMas = new Repository.DespatchMas();
                    var DespatchDetList = new List<Repository.DespatchDet>();
                    var DespatchStockList = new List<Repository.DespatchStock>();
                    var ItemStockList = new List<Repository.ItemStock>();

                    //Update DespatchMas and DespatchDet Begin
                    var App = entities.DespatchMas.Where(c => c.DespatchId== objUpd.DespatchId).FirstOrDefault();
                    if (App != null)
                    {
                        //Update Buy_Ord_Ship,Buy_ord_Det
                        var updatebundleqty = entities.Proc_Apparel_PostDespatchStock(objUpd.DespatchNo, "D", "B");

                        App.DespatchDate = objUpd.DespatchDate;                        
                        App.ShipmentMode = objUpd.ShipMode;
                        App.SystemId = objUpd.SystemId;
                        App.ShipmentType = objUpd.ShipType;
                        App.DocRefNo = objUpd.DocRefNo;
                        App.DocRefDate = objUpd.DocRefDate;
                        App.InvRefNo = objUpd.InvRefNo;
                        App.InvRefDate = objUpd.InvRefDate;                                                
                        App.PreCarriageby = objUpd.PreCarrBy;
                        App.PlaceofReceipt = objUpd.PlaceofRecpt;
                        App.VesselFlight = objUpd.VesselFlightNo;
                        App.MarksNos = objUpd.MarksNo;
                        App.PortOfDischargeID = objUpd.PortofDischargeId;
                        App.Cartons = objUpd.Cartons;
                        App.CreatedBy = objUpd.CreatedBy;
                        App.CBMQty = objUpd.CBMQty;
                        App.SupplierID = objUpd.SupplierId;
                        App.SalesInvid = objUpd.SalesInvid;
                    }                    
                    entities.SaveChanges();

                    var despatchdetList = new List<DespatchDet>();
                    var despatchstckList = new List<DespatchStock>();

                    despatchdetList = entities.DespatchDet.Where(c => c.DespatchId== objUpd.DespatchId).ToList();
                    despatchstckList = entities.DespatchStock.Where(c => c.DespatchId == objUpd.DespatchId).ToList();

                    if (despatchdetList != null)
                    {
                        foreach (var item in despatchdetList)
                        {
                            foreach (var newitem in (objUpd.DespatchDet.Where(e => e.DespatchDetId== item.DespatchDetId)))
                            {
                                item.DispatchQty = (decimal)newitem.DespatchQty;                                
                            }
                        }
                    }
                    entities.SaveChanges();

                    if (despatchstckList != null)
                    {
                        foreach (var item in despatchstckList)
                        {
                            foreach (var newitem in (objUpd.DespatchStock.Where(e => e.StockId==item.StockId)))
                            {
                                item.DespatchQty = (decimal)newitem.DespatchQty;
                            }
                        }
                    }
                    entities.SaveChanges();

                    //Update Buy_Ord_Ship,Buy_ord_Det
                    var Addbundleqty = entities.Proc_Apparel_PostDespatchStock(objUpd.DespatchNo, "A", "B");
                    entities.SaveChanges();
                    //Update DespatchMas and DespatchDet End

                    string closed = "N";
                    if (objUpd.ShipType == "F")
                    {
                        closed = "Y";
                    }

                    //Update Buy_Ord_Ship Despatch_Closed
                    var BuyOrdShip = entities.Buy_Ord_Ship.Where(c => c.Order_No == objUpd.OrderNo && c.Buy_Ord_Ship1 == objUpd.BuyOrdShip && c.StyleId == objUpd.StyleId).FirstOrDefault();
                    if (BuyOrdShip != null)
                    {
                        BuyOrdShip.Despatch_Closed = closed;
                    }
                    entities.SaveChanges();

                    //Update Buy_Ord_Style Return qty
                    var BuyOrdstyle = entities.buy_ord_style.Where(c => c.order_no == objUpd.OrderNo && c.Styleid == objUpd.StyleId).FirstOrDefault();
                    if (BuyOrdstyle != null)
                    {
                        BuyOrdstyle.Despatch_Closed = closed;
                    }
                    entities.SaveChanges();

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

        public List<Domain.DespatchDet> GetDespatchItemInfo(int DespatchId)
        {
            List<Domain.DespatchDet> query = (from T in entities.Proc_Apparel_GetDespatchItemInfoForEditMode(DespatchId)
                                              select new Domain.DespatchDet
                                              {
                                                  DespatchDetId = T.DespatchDetId,
                                                  Sno =Convert.ToInt16(T.sno),
                                                  ItemId = T.ItemId,
                                                  ColorId = T.colorid,
                                                  SizeId = (int)T.sizeid,
                                                  Item = T.Item,
                                                  Color = T.Color,
                                                  Size = T.size,
                                                  Quantity = (decimal)T.Quantity,
                                                  Productionqty = (decimal)T.ProductionQty,
                                                  BalQty = (decimal)T.BalQty,
                                                  DespatchQty = T.DispatchQty,
                                                  Rate = (decimal)T.salesrate,
                                              }).AsQueryable().ToList();
            return query;
        }

        public List<Domain.DespatchStock> GetDespatchStockInfo(int DespatchId)
        {
            List<Domain.DespatchStock> query = (from T in entities.Proc_Apparel_GetDespatchStockInfoForEditMode(DespatchId)
                                                select new Domain.DespatchStock
                                              {
                                                  StockId = T.StockId,
                                                  ItemId = (int)T.ItemId,
                                                  ColorId = (int)T.ColorId,
                                                  SizeId = (int)T.SizeId,
                                                  ProcessId = (int)T.Processid,
                                                  SupplierId = (int)T.SupplierId,
                                                  TransNo = T.TransNo,
                                                  TransDate = (DateTime)T.Transdate,
                                                  BalQty = (decimal)T.BalQty + (decimal)T.DispatchQty,
                                                  DespatchQty = (decimal)T.DispatchQty,
                                                  Process = T.Process,
                                                  LotNo = T.LotNo,
                                                  BundleNo = T.BundleNo,
                                                  Supplier = T.Supplier,
                                              }).AsQueryable().ToList();
            return query;
        }
    }
}
