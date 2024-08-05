using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Sql;
using System.Data.SqlClient;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Transactions;
using System.Data.Entity.Validation;

namespace AxonApparel.Repository
{
    public class JobReceiptRepository : IJobReceiptRepository
    {
        ProductionEntities entities = new ProductionEntities();

        public IList<JobReceiptMain> GetMainData(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string dcno, string refno, int styleid, string entryno, string fromdate, string todate, string UnitorOther)
        {
            var query = (from a in entities.Proc_Apparel_GetJobOrderReceiptMainDetails(compid, orderno, jobordno, jobrecptno, supplierid, dcno, refno, styleid, entryno, fromdate == null ? "" : fromdate.ToString(), todate == null ? "" : todate.ToString(),UnitorOther)
                         select new JobReceiptMain
                         {
                             JobReceiptId = a.JobRecptId,
                             JobRecptno=a.JobRecptNo,
                             JobRecptDate=a.JobRecptDate,
                             Jobno = a.Job_ord_no,
                             Orderno = a.Order_No,
                             Style=a.Style,
                             DcNo=a.DcNo,                             
                             StyleId=(int)a.styleid,
                             Company=a.Company,
                             CompanyId = (int)a.Companyid,
                             Refno=a.Ref_no,
                             Supplier=a.Supplier,
                             SupplierId=a.SupplierId,
                             JobQty=(decimal)a.JobQty,
                             RecptQty=(decimal)a.JobRecptQty,
                             Quality=a.QualityMade,                             
                         }).AsQueryable();

            return query.ToList();
        }

        //Grid Details of second page
        public IList<JobReceiptMain> GetSndGridDetails(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string UnitorOther, string refno)
        {
            var query = (from a in entities.Proc_Apparel_GetJobOrderReceiptAddDetail(compid, orderno, supplierid, refno, jobordno,UnitorOther)
                         select new JobReceiptMain
                         {                             
                             Jobno = a.JOb_ord_no,
                             Orderno = a.Order_no,
                             Style = a.Style,
                             StyleId=a.styleid,
                             SupplierId=(int)a.SupplierId,
                             Refno = a.Ref_no,
                             Supplier = a.Supplier,                             
                             Quantity = (decimal)a.Quantity,
                             BalQty = (decimal)a.BalQty,                             
                         }).AsQueryable();

            return query.ToList();
        }

        //Grid Details of third page
        public IList<JobReceiptMain> GetthirdGridDetails(string jobordno,string UnitorOther)
        {
            var query = (from a in entities.Proc_Apparel_GetJobOrderReceiptEntryDetail(jobordno, UnitorOther)
                         select new JobReceiptMain
                         {
                             Sno=(int)a.Sno,
                             SupplierId=(int)a.Supplierid,
                             CompanyId=a.Companyid,
                             Company=a.Company,
                             StyleId=a.Styleid,
                             ItemId=a.Itemid,
                             Lotno=a.Lotno,
                             Despatch=a.Despatch,
                             ColorId=a.Colorid,
                             SizeId=a.Sizeid,
                             Item=a.Item,
                             Color=a.Color,
                             Size=a.Size,
                             Rate=(decimal)a.Rate,
                             Jobno = a.Job_ord_No,
                             Orderno = a.Order_no,
                             Style = a.Style,
                             Refno = a.Ref_no,
                             Supplier = a.Supplier,
                             JobQty = (decimal)a.Quantity,
                             BalQty = (decimal)a.BalQty,
                             RecptQty=a.RecptQty,
                             RejQty=a.RejQty
                         }).AsQueryable();

            return query.ToList();
        }

