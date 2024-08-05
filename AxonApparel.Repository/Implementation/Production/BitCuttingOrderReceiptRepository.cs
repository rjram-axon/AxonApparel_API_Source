using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Data.Entity.Validation;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BitCuttingOrderReceiptRepository : IBitCuttingOrderReceiptRepository
    {
        ProductionEntities entities = new ProductionEntities();

        public IQueryable<CuttingReceipt> GetCuttingReceiptInf()
        {
            IQueryable<CuttingReceipt> query = (from T in entities.Cutting_Recpt_Mas
                                                select new CuttingReceipt
                                                {
                                                    CuttingReceiptId = T.CuttingRecptId,
                                                    CuttingReceiptNo = T.CuttingRecptNo
                                                }).AsQueryable();
            return query;
        }

        public IQueryable<CuttingReceipt> GetCuttingReceiptHeaderInfo(int ReceiptID, int CuttingOrderID)
        {
            IQueryable<CuttingReceipt> query = (from T in entities.Proc_Apparel_GetCuttingRcptMasDetailsForEdit(ReceiptID)
                                                select new CuttingReceipt
                                                {
                                                    CompanyName = T.Company,
                                                    CompanyUnitName = T.Companyunit,
                                                    Style = T.Style,
                                                    ToStoreId = T.StoreUnitId,
                                                    CuttingReceiptNo = T.CuttingRecptNo,
                                                    CuttingReceiptId = T.CuttingRecptID,
                                                    CuttingOrdNo = T.CuttingOrderNo,
                                                    CuttingReceiptDate = (DateTime)T.CuttingRecptDate,
                                                    ProdPrgNo = T.ProdPrgno,
                                                    Processor = T.Processor,
                                                    RefNo = T.RefNo,
                                                    RefDate = (DateTime)T.Ref_Date,
                                                    ShiftId = (int)T.ShiftId,
                                                    Remarks = T.Remarks,
                                                    OrderNo = T.OrderNo,
                                                    JobOrderNo = T.JobOrderNo,
                                                    CuttingOrdId = T.CuttingOrdId,
                                                    cuttingreceiptdet = GetCuttingRcptDetForEdit(ReceiptID, CuttingOrderID),
                                                    cuttingbundle = GetCuttingRcptBundleForEdit(ReceiptID),
                                                    ParentUnitid = T.Parentstoreid,
                                                    Storetype = T.StoreType,
                                                    StoreName = T.StoreName,
                                                    StoreUnitID = T.StoreUnitId,
                                                }).AsQueryable();
            return query;
        }

        public List<CuttingReceiptDetails> GetCuttingRcptDetForEdit(int CuttingReceiptId, int CuttingOrderID)
        {
            List<CuttingReceiptDetails> query = (from T in entities.Proc_Apparel_GetCuttingRcptDetails(CuttingOrderID, CuttingReceiptId)
                                                 select new CuttingReceiptDetails
                                                         {
                                                             CuttingOrdDetId = T.CuttingOrdDetid,
                                                             Ordqty = (int)T.OrderQty,
                                                             Balqty = (int)T.BalQty,
                                                             ItemId = (int)T.ItemId,
                                                             Item = T.Item,
                                                             Color = T.Color,
                                                             ColorId = (int)T.Colorid,
                                                             Size = T.Size,
                                                             SizeId = (int)T.Sizeid,
                                                             Grammage = (decimal)T.Grammage,
                                                             Weight = (decimal)T.Weight,
                                                             Recqty = Convert.ToInt16((T.Recqty == null ? 0 : T.Recqty)),
                                                             Nobundle = (int)(T.NoBundle == null ? 0 : T.NoBundle),
                                                             Rate = (decimal)T.Rate,
                                                             Apprate = (decimal)T.Apprate,
                                                             BalWgt = (decimal)T.BalWgt
                                                         }).AsQueryable().ToList();
            return query;
        }


        public List<CuttingBundle> GetCuttingRcptBundleForEdit(int CuttingReceiptId)
        {
            List<CuttingBundle> query = (from T in entities.Proc_Apparel_GetCuttingRecptBundleEdit(CuttingReceiptId)
                                         select new CuttingBundle
                                         {
                                             BundleId = T.BundleId,
                                             CuttingRecptId = T.CuttingRecptId,
                                             CuttingRecptDetId = T.CuttingRecptDetId,
                                             BundleNo = T.BundleNo,
                                             Bundleqty = T.BundleQty,
                                             EmployeeId = (int)T.Employeeid,
                                             Employee=T.Employee,
                                             CuttingOrddetid=T.CuttingOrdDetId
                                         }).AsQueryable().ToList();
            return query;
        }




        public IQueryable<CuttingReceipt> GetCuttingRecptDetails(int CompanyId, int CompanyUnitId, string OrdType, string refno, int styleid, string ordo, int buyerid, string jobordno, string inorext,int Processid)
        {
            IQueryable<CuttingReceipt> query = (from T in entities.Proc_Apparel_GetBitCuttingReceipt(CompanyId, CompanyUnitId, OrdType, refno, styleid, ordo, buyerid, jobordno, inorext, Processid)
                                                select new CuttingReceipt
                                                {
                                                    BuyOrdMasId = T.buy_Ord_MasId,
                                                    OrderNo = T.Order_No,
                                                    RefNo = T.Ref_No,
                                                    Style = T.Style,
                                                    StyleId = T.StyleId,
                                                    Qty = (int)T.Quantity,
                                                    ProdPrgNo = T.ProdPrgNo,
                                                    ProdPrgId = T.ProdPrgId,
                                                    BuyerId = (int)T.Buyerid,
                                                    Buyer = T.Buyer,
                                                    CuttingOrdId = T.CuttingOrdId,
                                                    CuttingOrdNo = T.CuttingOrderNo,
                                                    Processor = T.Processor,
                                                    WorkDivisionId = (int)T.WorkDivisionid,
                                                    Orderqty = (int)T.OrderQty,
                                                    Balance = (int)T.Balance,
                                                    Amend = T.AMend,
                                                    JobNo = T.JobNo,
                                                    Process=T.Process
                                                }).AsQueryable();
            return query;

            //var query = (from T in entities.Proc_Apparel_GetCuttingReceipt(CompanyId, CompanyUnitId, OrdType)
            //             select new CuttingReceipt
            //             {
            //                 BuyOrdMasId = T.buy_Ord_MasId,
            //                 OrderNo = T.Order_No,
            //                 RefNo = T.Ref_No,
            //                 Style = T.Style,
            //                 StyleId = T.StyleId,
            //                 Qty = (int)T.Quantity,
            //                 ProdPrgNo = T.ProdPrgNo,
            //                 ProdPrgId = T.ProdPrgId,
            //                 BuyerId = (int)T.Buyerid,
            //                 Buyer = T.Buyer,
            //                 CuttingOrdId = T.CuttingOrdId,
            //                 CuttingOrdNo = T.CuttingOrderNo,
            //                 Processor = T.Processor,
            //                 WorkDivisionId = (int)T.WorkDivisionid,
            //                 Orderqty = (int)T.OrderQty,
            //                 Balance = (int)T.Balance,
            //                 Amend = T.AMend,
            //                 JobNo = T.JobNo
            //             }).AsQueryable();

            //return query.ToList();
        }

        public IQueryable<CuttingReceiptDetails> GetCuttingRcptDet(int CuttingOrdId)
        {
            IQueryable<CuttingReceiptDetails> query = (from T in entities.Proc_Apparel_GetItemDetForAdd(CuttingOrdId)
                                                       select new CuttingReceiptDetails
                                                {
                                                    CuttingOrdDetId = T.CuttingOrdDetid,
                                                    Ordqty = (int)T.OrderQty,
                                                    Balqty = (int)T.BalQty,
                                                    ItemId = (int)T.ItemId,
                                                    Item = T.Item,
                                                    Color = T.Color,
                                                    ColorId = (int)T.Colorid,
                                                    Size = T.Size,
                                                    SizeId = (int)T.Sizeid,
                                                    Grammage = (int)T.Grammage,
                                                    Weight = T.Weight,
                                                    Recqty = T.RecQty,
                                                    Nobundle = T.Nobundle,
                                                    Rate = T.rate,
                                                    Apprate = (decimal)T.Apprate,
                                                    BalWgt = (decimal)T.BalWgt
                                                }).AsQueryable();
            return query;
        }

        public IQueryable<CuttingReceiptDetails> GetCuttingGrammagePer(string OrdNo, int StyleId, string JobNo)
        {
            IQueryable<CuttingReceiptDetails> query = (from T in entities.Proc_Apparel_GetConsumptionInKgs(OrdNo, StyleId, JobNo)
                                                       select new CuttingReceiptDetails
                                                       {
                                                           ItemId = (int)T.Itemid,
                                                           ColorId = (int)T.colorid,
                                                           SizeId = (int)T.sizeid,
                                                           Weight = (decimal)T.Weight,
                                                       }).AsQueryable();
            return query;
        }

        public bool UpdateMarkUpRate(int CuttingOrderId)
        {
            var upd = entities.Proc_Apparel_UpdateCuttingReceiptMarkUpRate(CuttingOrderId);
            return true;
        }

        public bool AddData(CuttingReceipt objAdd)
        {
            bool StockStatus = false;
            string jobordno = "";
            string Orderno = "";
            int Styleid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));

                    var id = entities.Proc_Apparel_CuttingReceiptMasInsert(objAdd.CuttingReceiptNo, objAdd.CuttingReceiptDate, objAdd.RefNo, objAdd.RefDate, objAdd.CuttingOrdId, objAdd.Remarks,
                                                                        objAdd.ShiftId, objAdd.ConvType, objAdd.ToStoreId, objAdd.CreatedBy, objParam);

                    entities.SaveChanges();
                    id = Convert.ToInt16(objParam.Value);

                    //Insert into Cutting_Recpt_Det 
                    var cuttingList = new List<Domain.CuttingReceiptDetails>();
                    //var receiptbundlecount = 0;

                    if (objAdd.cuttingreceiptdet != null)
                    {
                        if (objAdd.cuttingreceiptdet.Count > 0)
                        {
                            //if (CuttingReceiptAdd.cuttingbundle != null)
                            //{
                            //    receiptbundlecount = CuttingReceiptAdd.cuttingbundle.Count;
                            //}
                            //else
                            //{
                            //    receiptbundlecount = 0;
                            //}

                            foreach (var item in objAdd.cuttingreceiptdet)
                            {
                                cuttingList.Add(new Domain.CuttingReceiptDetails
                                {
                                    CuttingReceiptId = id,
                                    ItemId = item.ItemId,
                                    ColorId = item.ColorId,
                                    SizeId = item.SizeId,
                                    Recqty = item.Recqty,
                                    Rate = item.Rate,
                                    CuttingOrdDetId = item.CuttingOrdDetId,
                                    Nobundle = item.Nobundle,
                                    Grammage = item.Grammage,
                                    Weight = item.Weight,
                                });
                            }
                        }
                        var cuttingIssueDetresult = AddCuttingReceiptDet(cuttingList, "Add");
                    }

                    var cuttingBundleList = new List<Domain.CuttingBundle>();
                    if (objAdd.cuttingbundle != null)
                    {
                        if (objAdd.cuttingbundle.Count > 0)
                        {
                            foreach (var item in objAdd.cuttingbundle)
                            {
                                cuttingBundleList.Add(new Domain.CuttingBundle
                                {
                                    CuttingOrddetid = item.CuttingOrddetid,
                                    BundleNo = item.BundleNo,
                                    Bundleqty = item.Bundleqty,
                                    EmployeeId = item.EmployeeId,
                                });
                            }
                        }
                        var cuttingRecptbundleresult = AddCuttingBundle(cuttingBundleList, "Add");
                    }

                    //Update Markup Rate
                    var MarkUpRate = UpdateMarkUpRate(objAdd.CuttingOrdId);

                    //Stock Updation
                    StockStatus = UpdateStockTable(objAdd, "Add");


                    var OQuery = entities.Cutting_Order_Mas.Where(b => b.CuttingOrdid == objAdd.CuttingOrdId).FirstOrDefault();
                    if (OQuery != null)
                    {
                        jobordno = OQuery.Joborderno;
                    }

                    if (jobordno != "")
                    {
                        var CQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == jobordno).FirstOrDefault();
                        if (CQuery != null)
                        {
                            Orderno = CQuery.Order_No;
                            Styleid = (int)CQuery.Styleid;
                        }

                        var Pg4 = entities.Proc_Apparel_UpdateCuttingQtyCosting(Orderno, Styleid);
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

        public IList<CuttingReceipt> GetMainData(int ID, string OrderType, string InterExternal, string FromDate, string ToDate,int companyid,string jobordno,
            string orderno,string refno,int employeeid,int unitid,int Processid)
        {
            var query = (from a in entities.Proc_Apparel_GetBitCuttingReceiptMainDetails(ID, InterExternal, OrderType, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(),
                            companyid, jobordno, orderno, refno, employeeid, unitid, Processid)
                         select new CuttingReceipt
                         {
                             CuttingOrdId = a.CuttingOrdid,
                             StyleId = a.StyleId,
                             Style = a.Style,
                             CuttingReceiptId = a.CuttingRecptId,
                             OrderNo = a.Order_no,
                             RefNo = a.Ref_No,
                             JobNo = a.joborderno,
                             CuttingReceiptNo = a.CuttingRecptNo,
                             CuttingReceiptDate = (DateTime)a.CuttingRecptDate,
                             WorkDivision = a.workdivision,
                             Employee = a.Employee,
                             Employeeid=(int)a.Employeeid,
                             Process=a.Process
                         }).AsQueryable();

            return query.ToList();
        }

        public bool UpdateData(CuttingReceipt objUpd)
        {
            var result = false;
            string jobordno = "";
            string Orderno = "";
            int Styleid = 0;
            int masid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //Update Cutting_Recpt_Mas and Cutting_Recpt_Det
                    var App = entities.Cutting_Recpt_Mas.Where(c => c.CuttingRecptId == objUpd.CuttingReceiptId).FirstOrDefault();
                    if (App != null)
                    {
                        App.ShiftId = objUpd.ShiftId;
                        App.Remarks = objUpd.Remarks;
                    }
                    entities.SaveChanges();

                    var updatebundleqtyD = entities.Proc_Apparel_PostCuttingBundleQtyIntoPrg(objUpd.CuttingReceiptNo, "D");

                    var CuttDet = entities.Cutting_Recpt_Det.Where(c => c.CuttingRecptId == objUpd.CuttingReceiptId).ToList();
                    if (CuttDet != null)
                    {
                        if (objUpd.cuttingreceiptdet != null)
                        {
                            foreach (var cutingrecpttbl in CuttDet)
                            {
                                foreach (var cutingrecptlst in objUpd.cuttingreceiptdet)
                                {
                                    if (cutingrecpttbl.CuttingOrdDetId == cutingrecptlst.CuttingOrdDetId)
                                    {
                                        cutingrecpttbl.Grammage = cutingrecptlst.Grammage;
                                        cutingrecpttbl.weight = cutingrecptlst.Weight;
                                        cutingrecpttbl.RecptQty = cutingrecptlst.Recqty;
                                        cutingrecpttbl.Rate = cutingrecptlst.Rate;
                                    }
                                }
                            }
                        }
                    }
                    entities.SaveChanges();

                    var CuttingRecptBundle = entities.Cutting_Recpt_Bundle.Where(u => u.CuttingRecptId == objUpd.CuttingReceiptId).ToList();

                    if (CuttingRecptBundle != null)
                    {
                        if (objUpd.cuttingbundle != null)
                        {

                            foreach (var v in CuttingRecptBundle)
                            {
                                entities.Cutting_Recpt_Bundle.Remove(v);
                            }
                            entities.SaveChanges();

                            var cuttingRecptbundleresult = AddCuttingBundle(objUpd.cuttingbundle, "Add");
                        }
                    }

                   

                    var stckupd = UpdateStockTable(objUpd, "Edit");

                    //Update Markup Rate
                    var MarkUpRate = UpdateMarkUpRate(objUpd.CuttingOrdId);

                    var Query = entities.Cutting_Recpt_Mas.Where(b => b.CuttingRecptId == objUpd.CuttingReceiptId).FirstOrDefault();
                    if (Query != null)
                    {
                        masid = (int)Query.CuttingOrdId;
                    }

                    var OQuery = entities.Cutting_Order_Mas.Where(b => b.CuttingOrdid == masid).FirstOrDefault();
                    if (OQuery != null)
                    {
                        jobordno = OQuery.Joborderno;
                    }

                    if (jobordno != "")
                    {
                        var CQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == jobordno).FirstOrDefault();
                        if (CQuery != null)
                        {
                            Orderno = CQuery.Order_No;
                            Styleid = (int)CQuery.Styleid;
                        }

                        var Pg4 = entities.Proc_Apparel_UpdateCuttingQtyCosting(Orderno, Styleid);
                        entities.SaveChanges();
                    }
                    //The Transaction will be completed
                    txscope.Complete();
                    result = true;
                    return result;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
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

        public bool UpdateStockTable(CuttingReceipt objAdd, string Mode)
        {
            try
            {
                if (Mode == "Add")
                {
                    var updatebundleqty = entities.Proc_Apparel_PostCuttingBundleQtyIntoPrg(objAdd.CuttingReceiptNo, "A");
                }
                //else if (Mode == "Delete")
                //{
                //    var updatebundleqty = entities.Proc_Apparel_PostCuttingBundleQtyIntoPrg(objAdd.CuttingReceiptNo, "D");
                //}
                else if (Mode == "Edit")
                {
                    //var updatebundleqtyD = entities.Proc_Apparel_PostCuttingBundleQtyIntoPrg(objAdd.CuttingReceiptNo, "D");
                    var updatebundleqtyA = entities.Proc_Apparel_PostCuttingBundleQtyIntoPrg(objAdd.CuttingReceiptNo, "A");
                }

                var InsertintoItemStock = entities.Proc_Apparel_SP_PostCuttingRecptItemStock(objAdd.CuttingReceiptNo);

                var StatusUpdate = entities.Proc_Apparel_CuttRecptUpdateActualsForAll("W", objAdd.OrderNo, objAdd.StyleId);

                var UpdateScheduleDet = entities.Proc_Apparel_ScheduleStatusUpdateInCuttingRecpt(objAdd.CuttingReceiptNo, 1);

                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public bool AddCuttingReceiptDet(List<CuttingReceiptDetails> objCuttingreceiptDet, string Mode)
        {
            var CuttingdetList = new List<Cutting_Recpt_Det>();

            try
            {
                foreach (var item in objCuttingreceiptDet)
                {
                    CuttingdetList.Add(new Repository.Cutting_Recpt_Det
                    {
                        CuttingRecptId = item.CuttingReceiptId,
                        Itemid = item.ItemId,
                        ColorID = item.ColorId,
                        Sizeid = item.SizeId,
                        RecptQty = item.Recqty,
                        Rate = item.Rate,
                        NoOfBundles = item.Nobundle,
                        Grammage = item.Grammage,
                        weight = item.Weight,
                        Closed = "N",
                        CuttingOrdDetId = item.CuttingOrdDetId,
                        //Lotno = "Lot",
                        //IPMarkup_rate = 0,
                        //OPMarkup_rate = 0,
                        //Wages_Qty = 0,
                        //rejectedQty = 0,
                    });
                }

                foreach (var issuelst in CuttingdetList)
                {
                    entities.Cutting_Recpt_Det.Add(issuelst);
                }

                entities.SaveChanges();

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
        }

        public bool AddCuttingBundle(List<CuttingBundle> objCuttingbundle, string Mode)
        {
            var CuttingbundleList = new List<Cutting_Recpt_Bundle>();
            int CuttingReceiptDetId = 0;
            int CuttingReceiptId = 0;

            try
            {
                foreach (var item in objCuttingbundle)
                {
                    var CuttingReceiptDetID = entities.Cutting_Recpt_Det.Where(c => c.CuttingOrdDetId == item.CuttingOrddetid).Select(d => d.CuttingRecptDetID).First();

                    if (CuttingReceiptDetID > 0)
                    {
                        CuttingReceiptDetId = CuttingReceiptDetID;
                        //CuttingReceiptId = (int)CuttingReceipt.CuttingRecptId;
                    }

                    var CuttingReceiptID = entities.Cutting_Recpt_Det.Where(c => c.CuttingOrdDetId == item.CuttingOrddetid).Select(d => d.CuttingRecptId).First();

                    if (CuttingReceiptID > 0)
                    {
                        CuttingReceiptId = (int)CuttingReceiptID;
                        //CuttingReceiptId = (int)CuttingReceipt.CuttingRecptId;
                    }

                    CuttingbundleList.Add(new Repository.Cutting_Recpt_Bundle
                    {
                        CuttingRecptId = CuttingReceiptId,
                        CuttingRecptDetId = CuttingReceiptDetId,
                        BundleNo = item.BundleNo,
                        BundleQty = item.Bundleqty,
                        Employeeid = item.EmployeeId,
                    });
                }

                foreach (var issuelst in CuttingbundleList)
                {
                    entities.Cutting_Recpt_Bundle.Add(issuelst);
                }

                entities.SaveChanges();

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

            //var cuttingrcptdetList = new List<Domain.CuttingReceiptDetails>(CuttingReceiptAdd.cuttingreceiptdet.Cast<CuttingReceiptDetails>()
            //                                                                                      .Where(d => d.CuttingOrdDetId == item.CuttingOrddetid).Select(e=>e.);
        }

        public bool DeleteData(int id, int Styleid, string CuttRcptno, string OrderNo)
        {
            var result = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var addl = entities.Cutting_Recpt_Mas.Where(c => c.CuttingRecptId == id).FirstOrDefault();

                    var updatebundleqty = entities.Proc_Apparel_PostCuttingBundleQtyIntoPrg(CuttRcptno, "D");

                    //var InsertintoItemStock = entities.Proc_Apparel_SP_PostCuttingRecptItemStock(CuttRcptno);
                    //modify by bala on 09/10/2018
                    var Mas = entities.ItemStock.Where(u => u.Transno == CuttRcptno);

                    foreach (var v in Mas)
                    {
                        entities.ItemStock.Remove(v);
                    }
                    entities.SaveChanges();

                    var StatusUpdate = entities.Proc_Apparel_CuttRecptUpdateActualsForAll("W", OrderNo, Styleid);

                    var UpdateScheduleDet = entities.Proc_Apparel_ScheduleStatusUpdateInCuttingRecpt(CuttRcptno, 1);
                    entities.SaveChanges();

                    if (addl != null)
                    {
                        //delete  Cutting_Recpt_Bundle Many Rows table
                        var ItSout = entities.Cutting_Recpt_Bundle.Where(c => c.CuttingRecptId == addl.CuttingRecptId).FirstOrDefault();
                        if (ItSout != null)
                        {
                            var deleteCuttingRecptBundle = entities.Cutting_Recpt_Bundle.Where(d => d.CuttingRecptId == addl.CuttingRecptId).ToList<Cutting_Recpt_Bundle>();
                            deleteCuttingRecptBundle.ForEach(c => entities.Cutting_Recpt_Bundle.Remove(c));
                            entities.SaveChanges();
                        }

                        //delete Cutting_Recpt_Det Many Rows table
                        var deletecuttingReceptdet = entities.Cutting_Recpt_Det.Where(d => d.CuttingRecptId == id).ToList<Cutting_Recpt_Det>();
                        deletecuttingReceptdet.ForEach(c => entities.Cutting_Recpt_Det.Remove(c));
                        entities.SaveChanges();

                        //delete Cutting_Recpt_Mas Many Rows table
                        entities.Cutting_Recpt_Mas.Remove(addl);
                        entities.SaveChanges();
                    }


                    if (OrderNo != "" && Styleid != 0)
                    {
                        var Pg4 = entities.Proc_Apparel_UpdateCuttingQtyCosting(OrderNo, Styleid);
                        entities.SaveChanges();
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
    }
}
