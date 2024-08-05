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
    public class StoresDeliveryRepository : IStoresDeliveryRepository
    {

        PurchaseEntities entities = new PurchaseEntities();

        public IList<StoresDelivery> GetDataAddDelRepDetails(int? Companyid, int? Buyerid, string OrderNo, string RefNo, int? FromStoreUnitID, int? Companyunitid, string Job_Mac_Gen, string ItemType, string unit_or_other, string IgroupId)
        {

            string IgId = "";
            if (IgroupId != "")
            {
                IgId = IgroupId;
            }
            else
            {
                IgId = "";
            }

            var query = (from YD in entities.Proc_Apparel_GetStoresDeliveryAddDetails(Companyid == null ? 0 : Companyid, unit_or_other, Companyunitid == null ? 0 : Companyunitid, Buyerid == null ? 0 : Buyerid, string.IsNullOrEmpty(Job_Mac_Gen) ? "" : Job_Mac_Gen, ItemType, IgId, string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo)
                         select new StoresDelivery
                         {
                             OrderNo = (YD.OrderNo == null ? "" : YD.OrderNo),
                             Joborderno = (YD.JobNo == null ? "" : YD.JobNo),
                             ODate = (DateTime)YD.job_ord_date,
                             JobMasId = YD.JMasId,
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<StoresDeliveryDet> GetRepDelyItemLoad(string JMasId, string Job_Mac_Gen, string ItemType,string ItemGroup,int Storeid,int Processid)
        {
            var query = (from ID in entities.Proc_Apparel_GetStoresDeliEntryItemDetails(JMasId, Job_Mac_Gen, ItemType, ItemGroup, Storeid, Processid)
                         select new StoresDeliveryDet
                         {
                             Item = ID.item,
                             Itemid = (int)(ID.itemid == null ? 0 : ID.itemid),
                             Color = ID.color,
                             Colorid = (int)ID.colorid,
                             Size = ID.size,
                             Sizeid = (int)ID.sizeid,
                             Uomid = (int)ID.uomid,
                             Uom = ID.uom,
                             SUom = ID.suom,
                             Sec_uomid = ID.suomid,
                             ExcessQty = 0,
                             Quantity = 0,
                             IssueId = 0,
                             IssueDetId = 0,
                             Sec_Qty = 0,
                             BalQty = (decimal)ID.BalanceQty + (ID.Allow_Value),
                             SNo = (int)ID.SNo,
                             Plansize = ID.size,
                             Plansizeid = (int)ID.sizeid,
                             AllowValue = ID.Allow_Value,


                         }).AsQueryable();

            return query.ToList();
        }


        public IList<StoresDeliveryOrder> GetRepDelyOrderLoad(string JMasId, string Job_Mac_Gen, string ItemType, int OItemid, int OColorid, int OSizeid, int OUomid, int ESNo, int Processid)
        {
            var query = (from OID in entities.Proc_Apparel_GetStoresDeliEntryOrderDetails(JMasId, Job_Mac_Gen, ItemType, OItemid, OColorid, OSizeid, OUomid, Processid)
                         select new StoresDeliveryOrder
                         {
                             OItemid = (int)OID.itemid,
                             OSizeid = (int)OID.sizeid,
                             OColorid = (int)OID.colorid,
                             OUomid = (int)OID.uomid,
                             BalQty = (decimal)OID.BalanceQty + (OID.Allow_Value),
                             ExcessQty = 0,
                             IssueQty = 0,
                             SoNo = (int)OID.SNo,
                             OrderNo = OID.BuyOrdNo,
                             WorkOrd = OID.job_ord_no,
                             JoMasId = OID.JobId,
                             ISno = ESNo,
                             Plansize = OID.size,
                             Plansizeid = (int)OID.sizeid,
                             AllowValue = OID.Allow_Value,
                             RefNo=OID.Ref_No
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<StoresDeliveryStock> GetRepDelyStockLoad(string JMasId, string Job_Mac_Gen, string ItemType, int Companyid, int FromStoreUnitID, string Joborderno, int OItemid, int OColorid, int OSizeid, int OUomid, int ONo, int Processid)
        {
            var query = (from SID in entities.Proc_Apparel_GetStoresDeliStockDetails(JMasId, Job_Mac_Gen, ItemType, Companyid, FromStoreUnitID, Joborderno, OItemid, OColorid, OSizeid, OUomid, Processid)
                         select new StoresDeliveryStock
                         {
                             SItemid = (int)SID.itemid,
                             SSizeid = (int)SID.sizeid,
                             SColorid = (int)SID.colorid,
                             SUomid = (int)SID.uomid,
                             StockQty = (decimal)SID.balqty,
                             quantity = 0,
                             TransNo = SID.TransNo,
                             MarkRate = SID.MarkupRate,
                             IssueDetId = 0,
                             IssueOrdId = 0,
                             IssueStockID = 0,
                             ItemStockId = SID.stockid,
                             ONo = ONo,
                             jmasid = SID.JMasID,
                             Plansizeid = (int)SID.sizeid


                         }).AsQueryable();

            return query.ToList();
        }




        public bool AddDetData(Stores_Issue_Mas objDelEntry, List<Stores_Issue_Det> objDelDet, List<Stores_Issue_Order> objDelOrd, List<Stores_Issue_Stock> objDelStock, string Issueno, DateTime Issuedate, string OType)
        {
            int PGDetId = 0;
            int PGOrdId = 0;
            int IssId = 0;
            bool reserved = false;
            string IType = "";
            int CSOrdId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    if (objDelEntry.ItemType == "L")
                    {
                        IType = "";
                    }
                    else
                    {
                        IType = objDelEntry.ItemType;
                    }


                    objDelEntry.ItemType = IType;
                    var id = entities.Stores_Issue_Mas.Add(objDelEntry);
                    entities.SaveChanges();
                    IssId = objDelEntry.IssueId;

                    foreach (var item in objDelDet)
                    {
                        item.IssueId = IssId;
                        entities.Stores_Issue_Det.Add(item);
                        entities.SaveChanges();
                        PGDetId = item.IssueDetId;

                        //General

                        if (OType == "G")
                        {

                            foreach (var Stock in objDelStock)
                            {

                                if (Stock.ItemID == item.Itemid && Stock.ColorID == item.Colorid && Stock.SizeID == item.Sizeid && Stock.UOMId == item.uomid)
                                {

                                    int? IssOrdid = 0;
                                    if (PGOrdId == 0)
                                    {
                                        IssOrdid = null;
                                    }
                                    else
                                    {
                                        IssOrdid = PGOrdId;
                                    }


                                    if (Stock.quantity > 0 && OType == "G")
                                    {


                                        Stock.IssueDetId = PGDetId;
                                        Stock.IssueOrdId = IssOrdid;
                                        entities.Stores_Issue_Stock.Add(Stock);
                                        entities.SaveChanges();
                                    }
                                    if (Stock.quantity > 0)
                                    {
                                        //Update the Stock 
                                        var Pg1 = entities.Proc_Apparel_GetStoredDelyStockUpdate(Stock.quantity, Stock.ItemStockId, Issueno, Issuedate, PGOrdId);
                                        entities.SaveChanges();

                                    }
                                }
                            }
                        }
                        //Order

                        else if (OType == "W")
                        {




                            foreach (var itemOrder in objDelOrd)
                            {
                                if (itemOrder.IssueQty > 0 && OType == "W")
                                {
                                    if (item.Itemid == itemOrder.ItemID && item.Colorid == itemOrder.ColorID && item.Sizeid == itemOrder.SizeID && item.uomid == itemOrder.UOMId)
                                    {
                                        itemOrder.IssueID = IssId;
                                        itemOrder.IssueDetID = PGDetId;
                                        entities.Stores_Issue_Order.Add(itemOrder);
                                        entities.SaveChanges();
                                        PGOrdId = itemOrder.IssueOrdID;
                                    }
                                    if (itemOrder.IssueQty > 0 && OType == "W" && item.Itemid == itemOrder.ItemID && item.Colorid == itemOrder.ColorID && item.Sizeid == itemOrder.SizeID && item.uomid == itemOrder.UOMId)
                                    {
                                        //Update the bom 
                                        var Pg1 = entities.Proc_Apparel_GetStoredDelyBuyBomUpdate(itemOrder.IssueQty, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                                        entities.SaveChanges();

                                    }
                              
                                foreach (var Stock in objDelStock)
                                {
                                    int? IssOrdid = 0;
                                    if (PGOrdId == 0)
                                    {
                                        IssOrdid = null;
                                    }
                                    else
                                    {
                                        IssOrdid = PGOrdId;
                                    }

                                    if (Stock.quantity > 0 && OType == "W" && itemOrder.ItemID == Stock.ItemID && item.Itemid == Stock.ItemID && itemOrder.ColorID == Stock.ColorID && item.Colorid == Stock.ColorID && itemOrder.SizeID == Stock.SizeID && item.Sizeid == Stock.SizeID && itemOrder.UOMId == Stock.UOMId && item.uomid == Stock.UOMId && itemOrder.jmasid == Stock.jmasid)
                                        {
                                            Stock.IssueDetId = PGDetId;
                                            Stock.IssueOrdId = PGOrdId;
                                            entities.Stores_Issue_Stock.Add(Stock);
                                            entities.SaveChanges();
                                            CSOrdId = (int)Stock.IssueOrdId;
                                            //}

                                            //if (Stock.quantity > 0 && itemOrder.ItemID == Stock.ItemID && itemOrder.ColorID == Stock.ColorID && itemOrder.SizeID == Stock.SizeID && itemOrder.UOMId == Stock.UOMId)
                                            //{
                                            //Update the Stock 
                                            var Pg1 = entities.Proc_Apparel_GetStoredDelyStockUpdate(Stock.quantity, Stock.ItemStockId, Issueno, Issuedate, PGOrdId);
                                            entities.SaveChanges();

                                        }
                                }
                                }
                            }
                        }
                        //Sample Order

                        else if (OType == "S")
                        {



                            foreach (var itemOrder in objDelOrd)
                            {
                                if (itemOrder.IssueQty > 0 && OType == "S")
                                {
                                    if (item.Itemid == itemOrder.ItemID && item.Colorid == itemOrder.ColorID && item.Sizeid == itemOrder.SizeID && item.uomid == itemOrder.UOMId)
                                    {
                                        itemOrder.IssueID = IssId;
                                        itemOrder.IssueDetID = PGDetId;
                                        entities.Stores_Issue_Order.Add(itemOrder);
                                        entities.SaveChanges();
                                        PGOrdId = itemOrder.IssueOrdID;
                                    }
                                    if (itemOrder.IssueQty > 0 && OType == "S" && item.Itemid == itemOrder.ItemID && item.Colorid == itemOrder.ColorID && item.Sizeid == itemOrder.SizeID && item.uomid == itemOrder.UOMId)
                                    {
                                        //Update the bom 
                                        var Pg1 = entities.Proc_Apparel_GetStoredDelySamBomUpdate(itemOrder.IssueQty, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                                        entities.SaveChanges();

                                    }
                                }
                                foreach (var Stock in objDelStock)
                                {
                                    int? IssOrdid = 0;
                                    if (PGOrdId == 0)
                                    {
                                        IssOrdid = null;
                                    }
                                    else
                                    {
                                        IssOrdid = PGOrdId;
                                    }

                                    if (Stock.quantity > 0 && OType == "S" && itemOrder.ItemID == Stock.ItemID && item.Itemid == Stock.ItemID && itemOrder.ColorID == Stock.ColorID && item.Colorid == Stock.ColorID && itemOrder.SizeID == Stock.SizeID && item.Sizeid == Stock.SizeID && itemOrder.UOMId == Stock.UOMId && item.uomid == Stock.UOMId && itemOrder.jmasid == Stock.jmasid)
                                    {
                                        Stock.IssueDetId = PGDetId;
                                        Stock.IssueOrdId = PGOrdId;
                                        entities.Stores_Issue_Stock.Add(Stock);
                                        entities.SaveChanges();
                                        CSOrdId = (int)Stock.IssueOrdId;
                                        //}

                                        //if (Stock.quantity > 0 && itemOrder.ItemID == Stock.ItemID && itemOrder.ColorID == Stock.ColorID && itemOrder.SizeID == Stock.SizeID && itemOrder.UOMId == Stock.UOMId)
                                        //{
                                        //Update the Stock 
                                        var Pg1 = entities.Proc_Apparel_GetStoredDelyStockUpdate(Stock.quantity, Stock.ItemStockId, Issueno, Issuedate, PGOrdId);
                                        entities.SaveChanges();

                                    }
                                }
                            }
                        }//Job Order
                        else if (OType == "P")
                        {




                            foreach (var itemOrder in objDelOrd)
                            {
                                if (itemOrder.IssueQty > 0 && OType == "P")
                                {
                                    if (item.Itemid == itemOrder.ItemID && item.Colorid == itemOrder.ColorID && item.Sizeid == itemOrder.SizeID && item.uomid == itemOrder.UOMId)
                                    {
                                        itemOrder.IssueID = IssId;
                                        itemOrder.IssueDetID = PGDetId;
                                        entities.Stores_Issue_Order.Add(itemOrder);
                                        entities.SaveChanges();
                                        PGOrdId = itemOrder.IssueOrdID;
                                    }
                                    if (itemOrder.IssueQty > 0 && OType == "P" && item.Itemid == itemOrder.ItemID && item.Colorid == itemOrder.ColorID && item.Sizeid == itemOrder.SizeID && item.uomid == itemOrder.UOMId)
                                    {
                                        //Update the bom 
                                        var Pg1 = entities.Proc_Apparel_GetStoredDelyBuyJobBomUpdate(itemOrder.IssueQty, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                                        entities.SaveChanges();

                                    }
                                }
                                foreach (var Stock in objDelStock)
                                {
                                    int? IssOrdid = 0;
                                    if (PGOrdId == 0)
                                    {
                                        IssOrdid = null;
                                    }
                                    else
                                    {
                                        IssOrdid = PGOrdId;
                                    }

                                    if (Stock.quantity > 0 && OType == "P" && itemOrder.ItemID == Stock.ItemID && item.Itemid == Stock.ItemID && itemOrder.ColorID == Stock.ColorID && item.Colorid == Stock.ColorID && itemOrder.SizeID == Stock.SizeID && item.Sizeid == Stock.SizeID && itemOrder.UOMId == Stock.UOMId && item.uomid == Stock.UOMId && itemOrder.jmasid == Stock.jmasid)
                                    {
                                        Stock.IssueDetId = PGDetId;
                                        Stock.IssueOrdId = PGOrdId;
                                        entities.Stores_Issue_Stock.Add(Stock);
                                        entities.SaveChanges();
                                        CSOrdId = (int)Stock.IssueOrdId;
                                        //}

                                        //if (Stock.quantity > 0 && itemOrder.ItemID == Stock.ItemID && itemOrder.ColorID == Stock.ColorID && itemOrder.SizeID == Stock.SizeID && itemOrder.UOMId == Stock.UOMId)
                                        //{
                                        //Update the Stock 
                                        var Pg1 = entities.Proc_Apparel_GetStoredDelyStockUpdate(Stock.quantity, Stock.ItemStockId, Issueno, Issuedate, PGOrdId);
                                        entities.SaveChanges();

                                    }
                                }
                            }
                        }



                            //Spl
                        else if (OType == "R")
                        {




                            foreach (var itemOrder in objDelOrd)
                            {
                                if (itemOrder.IssueQty > 0 && OType == "R")
                                {
                                    if (item.Itemid == itemOrder.ItemID && item.Colorid == itemOrder.ColorID && item.Sizeid == itemOrder.SizeID && item.uomid == itemOrder.UOMId)
                                    {
                                        itemOrder.IssueDetID = PGDetId;
                                        itemOrder.IssueID = IssId;
                                        entities.Stores_Issue_Order.Add(itemOrder);
                                        entities.SaveChanges();
                                        PGOrdId = itemOrder.IssueOrdID;
                                    }
                                    if (itemOrder.IssueQty > 0 && OType == "R" && item.Itemid == itemOrder.ItemID && item.Colorid == itemOrder.ColorID && item.Sizeid == itemOrder.SizeID && item.uomid == itemOrder.UOMId)
                                    {
                                        //Update the bom 
                                        var Pg1 = entities.Proc_Apparel_GetStoredDelySplBomUpdate(itemOrder.IssueQty, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                                        entities.SaveChanges();

                                    }
                                }
                                foreach (var Stock in objDelStock)
                                {
                                    int? IssOrdid = 0;
                                    if (PGOrdId == 0)
                                    {
                                        IssOrdid = null;
                                    }
                                    else
                                    {
                                        IssOrdid = PGOrdId;
                                    }

                                    if (Stock.quantity > 0 && OType == "R" && itemOrder.ItemID == Stock.ItemID && item.Itemid == Stock.ItemID && itemOrder.ColorID == Stock.ColorID && item.Colorid == Stock.ColorID && itemOrder.SizeID == Stock.SizeID && item.Sizeid == Stock.SizeID && itemOrder.UOMId == Stock.UOMId && item.uomid == Stock.UOMId && itemOrder.jmasid == Stock.jmasid)
                                    {
                                        Stock.IssueDetId = PGDetId;
                                        Stock.IssueOrdId = PGOrdId;
                                        entities.Stores_Issue_Stock.Add(Stock);
                                        entities.SaveChanges();



                                        //Update the Stock 
                                        var Pg1 = entities.Proc_Apparel_GetStoredDelyStockUpdate(Stock.quantity, Stock.ItemStockId, Issueno, Issuedate, PGOrdId);
                                        entities.SaveChanges();

                                    }
                                }
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
                }
            }
            return reserved;
        }





        public IQueryable<StoresDelivery> GetDataUnitRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid)
        {
            string IType = "";

            if (ItemType == "L")
            {
                IType = "";
            }
            else
            {
                IType = ItemType;
            }

            IQueryable<StoresDelivery> query = (from cd in entities.Proc_Apparel_GetStoresDeliLoadMainUnitDropDown(Companyid == null ? 0 : Companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), unit_or_other, IType, Job_Mac_Gen)
                                                select new StoresDelivery
                                               {

                                                   Unit = cd.Unit,
                                                   Companyunitid = cd.UnitId,


                                               }).AsQueryable();
            return query;
        }


        public IQueryable<StoresDelivery> GetDataOrderRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {

            string IType = "";

            if (ItemType == "L")
            {
                IType = "";
            }
            else
            {
                IType = ItemType;
            }
            IQueryable<StoresDelivery> query = (from cd1 in entities.Proc_Apparel_GetStoresDeliLoadMainOrderRefDropDown(Companyid == null ? 0 : Companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), unit_or_other, IType, Job_Mac_Gen, string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, desunitid == null ? 0 : desunitid, IssueId == null ? 0 : IssueId)
                                                select new StoresDelivery
                                                {

                                                    OrderNo = cd1.Order_no,
                                                    RefNo = cd1.ref_no,


                                                }).AsQueryable();
            return query;
        }


        public IQueryable<StoresDelivery> GetDataDisRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {


            string IType = "";

            if (ItemType == "L")
            {
                IType = "";
            }
            else
            {
                IType = ItemType;
            }

            IQueryable<StoresDelivery> query = (from cd2 in entities.Proc_Apparel_GetStoresDeliLoadMainUnitSuppDropDown(Companyid == null ? 0 : Companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), unit_or_other, IType, Job_Mac_Gen, string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, desunitid == null ? 0 : desunitid, IssueId == null ? 0 : IssueId)
                                                select new StoresDelivery
                                                {

                                                    Unit_supplier_self = cd2.UnitOrSupplier,
                                                    desunitid = cd2.desunitid,


                                                }).AsQueryable();
            return query;
        }

        public IQueryable<StoresDelivery> GetDataIssueRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {

            string IType = "";

            if (ItemType == "L")
            {
                IType = "";
            }
            else
            {
                IType = ItemType;
            }

            IQueryable<StoresDelivery> query = (from cd3 in entities.Proc_Apparel_GetStoresDeliLoadMainIssueDropDown(Companyid == null ? 0 : Companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), unit_or_other, IType, Job_Mac_Gen, string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, desunitid == null ? 0 : desunitid, IssueId == null ? 0 : IssueId)
                                                select new StoresDelivery
                                                {

                                                    IssueId = cd3.IssueID,
                                                    Issueno = cd3.IssueNo,


                                                }).AsQueryable();
            return query;
        }


        public IQueryable<StoresDelivery> GetDataMainRepDetails(string unit_or_other, string Job_Mac_Gen, string ItemType, string FromDate, string ToDate, int? Companyid, string OrderNo, string RefNo, int? desunitid, int? IssueId)
        {

            string IType = "";

            if (ItemType == "L")
            {
                IType = "";
            }
            else
            {
                IType = ItemType;
            }

            IQueryable<StoresDelivery> query = (from cd4 in entities.Proc_Apparel_GetStoresDeliLoadMain(Companyid == null ? 0 : Companyid, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), unit_or_other, IType, Job_Mac_Gen, string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, desunitid == null ? 0 : desunitid, IssueId == null ? 0 : IssueId)
                                                select new StoresDelivery
                                                {

                                                    IssueId = cd4.IssueID,
                                                    Issueno = cd4.IssueNo,
                                                    desunitid = cd4.desunitid,
                                                    Unit = cd4.Unit,
                                                    Issuedate = (DateTime)cd4.Issuedate,
                                                    Reference = cd4.Reference,
                                                    Companyunitid = cd4.UnitId,
                                                    Unit_supplier_self = cd4.UnitOrSupplier,
                                                    RIssId = cd4.RIssId,
                                                    OrderNo=cd4.Order_no,
                                                    RefNo=cd4.ref_no,
                                                    
                                                }).AsQueryable();
            return query;
        }
        public IQueryable<Domain.StoresDelivery> LoadMainOrderdet(int IssId)
        {
            var query = (from Tes in entities.Proc_Apparel_StoresIssueLoadMainDet(IssId)
                         select new StoresDelivery
                         {
                             OrderNo = Tes.Order_No,
                             RefNo = Tes.Ref_No,
                             Style = Tes.Style,
                         }).AsQueryable();
            return query;
        }

        public IQueryable<StoresDelivery> GetDataRepEditDeliDetails(int Id)
        {
            IQueryable<StoresDelivery> query = (from a in entities.Proc_Apparel_GetStoresDeliEditDetails(Id)
                                                select new StoresDelivery
                                               {
                                                   Companyid = a.companyid,
                                                   Company = a.Company,
                                                   IssueId = a.IssueID,
                                                   Issueno = a.IssueNo,
                                                   Issuedate = (DateTime)a.Issuedate,
                                                   Unit = a.Unit,
                                                   Companyunitid = a.companyunitid,
                                                   unit_or_other = a.unit_or_other,
                                                   Job_Mac_Gen = a.job_mac_gen,
                                                   remarks = a.remarks,
                                                   Unit_supplier_self = a.Unit_Supplier_Self,
                                                   UnitSup = (a.UnitOrSupplier == null ? "" : a.UnitOrSupplier),
                                                   GatePassVehicle = a.VehicleNo,
                                                   desunitid = (int)(a.desunitid == null ? 0 : a.desunitid),
                                                   RequestnerId = a.RequestnerId,
                                                   Requestner = a.Requestner,
                                                   Deptid = a.DepartmentId,
                                                   Dept = a.Department,
                                                   ItemType = a.itemtype,
                                                   FromStoreUnitID = a.FromStoreunitid,
                                                   Processid=a.Processid

                                               }).AsQueryable();

            return query;
        }


        public IList<StoresDeliveryDet> GetRepEntryDelyEditItemLoad(int Id, string Job_Mac_Gen)
        {
            var query = (from EID in entities.Proc_Apparel_GetDelyEditItemDetails(Id, Job_Mac_Gen)
                         select new StoresDeliveryDet
                         {
                             Item = EID.item,
                             Itemid = (int)(EID.itemid == null ? 0 : EID.itemid),
                             Color = EID.color,
                             Colorid = (int)EID.colorid,
                             Size = EID.size,
                             Sizeid = (int)EID.sizeid,
                             Uomid = (int)EID.uomid,
                             Uom = EID.uom,
                             SUom = EID.suom,
                             Sec_uomid = EID.sec_uomid,
                             ExcessQty = EID.IssOrdExcessQty,
                             Quantity = EID.IssuedQty,
                             IssueId = EID.issueId,
                             IssueDetId = EID.issuedetid,
                             Sec_Qty = EID.sec_Qty,
                             BalQty = (decimal)EID.BalanceQty + EID.IssuedQty + EID.Allow_Value,
                             SNo = (int)EID.SNo,
                             Plansizeid = (int)EID.plansizeid,
                             Plansize = EID.plansize,
                             AllowValue = EID.Allow_Value,
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<StoresDeliveryOrder> GetRepEntryDelyEditOrdLoad(int IssueId, int OItemid, int OColorid, int OSizeid, int OUomid, string Job_Mac_Gen)
        {
            var query = (from EID in entities.Proc_Apparel_GetDelyEditOrderDetails(IssueId, OItemid, OColorid, OSizeid, OUomid, Job_Mac_Gen)
                         select new StoresDeliveryOrder
                         {
                             OItemid = (int)EID.itemid,
                             OSizeid = (int)EID.sizeid,
                             OColorid = (int)EID.colorid,
                             OUomid = (int)EID.uomid,
                             BalQty = (decimal)EID.BalanceQty + EID.IssOrdQty + EID.Allow_Value,
                             ExcessQty = EID.IssOrdExcessQty,
                             IssueQty = EID.IssOrdQty,
                             SoNo = (int)EID.SNo,
                             OrderNo = EID.BuyOrdNo,
                             RefNo=EID.Ref_No,
                             WorkOrd = EID.job_ord_no,
                             IssueDetID = EID.issuedetid,
                             IssueID = EID.issueId,
                             IssueOrdID = EID.IssOrdId,
                             JoMasId = EID.JobId,
                             Plansizeid = (int)EID.plansizeid,
                             Plansize = EID.plansize,
                             AllowValue = EID.Allow_Value,
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<StoresDeliveryStock> GetRepEntryDelyEditStkLoad(int? IssueId, int? OItemid, int? OColorid, int? OSizeid, int? OUomid, string Job_Mac_Gen, int? Companyid, int? FromStoreUnitID)
        {
            var query = (from SID in entities.Proc_Apparel_GetDelyEditStockDetails(IssueId == null ? 0 : IssueId, OItemid == null ? 0 : OItemid, OColorid == null ? 0 : OColorid, OSizeid == null ? 0 : OSizeid, OUomid == null ? 0 : OUomid, Job_Mac_Gen, FromStoreUnitID == null ? 0 : FromStoreUnitID, Companyid == null ? 0 : Companyid)
                         select new StoresDeliveryStock
                         {
                             SItemid = (int)SID.itemid,
                             SSizeid = (int)SID.sizeid,
                             SColorid = (int)SID.colorid,
                             SUomid = (int)SID.uomid,
                             StockQty = (decimal)SID.balqty + (decimal)SID.IssuedQty,
                             quantity = (decimal)SID.IssuedQty,
                             TransNo = SID.TransNo,
                             MarkRate = SID.MarkupRate,
                             IssueDetId = (int)SID.IssueDetid,
                             IssueOrdId = (int)SID.issueordid,
                             IssueStockID = (int)SID.IssStkId,
                             ItemStockId = SID.stockid,
                             jmasid = SID.JMasid

                         }).AsQueryable();

            return query.ToList();
        }




        public bool UpdateDetData(Stores_Issue_Mas objEDelEntry, List<Stores_Issue_Det> objEDelDet, List<Stores_Issue_Order> objEDelOrd, List<Stores_Issue_Stock> objEDelStock, string Issueno, DateTime Issuedate, string OType)
        {

            bool reserved = false;
            string IType = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.Stores_Issue_Mas.Where(c => c.IssueId == objEDelEntry.IssueId).FirstOrDefault();
                    if (App != null)
                    {


                        if (objEDelEntry.ItemType == null)
                        {
                            IType = "";
                        }
                        else
                        {
                            IType = objEDelEntry.ItemType;
                        }

                        App.Issueno = objEDelEntry.Issueno;
                        App.Issuedate = objEDelEntry.Issuedate;
                        App.Companyunitid = objEDelEntry.Companyunitid;
                        App.Companyid = objEDelEntry.Companyid;
                        App.Unit_supplier_self = objEDelEntry.Unit_supplier_self;
                        App.desunitid = objEDelEntry.desunitid;
                        App.remarks = objEDelEntry.remarks;
                        App.Job_Mac_Gen = objEDelEntry.Job_Mac_Gen;
                        App.issue_Commit = objEDelEntry.issue_Commit;
                        App.reqorstock = objEDelEntry.reqorstock;
                        App.issueunit = objEDelEntry.issueunit;
                        App.unit_or_other = objEDelEntry.unit_or_other;
                        App.ItemType = IType;
                        App.GatePassVehicle = objEDelEntry.GatePassVehicle;
                        App.QualityMade = objEDelEntry.QualityMade;
                        App.QltyRemarks = objEDelEntry.QltyRemarks;
                        App.RequestnerId = objEDelEntry.RequestnerId;
                        App.FromStoreUnitID = objEDelEntry.FromStoreUnitID;
                        App.CreatedBy = objEDelEntry.CreatedBy;
                        App.Deptid = objEDelEntry.Deptid;
                        App.SplNo = objEDelEntry.SplNo;
                    }
                    entities.SaveChanges();

                    foreach (var itemOrder in objEDelOrd)
                    {


                        if (itemOrder.IssueQty > 0 && OType == "W")
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelyBuyEditBomUpdate(itemOrder.IssueOrdID, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                            entities.SaveChanges();

                        }

                        if (itemOrder.IssueQty > 0 && OType == "S")
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelySamEditBomUpdate(itemOrder.IssueOrdID, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                            entities.SaveChanges();

                        }

                        if (itemOrder.IssueQty > 0 && OType == "R")
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelySplEditBomUpdate(itemOrder.IssueOrdID, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                            entities.SaveChanges();

                        }
                        if (itemOrder.IssueQty > 0 && OType == "P")
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelyBuyEditJobBomUpdate(itemOrder.IssueOrdID, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                            entities.SaveChanges();

                        }
                    }
                    foreach (var Stock in objEDelStock)
                    {

                        if (Stock.quantity > 0)
                        {
                            //Update the Stock 
                            var Pg2 = entities.Proc_Apparel_GetStoredDelyEditStockUpdate(Stock.ItemStockId, Issueno, Stock.IssueStockID);
                            entities.SaveChanges();

                        }
                    }

                    ////delete table
                    //var Pg3 = entities.Proc_Apparel_GetStoredDelyDeleteTable(Issueno);
                    //entities.SaveChanges();

                    //update table
                    foreach (var k in objEDelDet)
                    {
                        var e = entities.Stores_Issue_Det.Where(a => a.IssueDetId.Equals(k.IssueDetId)).FirstOrDefault();
                        if (e != null)
                        {

                            e.IssueDetId = k.IssueDetId;
                            e.IssueId = k.IssueId;
                            e.Itemid = k.Itemid;
                            e.Colorid = k.Colorid;
                            e.Sizeid = k.Sizeid;
                            e.Quantity = k.Quantity;
                            e.returnqty = k.returnqty;
                            e.uomid = k.uomid;
                            e.Sec_Qty = k.Sec_Qty;
                            e.UnitStockid = k.UnitStockid;
                            e.ItemRemarks = k.ItemRemarks;
                            e.qtyremarks = k.qtyremarks;
                            e.Sec_uomid = k.Sec_uomid;
                            e.RefConversion = k.RefConversion;
                            e.Sec_qty1 = k.Quantity;
                            e.Sec_uomid1 = k.Sec_uomid1;
                            e.QltyItemRemarks = k.QltyItemRemarks;
                            e.ReceivedQty = k.ReceivedQty;
                            e.RejectedQty = k.RejectedQty;
                            e.RejectStockId = k.RejectStockId;
                            e.ExcessQty = k.ExcessQty;
                            e.PlannedSizeID = k.PlannedSizeID;

                        }
                    }

                    foreach (var l in objEDelOrd)
                    {
                        var e1 = entities.Stores_Issue_Order.Where(a => a.IssueOrdID.Equals(l.IssueOrdID)).FirstOrDefault();
                        if (e1 != null)
                        {


                            e1.IssueID = l.IssueID;
                            e1.IssueOrdID = l.IssueOrdID;
                            e1.IssueDetID = l.IssueDetID;
                            e1.OrderNo = l.OrderNo;
                            e1.IssueQty = l.IssueQty;
                            e1.UnitStockId = l.UnitStockId;
                            e1.ReceivedQty = l.ReceivedQty;
                            e1.RejectedQty = l.RejectedQty;
                            e1.RejectStockId = l.RejectStockId;
                            e1.ReturnQty = l.ReturnQty;
                            e1.ExcessQty = l.ExcessQty;
                            e1.ItemID = l.ItemID;
                            e1.ColorID = l.ColorID;
                            e1.SizeID = l.SizeID;
                            e1.UOMId = l.UOMId;
                            e1.PlannedSizeID = l.PlannedSizeID;
                        }

                    }



                    foreach (var S in objEDelStock)
                    {

                        int? IssOrdid = 0;
                        if (S.IssueOrdId == 0)
                        {
                            IssOrdid = null;
                        }
                        else
                        {
                            IssOrdid = S.IssueOrdId;
                        }



                        var e1 = entities.Stores_Issue_Stock.Where(a => a.IssueStockID.Equals(S.IssueStockID)).FirstOrDefault();
                        if (e1 != null)
                        {

                            e1.IssueStockID = S.IssueStockID;
                            e1.IssueDetId = S.IssueDetId;
                            e1.ItemStockId = S.ItemStockId;
                            e1.quantity = S.quantity;
                            e1.Sec_qty = S.Sec_qty;
                            e1.IssueOrdId = IssOrdid;
                        }

                    }


                    //update Bomdet table

                    if (OType == "W")
                    {

                        foreach (var ED in objEDelOrd)
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelyBuyBomUpdate(ED.IssueQty, ED.ItemID, ED.ColorID, ED.PlannedSizeID, ED.OrderNo);
                            entities.SaveChanges();
                        }
                    }

                    if (OType == "P")
                    {

                        foreach (var ED in objEDelOrd)
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelyBuyJobBomUpdate(ED.IssueQty, ED.ItemID, ED.ColorID, ED.PlannedSizeID, ED.OrderNo);
                            entities.SaveChanges();
                        }
                    }
                    else if (OType == "R")
                    {
                        foreach (var ED in objEDelOrd)
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelySplBomUpdate(ED.IssueQty, ED.ItemID, ED.ColorID, ED.PlannedSizeID, ED.OrderNo);
                            entities.SaveChanges();
                        }
                    }

                    else if (OType == "S")
                    {
                        foreach (var ED in objEDelOrd)
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelySamBomUpdate(ED.IssueQty, ED.ItemID, ED.ColorID, ED.PlannedSizeID, ED.OrderNo);
                            entities.SaveChanges();
                        }
                    }


                    //update Stock table
                    foreach (var SD in objEDelStock)
                    {

                        int? IssOrdid = 0;
                        if (SD.IssueOrdId == 0)
                        {
                            IssOrdid = null;
                        }
                        else
                        {
                            IssOrdid = SD.IssueOrdId;
                        }



                        var Pg1 = entities.Proc_Apparel_GetStoredDelyStockUpdate(SD.quantity, SD.ItemStockId, Issueno, Issuedate, IssOrdid);
                        entities.SaveChanges();

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



        public bool DeleteDetData(List<Stores_Issue_Order> objDDelOrd, List<Stores_Issue_Stock> objDDelStock, string Issueno, DateTime Issuedate, string OType)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var itemOrder in objDDelOrd)
                    {


                        if (itemOrder.IssueQty > 0 && OType == "W")
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelyBuyEditBomUpdate(itemOrder.IssueOrdID, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                            entities.SaveChanges();

                        }
                        else if (itemOrder.IssueQty > 0 && OType == "S")
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelyBuyEditBomUpdate(itemOrder.IssueOrdID, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                            entities.SaveChanges();

                        }

                        else if (itemOrder.IssueQty > 0 && OType == "R")
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelySplEditBomUpdate(itemOrder.IssueOrdID, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                            entities.SaveChanges();
                        }
                        else if (itemOrder.IssueQty > 0 && OType == "R")
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelySplEditBomUpdate(itemOrder.IssueOrdID, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                            entities.SaveChanges();

                        }
                        else if (itemOrder.IssueQty > 0 && OType == "P")
                        {
                            //Update the bom 
                            var Pg1 = entities.Proc_Apparel_GetStoredDelyBuyEditJobBomUpdate(itemOrder.IssueOrdID, itemOrder.ItemID, itemOrder.ColorID, itemOrder.PlannedSizeID, itemOrder.OrderNo);
                            entities.SaveChanges();

                        }
                    }
                    foreach (var Stock in objDDelStock)
                    {

                        if (Stock.quantity > 0)
                        {
                            //Update the Stock 
                            var Pg2 = entities.Proc_Apparel_GetStoredDelyEditStockUpdate(Stock.ItemStockId, Issueno, Stock.IssueStockID);
                            entities.SaveChanges();

                        }
                    }
                    ////delete table
                    var Pg3 = entities.Proc_Apparel_GetStoredDelyDeleteTable(Issueno);
                    entities.SaveChanges();



                    //Mas
                    var Mas = entities.Stores_Issue_Mas.Where(u => u.Issueno == Issueno);

                    foreach (var v in Mas)
                    {
                        entities.Stores_Issue_Mas.Remove(v);
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
