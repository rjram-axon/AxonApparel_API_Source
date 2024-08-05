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
    public class PurchaseReturnEntryRepository : IPurchaseReturnEntryRepository
    {

        PurchaseEntities entities = new PurchaseEntities();

        public IQueryable<PurchaseOrder> GetDataSuppRepDetails(int? CompId)
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurchaseReturnSuppDropDown(CompId == null ? 0 : CompId)
                                               select new PurchaseOrder
                                                {
                                                    Supplier = cd.Supplier,
                                                    SupplierId = (int)cd.SupplierId,
                                                }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> GetDataGrnRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType)
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurchaseReturnGrnDropDown(companyid == null ? 0 : companyid, SupplierId == null ? 0 : SupplierId, Purchase_Type)
                                               select new PurchaseOrder
                                               {
                                                   GrnNo = cd.Recptno,
                                                   GrnId = (int)cd.Grn_MasId,
                                                   GDcNo = cd.Dcno,
                                               }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseOrder> GetDataPoRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType)
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurchaseReturnPODropDown(companyid == null ? 0 : companyid, SupplierId == null ? 0 : SupplierId, Purchase_Type)
                                               select new PurchaseOrder
                                               {
                                                   pur_ord_no = cd.Pur_Ord_NO,
                                                   pur_ord_id = (int)cd.pur_ord_id,
                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> GetDataWrkRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id)
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurchaseReturnWorkDropDown(companyid == null ? 0 : companyid, SupplierId == null ? 0 : SupplierId, pur_ord_id == null ? 0 : pur_ord_id, Purchase_Type, EType)
                                               select new PurchaseOrder
                                               {
                                                   job_ord_no = cd.Job_Ord_No,
                                                   JobNoId = (int)cd.ID,
                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> GetDataOrdRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id)
        {

            int GrnId = 0;
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurchaseReturnOrderDropDown(companyid == null ? 0 : companyid, SupplierId == null ? 0 : SupplierId, pur_ord_id == null ? 0 : pur_ord_id, GrnId, Purchase_Type, EType)
                                               select new PurchaseOrder
                                               {
                                                   OrderNo = cd.Order_no,
                                                   BMasId = (int)cd.Buy_Ord_MasId,
                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> GetDataStyRepDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, string OrderNo, string job_ord_no)
        {

            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurchaseReturnStyleDropDown(companyid == null ? 0 : companyid, SupplierId == null ? 0 : SupplierId, string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(job_ord_no) ? "" : job_ord_no, Purchase_Type, EType)
                                               select new PurchaseOrder
                                               {
                                                   Style = cd.Style,
                                                   StyleId = (int)cd.StyleId,
                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> GetDataDcRepDetails(int? GrnMasId, string Purchase_Type)
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurchaseReturnGrnDcDropDown(GrnMasId == null ? 0 : GrnMasId, Purchase_Type)
                                               select new PurchaseOrder
                                               {
                                                   GrnNo = cd.Recptno,
                                                   GrnId = (int)cd.Grn_MasId,
                                                   GDcNo = cd.Dcno,
                                               }).AsQueryable();
            return query;
        }


        public IList<PurchaseReturnDet> GetRepGrnItemRetLoad(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string OType, string EType)
        {
            var query = (from ID1 in entities.Proc_Apparel_GetPurchaseReturnLoadAgOdorGenpurorGo(CompanyID == null ? 0 : CompanyID, SupplierID == null ? 0 : SupplierID, storeid == null ? 0 : storeid, string.IsNullOrEmpty(PurOrGrnNo) ? "" : PurOrGrnNo, OType, EType)
                         select new PurchaseReturnDet
                         {
                             item = ID1.item,
                             itemid = (int)ID1.ItemId,
                             color = ID1.color,
                             colorid = (int)ID1.Colorid,
                             size = ID1.size,
                             sizeid = (int)ID1.SizeId,
                             uomId = ID1.UomId,
                             puom = ID1.PUOM,
                             suomId = ID1.UomId,
                             suom = ID1.uom,
                             Return_ID = 0,
                             Return_DetID = 0,
                             transno = ID1.transno,
                             stockQty = (decimal)ID1.StkQty,
                             Return_qty = 0,
                             SecQty = 0,
                             compId = ID1.companyid,
                             UnitId = ID1.unitid,
                             storeunitid = ID1.storeunitid,
                             stockuomid = ID1.StockUOMID,
                             Stockid = ID1.stockid,
                             conmode = 0,
                             ToPurUom = "",
                             jobno = ID1.joborderno,


                         }).AsQueryable();

            return query.ToList();
        }




        public bool StockOutData(Pur_return_mas objPoEntry,List<Pur_Return_Det> objPoDet,List<Item_stock_outward> objPoAOutDet, string PurOrGrn, string RetNo)
        {

            bool reserved = false;
            int RetId = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objPoEntry.Return_ID == 0)
                    {
                        var id = entities.Pur_return_mas.Add(objPoEntry);
                        entities.SaveChanges();
                        RetId = objPoEntry.Return_ID;
                    }

                    foreach (var Pay in objPoDet)
                    {

                        if (Pay.Return_ID == 0)
                        {
                            Pay.Return_ID = RetId;
                        }

                        entities.Pur_Return_Det.Add(Pay);
                    }
                    entities.SaveChanges();


                    //update Itemstock alloted,pur,grn return column table
                    foreach (var ED in objPoAOutDet)
                    {


                        var Pg1 = entities.Proc_Apparel_GetPurRetUpdateItemStockPdetGdet(string.IsNullOrEmpty(ED.TransNo) ? "" : ED.TransNo, ED.Itemstockid == null ? 0 : ED.Itemstockid, ED.Quantity, ED.Unit_Or_Other, PurOrGrn);
                        entities.SaveChanges();
                    }



                    foreach (var sk in objPoAOutDet)
                    {

                        sk.TransNo = RetNo;
                        entities.Item_stock_outward.Add(sk);

                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public IQueryable<PurchaseReturn> GetDataRepRetEditDetails(int Id)
        {
            IQueryable<PurchaseReturn> query = (from a in entities.Proc_Apparel_GetPurchasereturnEditMaindetails(Id)
                                                select new PurchaseReturn
                                                {
                                                    Supplier = a.Supplier,
                                                    SupplierID = (int)a.SuppId,
                                                    CompanyID = a.CompanyId,
                                                    Company = a.Company,
                                                    PurOrGrnNo = a.TransNo,
                                                    Return_date = (DateTime)a.return_date,
                                                    Return_no = a.ReturnNo,
                                                    Return_ID = a.ReturnId,
                                                    JobNo = a.JobNo,
                                                    OrderNo = a.OrdNo,
                                                    Ordtype = a.Order_type,
                                                    StyleId = a.StyleId,
                                                    Style = a.Style,
                                                    Buy_Mas_Id = a.BMasId,
                                                    PurOrGrnNoId = a.PoGrNoId,
                                                    JobNoId = a.JobId,
                                                    PurOrGrn = a.PurOrGrn,
                                                   // storeid = a.StoreUnitId,
                                                    ParentUnitid = a.Parentstoreid,
                                                    Storetype = a.StoreType,
                                                    StoreName = a.StoreName,
                                                    storeid = a.StoreUnitId,

                                                }).AsQueryable();

            return query;
        }


        public IList<PurchaseReturnDet> GetRepGrnEditItemRetLoad(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string OType, string EType, int? Return_ID)
        {

            string OrType = "";

            if (OType == "B")
            {
                OrType = "O";
            }
            else
            {
                OrType = OType;
            }

            var query = (from ID1 in entities.Proc_Apparel_GetPurchaseReturnLoadEditAgOdorGenpurorGo(CompanyID == null ? 0 : CompanyID, SupplierID == null ? 0 : SupplierID, storeid == null ? 0 : storeid, string.IsNullOrEmpty(PurOrGrnNo) ? "" : PurOrGrnNo, OrType, EType, Return_ID)
                         select new PurchaseReturnDet
                         {
                             item = ID1.item,
                             itemid = (int)ID1.ItemId,
                             color = ID1.color,
                             colorid = (int)ID1.Colorid,
                             size = ID1.size,
                             sizeid = (int)ID1.SizeId,
                             uomId = ID1.UomId,
                             puom = ID1.PUOM,
                             suomId = ID1.UomId,
                             suom = ID1.uom,
                             Return_ID = ID1.Return_ID,
                             Return_DetID = ID1.Return_DetID,
                             transno = ID1.transno,
                             stockQty = (decimal)ID1.StkQty,
                             Return_qty = ID1.return_qty,
                             SecQty = 0,
                             compId = ID1.companyid,
                             UnitId = ID1.unitid,
                             storeunitid = ID1.storeunitid,
                             stockuomid = ID1.StockUOMID,
                             Stockid = ID1.stockid,
                             conmode = 0,
                             ToPurUom = "",
                             jobno = ID1.joborderno,


                         }).AsQueryable();

            return query.ToList();
        }


   

        public bool UpdateStockOutData(Pur_return_mas objPoEEntry, List<Item_stock_outward> objPoOutDet, string PurOrGrn, string Retno)
        {

            bool reserved = false;

            string RetNo = "";
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Pur_return_mas.Where(c => c.Return_ID == objPoEEntry.Return_ID).FirstOrDefault();
                    if (App != null)
                    {
                        App.Remarks = objPoEEntry.Remarks;
                        App.Return_date = objPoEEntry.Return_date;

                    }
                    entities.SaveChanges();


                    //update Itemstock alloted,pur,grn return column table
                    foreach (var ED in objPoOutDet)
                    {
                        var Pg1 = entities.Proc_Apparel_GetPurRetUpdateEditItemStockPdetGdet(string.IsNullOrEmpty(ED.TransNo) ? "" : ED.TransNo, ED.Itemstockid == null ? 0 : ED.Itemstockid, ED.Quantity, ED.Unit_Or_Other, PurOrGrn);
                        entities.SaveChanges();
                    }

         

                    //Det 
                    var Det = entities.Item_stock_outward.Where(u => u.TransNo == RetNo);

                    foreach (var d in Det)
                    {
                        entities.Item_stock_outward.Remove(d);
                    }
                    entities.SaveChanges();


                    var CDet = entities.Pur_Return_Det.Where(u => u.Return_ID == objPoEEntry.Return_ID);

                    foreach (var v in CDet)
                    {
                        entities.Pur_Return_Det.Remove(v);
                    }


                    //get the return no  table
                    var OQuery = entities.Pur_return_mas.Where(b => b.Return_ID == objPoEEntry.Return_ID).FirstOrDefault();
                    if (OQuery != null)
                    {
                        RetNo = OQuery.Return_no;

                    }

                    entities.SaveChanges();
                           

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }



        public bool DeleteStockOutData(Pur_return_mas objPoEEntry, List<Item_stock_outward> objPoOutDet, string PurOrGrn, string Retno)
        {
            bool reserved = false;

            //string RetNo = "";
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    


                    //update Itemstock alloted,pur,grn return column table
                    foreach (var ED in objPoOutDet)
                    {
                        var Pg1 = entities.Proc_Apparel_GetPurRetUpdateEditItemStockPdetGdet(string.IsNullOrEmpty(ED.TransNo) ? "" : ED.TransNo, ED.Itemstockid == null ? 0 : ED.Itemstockid, ED.Quantity, ED.Unit_Or_Other, PurOrGrn);
                        entities.SaveChanges();
                    }



                    //Det 
                    var Det = entities.Item_stock_outward.Where(u => u.TransNo == Retno);

                    foreach (var d in Det)
                    {
                        entities.Item_stock_outward.Remove(d);
                    }
                    entities.SaveChanges();


                    var CDet = entities.Pur_Return_Det.Where(u => u.Return_ID == objPoEEntry.Return_ID);

                    foreach (var v in CDet)
                    {
                        entities.Pur_Return_Det.Remove(v);
                    }
                    entities.SaveChanges();


                    //Mas
                    var Mas = entities.Pur_return_mas.Where(u => u.Return_ID == objPoEEntry.Return_ID);

                    foreach (var v in Mas)
                    {
                        entities.Pur_return_mas.Remove(v);
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }
    }
}
