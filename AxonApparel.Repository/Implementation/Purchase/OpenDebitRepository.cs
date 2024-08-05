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
    public class OpenDebitRepository : IOpenDebitRepository
    {

        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        //public int AddData(OpenDebitMas objReOpEntry)
        //{
        //    var id = entities.OpenDebitMas.Add(objReOpEntry);
        //    entities.SaveChanges();
        //    return id.DebitId;
        //}

        //public bool AddDetData(List<OpenDebitItemDet> objOpeDet)
        //{

        //    foreach (var item in objOpeDet)
        //    {

        //        entities.OpenDebitItemDet.Add(item);
        //        entities.SaveChanges();

        //    }
        //    entities.SaveChanges();
        //    return true;

        //}


        public bool AddDetAccData(OpenDebitMas objReOpEntry, List<OpenDebitItemDet> objOpeDet, List<Open_Debit_Addless> objOpAddDet)
        {
            int OpdeMasId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    if (objReOpEntry.DebitId == 0)
                    {
                        var id = entities.OpenDebitMas.Add(objReOpEntry);
                        entities.SaveChanges();
                        OpdeMasId = objReOpEntry.DebitId;
                    }
                    foreach (var item in objOpeDet)
                    {
                        if (item.DebitID == 0)
                        {
                            item.DebitID = OpdeMasId;
                        }
                        entities.OpenDebitItemDet.Add(item);
                        entities.SaveChanges();

                    }
                    entities.SaveChanges();

                    foreach (var Acc in objOpAddDet)
                    {
                        

                        if (Acc.Debit_Id == 0)
                        {
                            Acc.Debit_Id = OpdeMasId;
                        }

                        entities.Open_Debit_Addless.Add(Acc);
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
                    exceplogg.SendExcepToDB(ex, "OpenDebit-AddDetAccData");
                }
            }
            return reserved;
        }


        public IQueryable<OpenDebit> GetDataMainOpDebRepDetails(int? Companyid, int? Partyid, int? Processid, string OrderType, string DebitOrCredit, string FromDate, string ToDate)
        {
            IQueryable<OpenDebit> query = (from cd1 in entities.Proc_Apparel_GetOpenDebitMainDebitDropDetails(Companyid == null ? 0 : Companyid, Partyid == null ? 0 : Partyid, Processid == null ? 0 : Processid, OrderType, DebitOrCredit, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new OpenDebit
                                                      {
                                                          DebitId = (int)cd1.debitid,
                                                          DebitNo = cd1.debitno,

                                                      }).AsQueryable();
            return query;
        }


        public IQueryable<OpenDebit> GetDataMainOpProcessRepDetails(int? Companyid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate)
        {
            IQueryable<OpenDebit> query = (from cd1 in entities.Proc_Apparel_GetOpenDebitMainProcDropDetails(Companyid == null ? 0 : Companyid, Partyid == null ? 0 : Partyid, DebitId == null ? 0 : DebitId, OrderType, DebitOrCredit, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new OpenDebit
                                           {
                                               Processid = (int)cd1.processid,
                                               Process = cd1.Process,

                                           }).AsQueryable();
            return query;
        }


        public IQueryable<OpenDebit> GetDataMainOpSuppRepDetails(int? Companyid, int? Processid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate)
        {
            IQueryable<OpenDebit> query = (from cd1 in entities.Proc_Apparel_GetOpenDebitMainSuppDropDetails(Companyid == null ? 0 : Companyid, Processid == null ? 0 : Processid, DebitId == null ? 0 : DebitId, OrderType, DebitOrCredit, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                           select new OpenDebit
                                           {
                                               Partyid = (int)cd1.supplierid,
                                               Supplier = cd1.supplier,

                                           }).AsQueryable();
            return query;

        }


        public IQueryable<OpenDebit> GetDataDebitMainRepDetails(int? Companyid, int? Processid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate,string orderno,string refno)
        {
            IQueryable<OpenDebit> query = (from cd4 in entities.Proc_Apparel_GetOpenDebitMainGridDebitDetails(Companyid == null ? 0 : Companyid, Processid == null ? 0 : Processid, Partyid == null ? 0 : Partyid, DebitId == null ? 0 : DebitId, OrderType, DebitOrCredit, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), orderno == null ? "" : orderno.ToString(), refno == null ? "" : refno.ToString())
                                           select new OpenDebit
                                                      {

                                                          DebitId = cd4.debitid,
                                                          DebitNo = cd4.debitno,
                                                          Supplier = cd4.supplier,
                                                          Process = cd4.process,
                                                          DebitDate = (DateTime)cd4.debitdate,
                                                          Amount = cd4.Totalamount,



                                                      }).AsQueryable();
            return query;
        }


        public IQueryable<OpenDebit> LoadmailDetails(int Id)
        {
            IQueryable<OpenDebit> query = (from a in entities.Proc_Apparel_GetOpenDebit_MailDet(Id)
                                           select new OpenDebit
                                           {
                                               DebitNo = a.DebitNo,
                                               Supplier = a.Supplier,
                                               mail=a.E_Mail
                                           }).AsQueryable();

            return query;
        }


        public IQueryable<OpenDebit> GetDataRepEditDebitDetails(int Id)
        {
            IQueryable<OpenDebit> query = (from a in entities.Proc_Apparel_GetDebitEditDetails(Id)
                                           select new OpenDebit
                                                      {
                                                          Companyid = a.companyid,
                                                          Company = a.company,
                                                          DebitId = (int)a.debitid,
                                                          DebitNo = a.debitno,
                                                          DebitDate = (DateTime)a.debitdate,
                                                          RefDate = (DateTime)a.refdate,
                                                          RefNo = a.refno,
                                                          Supplier = a.supplier,
                                                          Partyid = a.supplierid,
                                                          Processid = (int)a.processid,
                                                          Process = a.process,
                                                          Remarks = a.remarks,
                                                          CurrencyID = (int)a.currencyid,
                                                          Currency = a.currency,
                                                          ExchangeRate = a.ExchangeRate,
                                                          voucherid = a.voucherid,
                                                          ledgerid = a.ledgerid,
                                                          ledger = a.ledger,
                                                          voucher = a.voucher,
                                                          VehicleNo = a.VehicleNo,
                                                          DebitOrCredit = a.DebitorCredit,
                                                          OpenOrOrder = a.OpenOrOrder,
                                                          OrderType = a.OrderType,


                                                      }).AsQueryable();

            return query;
        }


        public IList<OpenDebitDet> GetDataDebRepEditItemDetails(int Debtid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetDebitEntryEditItemDetails(Debtid)
                         select new OpenDebitDet
                         {

                             DebitID = (int)YD1.debitid,
                             DebitDetId = (int)YD1.DebitDetId,
                             Colorid = (int)YD1.colorid,
                             Sizeid = (int)YD1.sizeid,
                             Quantity = YD1.quantity,
                             Rate = (decimal)YD1.rate,
                             Amt = (decimal)YD1.amount,
                             OrdNo = YD1.OrdNo,
                             Refno = YD1.Refno,
                             JobNo = YD1.WorkNo,
                             Item = YD1.item,
                             Color = YD1.color,
                             Size = YD1.size,
                             Itemid = (int)YD1.itemid,
                             BmasId = (int)YD1.BmasId,
                             JobId = (int)YD1.JobId,
                             RefId = (int)YD1.BmasId,


                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateData(OpenDebitMas objReEOpEntry)
        {
            var result = false;


            var App = entities.OpenDebitMas.Where(c => c.DebitId == objReEOpEntry.DebitId).FirstOrDefault();
            if (App != null)
            {

                App.DebitId = objReEOpEntry.DebitId;
                App.DebitNo = objReEOpEntry.DebitNo;
                App.DebitDate = objReEOpEntry.DebitDate;
                App.Companyid = objReEOpEntry.Companyid;
                App.Partyid = objReEOpEntry.Partyid;
                App.RefNo = objReEOpEntry.RefNo;
                App.RefDate = objReEOpEntry.RefDate;
                App.Processid = objReEOpEntry.Processid;
                App.Amount = objReEOpEntry.Amount;
                App.Remarks = objReEOpEntry.Remarks;
                App.voucherid = objReEOpEntry.voucherid;
                App.ledgerid = objReEOpEntry.ledgerid;
                App.OpenOrOrder = objReEOpEntry.OpenOrOrder;
                App.OrderType = objReEOpEntry.OrderType;
                App.Order_No = objReEOpEntry.Order_No;
                App.Styleid = objReEOpEntry.Styleid;
                App.DebitOrCredit = objReEOpEntry.DebitOrCredit;
                App.CreatedBy = objReEOpEntry.CreatedBy;
                App.VehicleNo = objReEOpEntry.VehicleNo;
                App.Addless_amount = objReEOpEntry.Addless_amount;
                App.AddLessManualOrFormula = objReEOpEntry.AddLessManualOrFormula;
                App.CurrencyID = objReEOpEntry.CurrencyID;
                App.ExchangeRate = objReEOpEntry.ExchangeRate;

            }
            entities.SaveChanges();


            result = true;
            return result;
        }

        public bool UpdateDetData(List<OpenDebitItemDet> objOpeEDet, int Id)
        {

            var result = false;

            var Det = entities.OpenDebitItemDet.Where(u => u.DebitID == Id);

            foreach (var d in Det)
            {
                entities.OpenDebitItemDet.Remove(d);
            }
            entities.SaveChanges();

            result = true;
            return result;
        }

        public bool UpdateDetAccData(OpenDebitMas objReEOpEntry, List<OpenDebitItemDet> objOpeEDet, List<Open_Debit_Addless> objOpAddEDet, int Id)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    var App = entities.OpenDebitMas.Where(c => c.DebitId == objReEOpEntry.DebitId).FirstOrDefault();
                    if (App != null)
                    {

                        App.DebitId = objReEOpEntry.DebitId;
                        App.DebitNo = objReEOpEntry.DebitNo;
                        App.DebitDate = objReEOpEntry.DebitDate;
                        App.Companyid = objReEOpEntry.Companyid;
                        App.Partyid = objReEOpEntry.Partyid;
                        App.RefNo = objReEOpEntry.RefNo;
                        App.RefDate = objReEOpEntry.RefDate;
                        App.Processid = objReEOpEntry.Processid;
                        App.Amount = objReEOpEntry.Amount;
                        App.Remarks = objReEOpEntry.Remarks;
                        App.voucherid = objReEOpEntry.voucherid;
                        App.ledgerid = objReEOpEntry.ledgerid;
                        App.OpenOrOrder = objReEOpEntry.OpenOrOrder;
                        App.OrderType = objReEOpEntry.OrderType;
                        App.Order_No = objReEOpEntry.Order_No;
                        App.Styleid = objReEOpEntry.Styleid;
                        App.DebitOrCredit = objReEOpEntry.DebitOrCredit;
                        App.CreatedBy = objReEOpEntry.CreatedBy;
                        App.VehicleNo = objReEOpEntry.VehicleNo;
                        App.Addless_amount = objReEOpEntry.Addless_amount;
                        App.AddLessManualOrFormula = objReEOpEntry.AddLessManualOrFormula;
                        App.CurrencyID = objReEOpEntry.CurrencyID;
                        App.ExchangeRate = objReEOpEntry.ExchangeRate;

                    }
                    entities.SaveChanges();


                    var Det = entities.OpenDebitItemDet.Where(u => u.DebitID == objReEOpEntry.DebitId);

                    foreach (var d in Det)
                    {
                        entities.OpenDebitItemDet.Remove(d);
                    }
                    entities.SaveChanges();

                    var AccDet = entities.Open_Debit_Addless.Where(u => u.Debit_Id == objReEOpEntry.DebitId);

                    foreach (var f in AccDet)
                    {
                        entities.Open_Debit_Addless.Remove(f);
                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OpenDebit-UpdateDetAccData");
                }
            }
            return reserved;
        }


        public IList<OpenDebitAddless> GetDataDebRepEditAddlessDetails(int Debtid)
        {
            var query = (from YD2 in entities.Proc_Apparel_GetDebitAddlessEditItemDetails(Debtid)
                         select new OpenDebitAddless
                         {


                             OpenDebitAddlessid = (int)YD2.Debit_AddLessId,
                             DebitId = (int)YD2.Debit_Id,
                             Addlessid = (int)YD2.addless_id,
                             Percentage = (decimal)YD2.percentage,
                             PlusOrMinus = YD2.aorl,
                             Amount = YD2.amount,
                             Addless = YD2.addless,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool DeleteDetAccData(OpenDebitMas objReEOpEntry, List<OpenDebitItemDet> objOpeEDet, List<Open_Debit_Addless> objOpAddEDet, int Id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
        
            
                    //OpdetAddless
                    var o = entities.Open_Debit_Addless.Where(u => u.Debit_Id == objReEOpEntry.DebitId);

                    foreach (var i in o)
                    {
                        entities.Open_Debit_Addless.Remove(i);
                    }
                    entities.SaveChanges();

                    //OpdetItem
                    var t = entities.OpenDebitItemDet.Where(v => v.DebitID == objReEOpEntry.DebitId);

                    foreach (var s in t)
                    {
                        entities.OpenDebitItemDet.Remove(s);
                    }

                        

                    //Mas
                    var Mas = entities.OpenDebitMas.Where(u => u.DebitId == objReEOpEntry.DebitId);

                    foreach (var v in Mas)
                    {
                        entities.OpenDebitMas.Remove(v);
                    }
                    entities.SaveChanges();



                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OpenDebit-DeleteDetAccData");
                }
            }
            return reserved;
        }
    }
}
