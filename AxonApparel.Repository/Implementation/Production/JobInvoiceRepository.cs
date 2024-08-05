using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class JobInvoiceRepository : IJobInvoiceRepository
    {
        ProductionEntities entities = new ProductionEntities();

        public IQueryable<Domain.JobInvoice> Loadgrid(int cmpid, int suppid, string jobordno, int recptid, string recptno, string rrefno, string refno, string orderno)
        {
            var query = (from YD in entities.Proc_Apparel_JobInvoiceLoadaddgrid(cmpid, suppid, jobordno, recptid, recptno, rrefno, refno, orderno)
                         select new JobInvoice
                         {
                             cmpid = (int)YD.CompanyId,
                             cmp = YD.Company,
                             suppid = YD.SupplierId,
                             supp = YD.Supplier,
                             ordno = YD.Order_No,
                             recptno = YD.JobrecptNo,
                             refno = YD.Job_Order_ref,
                             dcdate = YD.Dcdate,
                             dcno = YD.Dcno,
                             jobrecptid = YD.JobRecptId,
                             jobordno = YD.Job_Ord_No,
                             jobrepctdate = YD.JobRecptDate,
                             jobchk = 0,
                             UnitorOther = YD.Unit_Or_Other
                         }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.JobInvoiceDetail> ThirdPagHeader(string RecptId)
        {
            var query = (from ivd in entities.Proc_Apparel_GetJobInvGRNHeaderInfo(RecptId)
                         select new JobInvoiceDetail
                         {
                             companyid = (int)ivd.Companyid,
                             company = ivd.Company,
                             UnitorOther = ivd.Unit_Or_Other,
                             supplierid = ivd.Supplierid,
                             supplier = ivd.Supplier,
                         }).AsQueryable();
            return query;
        }

        //Add Mode
        public IQueryable<Domain.GrnInvDet> ThirdPagFirstGrid(string RecptId)
        {
            var query = (from ivd in entities.Proc_Apparel_GetJobInvGRNInfo(RecptId)
                         select new GrnInvDet
                         {
                             Sno = Convert.ToInt16(ivd.Sno),
                             jobrecptid = (int)ivd.JobRecptId,
                             DCNo = ivd.Dcno,
                             JobOrdNo = ivd.JobOrderNo,
                             JobRecptDate = ivd.JobRecptDate,
                             JobRecptNo = ivd.JobRecptNo,
                             chksel = 0
                         }).AsQueryable();
            return query;
        }

        //Edit Mode
        public IQueryable<Domain.GrnInvDet> ThirdPagFirstGridforEdit(int JobInvId)
        {
            var query = (from ivd in entities.Proc_Apparel_GetJobInvGRNInfoforEdit(JobInvId)
                         select new GrnInvDet
                         {
                             Sno = Convert.ToInt16(ivd.Sno),
                             jobrecptid = (int)ivd.Jobrecptid,
                             DCNo = ivd.JobOrderNo,
                             JobOrdNo = ivd.JobOrderNo,
                             JobRecptDate = ivd.jobinvdate,
                             JobRecptNo = ivd.jobrecptno,
                             JobInvRefNo = ivd.JobInvRefNo,
                             chksel = 0,
                             company = ivd.Company,
                             companyid = (int)ivd.Companyid,
                             supplier = ivd.Supplier,
                             supplierid = ivd.Supplierid,
                             UnitorOther = ivd.unit_or_Other,
                             Remarks = ivd.Remarks
                         }).AsQueryable();
            return query;
        }

        //Add Mode
        public IQueryable<Domain.GrnItemDet> ThirdPagSecondGrid(string RecptId)
        {
            var query = (from ivd in entities.Proc_Apparel_GetJobInvGRNDetailInfo(RecptId)
                         select new GrnItemDet
                         {
                             Sno = Convert.ToInt16(ivd.Sno),
                             JobOrderno = ivd.JobOrderNo,
                             JobRecptId = ivd.JobRecptId,
                             Style = ivd.Style,
                             StyleId = (int)ivd.Styleid,
                             Item = ivd.Item,
                             ItemId = ivd.Itemid,
                             Color = ivd.Color,
                             ColorId = ivd.Colorid,
                             Size = ivd.Size,
                             SizeId = ivd.Sizeid,
                             uom = ivd.Abbreviation,
                             RecptQty = (decimal)ivd.JObRecptQty,
                             Rate = ivd.Rate,
                             BalQty = (decimal)ivd.balqty,
                             InvQty = (decimal)ivd.Invqty,
                             Amount = 0,
                             RejQty = (decimal)ivd.RejQty,
                             RejRate = ivd.RejRate
                         }).AsQueryable();
            return query;
        }

        //Edit Mode
        public IQueryable<Domain.GrnItemDet> ThirdPagSecondGridforEdit(int JobInvId)
        {
            var query = (from ivd in entities.Proc_Apparel_GetJobInvGRNDetailInfoforEdit(JobInvId)
                         select new GrnItemDet
                         {
                             Sno = Convert.ToInt16(ivd.Sno),
                             JobOrderno = ivd.JobOrderNo,
                             JobRecptId = ivd.Jobrecptid,
                             Style = ivd.Style,
                             StyleId = (int)ivd.Styleid,
                             Item = ivd.Item,
                             ItemId = ivd.itemid,
                             Color = ivd.Color,
                             ColorId = ivd.colorid,
                             Size = ivd.Size,
                             SizeId = ivd.sizeid,
                             uom = ivd.Abbreviation,
                             RecptQty = (decimal)ivd.JobRecptQty,
                             Rate = ivd.Rate,
                             BalQty = (decimal)ivd.BalQty,
                             InvQty = (decimal)ivd.InvQty,
                             Amount = (decimal)(ivd.Rate * ivd.InvQty),
                             RejQty = (decimal)ivd.RejQty,
                             RejRate = ivd.RejRate
                         }).AsQueryable();
            return query;
        }

        public IList<JobInvoiceMas> GetMainData(int CompanyId, int SupplierId, int InvoiceId, string InvRefNo, string FromDate, string ToDate, string JobOrdNo)
        {
            var query = (from a in entities.Proc_Apparel_GetJobInvoiceMainDet(CompanyId, SupplierId, InvoiceId, InvRefNo, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), "", JobOrdNo)
                         select new JobInvoiceMas
                         {
                             JobInvId = a.JobInvId,
                             Job_Inv_No = a.Job_Inv_No,
                             Job_Inv_Date = (DateTime)a.Job_Inv_Date,
                             CompanyId = (int)a.Companyid,
                             Company = a.Company,
                             Supplier = a.Supplier,
                             SupplierId = a.Supplierid,
                             Sup_Inv_No = a.JobInvRefNo,
                             Sup_Inv_Date = a.JobInvRefDate,
                             JobOrdNo = a.Job_Ord_No,
                             JobRefNo = a.JobRefNo
                         }).AsQueryable();

            return query.ToList();
        }

        public bool AddData(JobInvoiceMas objAdd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));

                    var id = entities.Proc_Apparel_JobInvInsert(objAdd.Job_Inv_No, objAdd.Sup_Inv_No, objAdd.Job_Inv_Date, objAdd.Sup_Inv_Date, objAdd.SupplierId, objAdd.Unit_or_Other,
                                                                        objAdd.Passed, objAdd.Remarks, objAdd.Gross_Amount, objAdd.Addless_Amount,
                                                                        objAdd.Invoice_value, objAdd.Payment_Amt, objAdd.CreatedBy, objParam);

                    entities.SaveChanges();
                    id = Convert.ToInt16(objParam.Value);

                    //Insert into Job_Inv_Det and Updating OrderQty in Job_Inv_Mas
                    var jobinvdetList = new List<Job_Inv_Det>();
                    if (objAdd.JobinvDet != null)
                    {
                        if (objAdd.JobinvDet.Count > 0)
                        {
                            foreach (var item in objAdd.JobinvDet)
                            {
                                jobinvdetList.Add(new Job_Inv_Det
                                {
                                    Job_InvId = id,
                                    ItemId = item.ItemId,
                                    ColorId = item.ColorId,
                                    SizeId = item.SizeId,
                                    Quantity = item.InvQty,
                                    Rate = item.Rate,
                                    Amount = item.Amount,
                                    JobRecptId = item.JobRecptId,
                                    RejRate = item.rejRate,
                                    RejQty = item.rejqty
                                });
                            }
                        }
                        foreach (var invdetlst in jobinvdetList)
                        {
                            entities.Job_Inv_Det.Add(invdetlst);
                        }
                        entities.SaveChanges();

                        //Update Job_recpt_Det InvoiceQty
                        foreach (var invdetlst in objAdd.JobinvDet)
                        {
                            var jobrecptdet = entities.Job_Recpt_Det.Where(j => j.JobRecptId == invdetlst.JobRecptId && j.ItemId == invdetlst.ItemId
                                && j.ColorId == invdetlst.ColorId && j.SizeId == invdetlst.SizeId).FirstOrDefault();

                            if (jobrecptdet != null)
                            {
                                jobrecptdet.InvoiceQty = invdetlst.InvQty;
                            }
                        }
                        entities.SaveChanges();
                    }

                    //Insert into Job_Inv_addless
                    var jobinvaddlessList = new List<Job_Inv_addless>();
                    if (objAdd.JobinvAorL != null)
                    {
                        if (objAdd.JobinvAorL.Count > 0)
                        {
                            foreach (var AL in objAdd.JobinvAorL)
                            {
                                jobinvaddlessList.Add(new Job_Inv_addless
                                {
                                    JobInvId = id,
                                    AddLessId = AL.AddLessId,
                                    Percentage = AL.Percentage,
                                    Amount = AL.Amount,
                                    AOrL = AL.PlusOrMinus
                                });
                            }
                        }
                        foreach (var invaddlesslst in jobinvaddlessList)
                        {
                            entities.Job_Inv_addless.Add(invaddlesslst);
                        }
                        entities.SaveChanges();
                    }

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool DeleteJobInvoice(int id)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var jobinv = entities.Job_Inv_Mas.Where(j => j.Job_InvId == id).FirstOrDefault();
                    if (jobinv != null)
                    {
                        var jobinvdet = entities.Job_Inv_Det.Where(j => j.Job_InvId == jobinv.Job_InvId).ToList();
                        if (jobinvdet != null)
                        {
                            foreach (var itm in jobinvdet)
                            {
                                //Update Invoice Qty in Job_Recpt_Det
                                var jobrecptdet = entities.Job_Recpt_Det.Where(j => j.JobRecptId == itm.JobRecptId).ToList();
                                foreach (var rcpt in jobrecptdet)
                                {
                                    if (itm.JobRecptId == rcpt.JobRecptId && itm.ItemId == rcpt.ItemId && itm.SizeId == rcpt.SizeId && itm.ColorId == rcpt.ColorId)
                                    {
                                        rcpt.InvoiceQty = (rcpt.InvoiceQty - itm.Quantity);
                                    }
                                }
                            }
                            entities.SaveChanges();

                            var deleteJobInvAddless = entities.Job_Inv_addless.Where(d => d.JobInvId == jobinv.Job_InvId).ToList<Job_Inv_addless>();
                            if (deleteJobInvAddless != null)
                            {
                                deleteJobInvAddless.ForEach(al => entities.Job_Inv_addless.Remove(al));
                                entities.SaveChanges();
                            }

                            var deleteJobInvDet = entities.Job_Inv_Det.Where(d => d.Job_InvId == jobinv.Job_InvId).ToList<Job_Inv_Det>();
                            if (deleteJobInvDet != null)
                            {
                                deleteJobInvDet.ForEach(c => entities.Job_Inv_Det.Remove(c));
                                entities.SaveChanges();
                            }

                            var deleteJobInvMas = entities.Job_Inv_Mas.Where(d => d.Job_InvId == jobinv.Job_InvId).ToList<Job_Inv_Mas>();
                            if (deleteJobInvMas != null)
                            {
                                deleteJobInvMas.ForEach(c => entities.Job_Inv_Mas.Remove(c));
                                entities.SaveChanges();
                            }
                        }
                    }

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

        public IQueryable<Domain.AddorLess> LoadEditAddlessgrid(int InvId)
        {
            var query = (from YD in entities.Proc_Apparel_GetJobOrdInvAddless(InvId)
                         select new AddorLess
                         {
                             AddLessId = (int)YD.Addlessid,
                             //Process_Ord_id = YD.Process_Ord_id,
                             Percentage = YD.Percentage,
                             PlusOrMinus = YD.AOrL,
                             Amount = YD.Amount,
                             Addless = YD.Addless,
                         }).AsQueryable();

            return query;
        }

        public bool UpdateData(JobInvoiceMas objUpd)
        {
            var result = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //Delete from Job_Inv_addless for single invid and Insert the same
                    var deleteJobInvAddless = entities.Job_Inv_addless.Where(d => d.JobInvId == objUpd.JobInvId).ToList<Job_Inv_addless>();
                    if (deleteJobInvAddless != null)
                    {
                        deleteJobInvAddless.ForEach(al => entities.Job_Inv_addless.Remove(al));
                        entities.SaveChanges();
                    }

                    //Insert into Job_Inv_addless
                    var jobinvaddlessList = new List<Job_Inv_addless>();
                    if (objUpd.JobinvAorL != null)
                    {
                        if (objUpd.JobinvAorL.Count > 0)
                        {
                            foreach (var AL in objUpd.JobinvAorL)
                            {
                                jobinvaddlessList.Add(new Job_Inv_addless
                                {
                                    JobInvId = objUpd.JobInvId,
                                    AddLessId = AL.AddLessId,
                                    Percentage = AL.Percentage,
                                    Amount = AL.Amount,
                                    AOrL = AL.PlusOrMinus
                                });
                            }
                        }
                        foreach (var invaddlesslst in jobinvaddlessList)
                        {
                            entities.Job_Inv_addless.Add(invaddlesslst);
                        }
                        entities.SaveChanges();
                    }
                    //End for Inserting record into Job_Inv_addless


                    var App = entities.Job_Inv_Mas.Where(c => c.Job_InvId == objUpd.JobInvId).FirstOrDefault();
                    if (App != null)
                    {
                        App.Sup_Inv_No = objUpd.Sup_Inv_No;
                        App.Remarks = objUpd.Remarks;
                        App.Gross_Amount = objUpd.Gross_Amount;
                    }
                    entities.SaveChanges();

                    var JobInvDetList = new List<Job_Inv_Det>();

                    JobInvDetList = entities.Job_Inv_Det.Where(c => c.Job_InvId == objUpd.JobInvId).ToList();
                    if (JobInvDetList != null)
                    {
                        foreach (var item in JobInvDetList)
                        {
                            foreach (var newitem in (objUpd.JobinvDet.Where(e => e.JobRecptId == item.JobRecptId && e.ItemId == item.ItemId && e.SizeId == item.SizeId && e.ColorId == item.ColorId)))
                            {
                                item.Quantity = (decimal)newitem.InvQty;
                                item.Rate = (decimal)newitem.Rate;
                                item.Amount = (decimal)newitem.Amount;
                            }
                        }
                        entities.SaveChanges();
                    }

                    //Update Job_recpt_Det InvoiceQty
                    foreach (var invdetlst in objUpd.JobinvDet)
                    {
                        var jobrecptdet = entities.Job_Recpt_Det.Where(j => j.JobRecptId == invdetlst.JobRecptId && j.ItemId == invdetlst.ItemId
                            && j.ColorId == invdetlst.ColorId && j.SizeId == invdetlst.SizeId).FirstOrDefault();

                        if (jobrecptdet != null)
                        {
                            jobrecptdet.InvoiceQty = (jobrecptdet.InvoiceQty - jobrecptdet.InvoiceQty);
                        }
                    }
                    entities.SaveChanges();


                    //Update Job_recpt_Det InvoiceQty
                    foreach (var invdetlst in objUpd.JobinvDet)
                    {
                        var jobrecptdet = entities.Job_Recpt_Det.Where(j => j.JobRecptId == invdetlst.JobRecptId && j.ItemId == invdetlst.ItemId
                            && j.ColorId == invdetlst.ColorId && j.SizeId == invdetlst.SizeId).FirstOrDefault();

                        if (jobrecptdet != null)
                        {
                            jobrecptdet.InvoiceQty = invdetlst.InvQty;
                        }
                    }
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
