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
    public class StockAuditEntryRepository : IStockAuditEntryRepository
    {

        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<StockAudit> GetDataDropRepDetails(int? BMasId, int? JobId, int? Styleid, string RefNo)
        {
            IQueryable<StockAudit> query = (from cd in entities.Proc_Apparel_GetStockAuditDropDown(BMasId == null ? 0 : BMasId, JobId == null ? 0 : JobId, Styleid == null ? 0 : Styleid, string.IsNullOrEmpty(RefNo) ? "" : RefNo)
                                            select new StockAudit
                                               {
                                                   RefNo = cd.RefNo,
                                                   Styleid = (int)cd.StyleId,
                                                   Style = cd.Style,
                                                   Job_Ord_no = cd.JobNo,
                                                   JobId = cd.JobId,
                                                   BMasId = cd.BMasID,
                                                   Buy_Ord_no = cd.OrdNo,
                                               }).AsQueryable();
            return query;
        }


        public IQueryable<StockAudit> GetDataDropProcessRepDetails()
        {
            IQueryable<StockAudit> query = (from cd1 in entities.Proc_Apparel_GetStockAuditStockProcess()
                                            select new StockAudit
                                            {
                                                Process = cd1.Type,
                                                ProcessId = (int)cd1.ProcessId,

                                            }).AsQueryable();
            return query;
        }


        public IList<StockAuditDet> GetRepSUItemRetLoad(int? Companyid, string OType, string StockType, string SupType, int? Itemid, int? item_Groupid, int? buyerid, int? Supplierid, int? StoreId, string Buy_Ord_no, string RefNo, string Job_Ord_no, int? Styleid, int? ProcessId)
        {
            string type = "";
            string ItemCat = "";

            var query = (from ID1 in entities.Proc_Apparel_GetStockAuditEntryItemDetails(Companyid == null ? 0 : Companyid, OType, StockType, SupType, type, Itemid == null ? 0 : Itemid, item_Groupid == null ? 0 : item_Groupid, buyerid == null ? 0 : buyerid, Supplierid == null ? 0 : Supplierid, StoreId == null ? 0 : StoreId, string.IsNullOrEmpty(Buy_Ord_no) ? "" : Buy_Ord_no, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(Job_Ord_no) ? "" : Job_Ord_no, Styleid == null ? 0 : Styleid, ProcessId == null ? 0 : ProcessId, ItemCat)
                         select new StockAuditDet
                         {
                             DItemId = ID1.itemid,
                             ColorId = ID1.colorid,
                             SizeId = ID1.sizeid,
                             uomid = ID1.uomid,
                             ActQty = ID1.Qty - ID1.alloted,
                             Shortage_Qty = 0,
                             Excess_Qty = 0,
                             Stockid = ID1.StockId,
                             DItem = ID1.Item,
                             Color = ID1.Color,
                             Size = ID1.Size,
                             PUnit = ID1.uom,
                             DSupplierId = ID1.supplierid,
                             AuditMasid = 0,
                             Audit_Detid = 0,
                             LotNo = ID1.lotno,
                             Type = ID1.Type,
                             StockQty = ID1.Qty - ID1.alloted,
                             DSupplier = ID1.Supplier,


                         }).AsQueryable();

            return query.ToList();
        }






        public bool AddDetData(Stock_Audit_Mas objPoAUEntry, List<Stock_Audit_Det> objPoAUDet, string EntryNo, DateTime EntryDate)
        {
            bool reserved = false;
            int AudMasId = 0;
            int AuDetId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var id = entities.Stock_Audit_Mas.Add(objPoAUEntry);
                    entities.SaveChanges();
                    AudMasId = objPoAUEntry.Audit_MasId;


                    foreach (var Pay in objPoAUDet)
                    {

                        Pay.AuditMasid = AudMasId;

                        entities.Stock_Audit_Det.Add(Pay);
                        entities.SaveChanges();
                        AuDetId = Pay.Audit_Detid;

                        if (Pay.Shortage_Qty > 0 || Pay.Excess_Qty > 0)
                        {
                            //Update the Stock 
                            var Pg1 = entities.Proc_Apparel_GetStockAuditItemOutUpdate(Pay.Shortage_Qty, Pay.Excess_Qty, Pay.Stockid, EntryDate, EntryNo, AuDetId);
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
                    exceplogg.SendExcepToDB(ex, "StockAudit-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<StockAudit> GetDataRepAudEditDetails(int Id)
        {
            IQueryable<StockAudit> query = (from a in entities.Proc_Apparel_GetPurchaseAuditEditMaindetails(Id)
                                            select new StockAudit
                                                {
                                                    Companyid = a.CompId,
                                                    Company = a.company,
                                                    Entry_No = a.entryno,
                                                    Entry_Date = (DateTime)a.Entry_Date,
                                                    Audit_MasId = a.AMasId,

                                                }).AsQueryable();

            return query;
        }

        public IList<StockAuditDet> GetRepAudEditItemRetLoad(int? Id)
        {


            var query = (from ID1 in entities.Proc_Apparel_stockAudit_Detail(Id == null ? 0 : Id)
                         select new StockAuditDet
                         {
                             DItemId = ID1.Itemid,
                             ColorId = ID1.Colorid,
                             SizeId = ID1.sizeid,
                             uomid = ID1.UOMid,
                             ActQty = ID1.StockQty,
                             Shortage_Qty = ID1.Shortage_Qty,
                             Excess_Qty = ID1.Excess_Qty,
                             Stockid = ID1.Stockid,
                             DItem = ID1.Item,
                             Color = ID1.Color,
                             Size = ID1.Size,
                             PUnit = ID1.uom,
                             DSupplierId = ID1.Supplierid,
                             AuditMasid = ID1.Audit_Masid,
                             Audit_Detid = ID1.Audit_Detid,
                             LotNo = ID1.lotNo,
                             Type = ID1.Type,
                             StockQty = ID1.qty,
                             DSupplier = ID1.supplier,


                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateData(Stock_Audit_Mas objPoEEntry)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    //Update the Table 
                    var Pg1 = entities.Proc_Apparel_GetStockAuditEditUpdate(objPoEEntry.Entry_No);
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StockAudit-UpdateData");
                }
            }
            return reserved;
        }




        public bool DeleteData(Stock_Audit_Mas objPoDEntry)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {



                    //Update the Table 
                    var Pg1 = entities.Proc_Apparel_GetStockAuditEditUpdate(objPoDEntry.Entry_No);
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StockAudit-DeleteData");
                }
            }
            return reserved;
        }
    }
}