        //Grid Details of third page on Edit Mode
        public IList<JobReceiptMain> GetthirdGridDetailsonEditMode(int JobRecptId)
        {
            var query = (from a in entities.Proc_Apparel_GetJobReceiptEditMode(JobRecptId)
                         select new JobReceiptMain
                         {
                             Sno = (int)a.Sno,
                             SupplierId = (int)a.Supplierid,
                             CompanyId = a.companyid,
                             JobRecptno=a.JobRecptNo,
                             Company = a.Company,
                             DcNo=a.Dcno,
                             Destination=a.destination,
                             StyleId = a.Styleid,
                             ItemId = a.Itemid,
                             Lotno =(a.LotNo),
                             DespatchNo = a.DispatchNo,
                             ColorId = a.Colorid,
                             SizeId = a.Sizeid,
                             Item = a.Item,
                             Color = a.Color,
                             Size = a.Size,
                             ShipModeId=a.ShipmentMode,
                             SystemId=a.SystemID,
                             BuyOrdShip=a.Buy_Ord_Ship,
                             ShipType=a.ShipmentType,
                             Rate = (decimal)a.Rate,
                             Jobno = a.Job_Ord_No,
                             Orderno = a.Order_no,
                             Style = a.Style,
                             Refno = a.Ref_no,
                             Supplier = a.Supplier,
                             JobQty = (decimal)a.Quantity,
                             BalQty = (decimal)a.BALQTY,
                             RecptQty = a.RecptQty,
                             RejQty = a.RejQty,
                             Remarks=a.Remarks,
                             JobRecptDetid=a.JobrecptDetId,
                             InvRefNo=a.InvRefNo,
                             DocRefNo=a.DocRefNo,
                             ParentUnitid = a.Parentstoreid,
                             Storetype = a.StoreType,
                             StoreName = a.StoreName,
                             StoreUnitID = a.StoreUnitId,

                         }).AsQueryable();

            return query.ToList();
        }

        //Grid Details of third page
        public IList<JobReceiptMain> GetthirdGridDespatchDetails(string strOrderno)
        {
            var query = (from a in entities.Proc_Apparel_GetJobOrderReceiptEntryDespatchDetail(strOrderno)
                         select new JobReceiptMain
                         {
                            Sno = (int)a.Sno,
                            DespatchNo=a.DespatchNo,
                            ShipNo=a.buy_ord_ship,
                            ShipMode=a.mode_of_shipment,
                            ShipModeId=a.mode_of_shipmentid,
                            System=a.system,
                            SystemId=a.systemid,
                            Destination=a.destination
                         }).AsQueryable();

            return query.ToList();
        }

