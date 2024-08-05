using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ProductionOrderRepository : IProductionOrderRepository
    {
        ProductionEntities entities = new ProductionEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.ProcessOrderAddScreen> Getrefno(int cmpid, int cmunitid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrdergetrefno(cmpid, cmunitid)
                         select new ProcessOrderAddScreen
                         {

                             bmasid = YD.Buy_Ord_MasId,
                             refno = YD.Ref_no

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessOrderAddScreen> Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype, int buyerid, string refno, int styleid, string ordo)
        {
            var query = (from YD in entities.Proc_Apparel_ProdtnOrderLoadgrid(cmpid, closed, amend, cmpunitid, procid, ordertype, buyerid, refno, styleid, ordo)
                         select new ProcessOrderAddScreen
                         {

                             bmasid = YD.Buy_Ord_MasId,
                             refno = YD.Ref_no,
                             company = YD.Company,
                             cmpid = (int)YD.Companyid,
                             cmpunitid = (int)YD.Companyunitid,
                             cmpnyunit=YD.CompanyUnit,
                             buyerid = YD.Buyerid,
                             buyer = YD.Buyer,
                             jmasid = YD.Jmasid,
                             joborddate = (DateTime)YD.Job_ord_date,
                             jobordprefix = (int)YD.JobordPrefix,
                             jobordno = YD.Job_ord_no,
                             processid = (int)YD.Processid,
                             process=YD.Process,
                             styleid=(int)YD.Styleid,
                             style = YD.Style,
                             orderno = YD.Order_No,
                             suppid = (int)YD.Supplierid,
                            
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessOrderDetInfo> LoadOutputitmsgrid(string closed, string jobordno, int procid)
        {

            string Id = "";
            if (jobordno != "")
            {
                Id = jobordno;
            }
            else
            {
                Id = "";
            }
            var query = (from YD in entities.Proc_Apparel_ProcessOrderLoadOutputItm(closed, string.IsNullOrEmpty(Id) ? "" : Id, procid)
                         select new ProcessOrderDetInfo
                         {

                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             clrid = (int)YD.colorid,
                             clr = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             sno = (int)YD.Snumb,
                             ordqty = 0,// (decimal)YD.order_qty,
                             bal = (decimal)YD.Bal,
                             prgopqty = (decimal)YD.prog_op_qty,
                             inrout = YD.InorOut,
                             isdeci = (string)YD.Isdecimal,
                             rate = (decimal)YD.AppRate,
                             apprate=(decimal)YD.AppRate
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessOrderDetInfo> LoadOutputJobdetgrid(string closed, string jobordno, int procid)
        {
            string Id = "";
            if (jobordno != "")
            {
                Id = jobordno;
            }
            else
            {
                Id = "";
            }
            var query = (from YD in entities.Proc_Apparel_ProductionOrderLoadOutputJobdets(closed, string.IsNullOrEmpty(Id) ? "" : Id, procid)
                         select new ProcessOrderDetInfo
                         {

                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             clrid = (int)YD.colorid,
                             clr = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             sno = (int)YD.Snumb,
                             ordqty = 0,//(decimal)YD.order_qty,
                             bal = (decimal)YD.Bal,
                             prgopqty = (decimal)YD.prog_op_qty,
                             inrout = YD.InorOut,
                             isdeci = (string)YD.Isdecimal,
                             rate = 0,
                             prgdetid = YD.ProdPrgdetid,
                             prodpgmno = YD.ProdPrgno,
                             jobordno = YD.job_ord_no,
                             orderno = YD.Order_No,
                             refno = YD.Ref_No
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessOrderDetInfo> LoadInputitmsgrid(string closed, string jobordno, int procid)
        {

            string Id = "";
            if (jobordno != "")
            {
                Id = jobordno;
            }
            else
            {
                Id = "";
            }
            var query = (from YD in entities.Proc_Apparel_ProcessOrderLoadInputItm(closed, string.IsNullOrEmpty(Id) ? "" : Id, procid)
                         select new ProcessOrderDetInfo
                         {

                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             clrid = (int)YD.colorid,
                             clr = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             sno = (int)YD.Snumb,
                             ordqty = (decimal)YD.order_qty,
                             bal = (decimal)YD.Bal,
                             prgopqty = (decimal)YD.prog_op_qty,
                             inrout = YD.InorOut,
                             isdeci = (string)YD.Isdecimal,
                             rate = 0,
                             issqty = 0,//(decimal)YD.order_qty
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessOrderDetInfo> LoadInputJobdetgrid(string closed, string jobordno, int procid)
        {
            string Id = "";
            if (jobordno != "")
            {
                Id = jobordno;
            }
            else
            {
                Id = "";
            }
            var query = (from YD in entities.Proc_Apparel_ProductionOrderLoadInputJobdets(closed, string.IsNullOrEmpty(Id) ? "" : Id, procid)
                         select new ProcessOrderDetInfo
                         {

                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             clrid = (int)YD.colorid,
                             clr = YD.color,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             sno = (int)YD.Snumb,
                             ordqty = 0,// (decimal)YD.order_qty,
                             bal = (decimal)YD.Bal,
                             prgopqty = (decimal)YD.prog_op_qty,
                             inrout = YD.InorOut,
                             isdeci = (string)YD.Isdecimal,
                             rate = 0,
                             prgdetid = YD.ProdPrgdetid,
                             prodpgmno = YD.ProdPrgno,
                             jobordno = YD.job_ord_no
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessOrderDetInfo> LoadInputStkWgrid(string itmcat, int itmid, int clrid, int sizeid, string jobordno, string transtype, int cmpid, int procid,int Storeid)
        {
            var query = (from YD in entities.Proc_Apparel_ProductionOrderWLoadStkDet(itmcat, itmid, clrid, sizeid, jobordno, transtype, cmpid, procid, Storeid)
                         select new ProcessOrderDetInfo
                         {

                             itmid = (int)YD.itemid,
                             clrid = (int)YD.colorid,
                             sizeid = (int)YD.sizeid,
                             bal = YD.BalQty,
                             issues = 0,
                             process = YD.Process,
                             jobordno = YD.joborderNo,
                             stockid = YD.StockId,
                             lotno = YD.LotNo,
                             TransNo=YD.Transno,
                             Markup_Rate = YD.Markuprate
                         }).AsQueryable();

            return query;
        }


        public int AddData(Production_Ord_Mas objEntry)
        {
            var id = entities.Production_Ord_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.productionordid;
        }

        public bool AddDetData(Production_Ord_Mas obj, List<Production_Ord_Det> objdet, List<Production_Ord_JobDet> objobdet, List<Production_Ord_Stock> objstk, List<Production_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0)
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
                    var odetid = 0;


                    //Mas
                    entities.Production_Ord_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.productionordid;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.received_qty > 0 || item.issued_qty > 0)
                            {
                                item.productionordid = Masid;
                                entities.Production_Ord_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.productionorddetid;
                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.issued_qty > 0 || jobdt.OrderQty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid && item.inp_op == jobdt.ip_op)
                                        {
                                            jobdt.ProductionOrdid = Masid;
                                            jobdt.ProductionOrddetid = detid;
                                            entities.Production_Ord_JobDet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProductionJobDetid;

                                            foreach (var stkdet in objstk)
                                            {
                                                if (stkdet.IssueQty > 0 && jobdt.ip_op=="I")
                                                {
                                                    if (jobdt.Itemid == stkdet.Itemid && jobdt.Colorid == stkdet.Colorid && jobdt.Sizeid == stkdet.Sizeid && jobdt.Job_ord_no==stkdet.Job_ord_no)
                                                    {
                                                        stkdet.Productionordid = Masid;
                                                        stkdet.ProductionOrdJobid = odetid;
                                                        entities.Production_Ord_Stock.Add(stkdet);

                                                        var mrupdate = entities.ItemStock.Where(a => a.StockId == stkdet.ItemStockId).FirstOrDefault();
                                                        mrupdate.Markup_Rate = stkdet.Markup_Rate;
                                                        entities.SaveChanges();

                                                    }

                                               

                                                }

                                            }

                                        }
                                    }
                                    // }
                                }
                                entities.SaveChanges();

                            }
                        }

                    }

                    //if (objobdet != null && objobdet.Count > 0)
                    //{

                    //}

                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            item.Production_Ord_id = Masid;
                            entities.Production_Ord_AddLess.Add(item);
                        }
                        entities.SaveChanges();
                    }


                    foreach (var jobdt in objobdet)
                    {
                        if (jobdt.ip_op == "I" && jobdt.issued_qty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProductionProdDetInputUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProductionOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.Sizeid);
                            entities.SaveChanges();
                        }
                        if (jobdt.ip_op == "O" && jobdt.OrderQty > 0)
                        {
                            var Pgop = entities.Proc_Apparel_ProductionProdDetOutUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProductionOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.Sizeid);
                            entities.SaveChanges();
                        }

                    }


                    foreach (var stkdet in objstk)
                    {
                        if (stkdet.IssueQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcessOrderItmStkUpdate(stkdet.IssueQty, stkdet.ItemStockId, stkdet.Itemid, stkdet.Colorid, stkdet.Sizeid);
                            entities.SaveChanges();

                            var Ins = entities.Proc_Apparel_ProcessorderInsertstkoutward(stkdet.ProductionOrdJobid, stkdet.ItemStockId, stkdet.IssueQty, stkdet.ProductionOrdStockId);
                            entities.SaveChanges();
                        }
                    }

                    int mrp = entities.Proc_Apparel_UpdateMarkuprateinSewingIssue(Masid);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionOrder-AddDetData");
                }
            }
            return reserved;
        }


        public bool UpdateData(Production_Ord_Mas objupd)
        {
            try
            {
                var result = false;
                var Upd = entities.Production_Ord_Mas.Where(c => c.productionordid == objupd.productionordid).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.productionordid = objupd.productionordid;
                    Upd.productionorder = objupd.productionorder;
                    Upd.processordate = objupd.processordate;
                    Upd.processorid = objupd.processorid;
                    Upd.processid = objupd.processid;
                    Upd.remarks = objupd.remarks;
                    Upd.companyid = objupd.companyid;
                    Upd.companyunitid = objupd.companyunitid;
                    Upd.ProcessorType = objupd.ProcessorType;
                    Upd.OrderType = objupd.OrderType;
                    Upd.Closed = objupd.Closed;
                    Upd.OrderCumIssue = objupd.OrderCumIssue;
                    Upd.DelidateTime = objupd.DelidateTime;
                    Upd.ComboIds = objupd.ComboIds;
                    Upd.DispLocType = objupd.DispLocType;
                    Upd.DispLoc = objupd.DispLoc;
                    Upd.IssueLocType = objupd.IssueLocType;
                    Upd.IssueLoc = objupd.IssueLoc;
                    Upd.Teamid = objupd.Teamid;
                    Upd.CreatedBy = objupd.CreatedBy;
                    Upd.StoreUnitId = objupd.StoreUnitId;
                    Upd.Phoneno = objupd.Phoneno;
                    Upd.contactperson = objupd.contactperson;
                    Upd.amount = objupd.amount;
                    Upd.taxamount = objupd.taxamount;
                    Upd.IGST = objupd.IGST;
                    Upd.TotIGST = objupd.TotIGST;
                    Upd.SGST = objupd.SGST;
                    Upd.TotSGST = objupd.TotSGST;
                    Upd.IGST = objupd.IGST;
                    Upd.TotIGST = objupd.TotIGST;
                    Upd.saccode = objupd.saccode;
                    Upd.ModuleType = objupd.ModuleType;


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


        public bool DeleteData(int id)
        {
            var result = false;



            var deletestk = entities.Production_Ord_Stock.Where(d => d.Productionordid == id).ToList<Production_Ord_Stock>();
            deletestk.ForEach(c => entities.Production_Ord_Stock.Remove(c));
            entities.SaveChanges();

            var deleteadls = entities.Production_Ord_AddLess.Where(d => d.Production_Ord_id == id).ToList<Production_Ord_AddLess>();
            deleteadls.ForEach(c => entities.Production_Ord_AddLess.Remove(c));
            entities.SaveChanges();

            var deletejob = entities.Production_Ord_JobDet.Where(d => d.ProductionOrdid == id).ToList<Production_Ord_JobDet>();
            deletejob.ForEach(c => entities.Production_Ord_JobDet.Remove(c));
            entities.SaveChanges();

            var deletedel = entities.Production_Ord_Det.Where(d => d.productionordid == id).ToList<Production_Ord_Det>();
            deletedel.ForEach(c => entities.Production_Ord_Det.Remove(c));
            entities.SaveChanges();

            var deleteMas = entities.Production_Ord_Mas.Where(d => d.productionordid == id).ToList<Production_Ord_Mas>();
            deleteMas.ForEach(c => entities.Production_Ord_Mas.Remove(c));
            entities.SaveChanges();

            entities.SaveChanges();
            result = true;
            return result;
        }





        IQueryable<ProcessOrderAddScreen> IProductionOrderRepository.LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate,int? buyerid,string orderno)
        {
            var query = (from YD in entities.Proc_Apparel_ProductnLoadMainGrid(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(closed) ? "" : closed, string.IsNullOrEmpty(buyrsamp) ? "" : buyrsamp, string.IsNullOrEmpty(processortype) ? "" : processortype, prodordid == null ? 0 : prodordid, string.IsNullOrEmpty(prodord) ? "" : prodord, string.IsNullOrEmpty(type) ? "" : type, processorid == null ? 0 : processorid, unitid == null ? 0 : unitid, processid == null ? 0 : processid, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString(), buyerid == null ? 0 : buyerid, string.IsNullOrEmpty(orderno) ? "" : orderno)
                         select new ProcessOrderAddScreen
                         {

                             cmpid = YD.Companyid,
                             company = YD.CompanyName,
                             cmpunitid = YD.Id,
                             cmpnyunit = YD.CompanyUnit,
                             processid = YD.Processid,
                             process = YD.Process,
                             processorid = YD.ProcessorId,
                             processor = YD.Processor,
                             prodnord = YD.productionorder,
                             productionordid = YD.productionordid,
                             type = YD.Ordertype,
                             proddate = (DateTime)YD.ProcessOrdate,
                             delidate = (DateTime)YD.DelidateTime,
                             remarks = YD.remarks,
                             PType=YD.ProcessorType,
                             OrdType=YD.type,
                             StoreUnitId=YD.StoreUnitId,
                             DispatchLocType=YD.DispLocType,
                             DispatchLocId=YD.DispLoc
                         }).AsQueryable();

            return query;
        }
        IQueryable<ProcessOrderAddScreen> IProductionOrderRepository.LoadMaingridord(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate)
        {
            var query = (from YD in entities.Proc_Apparel_ProductnLoadMainGridOrder(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(closed) ? "" : closed, string.IsNullOrEmpty(buyrsamp) ? "" : buyrsamp, string.IsNullOrEmpty(processortype) ? "" : processortype, prodordid == null ? 0 : prodordid, string.IsNullOrEmpty(prodord) ? "" : prodord, string.IsNullOrEmpty(type) ? "" : type, processorid == null ? 0 : processorid, unitid == null ? 0 : unitid, processid == null ? 0 : processid, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString())
                         select new ProcessOrderAddScreen
                         {

                             cmpid = YD.Companyid,
                             company = YD.CompanyName,
                             cmpunitid = YD.Id,
                             cmpnyunit = YD.CompanyUnit,
                             processid = YD.Processid,
                             process = YD.Process,
                             processorid = YD.ProcessorId,
                             processor = YD.Processor,
                             prodnord = YD.productionorder,
                             productionordid = YD.productionordid,
                             type = YD.Ordertype,
                             proddate = (DateTime)YD.ProcessOrdate,
                             delidate = (DateTime)YD.DelidateTime,
                             remarks = YD.remarks,
                             PType = YD.ProcessorType,
                             OrdType = YD.type,
                             StoreUnitId = YD.StoreUnitId,
                             DispatchLocType = YD.DispLocType,
                             DispatchLocId = YD.DispLoc,
                             orderno =YD.Order_No,
                             buyer = YD.buyer,
                             buyerid = (int)YD.Buyerid
                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessOrderDetInfo> LoadEditOutputitmsgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProdtnOrderEditOutItemDet(prodid)
                         select new ProcessOrderDetInfo
                         {
                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             clrid = (int)YD.colorid,
                             clr = YD.color,
                             inrout = YD.InorOut,
                             bal = (decimal)YD.Bal + (decimal)YD.received_qty,
                             ordqty = (decimal)YD.received_qty,
                             rate = (decimal)YD.rate,
                             sno = (int)YD.ProductionOrddetid,
                             prgopqty = (decimal)YD.prog_op_qty,
                             isdeci = YD.Isdecimal,
                             disploc = (int)YD.DispLoc,
                             disptype = YD.DispLocType,
                             issloc = (int)YD.IssueLoc,
                             isstype = YD.IssueLocType,
                             apprate=(decimal)YD.Apprate

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessOrderDetInfo> LoadEditInputitmsgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrderEditIputItemDet(prodid)
                         select new ProcessOrderDetInfo
                         {
                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             clrid = (int)YD.colorid,
                             clr = YD.color,
                             inrout = YD.InorOut,
                             bal = (decimal)YD.Bal + (decimal)YD.issue_qty,
                             ordqty = (decimal)YD.issue_qty,
                             rate = (decimal)YD.rate,
                             sno = (int)YD.ProductionOrddetid,
                             prgopqty = (decimal)YD.prog_op_qty,
                             isdeci = YD.Isdecimal,
                             issqty = (decimal)YD.issue_qty

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessOrderDetInfo> LoadEditOutputJobdetgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrderEditOpJobDet(prodid)
                         select new ProcessOrderDetInfo
                         {
                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             sizeid = (int)YD.SizeId,
                             size = YD.size,
                             clrid = (int)YD.colorid,
                             clr = YD.color,
                             inrout = YD.InorOut,
                             bal = (decimal)YD.Bal + (decimal)YD.order_qty,
                             ordqty = (decimal)YD.order_qty,
                             prgdetid = 0,
                             sno = (int)YD.ProdPrgdetid,
                             prodpgmno = YD.ProdPrgno,
                             jobordno = YD.job_ord_no,
                             prgopqty = (decimal)YD.prog_op_qty,
                             isdeci = YD.Isdecimal,
                             issqty = (decimal)YD.order_qty,
                             orderno = YD.Order_No,
                             refno = YD.Ref_No

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessOrderDetInfo> LoadEditInputJobdetgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrderEditInputJobDet(prodid)
                         select new ProcessOrderDetInfo
                         {
                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             sizeid = (int)YD.SizeId,
                             size = YD.size,
                             clrid = (int)YD.colorid,
                             clr = YD.color,
                             inrout = YD.InorOut,
                             bal = (decimal)YD.Bal + (decimal)YD.Issue_qty,
                             ordqty = (decimal)YD.Issue_qty,
                             prgdetid = 0,
                             sno = (int)YD.ProdPrgdetid,
                             prodpgmno = YD.ProdPrgno,
                             jobordno = YD.job_ord_no,
                             prgopqty = (decimal)YD.prog_op_qty,
                             isdeci = YD.Isdecimal,
                             issqty = (decimal)YD.Issue_qty

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessOrderDetInfo> LoadEditInputStkdet(int cmpid, int prodid, string prodordno)
        {
            var query = (from YD in entities.Proc_Apparel_ProductinOrderEditStkDet(cmpid, prodid, prodordno)
                         select new ProcessOrderDetInfo
                         {

                             itmid = (int)YD.Itemid,
                             clrid = (int)YD.Colorid,
                             sizeid = (int)YD.Sizeid,
                             bal = (decimal)YD.balQty + (decimal)YD.issueqty,
                             issues = (decimal)YD.issueqty,
                             process = "",//YD.Processid,
                             jobordno = YD.Job_ord_no,
                             stockid = (int)YD.ItemStockId,
                             lotno = YD.Lotno,
                             prodstkid = (int)YD.ProductionOrdStockId,
                             TransNo=YD.TransNo,
                             Markup_Rate = YD.MarkupRate
                         }).AsQueryable();

            return query;
        }


        public bool DeleteDetData(List<Production_Ord_Det> objdet, List<Production_Ord_JobDet> objobdet, List<Production_Ord_Stock> objstk, List<Production_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0)
        {
            int id = 0;
            int ordid = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var jdet in objobdet)
                        {
                            if (jdet.ip_op == "I")
                            {
                                var Py = entities.proc_Apparel_ProductionUpdateProdprgdetInput(jdet.ProductionOrdid, jdet.ProdPrgNo, jdet.Job_ord_no, jdet.Itemid, jdet.Colorid, jdet.Sizeid);
                                entities.SaveChanges();
                            }
                            if (jdet.ip_op == "O")
                            {
                                var Py = entities.proc_Apparel_ProductionUpdateProdprgdetOut(jdet.ProductionOrdid, jdet.ProdPrgNo, jdet.Job_ord_no, jdet.Itemid, jdet.Colorid, jdet.Sizeid);
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objstk != null && objstk.Count > 0)
                    {
                        foreach (var it in objstk)
                        {
                            var Py = entities.Proc_Apparel_ProductOrderItmStkUpdate(it.ItemStockId, it.ProductionOrdStockId);
                            entities.SaveChanges();
                        }
                        foreach (var stkdet in objstk)
                        {
                            var Py = entities.Proc_Apparel_ProductionDelitmstkOutwrd(stkdet.ItemStockId, stkdet.Productionorder, stkdet.Job_ord_no);
                            entities.SaveChanges();
                        }
                    }


                    if (objstk != null && objstk.Count > 0)
                    {
                        foreach (var item in objstk)
                        {
                            id = (int)item.Productionordid;

                        }
                    }

                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetstk = entities.Production_Ord_Stock.Where(d => d.Productionordid == id).ToList<Production_Ord_Stock>();

                    deletedetstk.ForEach(c => entities.Production_Ord_Stock.Remove(c));
                    entities.SaveChanges();


                    ordid = id;

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProductionOrdid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetob = entities.Production_Ord_JobDet.Where(d => d.ProductionOrdid == id).ToList<Production_Ord_JobDet>();

                    deletedetob.ForEach(c => entities.Production_Ord_JobDet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.productionordid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Production_Ord_Det.Where(d => d.productionordid == id).ToList<Production_Ord_Det>();

                    deletedet.ForEach(c => entities.Production_Ord_Det.Remove(c));
                    entities.SaveChanges();


                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            id = (int)item.Production_Ord_id;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Production_Ord_AddLess.Where(d => d.Production_Ord_id == id).ToList<Production_Ord_AddLess>();

                    deletedetad.ForEach(c => entities.Production_Ord_AddLess.Remove(c));
                    entities.SaveChanges();

                    var Mas = entities.Production_Ord_Mas.Where(u => u.productionordid == ordid);

                    foreach (var v in Mas)
                    {
                        entities.Production_Ord_Mas.Remove(v);
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionOrder-DeleteDetData");
                }
            }
            return reserved;
        }





        public bool UpdDetData(Production_Ord_Mas objupd, List<Production_Ord_Det> objdet, List<Production_Ord_JobDet> objobdet, List<Production_Ord_Stock> objstk, List<Production_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var Upd = entities.Production_Ord_Mas.Where(c => c.productionordid == objupd.productionordid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.productionordid = objupd.productionordid;
                        Upd.productionorder = objupd.productionorder;
                        Upd.processordate = objupd.processordate;
                        Upd.processorid = objupd.processorid;
                        Upd.processid = objupd.processid;
                        Upd.remarks = objupd.remarks;
                        Upd.companyid = objupd.companyid;
                        Upd.companyunitid = objupd.companyunitid;
                        Upd.ProcessorType = objupd.ProcessorType;
                        Upd.OrderType = objupd.OrderType;
                        Upd.Closed = objupd.Closed;
                        Upd.OrderCumIssue = objupd.OrderCumIssue;
                        Upd.DelidateTime = objupd.DelidateTime;
                        Upd.ComboIds = objupd.ComboIds;
                        Upd.DispLocType = objupd.DispLocType;
                        Upd.DispLoc = objupd.DispLoc;
                        Upd.IssueLocType = objupd.IssueLocType;
                        Upd.IssueLoc = objupd.IssueLoc;
                        Upd.Teamid = objupd.Teamid;
                        Upd.CreatedBy = objupd.CreatedBy;
                        Upd.StoreUnitId = objupd.StoreUnitId;
                        Upd.Phoneno = objupd.Phoneno;
                        Upd.contactperson = objupd.contactperson;
                        Upd.amount = objupd.amount;
                        Upd.taxamount = objupd.taxamount;
                        Upd.IGST = objupd.IGST;
                        Upd.TotIGST = objupd.TotIGST;
                        Upd.SGST = objupd.SGST;
                        Upd.TotSGST = objupd.TotSGST;
                        Upd.IGST = objupd.IGST;
                        Upd.TotIGST = objupd.TotIGST;
                        Upd.saccode = objupd.saccode;
                        Upd.ModuleType = objupd.ModuleType;


                        entities.SaveChanges();

                    }

                    int id = 0;
                    var detid = 0;
                    var odetid = 0;

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var jdet in objobdet)
                        {
                            if (jdet.ip_op == "I")
                            {
                                var Py = entities.proc_Apparel_ProductionUpdateProdprgdetInput(jdet.ProductionOrdid, jdet.ProdPrgNo, jdet.Job_ord_no, jdet.Itemid, jdet.Colorid, jdet.Sizeid);
                                entities.SaveChanges();
                            }
                            if (jdet.ip_op == "O")
                            {
                                var Py = entities.proc_Apparel_ProductionUpdateProdprgdetOut(jdet.ProductionOrdid, jdet.ProdPrgNo, jdet.Job_ord_no, jdet.Itemid, jdet.Colorid, jdet.Sizeid);
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objstk != null && objstk.Count > 0)
                    {
                        foreach (var it in objstk)
                        {
                            var Py = entities.Proc_Apparel_ProductOrderItmStkUpdate(it.ItemStockId, it.ProductionOrdStockId);
                            entities.SaveChanges();
                        }

                        foreach (var stkdet in objstk)
                        {
                            var Py = entities.Proc_Apparel_ProductionDelitmstkOutwrd(stkdet.ItemStockId, stkdet.Productionorder, stkdet.Job_ord_no);
                            entities.SaveChanges();
                        }
                    }


                    if (objstk != null && objstk.Count > 0)
                    {
                        foreach (var item in objstk)
                        {
                            id = (int)item.Productionordid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetstk = entities.Production_Ord_Stock.Where(d => d.Productionordid == id).ToList<Production_Ord_Stock>();

                    deletedetstk.ForEach(c => entities.Production_Ord_Stock.Remove(c));
                    entities.SaveChanges();




                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProductionOrdid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetob = entities.Production_Ord_JobDet.Where(d => d.ProductionOrdid == id).ToList<Production_Ord_JobDet>();

                    deletedetob.ForEach(c => entities.Production_Ord_JobDet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.productionordid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Production_Ord_Det.Where(d => d.productionordid == id).ToList<Production_Ord_Det>();

                    deletedet.ForEach(c => entities.Production_Ord_Det.Remove(c));
                    entities.SaveChanges();






                    //if (objadlsdet != null && objadlsdet.Count > 0)
                    //{
                    //    foreach (var item in objadlsdet)
                    //    {
                    //        id = (int)item.Production_Ord_id;

                    //    }
                    //}
                    //else if (unitmId > 0)
                    //{
                    //    id = unitmId;
                    //}

                    var deletedetad = entities.Production_Ord_AddLess.Where(d => d.Production_Ord_id == id).ToList<Production_Ord_AddLess>();

                    deletedetad.ForEach(c => entities.Production_Ord_AddLess.Remove(c));
                    entities.SaveChanges();




                    var masid = 0;
                    //Insert

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.received_qty > 0 || item.issued_qty > 0)
                            {

                                entities.Production_Ord_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.productionorddetid;
                                masid = (int)item.productionordid;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.issued_qty > 0 || jobdt.OrderQty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid && item.inp_op == jobdt.ip_op)
                                        {

                                            jobdt.ProductionOrddetid = detid;
                                            entities.Production_Ord_JobDet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProductionJobDetid;

                                            foreach (var stkdet in objstk)
                                            {
                                                if (stkdet.IssueQty > 0)
                                                {
                                                    if (jobdt.Itemid == stkdet.Itemid && jobdt.Colorid == stkdet.Colorid && jobdt.Sizeid == stkdet.Sizeid && jobdt.ip_op=="I")
                                                    {

                                                        stkdet.ProductionOrdJobid = odetid;
                                                        entities.Production_Ord_Stock.Add(stkdet);

                                                        var mrupdate = entities.ItemStock.Where(a => a.StockId == stkdet.ItemStockId).FirstOrDefault();
                                                        mrupdate.Markup_Rate = stkdet.Markup_Rate;
                                                        entities.SaveChanges();

                                                    }

                                                  
                                                }

                                            }

                                        }
                                    }
                                    // }
                                }
                                entities.SaveChanges();

                            }
                        }

                    }

                    //if (objobdet != null && objobdet.Count > 0)
                    //{

                    //}

                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            item.Production_Ord_id = masid;
                            entities.Production_Ord_AddLess.Add(item);
                        }
                        entities.SaveChanges();
                    }


                    foreach (var jobdt in objobdet)
                    {
                        if (jobdt.ip_op == "I" && jobdt.issued_qty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProductionProdDetInputUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProductionOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.Sizeid);
                            entities.SaveChanges();
                        }
                        if (jobdt.ip_op == "O" && jobdt.OrderQty > 0)
                        {
                            var Pgop = entities.Proc_Apparel_ProductionProdDetOutUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProductionOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.Sizeid);
                            entities.SaveChanges();
                        }

                    }


                    foreach (var stkdet in objstk)
                    {
                        if (stkdet.IssueQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcessOrderItmStkUpdate(stkdet.IssueQty, stkdet.ItemStockId, stkdet.Itemid, stkdet.Colorid, stkdet.Sizeid);
                            entities.SaveChanges();

                            var Ins = entities.Proc_Apparel_ProcessorderInsertstkoutward(stkdet.ProductionOrdJobid, stkdet.ItemStockId, stkdet.IssueQty, stkdet.ProductionOrdStockId);
                            entities.SaveChanges();
                        }
                    }

                    int mrp = entities.Proc_Apparel_UpdateMarkuprateinSewingIssue(objupd.productionordid);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProductionOrder-UpdDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProductionOrdAddLess> LoadEditAddlessgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProdtnOrderEditAddless(prodid)
                         select new ProductionOrdAddLess
                         {

                             Production_Ord_Discountid = YD.Production_Ord_Discountid,
                             Production_Ord_id = YD.Production_Ord_id,
                             Percentage = YD.Percentage,
                             PlusOrMinus = YD.PlusOrMinus,
                             Addlessid = (int)YD.Addlessid,
                             Amount = YD.Amount,
                             Addless=YD.Addless
                         }).AsQueryable();

            return query;
        }
    }
}
