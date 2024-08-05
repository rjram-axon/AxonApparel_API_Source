using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class StockLocAllocationRepository : IStockLocAllocationRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.StockLocAllocation> GetStoreunit(int cmpid)
        {
            var query = (from ob in entities.Proc_Apparel_GetStockAllocStoreName(cmpid)
                         select new Domain.StockLocAllocation
                         {
                             strunitid = ob.StoreUnitId,
                             strunit = ob.StoreName
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.StockLocAllocation> Gettranstype()
        {
            var query = (from ob in entities.Proc_Apparel_GetStockAllocTransType()
                         select new Domain.StockLocAllocation
                         {
                             Inwardtype = ob.InwardType,
                             Inwardtypeid = ob.TypeID,
                             transtype = ob.TransType
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.StockLocAllocation> GetOrderno(int cmpid)
        {
            var query = (from ob in entities.Proc_Apparel_GetStockAllocOrderRef(cmpid)
                         select new Domain.StockLocAllocation
                         {
                             orderno = ob.Order_No,
                             refno = ob.Ref_No,
                             buymasid = ob.buy_ord_masid
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.StockLocAllocation> GetStyle(string orderno)
        {
            var query = (from ob in entities.Proc_Apparel_GetStockAllocStyle(orderno)
                         select new Domain.StockLocAllocation
                         {
                             style = ob.Style,
                             styleid = ob.StyleId
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.StockLocAllocation> GetJobordno(string orderno)
        {
            var query = (from ob in entities.Proc_Apparel_GetStockAllocJobOrder(orderno)
                         select new Domain.StockLocAllocation
                         {
                             jobordno = ob.Job_Ord_No,
                             jmasid = ob.ID
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.StockLocAllocation> GetTransno(int compid, int strunitid)
        {
            var query = (from ob in entities.Proc_Apparel_GetStockAllocTransno(compid, strunitid)
                         select new Domain.StockLocAllocation
                         {
                             transno = ob.TransNo,
                             compid = (int)ob.CompanyID
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.StockLocAllocation> LoadItem(int compid, int suppid, string ordno, string refno, int strunitid, string transtype, string transno, string jobordno, int styleid, int itmgrpid)
        {
            var query = (from ob in entities.Proc_Apparel_LoadStockLocAllocItem(compid, suppid, ordno, refno, strunitid, transtype, transno, jobordno, styleid, itmgrpid)
                         select new Domain.StockLocAllocation
                         {
                             sno = (long)ob.Snumb,
                             styleid = (int)ob.StyleID,
                             style = ob.Style,
                             transno = ob.transno,
                             transdate = (DateTime)ob.transdate,
                             itmid = (int)ob.ItemId,
                             itm = ob.Item,
                             clrid = (int)ob.ColorID,
                             clr = ob.COlor,
                             sizeid = (int)ob.SizeId,
                             size = ob.Size,
                             uom = ob.UOM,
                             stkqty = (decimal)ob.StockQty,
                             allocqty = 0,
                             stockid = ob.StockID,
                             rate = (decimal)ob.Rate,
                             unitrother = ob.Unit_Or_Other,
                             itmcat = ob.ItemCat,
                             cmpunitid = (int)ob.Company_UnitId,
                             processid = ob.ProcessId,
                             suppid = (int)ob.SupplierID,
                             itmcode = ob.ItemCode,
                             transtype = ob.TransType,
                             lotno = ob.LotNo,
                             bundleno = ob.BundleNo,
                             purorord = ob.PurOrProd,
                             mfrid = ob.MfrID,
                             qty = (int)ob.Quantity,
                             fabgsm = ob.FabricGSM,
                             cattype = ob.CatType,
                             uomid = ob.UomID,
                             strunitid = ob.StoreUnitID,
                             stocktype = ob.StockType,
                             markuprate = ob.MarkUp_Rate,
                             reprog = ob.ReProg,
                             orderindent = ob.OrderIdent,
                             jobordno = ob.JobOrderNo,


                         }).AsQueryable();

            return query;
        }


        public bool AddDetData(StockAllocationMas objMas, List<StockAllocationDet> objDet, List<StockAllocationSection> objSecDet, List<Domain.StockLocAllocation> objDomDet, List<Domain.StockAllocationSection> sectiondom, List<ItemStock> Stkdet, string Mode)
        {
            bool reserved = false;
            int Masid = 0;
            int detid = 0;
            int StockAllSectionID = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {

                try
                {
                    entities.StockAllocationMas.Add(objMas);
                    entities.SaveChanges();
                    Masid = objMas.AllocationID;

                    if (objDet != null && objDet.Count > 0)
                    {
                        foreach (var item in objDet)
                        {

                            if (item.Qty > 0)
                            {
                                item.AllocationId = Masid;
                                entities.StockAllocationDet.Add(item);
                                entities.SaveChanges();
                                detid = item.AllocationDetID;

                                var Pg1 = entities.Proc_Apparel_StockAllocationUpdItmstk(item.Qty, item.StockID);
                                entities.SaveChanges();

                                foreach (var sec in objSecDet)
                                {
                                    if (item.StockID == sec.OldStockID)
                                    {
                                        sec.AllocationId = Masid;
                                        sec.AllocationDetID = detid;
                                        //sec.NewStockID = Itmstkid;
                                        entities.StockAllocationSection.Add(sec);
                                        entities.SaveChanges();
                                        StockAllSectionID = sec.StockAllocationSectionID;
                                        var Pg3 = entities.Proc_Apparel_UpdateStockAllocationStcok(StockAllSectionID);
                                        entities.SaveChanges();
                                    }

                                } 
                                                           
                            }
                            entities.SaveChanges();
                        }
                    }

          

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "");
                }
            }
            return reserved;

        }


        public IQueryable<Domain.StockAllocationMas> LoadMaingrid(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate, int AllocationID)
        {
            var query = (from ob in entities.Proc_Apparel_LoadStockAllocMainGrid(cmpid, orderno, refno, strunitid, ordtype, stktype, jobordno, styleid, fromdate, todate, AllocationID)
                         select new Domain.StockAllocationMas
                         {

                             CompanyID = (int)ob.companyID,
                             company = ob.Company,
                             AllocationDate = ob.AllocationDate,
                             AllocationNo = ob.AllocationNo,
                             AllocationID = ob.AllocationID,
                             AllocationRefNo = ob.AllocationRefNo,
                             OrderType = ob.OrderType,
                             StockType = ob.StockType,
                             SubStoreID = ob.SubStoreID,
                             SubStore = ob.StoreName,
                             Styleid = (int)ob.StyleID,
                             Style = ob.Style,
                             OrderNo = ob.Order_No,
                             JobOrdNo = ob.JobOrderNo

                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.StockAllocationMas> GetEditHeaderDet(int masid)
        {
            var query = (from ob in entities.Proc_Apparel_StockAllocLoadEditHeaderDet(masid)
                         select new Domain.StockAllocationMas
                         {
                             CompanyID = ob.CompanyID,
                             company = ob.Company,
                             SubStoreID = ob.SubStoreID,
                             SubStore = ob.StoreName,
                             CreatedBy = ob.CreatedBy,
                             AllocationDate = ob.AllocationDate,
                             AllocationNo = ob.AllocationNo,
                             AllocationRefNo = ob.AllocationRefNo,
                             StockType = ob.StockType,
                             OrderType = ob.OrderType
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.StockLocAllocation> GetEditLoadItem(int masid, int compid, int strunitid)
        {
            var query = (from ob in entities.Proc_Apparel_StockAllocLoadEditItemDet(masid, compid, strunitid)
                         select new Domain.StockLocAllocation
                         {
                             sno = (long)ob.AllocationDetID,
                             styleid = (int)ob.StyleID,
                             style = ob.Style,
                             transno = ob.transno,
                             transdate = (DateTime)ob.transdate,
                             itmid = (int)ob.ItemId,
                             itm = ob.Item,
                             clrid = (int)ob.ColorID,
                             clr = ob.COlor,
                             sizeid = (int)ob.SizeId,
                             size = ob.Size,
                             uom = ob.UOM,
                             stkqty = (decimal)(ob.StockQty + ob.AllocQty),
                             allocqty = ob.AllocQty,
                             stockid = ob.StockID,
                             rate = (decimal)ob.Rate,
                             unitrother = ob.Unit_Or_Other,
                             itmcat = ob.ItemCat,
                             cmpunitid = (int)ob.Company_UnitId,
                             processid = ob.ProcessId,
                             suppid = (int)ob.SupplierID,
                             itmcode = ob.ItemCode,
                             transtype = ob.TransType,
                             lotno = ob.LotNo,
                             bundleno = ob.BundleNo,
                             purorord = ob.PurOrProd,
                             mfrid = ob.MfrID,
                             qty = (int)ob.Quantity,
                             fabgsm = ob.FabricGSM,
                             cattype = ob.CatType,
                             uomid = ob.UomID,
                             strunitid = ob.StoreUnitID,
                             stocktype = ob.StockType,
                             markuprate = ob.MarkUp_Rate,
                             reprog = ob.ReProg,
                             orderindent = ob.OrderIdent

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.StockAllocationSection> GetEditSectionDet(int masid)
        {
            var query = (from ob in entities.Proc_Apparel_StockAllocLoadEditItem(masid)
                         select new Domain.StockAllocationSection
                         {
                             AllocationId = ob.AllocationID,
                             AllocationDetID = ob.AllocationDetID,
                             StockAllocationSectionID = ob.StockAllocationSectionID,
                             NewStockID = ob.NewStockID,
                             SectionID = ob.SectionID,
                             Section = ob.SectionName,
                             AllocationQty = ob.AllocationQty,
                             SecMasid = ob.AllocationDetID,
                             sno = ob.StockAllocationSectionID,
                             Stockid = ob.StockID,
                             Modefn = 0,
                             OldStockID = ob.StockID,
                         }).AsQueryable();

            return query;
        }


        public bool UpdDetData(StockAllocationMas objMas, List<StockAllocationDet> objDet, List<StockAllocationSection> objSecDet, List<Domain.StockLocAllocation> objDomDet, List<Domain.StockAllocationSection> sectiondom, List<ItemStock> Stkdet, string Mode)
        {
            bool reserved = false; 
            int ADID = 0;      
            int detid = 0;
            int StockAllSectionID = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {

                try
                {
                    var Upd = entities.StockAllocationMas.Where(c => c.AllocationID == objMas.AllocationID).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.AllocationID = objMas.AllocationID;
                        Upd.AllocationNo = objMas.AllocationNo;
                        Upd.AllocationRefNo = objMas.AllocationRefNo;
                        Upd.AllocationDate = objMas.AllocationDate;
                        Upd.CompanyID = objMas.CompanyID;
                        Upd.SubStoreID = objMas.SubStoreID;
                        Upd.OrderType = objMas.OrderType;
                        Upd.StockType = objMas.StockType;
                        Upd.CreatedBy = objMas.CreatedBy;

                        entities.SaveChanges();

                    }


                    var Pgd = entities.Proc_Apparel_StockAllocDeleteStkTable(objMas.AllocationNo);
                    entities.SaveChanges();


                    var dy = entities.StockAllocationMas.Where(c => c.AllocationID == objMas.AllocationID);
                    foreach (var dbSet in dy)
                    {
                        var Det = entities.StockAllocationDet.Where(u => u.AllocationId == objMas.AllocationID);
                        foreach (var u in Det)
                        {
                            ADID = u.AllocationDetID;
                            var Det1 = entities.StockAllocationSection.Where(v => v.AllocationDetID == ADID);

                            foreach (var v in Det1)
                            {
                                entities.StockAllocationSection.Remove(v);
                            }
                            entities.StockAllocationDet.Remove(u);
                        }
                    }

                    entities.SaveChanges();

                    var Dets1 = entities.Item_stock_outward.Where(v => v.TransNo == objMas.AllocationNo);

                    foreach (var v in Dets1)
                    {
                        entities.Item_stock_outward.Remove(v);
                        entities.SaveChanges();
                    }

                    var Dets2 = entities.ItemStock.Where(v1 => v1.Transno == objMas.AllocationNo);

                    foreach (var v1 in Dets2)
                    {
                        entities.ItemStock.Remove(v1);
                        entities.SaveChanges();
                    }
                    entities.SaveChanges();

                    //add in edit case


                    if (objDet != null && objDet.Count > 0)
                    {
                        foreach (var item in objDet)
                        {

                            if (item.Qty > 0)
                            {
                                item.AllocationId = objMas.AllocationID;
                                entities.StockAllocationDet.Add(item);
                                entities.SaveChanges();
                                detid = item.AllocationDetID;

                                var Pg1 = entities.Proc_Apparel_StockAllocationUpdItmstk(item.Qty, item.StockID);
                                entities.SaveChanges();

                                foreach (var sec in objSecDet)
                                {
                                    if (item.StockID == sec.OldStockID)
                                    {
                                        sec.AllocationId = objMas.AllocationID;
                                        sec.AllocationDetID = detid;
                                        //sec.NewStockID = Itmstkid;
                                        entities.StockAllocationSection.Add(sec);
                                        entities.SaveChanges();
                                        StockAllSectionID = sec.StockAllocationSectionID;
                                        var Pg3 = entities.Proc_Apparel_UpdateStockAllocationStcok(StockAllSectionID);
                                        entities.SaveChanges();
                                    }

                                }
                                
                          

                            }
                            entities.SaveChanges();
                        }
                    }

      


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "");
                }
            }
            return reserved;
        }


        public bool DelDetData(StockAllocationMas objMas, List<StockAllocationDet> objDet, List<StockAllocationSection> objSecDet, List<Domain.StockLocAllocation> objDomDet, List<Domain.StockAllocationSection> sectiondom, List<ItemStock> Stkdet, string Mode)
        {
            bool reserved = false;

            string transno = "";
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {

                try
                {
                    var AllocMas1 = entities.StockAllocationMas.Where(c => c.AllocationID == objMas.AllocationID).FirstOrDefault();
                    if (AllocMas1 != null)
                    {
                        transno = AllocMas1.AllocationNo;
                    }
                    if (objDet != null && objDet.Count > 0)
                    {
                        foreach (var item in objDet)
                        {
                            var stk = entities.ItemStock.Where(c => c.StockId == item.StockID).FirstOrDefault();
                            if (stk != null)
                            {
                                stk.alloted = stk.alloted - item.Qty;
                                stk.balQty = stk.balQty + item.Qty;

                            }
                        }
                    }

                    var stksec = entities.StockAllocationSection.Where(d => d.AllocationId == objMas.AllocationID).ToList<StockAllocationSection>();

                    stksec.ForEach(c => entities.StockAllocationSection.Remove(c));
                    entities.SaveChanges();

                    var itmstkoutward = entities.Item_stock_outward.Where(d => d.TransNo == objMas.AllocationNo).ToList<Item_stock_outward>();

                    itmstkoutward.ForEach(c => entities.Item_stock_outward.Remove(c));
                    entities.SaveChanges();

                    var itmstk = entities.ItemStock.Where(d => d.Transno == objMas.AllocationNo).ToList<ItemStock>();

                    itmstk.ForEach(c => entities.ItemStock.Remove(c));
                    entities.SaveChanges();

                    var stockdet = entities.StockAllocationDet.Where(d => d.AllocationId == objMas.AllocationID).ToList<StockAllocationDet>();

                    stockdet.ForEach(c => entities.StockAllocationDet.Remove(c));
                    entities.SaveChanges();

                    var stockmas = entities.StockAllocationMas.Where(d => d.AllocationID == objMas.AllocationID).ToList<StockAllocationMas>();

                    stockmas.ForEach(c => entities.StockAllocationMas.Remove(c));
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "");
                }
            }
            return reserved;
        }


        public IQueryable<Domain.StockAllocationSection> GetAlloStoreRepDetails(int? substoreid, int? entryid)
        {
            IQueryable<Domain.StockAllocationSection> query = (from cd in entities.Proc_Apparel_GetStockLocationSectionDrop(substoreid == null ? 0 : substoreid, entryid == null ? 0 : entryid)
                                                               select new Domain.StockAllocationSection
                                           {
                                               SectionID = cd.SecId,
                                               Section = cd.SecName,

                                           }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.StockAllocationMas> LoadMaingriddrop(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate)
        {
            var query = (from ob in entities.Proc_Apparel_LoadStockAllocMainGridDrop(cmpid, orderno, refno, strunitid, ordtype, stktype, jobordno, styleid, fromdate, todate)
                         select new Domain.StockAllocationMas
                         {

                             CompanyID = (int)ob.companyID,
                             company = ob.Company,
                             AllocationDate = ob.AllocationDate,
                             AllocationNo = ob.AllocationNo,
                             AllocationID = ob.AllocationID,
                             AllocationRefNo = ob.AllocationRefNo,
                             OrderType = ob.OrderType,
                             StockType = ob.StockType,
                             SubStoreID = ob.SubStoreID,
                             SubStore = ob.StoreName,
                             Styleid = (int)ob.StyleID,
                             Style = ob.Style,
                             OrderNo = ob.Order_No,
                             JobOrdNo = ob.JobOrderNo

                         }).AsQueryable();

            return query;
        }
    }
}