        public bool AddData(JobReceiptMain objAdd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var JobRecptMas = new Repository.Job_Recpt_Mas();
                    var JobRecptdet = new List<Repository.Job_Recpt_Det>();

                    JobRecptMas.JobRecptNo = objAdd.JobRecptno;
                    JobRecptMas.JobRecptDate = objAdd.JobRecptDate;
                    JobRecptMas.DcNo = objAdd.DcNo;
                    JobRecptMas.Job_Ord_No = objAdd.Jobno;
                    JobRecptMas.DcDate = objAdd.DcDate;
                    JobRecptMas.SupplierId = objAdd.SupplierId;
                    JobRecptMas.Unit_Or_Other = objAdd.UnitorOther;
                    JobRecptMas.Companyid = objAdd.CompanyId;
                    JobRecptMas.Remarks = objAdd.Remarks;
                    JobRecptMas.Order_No = objAdd.Orderno;
                    JobRecptMas.styleid = objAdd.StyleId;
                    JobRecptMas.DispatchNo = objAdd.DespatchNo;
                    JobRecptMas.Buy_Ord_Ship = objAdd.BuyOrdShip;
                    JobRecptMas.ShipmentMode = objAdd.ShipModeId;
                    JobRecptMas.SystemID = objAdd.SystemId;
                    JobRecptMas.DocRefNo = objAdd.DocRefNo;
                    JobRecptMas.DocRefDate = objAdd.DocRefDate;
                    JobRecptMas.InvRefNo = objAdd.InvRefNo;
                    JobRecptMas.InvRefDate = objAdd.InvRefDate;
                    JobRecptMas.ShipmentType = objAdd.ShipType;
                    JobRecptMas.CreatedBy = objAdd.CreatedBy;
                    JobRecptMas.Tostoreid = objAdd.StoreUnitID;
                    
                    entities.Job_Recpt_Mas.Add(JobRecptMas);
                    entities.SaveChanges();

                    if (objAdd.JobRecptDet != null && objAdd.JobRecptDet.Count > 0)
                    {
                        foreach (var item in objAdd.JobRecptDet)
                        {
                            if (item.RecptQty > 0)
                            {
                                JobRecptdet.Add(new Repository.Job_Recpt_Det
                                {
                                    JobRecptId = JobRecptMas.JobRecptId,
                                    ItemId = item.ItemId,
                                    ColorId = item.ColorId,
                                    SizeId = item.SizeId,
                                    LotNo = item.LotNo,
                                    RecptQty = item.RecptQty,
                                    SecQty = item.SecQty,
                                    InvoiceQty = item.InvoiceQty,
                                    Rate=item.Rate,
                                    DespatchQty=item.DespatchQty,
                                    RejQty=item.RejQty
                                });
                            }
                        }
                    }

                    foreach (var shiplst in JobRecptdet)
                    {
                        entities.Job_Recpt_Det.Add(shiplst);
                    }
                    entities.SaveChanges();

                    //Update Job_Ord_Sum and some tables
                    var updatetbles = entities.Proc_Apparel_UpdateStockofJobOrderReceptOnAddMode(objAdd.Jobno, objAdd.Orderno, objAdd.JobRecptno, objAdd.BuyOrdShip, objAdd.StyleId, "A");
                    entities.SaveChanges();

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool UpdateData(JobReceiptMain objUpd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var postdespatchstckdel= entities.Sp_PostDispatchStock(objUpd.JobRecptno,"D","B");

                    var despatchmas = entities.DespatchMas.Where(f => f.Order_No == objUpd.Orderno && f.Buy_Ord_Ship == objUpd.BuyOrdShip && f.StyleId == objUpd.StyleId).FirstOrDefault();
                    if (despatchmas != null)
                    {
                        var despatchdet = entities.DespatchDet.Where(d => d.DespatchId == despatchmas.DespatchId).ToList();
                        foreach (var y in despatchdet)
                        {
                            y.DispatchQty = 0;
                        }
                        entities.SaveChanges();

                        //delete DespatchStock Many Rows table
                        var DStck = entities.DespatchStock.Where(c => c.DespatchId == despatchmas.DespatchId).ToList();
                        if (DStck != null)
                        {
                            var deletedespatchtock = entities.DespatchStock.Where(d => d.DespatchId == despatchmas.DespatchId).ToList<DespatchStock>();
                            deletedespatchtock.ForEach(c => entities.DespatchStock.Remove(c));
                            entities.SaveChanges();
                        }
                    }

                    //Update Job_Recpt_Mas
                    var App = entities.Job_Recpt_Mas.Where(c => c.JobRecptId == objUpd.JobReceiptId).FirstOrDefault();
                    if (App != null)
                    {
                        App.Remarks = objUpd.Remarks;
                        App.DcNo = objUpd.DcNo; 
                        App.JobRecptDate = objUpd.JobRecptDate;
                        App.Tostoreid = objUpd.StoreUnitID;
                    }
                    entities.SaveChanges();

                    //Update Job_Recpt_Det
                    var jobrecptdet = entities.Job_Recpt_Det.Where(c => c.JobRecptId == objUpd.JobReceiptId).ToList();
                    if (jobrecptdet != null)
                    {
                        foreach (var w in jobrecptdet)
                        {
                            foreach (var g in objUpd.JobRecptDet)
                            {
                                if (w.ItemId == g.ItemId && w.ColorId == g.ColorId && w.SizeId == g.SizeId)
                                {
                                    w.LotNo = g.LotNo;
                                    w.RecptQty = g.RecptQty;
                                    w.Rate = g.Rate;                                    
                                }
                            }
                        }
                        entities.SaveChanges();
                    }

                    //Insert new record
                    var ItmList = new List<Job_Recpt_Det>();
                    if (objUpd.JobRecptDet != null && objUpd.JobRecptDet.Count > 0)
                    {
                        foreach (var item in objUpd.JobRecptDet)
                        {
                            if (item.JobRecptDetId==0 &&  item.RecptQty > 0)
                            {
                                ItmList.Add(new Repository.Job_Recpt_Det
                                {
                                    JobRecptId = objUpd.JobReceiptId,
                                    ItemId = item.ItemId,
                                    ColorId = item.ColorId,
                                    SizeId = item.SizeId,
                                    LotNo = item.LotNo,
                                    RecptQty = item.RecptQty,
                                    SecQty = item.SecQty,
                                    InvoiceQty = item.InvoiceQty,
                                    Rate = item.Rate,
                                    DespatchQty = item.DespatchQty,
                                    RejQty = item.RejQty
                                });
                            }
                        }
                    }

                    foreach (var shiplst in ItmList)
                    {
                        entities.Job_Recpt_Det.Add(shiplst);
                    }
                    entities.SaveChanges();


                    var updrecdet = entities.Proc_Apparel_UpdateRecptDetails(objUpd.Jobno, objUpd.JobRecptno, objUpd.Orderno, objUpd.BuyOrdShip, objUpd.StyleId);
                    entities.SaveChanges();

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool DeleteJobReceipt(int id)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    string JobOrderNo = null, JobReceiptNo = null, OrderNo = null, BuyOrdShip = null;
                    int Styleid=0,Despatchid = 0;
                     
                    var result = false;
                    var jobrecpt = entities.Job_Recpt_Mas.Where(j => j.JobRecptId == id).FirstOrDefault();
                    if (jobrecpt != null)
                    {
                        JobOrderNo = jobrecpt.Job_Ord_No;
                        JobReceiptNo = jobrecpt.JobRecptNo;
                        OrderNo = jobrecpt.Order_No;
                        Styleid = (int)jobrecpt.styleid;
                        BuyOrdShip = jobrecpt.Buy_Ord_Ship;
                    }

                    var despatchmas = entities.DespatchMas.Where(j => j.Order_No == OrderNo && j.StyleId==Styleid && j.Buy_Ord_Ship==BuyOrdShip).FirstOrDefault();

                    var UpdateDespatchStock = entities.Sp_PostDispatchStock(jobrecpt.JobRecptNo, "D", "B");

                    if (despatchmas != null)
                    {
                        Despatchid = despatchmas.DespatchId;
                    }

                    ////delete DespatchStock Many Rows table
                    //var DStck = entities.DespatchStock.Where(c => c.DespatchId == Despatchid).ToList();
                    //if (DStck != null)
                    //{
                    //    var deletedespatchtock = entities.DespatchStock.Where(d => d.DespatchId == Despatchid).ToList<DespatchStock>();
                    //    deletedespatchtock.ForEach(c => entities.DespatchStock.Remove(c));
                    //    entities.SaveChanges();
                    //}

                    //delete Job_Recpt_Det Many Rows table
                    var JRDet = entities.Job_Recpt_Det.Where(c => c.JobRecptId == id).ToList();
                    if (JRDet != null)
                    {
                        var deletedespatchDet = entities.Job_Recpt_Det.Where(d => d.JobRecptId == id).ToList<Job_Recpt_Det>();
                        deletedespatchDet.ForEach(c => entities.Job_Recpt_Det.Remove(c));
                        entities.SaveChanges();
                    }

                    //delete Job_Recpt_Mas Many Rows table
                    var JRMas = entities.Job_Recpt_Mas.Where(c => c.JobRecptId == id).ToList();
                    if (JRMas != null)
                    {
                        var deletedespatchMas = entities.Job_Recpt_Mas.Where(d => d.JobRecptId == id).ToList<Job_Recpt_Mas>();
                        deletedespatchMas.ForEach(c => entities.Job_Recpt_Mas.Remove(c));
                        entities.SaveChanges();
                    }

                    //Update and Delete stock in Despatch table...
                    var JRDdel = entities.Proc_Apparel_DeleteJobRecept(JobOrderNo, JobReceiptNo, Despatchid, OrderNo, Styleid, BuyOrdShip);
                    entities.SaveChanges();

                    //The Transaction will be completed
                    txscope.Complete();
                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }
    }
}
