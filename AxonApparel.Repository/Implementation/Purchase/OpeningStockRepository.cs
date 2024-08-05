using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class OpeningStockRepository : IOpeningStockRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        int StkId = 0;
        int OStkId = 0;
        public IQueryable<Domain.ItmStkDet> GetItem(int itmgrpid, string itmcat)
        {
            var query = (from LADD in entities.Proc_Apparel_OpeningStkGetitem(itmgrpid, itmcat)
                         select new Domain.ItmStkDet
                         {
                             item = LADD.Item,
                             Itemid = LADD.ItemId
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.ItmStkDet> GetUom(int itmid)
        {
            var query = (from LADD in entities.Proc_Apparel_OpeningStkGetUom(itmid)
                         select new Domain.ItmStkDet
                         {
                             unit = LADD.uom,
                             UnitId = LADD.UomId
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ItmStkDet> ChkPlanned(string OrderNo, int Styleid, int Itemid, int Colorid, int Sizeid)
        {
            var query = (from LADD in entities.Proc_Apparel_CheckPlannedItemforOpeningStock(OrderNo, Styleid, Itemid, Colorid, Sizeid)
                         select new Domain.ItmStkDet
                         {
                             ChkPlanned = LADD.Value,
                         }).AsQueryable();

            return query;
        }



        public int AddData(ItemStock objEntry)
        {
            var id = entities.ItemStock.Add(objEntry);
            entities.SaveChanges();
            return id.StockId;
        }


        public bool AddDetData(List<ItemStock> objDet, List<Op_Stock> objstk, int companyid, string Transno, int CreBy, int StoreUnitID, string Remarks, string Mode,int Companyunitid)
        {

            int StockId = 0;
            int NStockId = 0;
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objDet != null && objDet.Count > 0)
                    {
                        foreach (var item in objDet)
                        {
                            if (item.qty > 0)
                            {
                                //insert the Op_Stock 
                                var Pg1 = entities.Proc_Apparel_GetOpInsertItemstock(item.Itemid, item.Colorid, item.sizeid, item.uomid, item.qty, item.Rate, item.joborderNo, item.Transno, item.processId, item.lotNo, item.transdate, companyid, item.supplierid, item.Styleid, item.sQty, item.StockId, Remarks, StoreUnitID, CreBy, item.ItemCat,Companyunitid);
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
                    exceplogg.SendExcepToDB(ex, "OpeningStock-AddDetData");
                }
            }
            return reserved;
        }


        public bool UpdateData(ItemStock objupd)
        {
            try
            {
                var result = false;
                var Upd = entities.ItemStock.Where(c => c.StockId == objupd.StockId).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.StockId = objupd.StockId;
                    Upd.UnitId = objupd.UnitId;
                    Upd.Itemid = objupd.Itemid;
                    Upd.Colorid = objupd.Colorid;
                    Upd.sizeid = objupd.sizeid;
                    Upd.qty = objupd.qty;
                    Upd.Rate = objupd.Rate;
                    Upd.joborderNo = objupd.joborderNo;
                    Upd.Transno = objupd.Transno;
                    Upd.transdate = objupd.transdate;
                    Upd.TransType = objupd.TransType;
                    Upd.alloted = objupd.alloted;
                    Upd.ItemCat = objupd.ItemCat;
                    Upd.processId = objupd.processId;
                    Upd.sQty = objupd.sQty;
                    Upd.lotNo = objupd.lotNo;
                    Upd.balQty = objupd.balQty;
                    Upd.purorprod = objupd.purorprod;
                    Upd.companyid = objupd.companyid;
                    Upd.supplierid = objupd.supplierid;
                    Upd.unit_or_other = objupd.unit_or_other;
                    Upd.return_qty = objupd.return_qty;
                    Upd.Styleid = objupd.Styleid;
                    Upd.uomid = objupd.uomid;
                    Upd.MfrId = objupd.MfrId;
                    Upd.ReProg = objupd.ReProg;
                    Upd.StockType = objupd.StockType;
                    Upd.Remarks = objupd.Remarks;
                    Upd.StockDate = objupd.StockDate;
                    Upd.Markup_Rate = objupd.Markup_Rate;
                    Upd.OrderIdent = objupd.OrderIdent;
                    Upd.CatType = objupd.CatType;
                    Upd.BundleNo = objupd.BundleNo;
                    Upd.GuomId = objupd.GuomId;
                    Upd.ItemCode = objupd.ItemCode;
                    Upd.SectionID = objupd.SectionID;
                    Upd.FabricGSM = objupd.FabricGSM;
                    Upd.BARCODE = objupd.BARCODE;
                    Upd.slno = objupd.slno;



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


        public IQueryable<Domain.ItmStkDet> GetDataMainList(string ordertype, string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate)
        {
            var query = (from LADD in entities.proc_OpeningStockMaingrid(ordertype, transno, companyid, orderno, refno, styleid, fromDate, todate)
                         select new Domain.ItmStkDet
                         {
                             StockType = LADD.ordertype,
                             companyid = LADD.CompanyId,
                             Styleid = LADD.styleid,

                             //StockId=(int)LADD.Stockid,
                             //joborderNo=LADD.JobOrderNo,
                             transdate = (DateTime)LADD.trans_date,
                             Transno = LADD.TransNo,
                             Type = LADD.Type,
                             company = LADD.Company,
                             itemgrpid = LADD.Id,
                             itmgrp = LADD.ItemGroup,
                             ItemCat = (LADD.Itemcat == null ? "" : LADD.Itemcat),
                             refno = LADD.ref_no,
                             //opstkid=LADD.OpStkId,
                             orderno = LADD.order_no

                         }).AsQueryable();

            return query;
        }


        public bool DeleteData(string transno)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    //delete ItemStock,op_stock table
                    var Pg1 = entities.Proc_Apparel_GetOpStockDeleteItemstock(transno);
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OpeningStock-DeleteData");
                }
            }
            return reserved;
        }


        public IQueryable<Domain.ItmStkDet> GetDataMain(string ordertype, string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate)
        {
            var query = (from LADD in entities.proc_OpeningStockMain(ordertype, transno, companyid, orderno, refno, styleid, fromDate, todate)
                         select new Domain.ItmStkDet
                         {
                             StockType = LADD.ordertype,
                             companyid = LADD.CompanyId,
                             // Styleid = LADD.styleid,

                             //StockId=(int)LADD.Stockid,
                             //joborderNo=LADD.JobOrderNo,
                             transdate = (DateTime)LADD.trans_date,
                             Transno = LADD.TransNo,
                             Type = LADD.Type,
                             company = LADD.Company,
                             itemgrpid = LADD.Id,
                             itmgrp = LADD.ItemGroup,
                             //sno=LADD.sno
                             // ItemCat = (LADD.Itemcat == null ? "" : LADD.Itemcat),
                             // refno = LADD.ref_no,
                             //opstkid=LADD.OpStkId,
                             // orderno = LADD.order_no

                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.ItmStkDet> GetEditGrid(string transno)
        {
            var query = (from LADD in entities.proc_OpeningStock_Edit(transno)
                         select new Domain.ItmStkDet
                         {
                             StockId = LADD.StockId,
                             companyid = (int)LADD.CompanyId,
                             company = LADD.CompanyName,
                             Styleid = (int)LADD.Styleid,
                             style = LADD.Style,
                             item = LADD.item,
                             Itemid = (int)LADD.ItemId,
                             color = LADD.color,
                             Colorid = (int)LADD.ColorId,
                             size = LADD.size,
                             sizeid = (int)LADD.SizeId,
                             qty = LADD.Qty,
                             Rate = (decimal)LADD.Rate,
                             itemgrpid = LADD.Id,
                             itmgrp = LADD.ItemGroup,
                             unit = LADD.Uom,
                             joborderNo = LADD.JobOrderNo,
                             transdate = (DateTime)LADD.Transdate,
                             Transno = LADD.TransNo,
                             Type = LADD.itemCat,
                             //StoreUnitID = (int)(LADD.StoreUnitID == null ? 0 : LADD.StoreUnitID),
                             Remarks = LADD.OpRemarks == null ? "" : LADD.OpRemarks,
                             supplierid = LADD.SupplierId,
                             supplier = LADD.Supplier,
                             buymsaid = LADD.Buy_Ord_MasId,
                             ItemCat = LADD.itemCat,
                             sQty = (decimal)LADD.sQty,
                             ParentUnitid = LADD.Parentstoreid,
                             Storetype = LADD.StoreType,
                             StoreName = LADD.StoreName,
                             StoreUnitID = (int)LADD.StoreUnitId,
                             UnitId = LADD.UnitId,
                             uomid=(int)LADD.UomId,
                             alloted=(decimal)LADD.Alloted
                         }).AsQueryable();

            return query;
        }


        public bool UpdateDetData(List<ItemStock> objDet, List<Op_Stock> objOPDet, int companyid, string Transno, int CreBy, int StoreUnitID, string Remarks, int CompanyunitId)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    foreach (var item in objDet)
                    {
                        //delete ItemStock,op_stock table
                        var Pg1 = entities.Proc_Apparel_GetOpStockDeleteItemstock(item.Transno);
                        entities.SaveChanges();
                    }
                    if (objDet != null && objDet.Count > 0)
                    {
                        foreach (var item in objDet)
                        {
                            if (item.qty > 0)
                            {
                                //insert the Op_Stock 
                                var Pg1 = entities.Proc_Apparel_GetOpInsertItemstock(item.Itemid, item.Colorid, item.sizeid, item.uomid, item.qty, item.Rate, item.joborderNo, Transno, item.processId, item.lotNo, item.transdate, companyid, item.supplierid, item.Styleid, item.sQty, item.StockId, Remarks, StoreUnitID, CreBy, item.ItemCat, CompanyunitId);
                                entities.SaveChanges();
                            }
                        }
                    } reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OpeningStock-UpdateDetData");
                }
            }
            return reserved;
        }


        public IQueryable<Domain.ItmStkDet> GetOrdno(string ordtype)
        {
            var query = (from LADD in entities.Proc_Apparel_OpeningstockLoadOrder(ordtype)
                         select new Domain.ItmStkDet
                         {
                             orderno = LADD.order_no,
                             workord = LADD.WORKORDER,
                             buymsaid = LADD.Buy_Ord_MasId,
                         }).AsQueryable();

            return query;
        }
    }
}
