using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ProductionReceiptRepository : IProductionReceiptRepository
    {
        ProductionEntities entities = new ProductionEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.ProductionRecptMas> Getprocess(int cmpid, int cmunitid, string ordtype)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptloadproc(cmpid, cmunitid, ordtype)
                         select new ProductionRecptMas
                         {

                             processid = YD.ProcessId,
                             process = YD.Process

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProductionRecptMas> Getprocessor()
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptloadsupp()
                         select new ProductionRecptMas
                         {

                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier

                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProductionRecptMas> Getwrkdiv()
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptloadwrkdiv()
                         select new ProductionRecptMas
                         {

                             wrkdivid = YD.WorkDivisionId,
                             wrkdiv = YD.WorkDivision
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProductionRecptMas> Getissueno(int cmpid, int cmunitid, int processid, int processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptloadprodord(cmpid, cmunitid, processid, processorid)
                         select new ProductionRecptMas
                         {

                             productionordid = YD.productionordid,
                             productionorder = YD.productionorder

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProductionRecptMas> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed, int buyerid, string refno, string ordno, int clid, string procrtype)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptLoadaddgrid(cmpid, cmunitid, processid, processorid, ordtype, closed, buyerid, refno, ordno, clid, procrtype)
                         select new ProductionRecptMas
                         {

                             productionordid = YD.productionordid,
                             productionorder = YD.productionorder,
                             processor = YD.Processor,
                             proddate = (DateTime)YD.ProcessorDate,
                             ordqty = (decimal)YD.OrderQty,
                             recvdqty = (decimal)YD.Received,
                             bal = (decimal)YD.Bal,
                             companyid=YD.Companyid,
                             company=YD.Company,
                             unitid=(int)YD.companyunitid,
                             unit=YD.CompanyUnit,
                             //color=YD.Colorname,
                             //colorid=(int)YD.colorid,
                             process=YD.Process,
                             processid=(int)YD.Processid,
                             OrderType=YD.OrderType,
                             refno=YD.Ref_No,
                             orderno=YD.Order_No,
                             processortype=YD.ProcessorType,
                             buyer=YD.Buyer,
                             buyerid=(int)YD.BuyerId
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProductionRecptMas> Loadorderno(int cmpid, int cmunitid, int processid, int processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptloadordno(cmpid, cmunitid, processid, processorid)
                         select new ProductionRecptMas
                         {

                             buymasid = YD.Buy_Ord_MasId,
                             orderno = YD.Order_No,
                             refno = YD.Ref_No

                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProductionRecptMas> Loadcolor(int cmpid, int cmunitid, int processid, int processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptloadcolor(cmpid, cmunitid, processid, processorid)
                         select new ProductionRecptMas
                         {

                             colorid = YD.Colorid,
                             color = YD.color

                         }).AsQueryable();

            return query;
        }




        public IQueryable<ProductionRecptDet> LoadItmgrid(string pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionOrderLoadItmdettab(pid)
                         select new ProductionRecptDet
                         {

                             itemid = YD.ItemId,
                             item = YD.Item,
                             color = YD.Color,
                             colorid = YD.Colorid,
                             sizeid = YD.SizeId,
                             size = YD.size,
                             productionordid = YD.productionordid,
                             productionorder = YD.productionorder,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.bal,
                             rate = (decimal)YD.Apprate,
                             apprate=(decimal)YD.Apprate,
                             sno = YD.productionorddetid,
                             Received_qty = 0
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProductionRecptJobdet> Loadjobdetgrid(string pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionOrderLoadJob(pid)
                         select new ProductionRecptJobdet
                         {

                             Itemid = YD.ItemId,
                             Colorid = YD.Colorid,
                             Sizeid = YD.SizeId,
                             productionordid = (int)YD.ProductionOrdid,
                             ProdPrgNo = YD.ProdPrgno,
                             Job_Ord_No = YD.job_ord_no,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.bal,
                             Received_Qty = 0,
                             sno = (int)YD.ProductionOrddetid,
                             ProcessOrdDetid = (int)YD.ProductionOrddetid,
                             ProcessOrdJobDetid = YD.ProductionJobDetid
                         }).AsQueryable();

            return query;
        }


        public int AddData(Production_Recpt_Mas objEntry)
        {
            var id = entities.Production_Recpt_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.prod_recpt_masid;
        }

        public bool AddDetData(Production_Recpt_Mas obj, string transno, List<Production_Recpt_Det> objdet, List<Production_Recpt_JobDet> objobdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    var detid = 0;
                    string recptno="";

                    //Mas
                    entities.Production_Recpt_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.prod_recpt_masid;
                    recptno=obj.prod_recpt_no;


                    //if (objdet.Count > 0)
                    //{
                    //    var Py = entities.UpdateProcessActuals(transno, "A");
                    //    entities.SaveChanges();


                    //}

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Received_qty > 0)
                            {
                                item.Prod_Recpt_Masid = Masid;
                                entities.Production_Recpt_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.Prod_Recpt_Detid;
                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.Received_Qty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                        {
                                            jobdt.Prod_Recpt_Masid = Masid;
                                            jobdt.Prod_Recpt_Detid = detid;
                                            entities.Production_Recpt_JobDet.Add(jobdt);
                                            entities.SaveChanges();

                                        }
                                    }

                                }
                                entities.SaveChanges();

                            }
                        }

                    }


                    //if (objdet.Count > 0)
                    //{
                    //    var Py = entities.UpdateProcessActuals(transno, "A");
                    //    entities.SaveChanges();


                    //}

                    var ordno = entities.Proc_Apparel_GetOrderstyleforsewcosting(Masid).ToList();

                    foreach (var ord in ordno)
                    {

                        var updateactual = entities.Proc_Apparel_UpdateSewingQtyCosting(ord.Order_No, ord.Styleid);
                        entities.SaveChanges();
                    }

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            var recptmrp = entities.Proc_Apparel_UpdateSewingReceiptMarkUpRate(item.ProcessOrdId);
                            entities.SaveChanges();
                        }
                     
                     }

                    var itmstkmrpupdate = entities.Proc_Apparel_SP_PostSewingRecptItemStock(recptno);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionReceipt-AddDetData");
                }
            }
            return reserved;
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





        public bool DeleteDetData(string transno, List<Production_Recpt_Det> objdet, List<Production_Recpt_JobDet> objobdet, string Mode, int unitmId = 0)
        {
            int id = 0;
            int ordid = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //if (objdet != null && objdet.Count > 0)
                    //{
                    //    foreach (var it in objdet)
                    //    {
                    //        var Py = entities.Proc_Apparel_ProdRecptUpdRecvdqty6(it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate);
                    //        //var result = this.entities.Database.SqlQuery<string>("exec Proc_Apparel_ProdRecptUpdRecvdqty3 {0}, {1}, {2}, {3}, {4},{5}", it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate).FirstOrDefault();

                    //        entities.SaveChanges();
                    //    }

                    //}

                    if (objdet != null && objdet.Count > 0)
                    {
                        //foreach (var it in objdet)
                        //{
                        var Py = entities.Proc_Apparel_ProductnRecptDelItmstk(transno);
                        entities.SaveChanges();
                        //}
                    }
                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.Prod_Recpt_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Production_Recpt_JobDet.Where(d => d.Prod_Recpt_Masid == id).ToList<Production_Recpt_JobDet>();

                    deletedet.ForEach(c => entities.Production_Recpt_JobDet.Remove(c));
                    entities.SaveChanges();

                    ordid = id;
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.Prod_Recpt_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Production_Recpt_Det.Where(d => d.Prod_Recpt_Masid == id).ToList<Production_Recpt_Det>();

                    deletedetad.ForEach(c => entities.Production_Recpt_Det.Remove(c));
                    entities.SaveChanges();


                    var ordno = entities.Proc_Apparel_GetOrderstyleforsewcosting(ordid).ToList();

                    foreach (var ord in ordno)
                    {

                        var updateactual = entities.Proc_Apparel_UpdateSewingQtyCosting(ord.Order_No, ord.Styleid);
                        entities.SaveChanges();
                    }

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
                    exceplogg.SendExcepToDB(ex, "ProductionReceipt-DeleteDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProductionRecptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptgetbyid(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate,processorid)
                         select new ProductionRecptMas
                         {
                             company = YD.company,
                             companyid = YD.Companyid,
                             buyerid = YD.buyerid,
                             buyer = YD.buyer,
                             unitid = YD.Id,
                             unit = YD.CompanyUnit,
                             prod_recpt_masid = YD.ProcessRecptMasid,
                             productionordid = YD.productionordid,
                             productionorder = YD.productionorder,
                             Recpt_Ref_no = YD.Recpt_Ref_no,
                             prod_recpt_no = YD.prod_recpt_no,
                             prod_recpt_date = (DateTime)YD.ProcessRecptdate,
                             processid = YD.Processid,
                             process = YD.Process,
                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier,
                             jobordno = YD.Job_ord_no,
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
        public IQueryable<ProductionRecptMas> LoadMaingridord(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptgetbyidord(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate, processorid)
                         select new ProductionRecptMas
                         {
                             company = YD.company,
                             companyid = YD.Companyid,
                             buyerid = YD.buyerid,
                             buyer = YD.buyer,
                             unitid = YD.Id,
                             unit = YD.CompanyUnit,
                             prod_recpt_masid = YD.ProcessRecptMasid,
                             productionordid = YD.productionordid,
                             productionorder = YD.productionorder,
                             Recpt_Ref_no = YD.Recpt_Ref_no,
                             prod_recpt_no = YD.prod_recpt_no,
                             prod_recpt_date = (DateTime)YD.ProcessRecptdate,
                             processid = YD.Processid,
                             process = YD.Process,
                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier,
                             jobordno = YD.Job_ord_no,
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

        public IQueryable<ProductionRecptDet> LoadEditItmgrid(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProRecptItemdetEdit(pid)
                         select new ProductionRecptDet
                         {

                             itemid = YD.Itemid,
                             item = YD.Item,
                             color = YD.Color,
                             colorid = YD.Colorid,
                             sizeid = YD.Sizeid,
                             size = YD.Size,
                             productionordid = (int)YD.productionordid,
                             productionorder = YD.productionorder,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.Bal,
                             rate = (decimal)YD.Rate,
                             apprate=(decimal)YD.Apprate,
                             sno = YD.productionorddetid,
                             Received_qty = YD.Received,
                             Prod_Recpt_Detid = YD.Prod_Recpt_Detid,
                             Order_No = YD.Order_No,
                             Ref_No = YD.Ref_No,
                         }).AsQueryable();

            return query;
        }




        public IQueryable<ProductionRecptJobdet> LoadEditjobdetgrid(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionRecptJobdetEdit(pid)
                         select new ProductionRecptJobdet
                         {

                             Itemid = (int)YD.Itemid,
                             Colorid = (int)YD.Colorid,
                             Sizeid = (int)YD.Sizeid,
                             productionordid = (int)YD.ProcessOrdId,
                             ProdPrgNo = YD.ProdPrgNo,
                             Job_Ord_No = YD.Job_Ord_No,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.bal,
                             Received_Qty = YD.Received_Qty,
                             sno = (int)YD.ProcessOrdDetid,
                             ProcessOrdDetid = (int)YD.ProcessOrdDetid,
                             ProcessOrdJobDetid = (int)YD.ProcessOrdJobDetid,
                             Prod_Recpt_Detid = (int)YD.Prod_Recpt_Detid,
                             Prod_Recpt_JobDetid = YD.Prod_Recpt_JobDetid,
                             Order_No = YD.Order_No,
                             Ref_No = YD.Ref_no
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProductionRecptDet> ChkDC(string recpt, int pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductnRecptDCChk(recpt, pid)
                         select new ProductionRecptDet
                         {

                             recptno = YD.Recpt_Ref_no,
                             Prod_Recpt_Masid = (int)YD.Prod_Recpt_Masid

                         }).AsQueryable();

            return query;
        }


        public bool UpdDetData(Production_Recpt_Mas objupd, string transno, List<Production_Recpt_Det> objdet, List<Production_Recpt_JobDet> objobdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    var detid = 0;

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

                    }




                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var it in objdet)
                        {
                            var Py = entities.Proc_Apparel_ProdRecptUpdRecvdqty6(it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate);
                            //var result = this.entities.Database.SqlQuery<string>("exec Proc_Apparel_ProdRecptUpdRecvdqty3 {0}, {1}, {2}, {3}, {4},{5}", it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate).FirstOrDefault();

                            entities.SaveChanges();
                        }

                    }
                    //
                   
                   

                    if (objdet != null && objdet.Count > 0)
                    {
                        //foreach (var it in objdet)
                        //{
                        var Py = entities.Proc_Apparel_ProductnRecptDelItmstk(transno);
                        entities.SaveChanges();
                        //}
                    }



                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.Prod_Recpt_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Production_Recpt_JobDet.Where(d => d.Prod_Recpt_Masid == id).ToList<Production_Recpt_JobDet>();

                    deletedet.ForEach(c => entities.Production_Recpt_JobDet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Received_qty > 0)
                            {


                                detid = item.Prod_Recpt_Detid;
                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.Received_Qty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                        {

                                            jobdt.Prod_Recpt_Detid = detid;
                                            entities.Production_Recpt_JobDet.Add(jobdt);
                                            entities.SaveChanges();

                                        }
                                    }

                                }
                                entities.SaveChanges();

                            }
                        }

                    }

                    var ordno = entities.Proc_Apparel_GetOrderstyleforsewcosting(objupd.prod_recpt_masid).ToList();

                    foreach (var ord in ordno) {

                        var updateactual = entities.Proc_Apparel_UpdateSewingQtyCosting(ord.Order_No, ord.Styleid);
                        entities.SaveChanges();
                    }


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            var recptmrp = entities.Proc_Apparel_UpdateSewingReceiptMarkUpRate(item.ProcessOrdId);
                            entities.SaveChanges();
                        }

                    }

                    var itmstkmrpupdate = entities.Proc_Apparel_SP_PostSewingRecptItemStock(objupd.prod_recpt_no);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionReceipt-UpdDetData");
                }
            }
            return reserved;
        }
    }
}
