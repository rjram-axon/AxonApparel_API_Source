using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ProcessOrderRepository : IProcessOrderRepository
    {
        ProcessEntities entities = new ProcessEntities();
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

        public IQueryable<Domain.ProcessOrderAddScreen> GetProcessSupplier(int ProcessOrdid)
        {
            var query = (from YD in entities.Proc_Apparel_GetProcessDCMailDet(ProcessOrdid)
                         select new ProcessOrderAddScreen
                         {
                             processor = YD.Supplier,
                             prodnord = YD.processorder,
                             ProcessorEmail = YD.E_Mail

                         }).AsQueryable();

            return query;
        }

        public string GetUserGroup(int userid)
        {
            string UserGroup = entities.Proc_Apparel_GetUserGroupName(userid).FirstOrDefault().GroupName;

            string Group = string.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

            return Group;
        }


        public IQueryable<Domain.ProcessOrderAddScreen> Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype, int buyerid, string refno, int stylid, string orderno)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrderLoadgrid(cmpid, closed, amend, cmpunitid, procid, ordertype, buyerid, refno, stylid, orderno)
                         select new ProcessOrderAddScreen
                         {

                             bmasid = YD.Buy_Ord_MasId,
                             refno = YD.Ref_no,
                             company = YD.Company,
                             cmpid = (int)YD.Companyid,
                             cmpunitid = (int)YD.Companyunitid,
                             cmpnyunit = YD.CompanyUnit,
                             buyerid = YD.Buyerid,
                             buyer = YD.Buyer,
                             jmasid = YD.Jmasid,
                             joborddate = (DateTime)YD.Job_ord_date,
                             jobordprefix = (int)YD.JobordPrefix,
                             jobordno = YD.Job_ord_no,
                             processid = (int)YD.Processid,
                             style = YD.Style,
                             orderno = YD.Order_No,
                             suppid = (int)YD.Supplierid,

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessOrderDetInfo> LoadOutputitmsgrid(string closed, string jobordno, int procid)
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
                             rate = YD.AppRate,
                             apprate = YD.AppRate,
                             Loop_Len = "",
                             Gauge = "",
                             SecQty = 0,
                             plansize = YD.size,
                             plansizeid = (int)YD.sizeid,
                             TaxAppVal = 0,
                             FinDia = YD.size,
                             FinDiaid = (int)YD.sizeid,
                             FinGsm = 0,


                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessOrderDetInfo> LoadOutputJobdetgrid(string closed, string jobordno, int procid, string OpenPgAp)
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
            var query = (from YD in entities.Proc_Apparel_ProcessOrderLoadOutputJobdets(closed, string.IsNullOrEmpty(Id) ? "" : Id, procid, OpenPgAp)
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
                             rate = YD.AppRate,
                             prgdetid = YD.ProdPrgdetid,
                             prodpgmno = YD.ProdPrgno,
                             jobordno = YD.job_ord_no,
                             SecQty = 0,
                             plansizeid = (int)YD.sizeid,
                             plansize = YD.size,
                             refno = YD.ref_no,
                             apprate = YD.AppRate,
                             LossBalQty = (decimal)YD.LBalQty,
                             ProgramType=YD.ProgramType,
                             Loop_Len = "",
                             Gauge = "",
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessOrderDetInfo> LoadInputitmsgrid(string closed, string jobordno, int procid)
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
                             ordqty = 0,// (decimal)YD.order_qty,
                             bal = (decimal)YD.Bal,
                             prgopqty = (decimal)YD.prog_op_qty,
                             inrout = YD.InorOut,
                             isdeci = (string)YD.Isdecimal,
                             rate = 0,
                             issqty = 0,//(decimal)YD.order_qty,
                             SecQty = 0,
                             plansize = YD.size,
                             plansizeid = (int)YD.sizeid
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessOrderDetInfo> LoadInputJobdetgrid(string closed, string jobordno, int procid, string OpenPgAp)
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
            var query = (from YD in entities.Proc_Apparel_ProcessOrderLoadInputJobdets(closed, string.IsNullOrEmpty(Id) ? "" : Id, procid, OpenPgAp)
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
                             SecQty = 0,
                             plansize = YD.size,
                             plansizeid = (int)YD.sizeid,
                             refno = YD.ref_no,
                             opitmid = 0,
                             opclrid = 0,
                             opsizeid = 0,
                             opitm = "",
                             opsize = "",
                             opclr = "",
                             FabricId = (int)YD.FabricId,
                             orderno = YD.OrdNo,
                             YarnPer = YD.YPer,
                             Fabric_ColorId=YD.Fabric_ColorId,
                             ProgramType=YD.ProgramType
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessOrderDetInfo> LoadInputStkWgrid(string itmcat, int itmid, int clrid, int sizeid, string jobordno, string transtype, int cmpid, int procid,int Storeid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrderWLoadStkDet(itmcat, itmid, clrid, sizeid, jobordno, transtype, cmpid, procid, Storeid)
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
                             TransNo = YD.Transno,
                             orderno = YD.Order_No,
                             refno = YD.Ref_No,
                             supplier = YD.Supplier,
                             itm = YD.Item,
                             clr = YD.Color,
                             size = YD.size,
                             ProcessIssStockId=0
                         }).AsQueryable();

            return query;
        }

        public int AddData(Process_Ord_Mas objEntry)
        {
            var id = entities.Process_Ord_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.processordid;
        }

        public bool AddDetData(Process_Ord_Mas obj, List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    int id = 0;
                    var detid = 0;
                    var odetid = 0;

                    entities.Process_Ord_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.processordid;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.received_qty > 0 || item.order_output_qty > 0)
                            {
                                item.processordid = Masid;
                                entities.Process_Ord_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.processorddetid;
                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.issued_qty > 0 || jobdt.OrderQty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.inp_op == jobdt.ip_op)
                                        {
                                            jobdt.ProcessOrdid = Masid;
                                            jobdt.ProcessOrddetid = detid;
                                            entities.Process_Ord_JobDet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessJobDetid;

                                            //foreach (var stkdet in objstk)
                                            //{
                                            //    if (stkdet.IssueQty > 0)
                                            //    {
                                            //        if (jobdt.Itemid == stkdet.Itemid && jobdt.Colorid == stkdet.Colorid && jobdt.Sizeid == stkdet.Sizeid)
                                            //        {

                                            //            stkdet.ProductionOrdJobid = odetid;
                                            //            entities.Production_Ord_Stock.Add(stkdet);

                                            //        }
                                            //    }

                                            //}

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
                            item.Process_Ord_id = Masid;
                            entities.Process_Ord_AddLess.Add(item);
                        }
                        entities.SaveChanges();
                    }


                    foreach (var jobdt in objobdet)
                    {
                        if (jobdt.ip_op == "I" && jobdt.OrderQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcessProdDetInpUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProcessOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.PlannedSizeID, jobdt.OpItemId, jobdt.OpColorId, jobdt.OpSizeId);
                            entities.SaveChanges();
                        }
                        if (jobdt.ip_op == "O" && jobdt.OrderQty > 0)
                        {
                            var Pgop = entities.Proc_Apparel_ProcessProdDetOUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProcessOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.PlannedSizeID);
                            entities.SaveChanges();
                        }

                    }

                    bool UCMR = MarkUpRateOrdUpdation(Masid);

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-AddDetData");
                }
            }
            return reserved;
        }

        public bool UpdateData(Process_Ord_Mas objupd)
        {
            try
            {
                var result = false;
                var Upd = entities.Process_Ord_Mas.Where(c => c.processordid == objupd.processordid).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.processordid = objupd.processordid;
                    Upd.processorder = objupd.processorder;
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



            //var deletestk = entities.proces.Where(d => d.Productionordid == id).ToList<Production_Ord_Stock>();
            //deletestk.ForEach(c => entities.Production_Ord_Stock.Remove(c));
            //entities.SaveChanges();

            var deleteadls = entities.Process_Ord_AddLess.Where(d => d.Process_Ord_id == id).ToList<Process_Ord_AddLess>();
            deleteadls.ForEach(c => entities.Process_Ord_AddLess.Remove(c));
            entities.SaveChanges();

            var deletejob = entities.Process_Ord_JobDet.Where(d => d.ProcessOrdid == id).ToList<Process_Ord_JobDet>();
            deletejob.ForEach(c => entities.Process_Ord_JobDet.Remove(c));
            entities.SaveChanges();

            var deletedel = entities.Process_Ord_Det.Where(d => d.processordid == id).ToList<Process_Ord_Det>();
            deletedel.ForEach(c => entities.Process_Ord_Det.Remove(c));
            entities.SaveChanges();

            var deleteMas = entities.Process_Ord_Mas.Where(d => d.processordid == id).ToList<Process_Ord_Mas>();
            deleteMas.ForEach(c => entities.Process_Ord_Mas.Remove(c));
            entities.SaveChanges();

            entities.SaveChanges();
            result = true;
            return result;
        }

        public IQueryable<Domain.ProcessOrderAddScreen> LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType,int Userid)
        {
            try
            {


                string UserGroup = entities.Proc_Apparel_GetUserGroupName(Userid).FirstOrDefault().GroupName;

                string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

                if (Group != "AUDIT")
                {

                    var query = (from YD in entities.Proc_Apparel_ProcessLoadMainGrid(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(closed) ? "" : closed, string.IsNullOrEmpty(buyrsamp) ? "" : buyrsamp, string.IsNullOrEmpty(processortype) ? "" : processortype, prodordid == null ? 0 : prodordid, string.IsNullOrEmpty(prodord) ? "" : prodord, string.IsNullOrEmpty(type) ? "" : type, processorid == null ? 0 : processorid, unitid == null ? 0 : unitid, processid == null ? 0 : processid, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString(), string.IsNullOrEmpty(orderno) ? "" : orderno, string.IsNullOrEmpty(refno) ? "" : refno, styleid == null ? 0 : styleid, AppType)
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
                                     prodnord = YD.processorder,
                                     productionordid = YD.processordid,
                                     type = YD.Ordertype,
                                     proddate = (DateTime)YD.ProcessOrdate,
                                     delidate = (DateTime)YD.DelidateTime,
                                     remarks = YD.remarks,
                                     Yarnloc = YD.Yarnloc,
                                     Knitloc = YD.Knitloc,
                                     SuProcess = YD.SubProcess,
                                     Approved = YD.Approved,
                                     FinProcess = YD.FinalProcess,
                                     ProcessSetup = YD.ProcessSetup,
                                     DispatchLocType = YD.DispLocType,
                                     DispatchLocId = YD.DispLoc,
                                     styleid = 0,
                                     style = "",
                                     orderno = "",
                                     refno = "",
                                     Vehicleno = YD.Vehicleno,
                                     CheckClos = YD.Closed
                                 }).AsQueryable();

                    return query;
                }
                else {
                    var query = (from YD in entities.Proc_Apparel_ProcessLoadMainGridAudit(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(closed) ? "" : closed, string.IsNullOrEmpty(buyrsamp) ? "" : buyrsamp, string.IsNullOrEmpty(processortype) ? "" : processortype, prodordid == null ? 0 : prodordid, string.IsNullOrEmpty(prodord) ? "" : prodord, string.IsNullOrEmpty(type) ? "" : type, processorid == null ? 0 : processorid, unitid == null ? 0 : unitid, processid == null ? 0 : processid, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString(), string.IsNullOrEmpty(orderno) ? "" : orderno, string.IsNullOrEmpty(refno) ? "" : refno, styleid == null ? 0 : styleid, AppType)
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
                                     prodnord = YD.processorder,
                                     productionordid = YD.processordid,
                                     type = YD.Ordertype,
                                     proddate = (DateTime)YD.ProcessOrdate,
                                     delidate = (DateTime)YD.DelidateTime,
                                     remarks = YD.remarks,
                                     Yarnloc = YD.Yarnloc,
                                     Knitloc = YD.Knitloc,
                                     SuProcess = YD.SubProcess,
                                     Approved = YD.Approved,
                                     FinProcess = YD.FinalProcess,
                                     ProcessSetup = YD.ProcessSetup,
                                     DispatchLocType = YD.DispLocType,
                                     DispatchLocId = YD.DispLoc,
                                     styleid = 0,
                                     style = "",
                                     orderno = "",
                                     refno = "",
                                     Vehicleno = YD.Vehicleno,
                                     CheckClos = YD.Closed
                                 }).AsQueryable();

                    return query;
                
                
                }
            }
            catch (Exception ex)
            {
                var query = (from YD in entities.Proc_Apparel_ProcessLoadMainGrid(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(closed) ? "" : closed, string.IsNullOrEmpty(buyrsamp) ? "" : buyrsamp, string.IsNullOrEmpty(processortype) ? "" : processortype, prodordid == null ? 0 : prodordid, string.IsNullOrEmpty(prodord) ? "" : prodord, string.IsNullOrEmpty(type) ? "" : type, processorid == null ? 0 : processorid, unitid == null ? 0 : unitid, processid == null ? 0 : processid, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString(), string.IsNullOrEmpty(orderno) ? "" : orderno, string.IsNullOrEmpty(refno) ? "" : refno, styleid == null ? 0 : styleid, AppType)
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
                                 prodnord = YD.processorder,
                                 productionordid = YD.processordid,
                                 type = YD.Ordertype,
                                 proddate = (DateTime)YD.ProcessOrdate,
                                 delidate = (DateTime)YD.DelidateTime,
                                 remarks = YD.remarks,
                                 Yarnloc = YD.Yarnloc,
                                 Knitloc = YD.Knitloc,
                                 SuProcess = YD.SubProcess,
                                 Approved = YD.Approved,
                                 FinProcess = YD.FinalProcess,
                                 ProcessSetup = YD.ProcessSetup
                             }).AsQueryable();

                return query;

            }
        }

        public IQueryable<Domain.ProcessOrderAddScreen> LoadMaingriddet(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType, int Userid)
        {
            try
            {
                string UserGroup = entities.Proc_Apparel_GetUserGroupName(Userid).FirstOrDefault().GroupName;

                string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

                if (Group != "AUDIT")
                {

                    var query = (from YD in entities.Proc_Apparel_ProcessLoadMainGriddetail(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(closed) ? "" : closed, string.IsNullOrEmpty(buyrsamp) ? "" : buyrsamp, string.IsNullOrEmpty(processortype) ? "" : processortype, prodordid == null ? 0 : prodordid, string.IsNullOrEmpty(prodord) ? "" : prodord, string.IsNullOrEmpty(type) ? "" : type, processorid == null ? 0 : processorid, unitid == null ? 0 : unitid, processid == null ? 0 : processid, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString(), string.IsNullOrEmpty(orderno) ? "" : orderno, string.IsNullOrEmpty(refno) ? "" : refno, styleid == null ? 0 : styleid, AppType)
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
                                     prodnord = YD.processorder,
                                     productionordid = YD.processordid,
                                     type = YD.Ordertype,
                                     proddate = (DateTime)YD.ProcessOrdate,
                                     delidate = (DateTime)YD.DelidateTime,
                                     remarks = YD.remarks,
                                     Yarnloc = YD.Yarnloc,
                                     Knitloc = YD.Knitloc,
                                     SuProcess = YD.SubProcess,
                                     Approved = YD.Approved,
                                     FinProcess = YD.FinalProcess,
                                     ProcessSetup = YD.ProcessSetup,
                                     DispatchLocType = YD.DispLocType,
                                     DispatchLocId = YD.DispLoc,
                                     styleid = YD.StyleId,
                                     style = YD.Style,
                                     orderno = YD.Order_No,
                                     refno = YD.Ref_No,
                                     CheckClos = YD.Closed,
                                 }).AsQueryable();

                    return query;
                }
                else {

                    var query = (from YD in entities.Proc_Apparel_ProcessLoadMainGriddetailAudit(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(closed) ? "" : closed, string.IsNullOrEmpty(buyrsamp) ? "" : buyrsamp, string.IsNullOrEmpty(processortype) ? "" : processortype, prodordid == null ? 0 : prodordid, string.IsNullOrEmpty(prodord) ? "" : prodord, string.IsNullOrEmpty(type) ? "" : type, processorid == null ? 0 : processorid, unitid == null ? 0 : unitid, processid == null ? 0 : processid, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString(), string.IsNullOrEmpty(orderno) ? "" : orderno, string.IsNullOrEmpty(refno) ? "" : refno, styleid == null ? 0 : styleid, AppType)
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
                                     prodnord = YD.processorder,
                                     productionordid = YD.processordid,
                                     type = YD.Ordertype,
                                     proddate = (DateTime)YD.ProcessOrdate,
                                     delidate = (DateTime)YD.DelidateTime,
                                     remarks = YD.remarks,
                                     Yarnloc = YD.Yarnloc,
                                     Knitloc = YD.Knitloc,
                                     SuProcess = YD.SubProcess,
                                     Approved = YD.Approved,
                                     FinProcess = YD.FinalProcess,
                                     ProcessSetup = YD.ProcessSetup,
                                     DispatchLocType = YD.DispLocType,
                                     DispatchLocId = YD.DispLoc,
                                     styleid = YD.StyleId,
                                     style = YD.Style,
                                     orderno = YD.Order_No,
                                     refno = YD.Ref_No,
                                     CheckClos = YD.Closed,
                                 }).AsQueryable();

                    return query;
                
                }
            }
            catch (Exception ex)
            {
                var query = (from YD in entities.Proc_Apparel_ProcessLoadMainGrid(cmpid == null ? 0 : cmpid, string.IsNullOrEmpty(closed) ? "" : closed, string.IsNullOrEmpty(buyrsamp) ? "" : buyrsamp, string.IsNullOrEmpty(processortype) ? "" : processortype, prodordid == null ? 0 : prodordid, string.IsNullOrEmpty(prodord) ? "" : prodord, string.IsNullOrEmpty(type) ? "" : type, processorid == null ? 0 : processorid, unitid == null ? 0 : unitid, processid == null ? 0 : processid, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString(), string.IsNullOrEmpty(orderno) ? "" : orderno, string.IsNullOrEmpty(refno) ? "" : refno, styleid == null ? 0 : styleid, AppType)
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
                                 prodnord = YD.processorder,
                                 productionordid = YD.processordid,
                                 type = YD.Ordertype,
                                 proddate = (DateTime)YD.ProcessOrdate,
                                 delidate = (DateTime)YD.DelidateTime,
                                 remarks = YD.remarks,
                                 Yarnloc = YD.Yarnloc,
                                 Knitloc = YD.Knitloc,
                                 SuProcess = YD.SubProcess,
                                 Approved = YD.Approved,
                                 FinProcess = YD.FinalProcess,
                                 ProcessSetup = YD.ProcessSetup
                             }).AsQueryable();

                return query;

            }
        }



        public IQueryable<Domain.ProcessOrderDetInfo> LoadEditOutputitmsgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcOrdEditOutItemDet(prodid)
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
                             sno = (int)YD.ProcessOrddetid,
                             prgopqty = (decimal)YD.prog_op_qty,
                             isdeci = YD.Isdecimal,
                             disploc = (int)YD.DispLoc,
                             disptype = YD.DispLocType,
                             issloc = (int)YD.IssueLoc,
                             isstype = YD.IssueLocType,
                             Loop_Len = YD.Loop_len,
                             Gauge = YD.Guage,
                             SecQty = YD.ordsecqty,
                             plansizeid = (int)YD.plansizeid,
                             plansize = YD.plansize,
                             TaxAppVal = YD.TaxAppVal,
                             FinGsm = YD.FinGsm,
                             FinDia = YD.FinDiasize,
                             FinDiaid = YD.FinDiaid,
                             apprate = YD.AppRate,



                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputitmsgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcOrdEditInItemDet(prodid)
                         select new ProcessOrderDetInfo
                         {
                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             sizeid = (int)YD.sizeid,
                             size = YD.size,
                             clrid = (int)YD.colorid,
                             clr = YD.color,
                             inrout = YD.InorOut,
                             bal = (decimal)YD.Bal + (decimal)YD.Orderqty,
                             ordqty = (decimal)YD.Orderqty,
                             rate = (decimal)YD.rate,
                             sno = (int)YD.ProcessOrddetid,
                             prgopqty = (decimal)YD.prog_op_qty,
                             isdeci = YD.Isdecimal,
                             issqty = (decimal)YD.Issqty,
                             SecQty = YD.ordsecqty,
                             plansize = YD.plansize,
                             plansizeid = (int)YD.plansizeid,
                             opclr = YD.opcolor,
                             opsize = YD.opsize,
                             opitm = YD.opitem,
                             opitmid = YD.OpItemId,
                             opclrid = YD.OpColorId,
                             opsizeid = YD.OpSizeId
                            
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessOrderDetInfo> LoadEditOutputJobdetgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcOrdEditOpJobDet(prodid)
                         select new ProcessOrderDetInfo
                         {
                             itmid = (int)YD.itemid,
                             itm = YD.item,
                             sizeid = (int)YD.SizeID,
                             size = YD.Size,
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
                             issqty = 0,
                             rate = YD.Rate,
                             SecQty = (decimal)YD.ordsecqty,
                             plansizeid = (int)YD.PlannedSizeID,
                             plansize = YD.PlannedSize,
                             refno = YD.ref_no,
                             apprate = YD.Apprate,
                             ProgramType=YD.ProgramType,
                             Loop_Len = YD.Loop_len,
                             Gauge = YD.Guage,
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputJobdetgrid(int prodid)
        {
            try
            {
                var query = (from YD in entities.Proc_Apparel_ProcOrdEditInJobOrderDet(prodid)
                             select new ProcessOrderDetInfo
                             {
                                 itmid = (int)YD.itemid,
                                 itm = YD.item,
                                 sizeid = (int)YD.SizeID,
                                 size = YD.Size,
                                 plansizeid = YD.PlannedSizeID,
                                 plansize = YD.PlannedSize,
                                 clrid = (int)YD.colorid,
                                 clr = YD.color,
                                 inrout = YD.InorOut,
                                 bal = (decimal)YD.Bal + (decimal)YD.OrdQty,
                                 ordqty = (decimal)YD.OrdQty,
                                 prgdetid = 0,
                                 sno = (int)YD.Processjobdetid,
                                 prodpgmno = YD.ProdPrgno,
                                 jobordno = YD.job_ord_no,
                                 prgopqty = (decimal)YD.prog_op_qty,
                                 isdeci = YD.Isdecimal,
                                 issqty = (decimal)YD.IssQty,
                                 procorddetid = (int)YD.ProcessordDetid,
                                 procordjobid = (int)YD.Processjobdetid,
                                 procissdetid = (int)YD.processissuedetid,
                                 procissjobid = (int)YD.processissuejobid,
                                 SecQty = (decimal)YD.ordsecqty,
                                 refno = YD.ref_no,
                                 opclr = YD.opcolor,
                                 opsize = YD.opsize,
                                 opitm = YD.opitem,
                                 opitmid = YD.OpItemId,
                                 opclrid = YD.OpColorId,
                                 opsizeid = YD.OpSizeId,
                                 orderno = YD.OrdNo,
                                 FabricId = (int)YD.FabricID,
                                 YarnPer = YD.Knit_In_Per,
                                 Fabric_ColorId = YD.Fabric_ColorId,
                                 ProgramType=YD.ProgramType
                             }).AsQueryable();

                return query;
            }
            catch (Exception ex) {
                var query = (from YD in entities.Proc_Apparel_ProcOrdEditInJobOrderDet(prodid)
                             select new ProcessOrderDetInfo
                             {
                                 itmid = (int)YD.itemid,
                                 itm = YD.item,
                                 sizeid = (int)YD.SizeID,
                                 size = YD.Size,
                                 plansizeid = YD.PlannedSizeID,
                                 plansize = YD.PlannedSize,
                                 clrid = (int)YD.colorid,
                                 clr = YD.color,
                                 inrout = YD.InorOut,
                                 bal = (decimal)YD.Bal + (decimal)YD.OrdQty,
                                 ordqty = (decimal)YD.OrdQty,
                                 prgdetid = 0,
                                 sno = (int)YD.Processjobdetid,
                                 prodpgmno = YD.ProdPrgno,
                                 jobordno = YD.job_ord_no,
                                 prgopqty = (decimal)YD.prog_op_qty,
                                 isdeci = YD.Isdecimal,
                                 issqty = (decimal)YD.IssQty,
                                 procorddetid = (int)YD.ProcessordDetid,
                                 procordjobid = (int)YD.Processjobdetid,
                                 procissdetid = (int)YD.processissuedetid,
                                 procissjobid = (int)YD.processissuejobid,
                                 SecQty = (decimal)YD.ordsecqty,
                                 refno = YD.ref_no,
                                 opclr = YD.opcolor,
                                 opsize = YD.opsize,
                                 opitm = YD.opitem,
                                 opitmid = YD.OpItemId,
                                 opclrid = YD.OpColorId,
                                 opsizeid = YD.OpSizeId,
                                 orderno = YD.OrdNo,
                                 FabricId = (int)YD.FabricID,
                                 YarnPer = YD.Knit_In_Per,
                                 Fabric_ColorId = YD.Fabric_ColorId

                             }).AsQueryable();

                return query;
            
            }
        }

        public IQueryable<Domain.ProcessOrderDetInfo> LoadEditInputStkdet(int cmpid, int prodid, string prodordno)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrderEditStkDet(cmpid, prodid, prodordno)
                         select new ProcessOrderDetInfo
                         {

                             itmid = (int)YD.Itemid,
                             clrid = (int)YD.Colorid,
                             sizeid = (int)YD.Sizeid,
                             bal = (decimal)YD.balQty + (decimal)YD.issueqty,
                             issues = (decimal)YD.issueqty,
                             process = YD.Process,//YD.Processid,
                             jobordno = YD.Job_ord_no,
                             stockid = (int)YD.ItemStockId,
                             lotno = YD.Lotno,
                             prodstkid = (int)YD.ProcessIssStockId,
                             procorddetid = (int)YD.processorddetid,
                             procissid = (int)YD.ProcessIssueId,
                             procissjobid = (int)YD.ProcessIssueJobId,
                             TransNo = YD.TransNo,
                             opclr = YD.opcolor,
                             opsize = YD.opsize,
                             opitm = YD.opitem,
                             opitmid = YD.OpItemId,
                             opclrid = YD.OpColorId,
                             opsizeid = YD.OpSizeId,
                             orderno = YD.Order_No,
                             refno = YD.Ref_No,
                             supplier = YD.Supplier,
                             itm = YD.item,
                             clr = YD.color,
                             size = YD.size,
                             ProcessIssStockId=(int)YD.ProcessIssStockId,
                             prodpgmno=YD.ProdPrgNo
                         }).AsQueryable();

            return query;
        }

        public bool DeleteIssueDetData(List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<Domain.ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0)
        {
            int id = 0;
            int masid = 0;
            //int issid = 0;
            var processordid = objmasiss[0].ProcessOrdId;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {


                    string procissno = objmasiss[0].ProcessIssueNo;
                    string jobno = objobdet[0].Job_ord_no;

                    string OMasno = "";
                    int styid = 0;


                    var OQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == jobno).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OMasno = OQuery.Order_No;
                        styid = (int)OQuery.Styleid;
                    }

                    var upd1 = entities.Proc_UpdateBomFromProcessIssue("W", "E", OMasno, styid, jobno, procissno);


                    if (objstkdetiss != null && objstkdetiss.Count > 0)
                    {
                        foreach (var stkdet in objstkdetiss)
                        {
                            var Py = entities.Proc_Apparel_ProcIssDelitmstkOutwrd(stkdet.ItemStockId, stkdet.ProcessIssueNo, stkdet.Job_ord_no);
                            entities.SaveChanges();

                            var Pg3 = entities.Proc_Apparel_ProcessIssueItmStkUpdate(stkdet.ItemStockId, processordid, stkdet.ProcessIssStockId);
                            entities.SaveChanges();
                        }
                    }


                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0)
                        {
                            var Pg6 = entities.Proc_Apparel_ProcessIssUpdProdprgdet(jobdt.IssueQty, jobdt.itemid, jobdt.colorid, jobdt.PlannedSizeID, jobdt.ProdPrgNo, jobdt.ProcessIssueJobId);
                            entities.SaveChanges();

                        }
                    }

                    if (objstkdetiss != null && objstkdetiss.Count > 0)
                    {
                        foreach (var item in objstkdetiss)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Process_Issue_Stock.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Stock>();

                    deletedet.ForEach(c => entities.Process_Issue_Stock.Remove(c));
                    entities.SaveChanges();

                    if (objobdetiss != null && objobdetiss.Count > 0)
                    {
                        foreach (var item in objobdetiss)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetjob = entities.Process_Issue_Jobdet.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Jobdet>();

                    deletedetjob.ForEach(c => entities.Process_Issue_Jobdet.Remove(c));
                    entities.SaveChanges();


                    if (objdetiss != null && objdetiss.Count > 0)
                    {
                        foreach (var item in objdetiss)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }
                    var isod = id;
                    var delete = entities.Process_Issue_Det.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Det>();

                    delete.ForEach(c => entities.Process_Issue_Det.Remove(c));
                    entities.SaveChanges();


                    var Mas = entities.Process_Issue_Mas.Where(u => u.ProcessIssueId == isod);

                    foreach (var v in Mas)
                    {
                        entities.Process_Issue_Mas.Remove(v);
                    }
                    entities.SaveChanges();


                    //Process Ord
                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var rt in objobdet)
                        {
                            if (rt.ip_op == "I")
                            {
                                var Py = entities.proc_Apparel_ProcessUpdateProdprgdetInput(rt.ProcessOrdid, rt.ProdPrgNo, rt.Job_ord_no, rt.Itemid, rt.Colorid, rt.PlannedSizeID);
                                entities.SaveChanges();
                            }
                            if (rt.ip_op == "O")
                            {
                                var Py = entities.proc_Apparel_ProcessUpdateProdprgdetOut(rt.ProcessOrdid, rt.ProdPrgNo, rt.Job_ord_no, rt.Itemid, rt.Colorid, rt.PlannedSizeID);
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProcessOrdid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetob = entities.Process_Ord_JobDet.Where(d => d.ProcessOrdid == id).ToList<Process_Ord_JobDet>();

                    deletedetob.ForEach(c => entities.Process_Ord_JobDet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.processordid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetord = entities.Process_Ord_Det.Where(d => d.processordid == id).ToList<Process_Ord_Det>();

                    deletedetord.ForEach(c => entities.Process_Ord_Det.Remove(c));
                    entities.SaveChanges();


                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            id = (int)item.Process_Ord_id;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Process_Ord_AddLess.Where(d => d.Process_Ord_id == id).ToList<Process_Ord_AddLess>();

                    deletedetad.ForEach(c => entities.Process_Ord_AddLess.Remove(c));
                    entities.SaveChanges();

                    masid = id;


                    var Masi = entities.Process_Ord_Mas.Where(u => u.processordid == masid);

                    foreach (var v in Masi)
                    {
                        entities.Process_Ord_Mas.Remove(v);
                    }
                    entities.SaveChanges();




                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-DeleteIssueDetData");
                }
            }
            return reserved;
        }



        public bool AddIss(Process_Ord_Mas obj, List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            int processordid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {

                try
                {
                    int id = 0;
                    int issid = 0;
                    var detid = 0;
                    var odetid = 0;
                    processordid = (int)objmasiss[0].ProcessOrdId;


                    //Mas
                    entities.Process_Ord_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.processordid;

                    //Process Ord Add
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {

                            if (item.inp_op == "I" && item.OpItemId > 0 && item.issued_qty > 0)
                            {
                                item.processordid = Masid;
                                entities.Process_Ord_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.processorddetid;
                                processordid = (int)item.processordid;
                                foreach (var jobdt in objobdet)
                                {

                                    if (jobdt.ip_op == "I" && jobdt.OpItemId > 0 && jobdt.issued_qty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.inp_op == jobdt.ip_op && item.OpItemId == jobdt.OpItemId && item.OpColorId == jobdt.OpColorId && item.OpSizeId == jobdt.OpSizeId)
                                        {
                                            jobdt.ProcessOrdid = Masid;
                                            jobdt.ProcessOrddetid = detid;
                                            entities.Process_Ord_JobDet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessJobDetid;

                                        }

                                    }

                                }
                                entities.SaveChanges();

                            }
                            else
                            {
                                if (item.received_qty > 0 || item.order_output_qty > 0)
                                {
                                    item.processordid = Masid;
                                    entities.Process_Ord_Det.Add(item);
                                    entities.SaveChanges();
                                    detid = item.processorddetid;
                                    processordid = (int)item.processordid;
                                    foreach (var jobdt in objobdet)
                                    {
                                        //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                        //{
                                        if (jobdt.issued_qty > 0 || jobdt.OrderQty > 0)
                                        {

                                            if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.inp_op == jobdt.ip_op)
                                            {
                                                jobdt.ProcessOrdid = Masid;
                                                jobdt.ProcessOrddetid = detid;
                                                entities.Process_Ord_JobDet.Add(jobdt);
                                                entities.SaveChanges();
                                                odetid = (int)jobdt.ProcessJobDetid;

                                            }

                                        }
                                        // }
                                    }
                                    entities.SaveChanges();

                                }
                            }
                        }

                    }


                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            item.Process_Ord_id = Masid;
                            entities.Process_Ord_AddLess.Add(item);
                        }
                        entities.SaveChanges();
                    }


                    foreach (var jobdt in objobdet)
                    {
                        if (jobdt.ip_op == "I" && jobdt.issued_qty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcessProdDetInpUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProcessOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.PlannedSizeID, jobdt.OpItemId, jobdt.OpColorId, jobdt.OpSizeId);
                            entities.SaveChanges();
                        }
                        if (jobdt.ip_op == "O" && jobdt.OrderQty > 0)
                        {
                            var Pgop = entities.Proc_Apparel_ProcessProdDetOUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProcessOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.PlannedSizeID);
                            entities.SaveChanges();
                        }

                    }


                    //Process  Issue

                    var issueno = "";

                    if (objmasiss != null && objmasiss.Count > 0)
                    {
                        foreach (var it in objmasiss)
                        {
                            it.ProcessOrdId = processordid;
                            issueno = it.ProcessIssueNo;
                            entities.Process_Issue_Mas.Add(it);
                            entities.SaveChanges();
                            issid = it.ProcessIssueId;
                        }

                    }
                    if (objdetiss != null && objdetiss.Count > 0)
                    {
                        foreach (var item in objdetiss)
                        {

                            if (item.ip_op == "I" && item.OpItemId > 0 && item.IssueQty > 0)
                            {
                                item.ProcessIssueId = issid;
                                entities.Process_Issue_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.ProcessIssueDetId;

                                foreach (var jobdt in objobdetiss)
                                {

                                    if (jobdt.IssueQty > 0 && jobdt.ip_op == "I" && jobdt.OpItemId > 0)
                                    {

                                        if (item.itemid == jobdt.itemid && item.colorid == jobdt.colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.ip_op == jobdt.ip_op && item.OpItemId == jobdt.OpItemId && item.OpColorId == jobdt.OpColorId && item.OpSizeId == jobdt.OpSizeId)
                                        {
                                            jobdt.ProcessIssueId = issid;
                                            jobdt.ProcessIssueDetId = detid;
                                            entities.Process_Issue_Jobdet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessIssueJobId;

                                            foreach (var stkdet in objstkdetiss)
                                            {
                                                if (stkdet.IssueQty > 0)
                                                {
                                                    if (jobdt.itemid == stkdet.Itemid && jobdt.colorid == stkdet.Colorid && jobdt.sizeid == stkdet.Sizeid && jobdt.Job_ord_no == stkdet.Job_ord_no && jobdt.ip_op == "I" && jobdt.OpItemId == stkdet.OpItemId && jobdt.OpColorId == stkdet.OpColorId && jobdt.OpSizeId == stkdet.OpSizeId && jobdt.ProdPrgNo == stkdet.ProdPrgNo)
                                                    {
                                                        stkdet.ProcessIssueId = issid;
                                                        stkdet.ProcessIssueNo = issueno;
                                                        stkdet.ProcessIssueJobid = odetid;
                                                        entities.Process_Issue_Stock.Add(stkdet);

                                                    }
                                                }

                                            }

                                        }
                                    }



                                }
                                entities.SaveChanges();


                            }
                            else
                            {
                                if (item.IssueQty > 0 && item.ip_op == "O")
                                {
                                    item.ProcessIssueId = issid;
                                    entities.Process_Issue_Det.Add(item);
                                    entities.SaveChanges();
                                    detid = item.ProcessIssueDetId;

                                    foreach (var jobdt in objobdetiss)
                                    {

                                        if (jobdt.IssueQty > 0 && jobdt.ip_op == "O")
                                        {

                                            if (item.itemid == jobdt.itemid && item.colorid == jobdt.colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.ip_op == jobdt.ip_op)
                                            {
                                                jobdt.ProcessIssueId = issid;
                                                jobdt.ProcessIssueDetId = detid;
                                                entities.Process_Issue_Jobdet.Add(jobdt);
                                                entities.SaveChanges();
                                                odetid = (int)jobdt.ProcessIssueJobId;

                                                foreach (var stkdet in objstkdetiss)
                                                {
                                                    if (stkdet.IssueQty > 0)
                                                    {
                                                        if (jobdt.itemid == stkdet.Itemid && jobdt.colorid == stkdet.Colorid && jobdt.sizeid == stkdet.Sizeid && jobdt.Job_ord_no == stkdet.Job_ord_no && jobdt.ip_op == "I" && jobdt.ProdPrgNo == stkdet.ProdPrgNo)
                                                        {
                                                            stkdet.ProcessIssueId = issid;
                                                            stkdet.ProcessIssueNo = issueno;
                                                            stkdet.ProcessIssueJobid = odetid;
                                                            entities.Process_Issue_Stock.Add(stkdet);

                                                        }
                                                    }

                                                }

                                            }
                                        }

                                    }
                                    entities.SaveChanges();

                                }
                            }
                        }

                    }



                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0 && jobdt.ip_op == "I")
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdProcordjobdet(jobdt.IssueQty, jobdt.processordjobdetid);
                            entities.SaveChanges();

                            var Pg6 = entities.Proc_Apparel_ProcIssUpdProdprgdet(jobdt.IssueQty, jobdt.itemid, jobdt.colorid, jobdt.PlannedSizeID, jobdt.ProdPrgNo);
                            entities.SaveChanges();

                        }
                    }

                    foreach (var stk in objstkdetiss)
                    {
                        if (stk.IssueQty > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdItmstk(stk.IssueQty, stk.ItemStockId);
                            entities.SaveChanges();


                            var Pg8 = entities.Proc_Apparel_ProcessIssueInsertstkoutward(stk.ProcessIssueJobid, stk.ItemStockId, stk.IssueQty, stk.ProcessIssStockId);
                            entities.SaveChanges();

                        }


                    }

                    bool UCMR1 = MarkUpRateIssUpdation(processordid);

                    bool UCMR = MarkUpRateOrdUpdation(processordid);

                    // con.Execute "Proc_UpdateBomFromProcessIssue '" & OrderType & "', 'E', '" & rsBomUpdate!Order_no & "', '" & rsBomUpdate!Styleid & "', '" & rsBomUpdate!Job_Ord_No & "', '" & txtIssueNo.Text & "'"
                    //rsBomUpdate.MoveNext

                    string procissno = objmasiss[0].ProcessIssueNo;
                    string jobno = objobdet[0].Job_ord_no;
                    string OMasno = "";
                    int styid = 0;


                    var OQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == jobno).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OMasno = OQuery.Order_No;
                        styid = (int)OQuery.Styleid;
                    }

                    var upd1 = entities.Proc_UpdateBomFromProcessIssue(obj.OrderType, "A", OMasno, styid, jobno, procissno);

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-AddIss");
                }
            }
            return reserved;
        }


        public IQueryable<ProcessIssueMas> LoadIssueNo(int ordid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrderGetIssueNo(ordid)
                         select new ProcessIssueMas
                         {

                             ProcessIssueId = YD.ProcessIssueId,
                             ProcessIssueNo = YD.ProcessIssueNo

                         }).AsQueryable();

            return query;
        }


        public bool DeleteDetData(List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0)
        {
            int id = 0;
            int masid = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {

                try
                {
                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var rt in objobdet)
                        {
                            if (rt.ip_op == "I")
                            {
                                var Py = entities.proc_Apparel_ProcessUpdateProdprgdetInput(rt.ProcessOrdid, rt.ProdPrgNo, rt.Job_ord_no, rt.Itemid, rt.Colorid, rt.PlannedSizeID);
                                entities.SaveChanges();
                            }
                            if (rt.ip_op == "O")
                            {
                                var Py = entities.proc_Apparel_ProcessUpdateProdpgdetOut(rt.ProcessOrdid, rt.ProdPrgNo, rt.Job_ord_no, rt.Itemid, rt.Colorid, rt.PlannedSizeID);
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProcessOrdid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetob = entities.Process_Ord_JobDet.Where(d => d.ProcessOrdid == id).ToList<Process_Ord_JobDet>();

                    deletedetob.ForEach(c => entities.Process_Ord_JobDet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.processordid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetord = entities.Process_Ord_Det.Where(d => d.processordid == id).ToList<Process_Ord_Det>();

                    deletedetord.ForEach(c => entities.Process_Ord_Det.Remove(c));
                    entities.SaveChanges();


                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            id = (int)item.Process_Ord_id;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Process_Ord_AddLess.Where(d => d.Process_Ord_id == id).ToList<Process_Ord_AddLess>();

                    deletedetad.ForEach(c => entities.Process_Ord_AddLess.Remove(c));
                    entities.SaveChanges();
                    masid = id;


                    var Mas = entities.Process_Ord_Mas.Where(u => u.processordid == masid);

                    foreach (var v in Mas)
                    {
                        entities.Process_Ord_Mas.Remove(v);
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-DeleteDetData");
                }
            }
            return reserved;
        }


        public bool UpdIss(Process_Ord_Mas objupd, List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, List<ProcessIssueJobdet> jdet, List<Process_Issue_Mas> objmasiss, List<Process_Issue_Det> objdetiss, List<Process_Issue_Jobdet> objobdetiss, List<Process_Issue_Stock> objstkdetiss, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int processordid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var Upd = entities.Process_Ord_Mas.Where(c => c.processordid == objupd.processordid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.processordid = objupd.processordid;
                        Upd.processorder = objupd.processorder;
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
                        Upd.KnitLoc = objupd.KnitLoc;
                        Upd.YarnLoc = objupd.YarnLoc;
                        Upd.Vehicleno = objupd.Vehicleno;


                        entities.SaveChanges();

                    }



                    int id = 0;
                    int issid = 0;
                    var detid = 0;
                    var odetid = 0;
                    processordid = (int)objmasiss[0].ProcessOrdId;


                    //Process Iss

                    if (objstkdetiss != null && objstkdetiss.Count > 0)
                    {
                        foreach (var stkdet in objstkdetiss)
                        {
                            var Py = entities.Proc_Apparel_ProcIssDelitmstkOutwrd(stkdet.ItemStockId, stkdet.ProcessIssueNo, stkdet.Job_ord_no);
                            entities.SaveChanges();

                            var Pg3 = entities.Proc_Apparel_ProcessIssueItmStkUpdate(stkdet.ItemStockId, processordid, stkdet.ProcessIssStockId);
                            entities.SaveChanges();
                        }
                    }



                    string procissno = objmasiss[0].ProcessIssueNo;
                    string jobno = objobdet[0].Job_ord_no;
                    string OMasno = "";
                    int styid = 0;


                    var OQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == jobno).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OMasno = OQuery.Order_No;
                        styid = (int)OQuery.Styleid;
                    }

                    var upd1 = entities.Proc_UpdateBomFromProcessIssue(objupd.OrderType, "E", OMasno, styid, jobno, procissno);


                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0)
                        {
                            var Pg6 = entities.Proc_Apparel_ProcessIssUpdProdprgdet(jobdt.IssueQty, jobdt.itemid, jobdt.colorid, jobdt.PlannedSizeID, jobdt.ProdPrgNo, jobdt.ProcessIssueJobId);
                            entities.SaveChanges();


                        }
                    }

                    if (objstkdetiss != null && objstkdetiss.Count > 0)
                    {
                        foreach (var item in objstkdetiss)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Process_Issue_Stock.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Stock>();

                    deletedet.ForEach(c => entities.Process_Issue_Stock.Remove(c));
                    entities.SaveChanges();

                    if (objobdetiss != null && objobdetiss.Count > 0)
                    {
                        foreach (var item in objobdetiss)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetjob = entities.Process_Issue_Jobdet.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Jobdet>();

                    deletedetjob.ForEach(c => entities.Process_Issue_Jobdet.Remove(c));
                    entities.SaveChanges();


                    if (objdetiss != null && objdetiss.Count > 0)
                    {
                        foreach (var item in objdetiss)
                        {
                            id = (int)item.ProcessIssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }
                    var isod = id;
                    var delete = entities.Process_Issue_Det.Where(d => d.ProcessIssueId == id).ToList<Process_Issue_Det>();

                    delete.ForEach(c => entities.Process_Issue_Det.Remove(c));
                    entities.SaveChanges();


                    var Mas = entities.Process_Issue_Mas.Where(u => u.ProcessIssueId == isod);

                    foreach (var v in Mas)
                    {
                        entities.Process_Issue_Mas.Remove(v);
                    }
                    entities.SaveChanges();


                    //Process Ord
                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var rt in objobdet)
                        {
                            if (rt.ip_op == "I")
                            {
                                var Py = entities.proc_Apparel_ProcessUpdateProdprgdetInput(rt.ProcessOrdid, rt.ProdPrgNo, rt.Job_ord_no, rt.Itemid, rt.Colorid, rt.PlannedSizeID);
                                entities.SaveChanges();
                            }
                            if (rt.ip_op == "O")
                            {
                                var Py = entities.proc_Apparel_ProcessUpdateProdprgdetOut(rt.ProcessOrdid, rt.ProdPrgNo, rt.Job_ord_no, rt.Itemid, rt.Colorid, rt.PlannedSizeID);
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProcessOrdid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetob = entities.Process_Ord_JobDet.Where(d => d.ProcessOrdid == id).ToList<Process_Ord_JobDet>();

                    deletedetob.ForEach(c => entities.Process_Ord_JobDet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.processordid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetord = entities.Process_Ord_Det.Where(d => d.processordid == id).ToList<Process_Ord_Det>();

                    deletedetord.ForEach(c => entities.Process_Ord_Det.Remove(c));
                    entities.SaveChanges();


                    //if (objadlsdet != null && objadlsdet.Count > 0)
                    //{
                    //    foreach (var item in objadlsdet)
                    //    {
                    //        id = (int)item.Process_Ord_id;

                    //    }
                    //}
                    //else if (unitmId > 0)
                    //{
                    //    id = unitmId;
                    //}

                    var deletedetad = entities.Process_Ord_AddLess.Where(d => d.Process_Ord_id == id).ToList<Process_Ord_AddLess>();

                    deletedetad.ForEach(c => entities.Process_Ord_AddLess.Remove(c));
                    entities.SaveChanges();




                    ////Process Ord Add
                    //if (objdet != null && objdet.Count > 0)
                    //{
                    //    foreach (var item in objdet)
                    //    {
                    //        if (item.received_qty > 0 || item.order_output_qty > 0)
                    //        {

                    //            entities.Process_Ord_Det.Add(item);
                    //            entities.SaveChanges();
                    //            detid = item.processorddetid;
                    //            processordid = (int)item.processordid;
                    //            foreach (var jobdt in objobdet)
                    //            {
                    //                //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                    //                //{
                    //                if (jobdt.issued_qty > 0 || jobdt.OrderQty > 0)
                    //                {
                    //                    if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.inp_op == jobdt.ip_op)
                    //                    {

                    //                        jobdt.ProcessOrddetid = detid;
                    //                        entities.Process_Ord_JobDet.Add(jobdt);
                    //                        entities.SaveChanges();
                    //                        odetid = (int)jobdt.ProcessJobDetid;



                    //                    }
                    //                }
                    //                // }
                    //            }
                    //            entities.SaveChanges();

                    //        }
                    //    }

                    //}

                    //Process Ord Add
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {

                            if (item.inp_op == "I" && item.OpItemId > 0 && item.issued_qty > 0)
                            {
                                //item.processordid = Masid;
                                entities.Process_Ord_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.processorddetid;
                                processordid = (int)item.processordid;
                                foreach (var jobdt in objobdet)
                                {

                                    if (jobdt.ip_op == "I" && jobdt.OpItemId > 0 && jobdt.issued_qty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.inp_op == jobdt.ip_op && item.OpItemId == jobdt.OpItemId && item.OpColorId == jobdt.OpColorId && item.OpSizeId == jobdt.OpSizeId)
                                        {
                                            //jobdt.ProcessOrdid = Masid;
                                            jobdt.ProcessOrddetid = detid;
                                            entities.Process_Ord_JobDet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessJobDetid;

                                        }

                                    }

                                }
                                entities.SaveChanges();

                            }
                            else
                            {
                                if (item.received_qty > 0 || item.order_output_qty > 0)
                                {
                                    //item.processordid = Masid;
                                    entities.Process_Ord_Det.Add(item);
                                    entities.SaveChanges();
                                    detid = item.processorddetid;
                                    processordid = (int)item.processordid;
                                    foreach (var jobdt in objobdet)
                                    {
                                        //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                        //{
                                        if (jobdt.issued_qty > 0 || jobdt.OrderQty > 0)
                                        {

                                            if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.inp_op == jobdt.ip_op)
                                            {
                                                //jobdt.ProcessOrdid = Masid;
                                                jobdt.ProcessOrddetid = detid;
                                                entities.Process_Ord_JobDet.Add(jobdt);
                                                entities.SaveChanges();
                                                odetid = (int)jobdt.ProcessJobDetid;

                                            }

                                        }
                                        // }
                                    }
                                    entities.SaveChanges();

                                }
                            }
                        }

                    }

                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            item.Process_Ord_id = (int)processordid;
                            entities.Process_Ord_AddLess.Add(item);
                        }
                        entities.SaveChanges();
                    }


                    foreach (var jobdt in objobdet)
                    {
                        if (jobdt.ip_op == "I" && jobdt.issued_qty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcessProdDetInpUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProcessOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.PlannedSizeID, jobdt.OpItemId, jobdt.OpColorId, jobdt.OpSizeId);
                            entities.SaveChanges();
                        }
                        if (jobdt.ip_op == "O" && jobdt.OrderQty > 0)
                        {
                            var Pgop = entities.Proc_Apparel_ProcessProdDetOUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProcessOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.PlannedSizeID);
                            entities.SaveChanges();
                        }

                    }


                    //Process  Issue

                    var issueno = "";

                    if (objmasiss != null && objmasiss.Count > 0)
                    {
                        foreach (var it in objmasiss)
                        {
                            it.ProcessOrdId = processordid;
                            issueno = it.ProcessIssueNo;
                            entities.Process_Issue_Mas.Add(it);
                            entities.SaveChanges();
                            issid = it.ProcessIssueId;
                        }

                    }
                    //if (objdetiss != null && objdetiss.Count > 0)
                    //{
                    //    foreach (var item in objdetiss)
                    //    {
                    //        if (item.IssueQty > 0)
                    //        {
                    //            item.ProcessIssueId = issid;
                    //            entities.Process_Issue_Det.Add(item);
                    //            entities.SaveChanges();
                    //            detid = item.ProcessIssueDetId;
                    //            //odetid = 0;
                    //            foreach (var jobdt in objobdetiss)
                    //            {
                    //                //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                    //                //{
                    //                if (jobdt.IssueQty > 0)
                    //                {
                    //                    if (item.itemid == jobdt.itemid && item.colorid == jobdt.colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.ip_op == jobdt.ip_op)
                    //                    {
                    //                        jobdt.ProcessIssueId = issid;
                    //                        jobdt.ProcessIssueDetId = detid;
                    //                        entities.Process_Issue_Jobdet.Add(jobdt);
                    //                        entities.SaveChanges();
                    //                        odetid = (int)jobdt.ProcessIssueJobId;

                    //                        foreach (var stkdet in objstkdetiss)
                    //                        {
                    //                            if (stkdet.IssueQty > 0)
                    //                            {
                    //                                if (jobdt.itemid == stkdet.Itemid && jobdt.colorid == stkdet.Colorid && jobdt.sizeid == stkdet.Sizeid && jobdt.Job_ord_no == stkdet.Job_ord_no && jobdt.ip_op == "I")
                    //                                {
                    //                                    stkdet.ProcessIssueId = issid;
                    //                                    stkdet.ProcessIssueNo = issueno;
                    //                                    stkdet.ProcessIssueJobid = odetid;
                    //                                    entities.Process_Issue_Stock.Add(stkdet);

                    //                                }
                    //                            }

                    //                        }

                    //                    }
                    //                }
                    //                // }
                    //            }
                    //            entities.SaveChanges();

                    //        }
                    //    }

                    //}
                    if (objdetiss != null && objdetiss.Count > 0)
                    {
                        foreach (var item in objdetiss)
                        {

                            if (item.ip_op == "I" && item.OpItemId > 0 && item.IssueQty > 0)
                            {
                                item.ProcessIssueId = issid;
                                entities.Process_Issue_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.ProcessIssueDetId;

                                foreach (var jobdt in objobdetiss)
                                {

                                    if (jobdt.IssueQty > 0 && jobdt.ip_op == "I" && jobdt.OpItemId > 0)
                                    {

                                        if (item.itemid == jobdt.itemid && item.colorid == jobdt.colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.ip_op == jobdt.ip_op && item.OpItemId == jobdt.OpItemId && item.OpColorId == jobdt.OpColorId && item.OpSizeId == jobdt.OpSizeId)
                                        {
                                            jobdt.ProcessIssueId = issid;
                                            jobdt.ProcessIssueDetId = detid;
                                            entities.Process_Issue_Jobdet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessIssueJobId;

                                            foreach (var stkdet in objstkdetiss)
                                            {
                                                if (stkdet.IssueQty > 0)
                                                {
                                                    if (jobdt.itemid == stkdet.Itemid && jobdt.colorid == stkdet.Colorid && jobdt.sizeid == stkdet.Sizeid && jobdt.Job_ord_no == stkdet.Job_ord_no && jobdt.ip_op == "I" && jobdt.OpItemId == stkdet.OpItemId && jobdt.OpColorId == stkdet.OpColorId && jobdt.OpSizeId == stkdet.OpSizeId && jobdt.ProdPrgNo == stkdet.ProdPrgNo)
                                                    {
                                                        stkdet.ProcessIssueId = issid;
                                                        stkdet.ProcessIssueNo = issueno;
                                                        stkdet.ProcessIssueJobid = odetid;
                                                        entities.Process_Issue_Stock.Add(stkdet);

                                                    }
                                                }

                                            }

                                        }
                                    }



                                }
                                entities.SaveChanges();


                            }
                            else
                            {
                                if (item.IssueQty > 0 && item.ip_op == "O")
                                {
                                    item.ProcessIssueId = issid;
                                    entities.Process_Issue_Det.Add(item);
                                    entities.SaveChanges();
                                    detid = item.ProcessIssueDetId;

                                    foreach (var jobdt in objobdetiss)
                                    {

                                        if (jobdt.IssueQty > 0 && jobdt.ip_op == "O")
                                        {

                                            if (item.itemid == jobdt.itemid && item.colorid == jobdt.colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.ip_op == jobdt.ip_op)
                                            {
                                                jobdt.ProcessIssueId = issid;
                                                jobdt.ProcessIssueDetId = detid;
                                                entities.Process_Issue_Jobdet.Add(jobdt);
                                                entities.SaveChanges();
                                                odetid = (int)jobdt.ProcessIssueJobId;

                                                foreach (var stkdet in objstkdetiss)
                                                {
                                                    if (stkdet.IssueQty > 0)
                                                    {
                                                        if (jobdt.itemid == stkdet.Itemid && jobdt.colorid == stkdet.Colorid && jobdt.sizeid == stkdet.Sizeid && jobdt.Job_ord_no == stkdet.Job_ord_no && jobdt.ip_op == "I" && jobdt.ProdPrgNo == stkdet.ProdPrgNo)
                                                        {
                                                            stkdet.ProcessIssueId = issid;
                                                            stkdet.ProcessIssueNo = issueno;
                                                            stkdet.ProcessIssueJobid = odetid;
                                                            entities.Process_Issue_Stock.Add(stkdet);

                                                        }
                                                    }

                                                }

                                            }
                                        }

                                    }
                                    entities.SaveChanges();

                                }
                            }
                        }

                    }

                    //foreach (var det in objdetiss)
                    //{
                    //    if (det.IssueQty > 0)
                    //    {
                    //        var Pg1 = entities.Proc_Apparel_ProcIssUpdProcorddet(det.IssueQty, det.itemid, det.colorid, det.sizeid, processordid);
                    //        entities.SaveChanges();
                    //    }

                    //}

                    foreach (var jobdt in jdet)
                    {
                        if (jobdt.IssueQty > 0 && jobdt.ip_op == "I")
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdProcordjobdet(jobdt.IssueQty, jobdt.processordjobdetid);
                            entities.SaveChanges();

                            var Pg6 = entities.Proc_Apparel_ProcIssUpdProdprgdet(jobdt.IssueQty, jobdt.itemid, jobdt.colorid, jobdt.PlannedSizeID, jobdt.ProdPrgNo);
                            entities.SaveChanges();

                        }
                    }

                    foreach (var stk in objstkdetiss)
                    {
                        if (stk.IssueQty > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdItmstk(stk.IssueQty, stk.ItemStockId);
                            entities.SaveChanges();


                            var Pg8 = entities.Proc_Apparel_ProcessIssueInsertstkoutward(stk.ProcessIssueJobid, stk.ItemStockId, stk.IssueQty, stk.ProcessIssStockId);
                            entities.SaveChanges();

                        }


                    }

                    //bool UCMR = MarkUpRateOrdUpdation(processordid);

                    //bool UCMR1 = MarkUpRateIssUpdation(processordid);
                    bool UCMR1 = MarkUpRateIssUpdation(processordid);

                    bool UCMR = MarkUpRateOrdUpdation(processordid);


                    procissno = objmasiss[0].ProcessIssueNo;
                    jobno = objobdet[0].Job_ord_no;
                    OMasno = "";
                    styid = 0;


                    var OQuery1 = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == jobno).FirstOrDefault();
                    if (OQuery1 != null)
                    {
                        OMasno = OQuery1.Order_No;
                        styid = (int)OQuery1.Styleid;
                    }

                    var updED = entities.Proc_UpdateBomFromProcessIssue(objupd.OrderType, "A", OMasno, styid, jobno, procissno);

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-UpdIss");
                }
            }
            return reserved;
        }


        public bool UpdDetData(Process_Ord_Mas objupd, List<Process_Ord_Det> objdet, List<Process_Ord_JobDet> objobdet, List<Process_Ord_AddLess> objadlsdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var Upd = entities.Process_Ord_Mas.Where(c => c.processordid == objupd.processordid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.processordid = objupd.processordid;
                        Upd.processorder = objupd.processorder;
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
                        Upd.KnitLoc = objupd.KnitLoc;
                        Upd.YarnLoc = objupd.YarnLoc;
                        Upd.SubProcess = objupd.SubProcess;
                        Upd.Approved = "P";
                        Upd.FinalProcess = objupd.FinalProcess;
                        Upd.Vehicleno = objupd.Vehicleno;
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
                                var Py = entities.proc_Apparel_ProcessUpdateProdprgdetInput(jdet.ProcessOrdid, jdet.ProdPrgNo, jdet.Job_ord_no, jdet.Itemid, jdet.Colorid, jdet.PlannedSizeID);
                                entities.SaveChanges();
                            }
                            if (jdet.ip_op == "O")
                            {
                                var Py = entities.proc_Apparel_ProcessUpdateProdpgdetOut(jdet.ProcessOrdid, jdet.ProdPrgNo, jdet.Job_ord_no, jdet.Itemid, jdet.Colorid, jdet.PlannedSizeID);
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.ProcessOrdid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetob = entities.Process_Ord_JobDet.Where(d => d.ProcessOrdid == id).ToList<Process_Ord_JobDet>();

                    deletedetob.ForEach(c => entities.Process_Ord_JobDet.Remove(c));
                    entities.SaveChanges();


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.processordid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Process_Ord_Det.Where(d => d.processordid == id).ToList<Process_Ord_Det>();

                    deletedet.ForEach(c => entities.Process_Ord_Det.Remove(c));
                    entities.SaveChanges();


                    if (objadlsdet != null && objadlsdet.Count > 0)
                    {
                        foreach (var item in objadlsdet)
                        {
                            id = (int)item.Process_Ord_id;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Process_Ord_AddLess.Where(d => d.Process_Ord_id == id).ToList<Process_Ord_AddLess>();

                    deletedetad.ForEach(c => entities.Process_Ord_AddLess.Remove(c));
                    entities.SaveChanges();





                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.received_qty > 0 || item.order_output_qty > 0)
                            {

                                entities.Process_Ord_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.processorddetid;
                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.issued_qty > 0 || jobdt.OrderQty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.PlannedSizeID == jobdt.PlannedSizeID && item.inp_op == jobdt.ip_op)
                                        {

                                            jobdt.ProcessOrddetid = detid;
                                            entities.Process_Ord_JobDet.Add(jobdt);
                                            entities.SaveChanges();
                                            odetid = (int)jobdt.ProcessJobDetid;

                                            //foreach (var stkdet in objstk)
                                            //{
                                            //    if (stkdet.IssueQty > 0)
                                            //    {
                                            //        if (jobdt.Itemid == stkdet.Itemid && jobdt.Colorid == stkdet.Colorid && jobdt.Sizeid == stkdet.Sizeid)
                                            //        {

                                            //            stkdet.ProductionOrdJobid = odetid;
                                            //            entities.Production_Ord_Stock.Add(stkdet);

                                            //        }
                                            //    }

                                            //}

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
                            entities.Process_Ord_AddLess.Add(item);
                        }
                        entities.SaveChanges();
                    }


                    foreach (var jobdt in objobdet)
                    {
                        if (jobdt.ip_op == "I" && jobdt.OrderQty > 0)
                        {
                            var Pg1 = entities.Proc_Apparel_ProcessProdDetInpUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProcessOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.PlannedSizeID, jobdt.OpItemId, jobdt.OpColorId, jobdt.OpSizeId);
                            entities.SaveChanges();
                        }
                        if (jobdt.ip_op == "O" && jobdt.OrderQty > 0)
                        {
                            var Pgop = entities.Proc_Apparel_ProcessProdDetOUpdate(jobdt.ProdPrgNo, jobdt.ip_op, jobdt.Job_ord_no, jobdt.ProcessOrdid, jobdt.Itemid, jobdt.Colorid, jobdt.PlannedSizeID);
                            entities.SaveChanges();
                        }

                    }

                    bool UCMR = MarkUpRateOrdUpdation(objupd.processordid);

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-UpdDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProcessOrdAddLess> LoadEditAddlessgrid(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrdEditAddless(prodid)
                         select new ProcessOrdAddLess
                         {

                             Process_Ord_Discountid = YD.process_ord_discountid,
                             Process_Ord_id = YD.Process_Ord_id,
                             Percentage = YD.Percentage,
                             PlusOrMinus = YD.PlusOrMinus,
                             Addlessid = (int)YD.Addlessid,
                             Amount = YD.Amount,
                             Addless = YD.Addless,


                         }).AsQueryable();

            return query;
        }
        public bool MarkUpRateOrdUpdation(int ProcOrderId)
        {

            var upd = entities.Proc_Apparel_UpdateProcessOrdMarkUpRate(ProcOrderId);
            return true;
        }

        public bool MarkUpRateIssUpdation(int ProcOrderId)
        {
            var upd = entities.Proc_Apparel_UpdateProcessIssMarkUpRate(ProcOrderId);
            return true;
        }


        public IQueryable<ProcessOrderDetInfo> LoadOrderMaindetails(int prodid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessLoadOrderDet(prodid)
                         select new ProcessOrderDetInfo
                         {

                             orderno = YD.order_no,
                             refno = YD.ref_no,
                             style = YD.style,
                             buyer=YD.Buyer,

                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessOrderDetInfo> LoadOrderMaindetailsforProd(int prodid,string type)
        {
            var query = (from YD in entities.Proc_Apparel_ProdLoadOrderDet(prodid, type)
                         select new ProcessOrderDetInfo
                         {

                             orderno = YD.order_no,
                             refno = YD.ref_no,
                             style = YD.style

                         }).AsQueryable();

            return query;
        }

        public IList<ProcessOrdDet> GetDataProcessRepEditCheckItemDetails(string TransNo)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetProcessOrdEditChkDetails(TransNo)
                         select new ProcessOrdDet
                         {
                             CTransNo = YD1.RecptNo,
                             CTransId = YD1.RecpMasid,


                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<ProcessOrderAddScreen> GetDataOrdeRefRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<ProcessOrderAddScreen> query = (from cd in entities.Proc_Apparel_GetProcessOrdLoadMainOrdRefDropDown(Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                       select new ProcessOrderAddScreen
                                               {
                                                   orderno = cd.OrdNo,
                                                   refno = cd.RefNo,

                                               }).AsQueryable();
            return query;
        }

        public IQueryable<ProcessOrderAddScreen> GetDataStyleRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<ProcessOrderAddScreen> query = (from cd in entities.Proc_Apparel_GetProcessOrdLoadMainStyleDropDown(Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                       select new ProcessOrderAddScreen
                                                       {



                                                           styleid = cd.styleid,
                                                           style = cd.style,
                                                       }).AsQueryable();
            return query;
        }


        public bool AppUpdateDetData(Process_Ord_Mas objupd, string Mode)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var Upd = entities.Process_Ord_Mas.Where(c => c.processordid == objupd.processordid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Approved = objupd.Approved;
                        Upd.ApprovedBy = objupd.ApprovedBy;
                        Upd.ApproveddateTime = objupd.ApproveddateTime;
                        entities.SaveChanges();

                    }


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-UpdDetData");
                }
            }
            return reserved;
        }


        public bool RevUpdateDetData(Process_Ord_Mas objrevupd, string Mode)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var Upd = entities.Process_Ord_Mas.Where(c => c.processordid == objrevupd.processordid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Approved = objrevupd.Approved;
                        Upd.ApprovedBy = objrevupd.ApprovedBy;
                        Upd.ApproveddateTime = objrevupd.ApproveddateTime;
                        entities.SaveChanges();

                    }


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-UpdDetData");
                }
            }
            return reserved;
        }


        public bool AppClosureDetData(Process_Ord_Mas objrevupd, string Mode)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var Upd = entities.Process_Ord_Mas.Where(c => c.processordid == objrevupd.processordid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Closed = objrevupd.Closed;

                        entities.SaveChanges();

                    }


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessOrder-UpdDetData");
                }
            }
            return reserved;
        }
    }
}
