using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Data.SqlTypes;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace AxonApparel.Repository
{
    public class ProcessReceiptRepository : IProcessReceiptRepository
    {
        ProcessEntities entities = new ProcessEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        string connStr = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;

        public IQueryable<Domain.ProcessReceiptMas> Getprocess(int cmpid, int cmunitid, string ordtype)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadproc(cmpid, cmunitid, ordtype)
                         select new ProcessReceiptMas
                         {

                             processid = YD.ProcessId,
                             process = YD.Process

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReceiptMas> Getprocessor()
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadsupp()
                         select new ProcessReceiptMas
                         {

                             supplierid = YD.SupplierId,
                             supplier = YD.Supplier

                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReceiptMas> Getwrkdiv()
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadwrkdiv()
                         select new ProcessReceiptMas
                         {

                             wrkdivid = YD.WorkDivisionId,
                             wrkdiv = YD.WorkDivision
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.ProcessReceiptMas> Getissueno(int cmpid, int cmunitid, int processid, int processorid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadprocord(cmpid, cmunitid, processid, processorid)
                         select new ProcessReceiptMas
                         {

                             processordid = YD.processordid,
                             processorder = YD.processorder

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessReceiptMas> Loadcolor(int cmpid, int cmunitid, int processid, int processorid)
        {

            var query = (from YD in entities.Proc_Apparel_ProcessRecptloadcolor(cmpid, cmunitid, processid, processorid)
                         select new ProcessReceiptMas
                         {

                             colorid = YD.Colorid,
                             color = YD.color

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessReceiptMas> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed, int colorid, string OrderNo, string ReferNo, int BuyerId)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptLoadaddgrid(cmpid, cmunitid, processid, processorid, ordtype, closed, colorid, OrderNo, ReferNo, BuyerId)
                         select new ProcessReceiptMas
                         {

                             processordid = YD.processordid,
                             processorder = YD.processorder,
                             processor = YD.Processor,
                             proddate = (DateTime)YD.ProcessorDate,
                             ordqty = (decimal)YD.OrderQty,
                             recvdqty = (decimal)YD.Received,
                             bal = (decimal)YD.Bal,
                             companyid = YD.Companyid,
                             company = YD.Company,
                             color = YD.Colorname,
                             colorid = (int)YD.colorid,
                             processid = (int)YD.Processid,
                             process = YD.Process,
                             unitid = (int)YD.companyunitid,
                             unit = YD.CompanyUnit,
                             FinProcess = YD.FinalProcess,
                             processorid = (int)YD.ProcessorId,

                         }).AsQueryable();

            return query;
        }

        public IEnumerable<Domain.ProcessReceiptMas> Loadaddgrid_Barcode(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed, int colorid, string OrderNo, string ReferNo, int BuyerId)
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<Domain.ProcessReceiptMas> lstProcessGrn = new List<Domain.ProcessReceiptMas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_ProcessRecptLoadaddgrid", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@cmpid", SqlDbType.Int).Value = cmpid;
                cmd.Parameters.Add("@cmpunitid", SqlDbType.Int).Value = cmunitid;
                cmd.Parameters.Add("@Processid", SqlDbType.Int).Value = processid;
                cmd.Parameters.Add("@processorid", SqlDbType.Int).Value = processorid;
                cmd.Parameters.Add("@ordtype", SqlDbType.VarChar).Value = ordtype;
                cmd.Parameters.Add("@clsed", SqlDbType.VarChar).Value = closed;
                cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = colorid;
                cmd.Parameters.Add("@orderno", SqlDbType.VarChar).Value = OrderNo;

                cmd.Parameters.Add("@refno", SqlDbType.VarChar).Value = ReferNo;
                cmd.Parameters.Add("@buyerid", SqlDbType.Int).Value = BuyerId;

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.ProcessReceiptMas ProcessGrn = new Domain.ProcessReceiptMas();
                    ProcessGrn.processordid = Convert.ToInt32(rdr["processordid"]);
                    ProcessGrn.processorder = rdr["processorder"].ToString();
                    ProcessGrn.processor = rdr["Processor"].ToString();
                    ProcessGrn.proddate = Convert.ToDateTime(rdr["ProcessorDate"]);
                    ProcessGrn.ordqty = Convert.ToDecimal(rdr["OrderQty"]);
                    ProcessGrn.recvdqty = Convert.ToDecimal(rdr["Received"]);
                    ProcessGrn.bal = Convert.ToDecimal(rdr["bal"]);
                    ProcessGrn.companyid = Convert.ToInt32(rdr["companyid"]);
                    ProcessGrn.company = rdr["company"].ToString();

                    ProcessGrn.color = rdr["Colorname"].ToString();
                    ProcessGrn.colorid = Convert.ToInt32(rdr["colorid"]);
                    ProcessGrn.processid = Convert.ToInt32(rdr["Processid"]);
                    ProcessGrn.process = rdr["Process"].ToString();
                    ProcessGrn.unitid = Convert.ToInt32(rdr["companyunitid"]);
                    ProcessGrn.unit = rdr["CompanyUnit"].ToString();
                    ProcessGrn.FinProcess = rdr["FinalProcess"].ToString();
                    ProcessGrn.processorid = Convert.ToInt32(rdr["ProcessorId"]);

                    lstProcessGrn.Add(ProcessGrn);
                }
                con.Close();
            }
            return lstProcessGrn;
        }

        public IQueryable<ProcessReceiptDet> LoadItmgrid(string pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessOrderLoadItmdettab(pid)
                         select new ProcessReceiptDet
                         {

                             itemid = YD.ItemId,
                             item = YD.Item,
                             color = YD.Color,
                             colorid = YD.Colorid,
                             sizeid = YD.SizeId,
                             size = YD.size,
                             procordid = YD.processordid,
                             processorder = YD.processorder,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.bal,
                             rate = (decimal)YD.rate,
                             sno = YD.processorddetid,
                             Received_qty = 0,
                             ProcessOrdDetid = YD.processorddetid,
                             PlanSizeID = (int)YD.PlanSizeId,
                             Sec_Qty = YD.SecQty,
                             FinSizeID = YD.FinDiaId,
                             FinDia = YD.FSize
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessReceiptJobdet> Loadjobdetgrid(string pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessnOrderLoadJob(pid)
                         select new ProcessReceiptJobdet
                         {

                             Itemid = YD.ItemId,
                             Colorid = YD.Colorid,
                             Sizeid = YD.SizeId,
                             processordid = (int)YD.ProcessOrdid,
                             ProdPrgNo = YD.ProdPrgno,
                             Job_Ord_No = YD.job_ord_no,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.bal,
                             Received_Qty = 0,
                             sno = (int)YD.ProcessJobDetid,
                             ProcessOrdDetid = (int)YD.ProcessOrddetid,
                             ProcessOrdJobDetid = YD.ProcessJobDetid,
                             refno = YD.ref_no,
                             PlanSizeID = (int)YD.PlannedSizeID,
                             Sec_Qty = YD.SecQty,
                         }).AsQueryable();

            return query;
        }


        //public int AddData(Process_Recpt_Mas objEntry)
        //{
        //    var id = entities.Process_Recpt_Mas.Add(objEntry);
        //    entities.SaveChanges();
        //    return id.proc_recpt_masid;
        //}

        public bool AddDetData(Process_Recpt_Mas obj, string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, List<Process_Recpt_Lot> obLotdet, string Mode, int unitmId = 0)
        {
            int Masid = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    int id = 0;
                    var detid = 0;
                    var Jobdetid = 0;

                    //Mas
                    entities.Process_Recpt_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.proc_recpt_masid;

                    //if (objdet.Count > 0)
                    //{
                    //    var Py = entities.UpdateProcessActuals(transno, "A");
                    //    entities.SaveChanges();
                    //}
                    string ordno = "";
                    int styid = 0;
                    var costid = 0;
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Received_qty > 0)
                            {
                                item.Proc_Recpt_Masid = Masid;
                                entities.Process_Recpt_Det.Add(item);
                                entities.SaveChanges();
                                detid = item.Proc_Recpt_Detid;

                                var upd = entities.Proc_Apparel_UpdateProcRecptMarkuprate(item.ProcessOrdId);
                                entities.SaveChanges();

                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.Received_Qty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid && item.ProcessOrdDetid == jobdt.ProcessOrdDetid)
                                        {
                                            jobdt.Proc_Recpt_Masid = Masid;
                                            jobdt.Proc_Recpt_Detid = detid;
                                            entities.Process_Recpt_Jobdet.Add(jobdt);
                                            entities.SaveChanges();
                                            detid = (int)jobdt.Proc_Recpt_Detid;
                                            Jobdetid = jobdt.Proc_Recpt_JobDetid;

                                            var job = entities.Job_Ord_Mas.Where(c => c.Job_Ord_No == jobdt.Job_Ord_No).FirstOrDefault();
                                            if (job != null)
                                            {
                                                ordno = job.Order_No;
                                                styid = (int)job.Styleid;
                                            }
                                            var cstdefnmas = entities.Cost_Defn_Mas.Where(c => c.Order_No == ordno && c.styleid == styid).FirstOrDefault();
                                            if (cstdefnmas != null)
                                            {
                                                costid = cstdefnmas.Cost_Defn_id;

                                            }
                                            var cstdefndet = entities.Cost_Defn_Bom_First.Where(c => c.Cost_Defn_id == costid && c.Itemid == jobdt.Itemid && c.ColorID == jobdt.Colorid && c.SizeID == jobdt.Sizeid).FirstOrDefault();
                                            if (cstdefndet != null)
                                            {
                                                cstdefndet.Actual_Qty = item.Received_qty;
                                                cstdefndet.Actual_Rate = (decimal)item.rate;

                                            }


                                        }
                                        if (obLotdet != null && obLotdet.Count > 0)
                                        {
                                            foreach (var itemL in obLotdet)
                                            {
                                                if (itemL.lotquantity > 0 && itemL.proc_ord_jobdetid == jobdt.ProcessOrdJobDetid)
                                                {
                                                    int Pgc = entities.Proc_Apparel_InsertProcRecptLot(itemL.lotno, itemL.lotquantity, itemL.LotSecQty, detid, Jobdetid, itemL.proc_ord_jobdetid);
                                                    entities.SaveChanges();

                                                }
                                            }
                                        }
                                    }
                                }
                                entities.SaveChanges();
                            }
                        }

                    }


                    ///Insert into Itemstock
                    var Pg1 = entities.Proc_Apparel_GetProcessReceiptStockOrderInsert(transno);
                    entities.SaveChanges();


                    if (objdet.Count > 0)
                    {
                        var Py = entities.UpdateProcessActuals(transno, "A");
                        entities.SaveChanges();
                    }


                

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessRecpt-AddDetData");
                }
            }
            return reserved;
        }


        public IQueryable<ProcessReceiptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, string orderno, string refno, int? styleid, int? processorid,int Userid)
        {

             string UserGroup = entities.Proc_Apparel_GetUserGroupName(Userid).FirstOrDefault().GroupName;

                string Group = String.IsNullOrEmpty(UserGroup) ? "" : UserGroup;

                if (Group != "AUDIT")
                {
                    var query = (from YD in entities.Proc_Apparel_ProcessRecptLoadMainGrid(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate, orderno, refno, styleid, processorid)
                                 select new ProcessReceiptMas
                                 {
                                     company = YD.company,
                                     companyid = YD.Companyid,
                                     buyerid = YD.buyerid,
                                     buyer = YD.buyer,
                                     unitid = YD.Id,
                                     unit = YD.CompanyUnit,
                                     proc_recpt_masid = YD.ProcessRecptMasid,
                                     processordid = YD.processordid,
                                     processorder = YD.processorder,
                                     Recpt_Ref_no = YD.Recpt_Ref_no,
                                     proc_recpt_no = YD.proc_recpt_no,
                                     proc_recpt_date = (DateTime)YD.ProcessRecptdate,
                                     processid = YD.Processid,
                                     process = YD.Process,
                                     supplierid = YD.SupplierId,
                                     supplier = YD.Supplier,
                                     jobordno = YD.Job_ord_no,
                                     type = YD.type,
                                     remarks = YD.remarks,
                                     Recpt_Ref_date = (DateTime)YD.Recpt_Ref_date,
                                     ProcQltyno = YD.Proc_Qlty_no,
                                     chkIns = YD.ChkIns,
                                     chkdebqty = YD.ChkDebitQty,
                                     ChkAccPos = (int)YD.ChkAccPs,
                                     orderno = YD.Order_No,
                                     refno = YD.Ref_No,
                                     styleid = YD.StyleId,
                                     style = YD.Style,
                                     ParentUnitid = YD.Parentstoreid,
                                     Storetype = YD.StoreType,
                                     StoreName = YD.StoreName,
                                     StoreUnitID = YD.StoreUnitId,

                                 }).AsQueryable();

                    return query;
                }
                else {
                    var query = (from YD in entities.Proc_Apparel_ProcessRecptLoadMainGridAudit(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate, orderno, refno, styleid, processorid)
                                 select new ProcessReceiptMas
                                 {
                                     company = YD.company,
                                     companyid = YD.Companyid,
                                     buyerid = YD.buyerid,
                                     buyer = YD.buyer,
                                     unitid = YD.Id,
                                     unit = YD.CompanyUnit,
                                     proc_recpt_masid = YD.ProcessRecptMasid,
                                     processordid = YD.processordid,
                                     processorder = YD.processorder,
                                     Recpt_Ref_no = YD.Recpt_Ref_no,
                                     proc_recpt_no = YD.proc_recpt_no,
                                     proc_recpt_date = (DateTime)YD.ProcessRecptdate,
                                     processid = YD.Processid,
                                     process = YD.Process,
                                     supplierid = YD.SupplierId,
                                     supplier = YD.Supplier,
                                     jobordno = YD.Job_ord_no,
                                     type = YD.type,
                                     remarks = YD.remarks,
                                     Recpt_Ref_date = (DateTime)YD.Recpt_Ref_date,
                                     ProcQltyno = YD.Proc_Qlty_no,
                                     chkIns = YD.ChkIns,
                                     chkdebqty = YD.ChkDebitQty,
                                     ChkAccPos = (int)YD.ChkAccPs,
                                     orderno = YD.Order_No,
                                     refno = YD.Ref_No,
                                     styleid = YD.StyleId,
                                     style = YD.Style,
                                     ParentUnitid = YD.Parentstoreid,
                                     Storetype = YD.StoreType,
                                     StoreName = YD.StoreName,
                                     StoreUnitID = YD.StoreUnitId,

                                 }).AsQueryable();

                    return query;
                
                }
        }


        public IQueryable<ProcessReceiptDet> LoadEditItmgrid(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptItemdetEdit(pid)
                         select new ProcessReceiptDet
                         {

                             itemid = YD.Itemid,
                             item = YD.Item,
                             color = YD.Color,
                             colorid = YD.Colorid,
                             sizeid = YD.Sizeid,
                             size = YD.Size,
                             procordid = (int)YD.processordid,
                             processorder = YD.processorder,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.Bal + YD.Received,
                             rate = YD.Rate,
                             sno = YD.processorddetid,
                             Received_qty = YD.Received,
                             Proc_Recpt_Detid = YD.Proc_Recpt_Detid,
                             ProcessOrdDetid = YD.processorddetid,
                             PlanSizeID = (int)YD.PlanSizeid,
                             Sec_Qty = YD.SecQty,
                             FinSizeID = YD.FinDiaId,
                             FinDia = YD.FSize,
                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessReceiptJobdet> LoadEditjobdetgrid(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptJobdetEdit(pid)
                         select new ProcessReceiptJobdet
                         {

                             Itemid = (int)YD.Itemid,
                             Colorid = (int)YD.Colorid,
                             Sizeid = (int)YD.Sizeid,
                             processordid = (int)YD.ProcessOrdId,
                             ProdPrgNo = YD.ProdPrgNo,
                             Job_Ord_No = YD.Job_Ord_No,
                             orderqty = (decimal)YD.OrderQty,
                             bal = (decimal)YD.bal + (decimal)YD.Received_Qty,
                             Received_Qty = YD.Received_Qty,
                             sno = (int)YD.ProcessOrdDetid,
                             ProcessOrdDetid = (int)YD.ProcessOrdDetid,
                             ProcessOrdJobDetid = (int)YD.ProcessOrdJobDetid,
                             Proc_Recpt_Detid = (int)YD.Proc_Recpt_Detid,
                             Proc_Recpt_JobDetid = YD.Proc_Recpt_JobDetid,
                             refno = YD.ref_no,
                             PlanSizeID = YD.PlanSizeId,
                             Sec_Qty = YD.Sec_Qty,
                             CheckType = YD.CheckType,

                         }).AsQueryable();

            return query;
        }

        public IQueryable<ProcessReceiptDet> ChkDC(string recpt, int pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptDCChk(recpt, pid)
                         select new ProcessReceiptDet
                         {

                             recptno = YD.Recpt_Ref_no,
                             Proc_Recpt_Masid = (int)YD.Proc_Recpt_Masid

                         }).AsQueryable();

            return query;
        }


        public bool UpdateData(Process_Recpt_Mas objupd)
        {
            try
            {
                var result = false;
                var Upd = entities.Process_Recpt_Mas.Where(c => c.proc_recpt_masid == objupd.proc_recpt_masid).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.proc_recpt_masid = objupd.proc_recpt_masid;
                    Upd.proc_recpt_no = objupd.proc_recpt_no;
                    Upd.proc_recpt_date = objupd.proc_recpt_date;
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


        public bool DeleteDetData(string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet,List<Process_Recpt_Lot> obDelLotjobdet, string Mode, int unitmId = 0)
        {
            int id = 0;
            int ordid = 0;
            bool reserved = false;

            string ordno = "";
            int styid = 0;
            var costid = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //if (objdet != null && objdet.Count > 0)
                    //{
                    //    foreach (var it in objdet)
                    //    {
                    //        var Py = entities.Proc_Apparel_ProcessRecptUpdRecvdqty6(it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate);
                    //        //var result = this.entities.Database.SqlQuery<string>("exec Proc_Apparel_ProdRecptUpdRecvdqty3 {0}, {1}, {2}, {3}, {4},{5}", it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate).FirstOrDefault();

                    //        entities.SaveChanges();
                    //    }

                    //}
                    //delete the itemstock

                    var upd = entities.Proc_Apparel_GetPRNStockDelete(transno);
                    entities.SaveChanges();
                                  

                    if (objdet.Count > 0)
                    {
                        var Py = entities.UpdateProcessActuals(transno, "D");
                        entities.SaveChanges();
                    }


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Received_qty > 0)
                            {

                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.Received_Qty > 0)
                                    {


                                        var job = entities.Job_Ord_Mas.Where(c => c.Job_Ord_No == jobdt.Job_Ord_No).FirstOrDefault();
                                        if (job != null)
                                        {
                                            ordno = job.Order_No;
                                            styid = (int)job.Styleid;
                                        }
                                        var cstdefnmas = entities.Cost_Defn_Mas.Where(c => c.Order_No == ordno && c.styleid == styid).FirstOrDefault();
                                        if (cstdefnmas != null)
                                        {
                                            costid = cstdefnmas.Cost_Defn_id;

                                        }
                                        var cstdefndet = entities.Cost_Defn_Bom_First.Where(c => c.Cost_Defn_id == costid && c.Itemid == jobdt.Itemid && c.ColorID == jobdt.Colorid && c.SizeID == jobdt.Sizeid).FirstOrDefault();
                                        if (cstdefndet != null)
                                        {
                                            cstdefndet.Actual_Qty = 0;
                                            cstdefndet.Actual_Rate = 0;

                                        }
                                    }
                                }
                                entities.SaveChanges();
                            }
                        }
                    }

                    if (objdet != null && objdet.Count > 0)
                    {
                        //foreach (var it in objdet)
                        //{
                        var Py = entities.Proc_Apparel_ProcessRecptDelItmstk(transno);
                        entities.SaveChanges();
                        //}
                    }
                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.Proc_Recpt_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }


                    if (obDelLotjobdet != null && obDelLotjobdet.Count > 0)
                    {


                        int Pgc = entities.Proc_Apparel_ProcRecptDeleteLot(transno);
                        entities.SaveChanges();

                        
                    }


                    var deletedet = entities.Process_Recpt_Jobdet.Where(d => d.Proc_Recpt_Masid == id).ToList<Process_Recpt_Jobdet>();

                    deletedet.ForEach(c => entities.Process_Recpt_Jobdet.Remove(c));
                    entities.SaveChanges();

                    ordid = id;
                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.Proc_Recpt_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedetad = entities.Process_Recpt_Det.Where(d => d.Proc_Recpt_Masid == id).ToList<Process_Recpt_Det>();

                    deletedetad.ForEach(c => entities.Process_Recpt_Det.Remove(c));
                    entities.SaveChanges();

                    var Mas = entities.Process_Recpt_Mas.Where(u => u.proc_recpt_masid == ordid);

                    foreach (var v in Mas)
                    {
                        entities.Process_Recpt_Mas.Remove(v);
                    }
                    entities.SaveChanges();





                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessRecpt-DeleteDetData");
                }
            }
            return reserved;
        }


        public bool UpdDetData(Process_Recpt_Mas objupd, string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, List<Process_Recpt_Lot> objobLotdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;

            int id = 0;
            var detid = 0;
            var Jobdetid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //delete the itemstock

                    var upd = entities.Proc_Apparel_GetPRNStockDelete(transno);
                    entities.SaveChanges();
                                  



                    var Upd = entities.Process_Recpt_Mas.Where(c => c.proc_recpt_masid == objupd.proc_recpt_masid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.proc_recpt_masid = objupd.proc_recpt_masid;
                        Upd.proc_recpt_no = objupd.proc_recpt_no;
                        Upd.proc_recpt_date = objupd.proc_recpt_date;
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

                    if (objdet.Count > 0)
                    {
                        var Py = entities.UpdateProcessActuals(transno, "D");
                        entities.SaveChanges();
                    }


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var it in objdet)
                        {
                            var Py = entities.Proc_Apparel_ProcessRecptUpdRecvdqty(it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Proc_Recpt_Masid, it.rate, it.Proc_Recpt_Detid, it.Sec_Qty);
                            //var result = this.entities.Database.SqlQuery<string>("exec Proc_Apparel_ProdRecptUpdRecvdqty3 {0}, {1}, {2}, {3}, {4},{5}", it.Received_qty, it.itemid, it.colorid, it.sizeid, it.Prod_Recpt_Masid, it.rate).FirstOrDefault();

                            entities.SaveChanges();
                        }

                    }

                    //if (objdet != null && objdet.Count > 0)
                    //{
                    //    //foreach (var it in objdet)
                    //    //{
                    //    var Py = entities.Proc_Apparel_ProcessRecptDelItmstk(transno);
                    //    entities.SaveChanges();
                    //    //}
                    //}

                    if (objobdet != null && objobdet.Count > 0)
                    {
                        foreach (var item in objobdet)
                        {
                            id = (int)item.Proc_Recpt_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }


                    if (objobLotdet != null && objobLotdet.Count > 0)
                    {
                        int Pgc = entities.Proc_Apparel_ProcRecptDeleteLot(transno);
                        entities.SaveChanges();
                    }


                    var deletedet = entities.Process_Recpt_Jobdet.Where(d => d.Proc_Recpt_Masid == id).ToList<Process_Recpt_Jobdet>();

                    deletedet.ForEach(c => entities.Process_Recpt_Jobdet.Remove(c));
                    entities.SaveChanges();

                  


                    string ordno = "";
                    int styid = 0;
                    var costid = 0;


                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Received_qty > 0)
                            {
                                detid = item.Proc_Recpt_Detid;
                                //odetid = 0;
                                foreach (var jobdt in objobdet)
                                {
                                    //if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid)
                                    //{
                                    if (jobdt.Received_Qty > 0)
                                    {
                                        if (item.itemid == jobdt.Itemid && item.colorid == jobdt.Colorid && item.sizeid == jobdt.Sizeid && item.ProcessOrdDetid == jobdt.ProcessOrdDetid)
                                        {
                                            jobdt.Proc_Recpt_Detid = detid;
                                            entities.Process_Recpt_Jobdet.Add(jobdt);
                                            entities.SaveChanges();
                                            detid = (int)jobdt.Proc_Recpt_Detid;
                                            Jobdetid = jobdt.Proc_Recpt_JobDetid;

                                            var job = entities.Job_Ord_Mas.Where(c => c.Job_Ord_No == jobdt.Job_Ord_No).FirstOrDefault();
                                            if (job != null)
                                            {
                                                ordno = job.Order_No;
                                                styid = (int)job.Styleid;
                                            }
                                            var cstdefnmas = entities.Cost_Defn_Mas.Where(c => c.Order_No == ordno && c.styleid == styid).FirstOrDefault();
                                            if (cstdefnmas != null)
                                            {
                                                costid = cstdefnmas.Cost_Defn_id;

                                            }
                                            var cstdefndet = entities.Cost_Defn_Bom_First.Where(c => c.Cost_Defn_id == costid && c.Itemid == jobdt.Itemid && c.ColorID == jobdt.Colorid && c.SizeID == jobdt.Sizeid).FirstOrDefault();
                                            if (cstdefndet != null)
                                            {
                                                cstdefndet.Actual_Qty = item.Received_qty;
                                                cstdefndet.Actual_Rate = (decimal)item.rate;

                                            }
                                        }

                                        if (objobLotdet != null && objobLotdet.Count > 0)
                                        {
                                            foreach (var itemL in objobLotdet)
                                            {
                                                if (itemL.lotquantity > 0 && itemL.proc_ord_jobdetid == jobdt.ProcessOrdJobDetid)
                                                {
                                                    int Pgc = entities.Proc_Apparel_InsertProcRecptLot(itemL.lotno, itemL.lotquantity, itemL.LotSecQty, detid, Jobdetid, itemL.proc_ord_jobdetid);
                                                    entities.SaveChanges();

                                                }
                                            }
                                        }
                                    }
                                }
                                entities.SaveChanges();
                            }
                        }
                    }

                    foreach (var item in objdet)
                    {
                        int oid = (int)item.ProcessOrdId;
                        bool UCMR = MarkUpRateRecptUpdation(oid);
                    }


                    if (objdet.Count > 0)
                    {
                        var Py = entities.UpdateProcessActuals(transno, "A");
                        entities.SaveChanges();
                    }

                    ///Insert into Itemstock
                    var Pg1 = entities.Proc_Apparel_GetProcessReceiptStockOrderInsert(transno);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessRecpt-UpdDetData");
                }
            }
            return reserved;
        }


        public bool MarkUpRateRecptUpdation(int ProcOrderId)
        {
            var upd = entities.Proc_Apparel_UpdateProcRecptMarkuprate(ProcOrderId);
            return true;
        }


        public IQueryable<ProcessReceiptJobdet> LoadMainOrderdet(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptLoadMaindet(pid)
                         select new ProcessReceiptJobdet
                         {

                             orderno = YD.order_no,
                             refno = YD.ref_no,
                             style = YD.style

                         }).AsQueryable();

            return query;
        }


        public IQueryable<ProcessReceiptJobdet> LoadMainOrderstkdet(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptLoadMainstkdet(pid)
                         select new ProcessReceiptJobdet
                         {

                             transno = YD.TransNo

                         }).AsQueryable();

            return query;
        }


        public Process_Recpt_Mas CheckRefRep(string DCNo)
        {
            return entities.Process_Recpt_Mas.Where(c => c.Recpt_Ref_no == DCNo).FirstOrDefault();
        }


        public IQueryable<ProcessReceiptMas> GetDataOrdeRefRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<ProcessReceiptMas> query = (from cd in entities.Proc_Apparel_GetProcessRecptLoadMainOrdRefDropDown(Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                   select new ProcessReceiptMas
                                                       {
                                                           orderno = cd.OrdNo,
                                                           refno = cd.RefNo,

                                                       }).AsQueryable();
            return query;
        }

        public IQueryable<ProcessReceiptMas> GetDataStyleRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<ProcessReceiptMas> query = (from cd in entities.Proc_Apparel_GetProcessRecptLoadMainStyleDropDown(Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                   select new ProcessReceiptMas
                                                   {
                                                       styleid = cd.styleid,
                                                       style = cd.style,
                                                   }).AsQueryable();
            return query;
        }


        public IQueryable<ProcessReceiptLot> GetEditLotdetgrid(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_ProcessRecptLotJobdetEdit(pid)
                         select new ProcessReceiptLot                         {

                             LotNo = YD.lotno,
                             LotQty = (decimal)YD.lotquantity,
                             LotSecQty = (decimal)YD.LotSecQty,
                             ProcessJobOrdId = (int)YD.proc_ord_jobdetid,
                             prod_recpt_Jobdetid = (int)YD.proc_recpt_jobdetid,
                             prod_recpt_detid = (int)YD.proc_recpt_detid,
                             prod_recpt_lotid = (int)YD.proc_recpt_lotid,
                         }).AsQueryable();

            return query;
        }
    }
}
