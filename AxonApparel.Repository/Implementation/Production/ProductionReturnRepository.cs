using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{

    public class ProductionReturnRepository : IProductionReturnRepository
    {

        ProductionEntities entities = new ProductionEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();


        public IQueryable<Domain.ProductionReturn> Getprocess(int cmpid, int cmunitid)
        {
            var query = (from YD in entities.Proc_Apparel_ProdReturnLoadProcess(cmpid, cmunitid)
                         select new ProductionReturn
                         {

                             processid = YD.ProcessId,
                             process = YD.Process

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProductionReturn> Getsupp()
        {
            var query = (from YD in entities.Proc_Apparel_ProdReturnLoadSupp()
                         select new ProductionReturn
                         {

                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProductionReturn> Getbuyer(int cmpid, int cmunitid, int processid, int processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProdReturnLoadBuyer(cmpid, cmunitid, processid, processorid)
                         select new ProductionReturn
                         {

                             buyer = YD.Buyer,
                             buyerid = YD.Buyerid

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProductionReturn> Getorder(int cmpid, int cmunitid, int processid, int processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProdReturnLoadorder(cmpid, cmunitid, processid, processorid)
                         select new ProductionReturn
                         {

                             bmasid = YD.Buy_Ord_MasId,
                             orderno = YD.Order_No,
                             refno = YD.Ref_No

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProductionReturn> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, int buyerid, string refno, string ordno, string ordtype, string procordtype)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRetLoadaddgrid(cmpid, cmunitid, processid, processorid, buyerid, refno, ordno, ordtype, procordtype)
                         select new ProductionReturn
                         {
                             processor = YD.Processor,
                             orderqty = (decimal)YD.Orderqty,
                             bal = YD.Bal,
                             issued = (decimal)YD.Issued,
                             prodordid = YD.productionordid,
                             prodord = YD.productionorder,
                             proddate = (DateTime)YD.ProcessorDate,
                             cmp=YD.Company,
                             cmpid=YD.companyid,
                             unitid=(int)YD.companyunitid,
                             unit=YD.CompanyUnit,
                             orderno=YD.ordno,                             
                             ordtype=YD.OrderType,
                             buyerid=YD.BuyerId,
                             buyer=YD.buyer,
                             process=YD.Process,
                             processid=(int)YD.processid,
                             procordtype=YD.ProcessorType
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProductionReturnItemDet> LoadItmdet(string prodord)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRetLoadItm(prodord)
                         select new ProductionReturnItemDet
                         {
                             prodjobdetid = YD.ProductionJobDetid,
                             prodorddetid = YD.productionorddetid,
                             prodordid = YD.productionordid,
                             productionord = YD.productionorder,
                             prodprgno = YD.ProdPrgNo,
                             jobordno = YD.job_ord_no,
                             prodprgdetid = YD.Prodprgdetid,
                             lossqty = YD.lossqty,
                             lotno = YD.lotno,
                             refno = YD.Ref_no,
                             retqty = YD.retQty,
                             itm = YD.item,
                             itmid = (int)YD.itemid,
                             colorid = (int)YD.colorid,
                             color = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             style = YD.style,
                             styleid = (int)YD.styleid,
                             uomid = (int)YD.uomid

                         }).AsQueryable();

            return query;
        }


        public int AddData(Production_Recpt_Mas objEntry)
        {
            var id = entities.Production_Recpt_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.prod_recpt_masid;
        }

        public bool AddDetData(Production_Recpt_Mas obj, string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<Domain.ProductionReturnItemDet> itm, List<Production_Recpt_Return> objdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    entities.Production_Recpt_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.prod_recpt_masid;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Returnqty > 0 || item.LossQty > 0)
                            {
                                item.Production_Recpt_masid = Masid;
                                entities.Production_Recpt_Return.Add(item);
                            }
                        }
                        entities.SaveChanges();
                    }



                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {

                            if (item.retqty > 0 || item.lossqty > 0)
                            {
                                //if (item.uomid == null) { 
                                //item.uomid
                                //}

                                var Pged = entities.Proc_Apparel_ProdutnReturnInsertItemstock(item.itmid, item.colorid, item.sizeid, item.uomid, item.retqty, item.Rate, item.Maruprate,item.jobordno, transno, processid, item.lotno, transdate, cmpid, item.suppid, item.styleid, item.retqty, item.stockid, item.retqty, item.lossqty, remarks, stuid, cretby);
                                entities.SaveChanges();

                                var Pg1 = entities.Proc_Apparel_ProductionRetUpdProdprgDet(item.retqty, item.lossqty, item.prodprgdetid, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProductionRetUpdProdOrdDet(item.retqty, item.lossqty, item.prodorddetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProductionRetUpdProdOrdJobDet(item.retqty, item.lossqty, item.prodorddetid, item.prodjobdetid);
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
                    exceplogg.SendExcepToDB(ex, "ProductionReturn-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProductionRecptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid, string ordno)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptLoadMain(cmpid, processid, unitid, buyerid, masid, prodordid, processortype, type, dcno, recptno, fromdate, todate, Processorid, ordno)
                         select new ProductionRecptMas
                         {
                             company = YD.company,
                             companyid = YD.Companyid,
                             buyerid = YD.buyerid,
                             buyer = YD.buyer,
                             unitid = YD.Id,
                             unit = YD.CompanyUnit,
                             prod_recpt_masid = YD.ProcessRecptid,
                             productionordid = YD.productionordid,
                             productionorder = YD.productionorder,
                             Recpt_Ref_no = YD.Recpt_Ref_no,
                             prod_recpt_no = YD.prod_recpt_no,
                             prod_recpt_date = (DateTime)YD.ProcessRecptdate,
                             processid = YD.Processid,
                             process = YD.Process,
                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier,
                             type = YD.type,
                             remarks = YD.remarks,
                             Recpt_Ref_date = (DateTime)YD.Recpt_Ref_date,
                             ParentUnitid = YD.Parentstoreid,
                             Storetype = YD.StoreType,
                             storeunit = YD.StoreName,
                             StoreUnitID = YD.StoreUnitId,

                         }).AsQueryable();

            return query;
        }
        public IQueryable<ProductionRecptMas> LoadMaingridord(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptLoadMainord(cmpid, processid, unitid, buyerid, masid, prodordid, processortype, type, dcno, recptno, fromdate, todate, Processorid)
                         select new ProductionRecptMas
                         {
                             company = YD.company,
                             companyid = YD.Companyid,
                             buyerid = YD.buyerid,
                             buyer = YD.buyer,
                             unitid = YD.Id,
                             unit = YD.CompanyUnit,
                             prod_recpt_masid = YD.ProcessRecptid,
                             productionordid = YD.productionordid,
                             productionorder = YD.productionorder,
                             Recpt_Ref_no = YD.Recpt_Ref_no,
                             prod_recpt_no = YD.prod_recpt_no,
                             prod_recpt_date = (DateTime)YD.ProcessRecptdate,
                             processid = YD.Processid,
                             process = YD.Process,
                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier,
                             type = YD.type,
                             remarks = YD.remarks,
                             Recpt_Ref_date = (DateTime)YD.Recpt_Ref_date,
                             ParentUnitid = YD.Parentstoreid,
                             Storetype = YD.StoreType,
                             storeunit = YD.StoreName,
                             StoreUnitID = YD.StoreUnitId,
                             orderno = YD.Order_No,
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProductionReturnItemDet> LoadEditItmdet(int masid, string prodord)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRetEditItmLoad(masid, prodord)
                         select new ProductionReturnItemDet
                         {
                             prodjobdetid = YD.ProductionJobDetid,
                             prodorddetid = YD.productionorddetid,
                             prodordid = YD.productionordid,
                             productionord = YD.productionorder,
                             prodprgno = YD.ProdPrgNo,
                             jobordno = YD.job_ord_no,
                             prodprgdetid = YD.Prodprgdetid,
                             lossqty = (decimal)YD.Lossqty,
                             lotno = YD.lotno,
                             refno = YD.Ref_no,
                             retqty = YD.retQty,
                             itm = YD.item,
                             itmid = (int)YD.itemid,
                             colorid = (int)YD.colorid,
                             color = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             style = YD.style,
                             styleid = (int)YD.styleid,
                             uomid = (int)YD.uomid,
                             Production_Recpt_Retid = YD.Production_Recpt_Retid

                         }).AsQueryable();

            return query;
        }




        public bool UpdateData(Production_Recpt_Mas objupd)
        {
            try
            {
                var result = false;
                var Upd = entities.Production_Recpt_Mas.Where(c => c.prod_recpt_masid == objupd.prod_recpt_masid).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.prod_recpt_masid = objupd.prod_recpt_masid;
                    Upd.prod_recpt_no = objupd.prod_recpt_no;
                    Upd.prod_recpt_date = objupd.prod_recpt_date;
                    Upd.OrderType = objupd.OrderType;
                    Upd.InwardNo = objupd.InwardNo;
                    Upd.InspNo = objupd.InspNo;
                    Upd.InspDate = objupd.InspDate;
                    Upd.CreatedBy = objupd.CreatedBy;
                    Upd.EWayDate = objupd.EWayDate;
                    Upd.EWayNo = objupd.EWayNo;
                    Upd.Recpt_Ref_no = objupd.Recpt_Ref_no;
                    Upd.Recpt_Ref_date = objupd.Recpt_Ref_date;
                    Upd.remarks = objupd.remarks;
                    Upd.StoreUnitID = objupd.StoreUnitID;
                    Upd.SupplierInvoiceNo = objupd.SupplierInvoiceNo;
                    Upd.ExcldetoInv = objupd.ExcldetoInv;


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


        public bool DeleteDetData(string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<ProductionReturnItemDet> itm, List<Production_Recpt_Return> objdet, string Mode, int unitmId = 0)
        {
            int id = 0;
            int ordid = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {

                            if (item.retqty > 0 || item.lossqty > 0)
                            {
                                //if (item.uomid == null) { 
                                //item.uomid
                                //}

                                var Pged = entities.Proc_Apparel_ProdRetDelItmstk(transno);
                                entities.SaveChanges();

                                //var Pg1 = entities.Proc_Apparel_ProdRetDelPrdprg(item.prodprgdetid, transno);
                                //entities.SaveChanges();

                                //var Pgr = entities.Proc_Apparel_ProdRetDelPrdOrdDet(item.prodorddetid, transno);
                                //entities.SaveChanges();

                                //var Pgtr = entities.Proc_Apparel_ProdRetDelPrdJobOrdDet(item.prodorddetid, transno, item.prodjobdetid);
                                //entities.SaveChanges();


                                var Pg1 = entities.Proc_Apparel_ProdRetUpdPrdprg(item.lossqty, item.retqty, item.prodprgdetid, transno, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProdRetUpdPrdOrdDet(item.retqty, item.lossqty, item.prodprgdetid, item.prodorddetid, transno, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProdRetUpdPrdJobOrdDet(item.retqty, item.lossqty, item.prodorddetid, transno, item.prodjobdetid, item.itmid, item.colorid, item.sizeid, item.prodprgdetid);
                                entities.SaveChanges();

                                //var Pd = entities.Proc_Apparel_ProducRetUpdItmstk(transno, stuid, item.itmid, item.colorid, item.sizeid, item.jobordno, item.prodjobdetid);
                                //entities.SaveChanges();
                            }
                        }

                    }

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.Production_Recpt_masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Production_Recpt_Return.Where(d => d.Production_Recpt_masid == id).ToList<Production_Recpt_Return>();

                    deletedetad.ForEach(c => entities.Production_Recpt_Return.Remove(c));
                    entities.SaveChanges();
                    ordid = id;
                    var Mas = entities.Production_Recpt_Mas.Where(u => u.prod_recpt_masid == ordid);

                    foreach (var v in Mas)
                    {
                        entities.Production_Recpt_Mas.Remove(v);
                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionReturn-DeleteDetData");
                }
            }
            return reserved;

        }


        public bool UpdDetData(Production_Recpt_Mas objupd, string transno, int processid, DateTime transdate, int cmpid, string remarks, int stuid, int cretby, List<ProductionReturnItemDet> itm, List<Production_Recpt_Return> objdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var result = false;
                    var Upd = entities.Production_Recpt_Mas.Where(c => c.prod_recpt_masid == objupd.prod_recpt_masid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.prod_recpt_masid = objupd.prod_recpt_masid;
                        Upd.prod_recpt_no = objupd.prod_recpt_no;
                        Upd.prod_recpt_date = objupd.prod_recpt_date;
                        Upd.OrderType = objupd.OrderType;
                        Upd.InwardNo = objupd.InwardNo;
                        Upd.InspNo = objupd.InspNo;
                        Upd.InspDate = objupd.InspDate;
                        Upd.CreatedBy = objupd.CreatedBy;
                        Upd.EWayDate = objupd.EWayDate;
                        Upd.EWayNo = objupd.EWayNo;
                        Upd.Recpt_Ref_no = objupd.Recpt_Ref_no;
                        Upd.Recpt_Ref_date = objupd.Recpt_Ref_date;
                        Upd.remarks = objupd.remarks;
                        Upd.StoreUnitID = objupd.StoreUnitID;
                        Upd.SupplierInvoiceNo = objupd.SupplierInvoiceNo;
                        Upd.ExcldetoInv = objupd.ExcldetoInv;


                        entities.SaveChanges();
                        result = true;
                    }


                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {

                            if (item.retqty > 0 || item.lossqty > 0)
                            {


                                var Pg1 = entities.Proc_Apparel_ProdRetUpdPrdprg(item.lossqty, item.retqty, item.prodprgdetid, transno, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProdRetUpdPrdOrdDet(item.retqty, item.lossqty, item.prodprgdetid, item.prodorddetid, transno, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProdRetUpdPrdJobOrdDet(item.retqty, item.lossqty, item.prodorddetid, transno, item.prodjobdetid, item.itmid, item.colorid, item.sizeid, item.prodprgdetid);
                                entities.SaveChanges();

                                var Pd = entities.Proc_Apparel_ProducRetUpdItmstk(transno, stuid, item.itmid, item.colorid, item.sizeid, item.jobordno, item.prodjobdetid);
                                entities.SaveChanges();



                            }
                        }

                    }
                    //prodreturn update 
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var st in objdet)
                        {
                            var Pg1 = entities.Proc_Apparel_ProdRetUpdRecptRet(st.LossQty, st.Returnqty, st.Production_Recpt_Retid);
                            entities.SaveChanges();

                        }
                    }
                    //Update 
                    if (itm != null && itm.Count > 0)
                    {
                        foreach (var item in itm)
                        {

                            if (item.retqty > 0 || item.lossqty > 0)
                            {

                                var Pged = entities.Proc_Apparel_ProdutnReturnInsertItemstock(item.itmid, item.colorid, item.sizeid, item.uomid, item.retqty,item.Rate, item.Maruprate, item.jobordno, transno, processid, item.lotno, transdate, cmpid, item.suppid, item.styleid, item.retqty, item.stockid, item.retqty, item.lossqty, remarks, stuid, cretby);
                                entities.SaveChanges();

                                var Pg1 = entities.Proc_Apparel_ProductionRetUpdProdprgDet(item.retqty, item.lossqty, item.prodprgdetid, item.itmid, item.colorid, item.sizeid);
                                entities.SaveChanges();

                                var Pgr = entities.Proc_Apparel_ProductionRetUpdProdOrdDet(item.retqty, item.lossqty, item.prodorddetid);
                                entities.SaveChanges();

                                var Pgtr = entities.Proc_Apparel_ProductionRetUpdProdOrdJobDet(item.retqty, item.lossqty, item.prodorddetid, item.prodjobdetid);
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
                    exceplogg.SendExcepToDB(ex, "ProductionReturn-UpdDetData");
                }
            }
            return reserved;
        }
    }
}
