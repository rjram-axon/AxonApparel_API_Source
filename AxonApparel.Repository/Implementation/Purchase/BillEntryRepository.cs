using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BillEntryRepository : IBillEntryRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<BillEntry> GetDataList()
        {
            throw new NotImplementedException();
        }

        public BillEntry GetDataById(int id)
        {
            throw new NotImplementedException();
        }

        public int AddData(BillEntry obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.BillEntry.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BillEntry-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(BillEntry obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.BillEntry.Where(c => c.BillID == obj.BillID).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.BillID = obj.BillID;
                        cou.BillNo = obj.BillNo;
                        cou.BillDate = obj.BillDate;
                        cou.Amount = obj.Amount;
                        cou.CompanyID = obj.CompanyID;
                        cou.department = obj.department;
                        cou.SupplierID = obj.SupplierID;
                        cou.CurrencyID = obj.CurrencyID;
                        cou.ExchangeRate = obj.ExchangeRate;
                        cou.Remarks = obj.Remarks;
                        cou.SupBillNo = obj.SupBillNo;
                        cou.SupBillDate = obj.SupBillDate;
                        cou.Order_Type = obj.Order_Type;
                        cou.Pur_Type = obj.Pur_Type;
                        //cou.IsInvoiced = obj.IsInvoiced;
                        cou.SupplierType = obj.SupplierType;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BillEntry-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.BillEntry.Where(c => c.BillID == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.BillEntry.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BillEntry-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Domain.BillEntry> Getdata(int billid)
        {
            var query = (from LADD in entities.Proc_GetBillDetails(billid)
                         select new Domain.BillEntry
                         {
                             BillID = LADD.BillId,
                             BillDate = (DateTime)LADD.BillDate,
                             BillNo = LADD.BillNo,
                             SupBillDate = (DateTime)LADD.SupBillDate,
                             SupBillNo = LADD.supBillNo,
                             SupplierID = (int)LADD.SupplierID,
                             supplier = LADD.Supplier,
                             CompanyID = (int)LADD.companyid,
                             company = LADD.company,
                             ExchangeRate = LADD.ExchangeRate,
                             Remarks = LADD.Remarks,
                             Amount = LADD.Amount,
                             CurrencyID = (int)LADD.CurrencyID,
                             currency = LADD.Currency,
                             Pur_Type = LADD.Pur_Type,
                             Order_Type = LADD.Order_Type,
                             IsInvoiced = LADD.IsInvoiced,
                             department = LADD.department,
                             SupplierType=LADD.SupplierType,
                             InvoiceNo=LADD.InvoiceNo
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.BillEntry> GetDataMainList(int? companyId, int? suppid, string billno, string ordtype, string fromDate, string todate, string SuppType)
        {
            var query = (from LADD in entities.Proc_Apparel_BillentryLoadMaingrid(companyId, suppid, billno, ordtype, fromDate, todate, SuppType)
                         select new Domain.BillEntry
                         {
                             BillNo = LADD.BillNo,
                             BillID = LADD.BillID,
                             BillDate = (DateTime)LADD.BillDate,
                             company = LADD.company,
                             CompanyID = (int)LADD.companyid,
                             SupplierID = (int)LADD.SupplierID,
                             supplier = LADD.Supplier,
                             Order_Type = LADD.Order_Type,
                             SupBillNo = LADD.supBillNo,
                             SupBillDate = (DateTime)LADD.SupBillDate,
                             department = LADD.department
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.BillEntry> Listddldet(int? companyId)
        {
            var query = (from LADD in entities.Proc_Apparel_BillentryLoadDopdown(companyId)
                         select new Domain.BillEntry
                         {
                             BillNo = LADD.BillNo,
                             BillID = LADD.BillID,
                             SupBillNo = LADD.supBillNo,

                         }).AsQueryable();

            return query;
        }


    }
}
