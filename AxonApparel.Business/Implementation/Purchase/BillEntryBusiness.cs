using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
   public class BillEntryBusiness:IBillEntryBusiness
    {
       IBillEntryRepository Brep = new BillEntryRepository();

       public Response<int> Create(Domain.BillEntry Add)
       {
           int? suppid = 0;
           if (Add.SupplierID == 0)
           {
               suppid = null;
           }
           else
           {
               suppid = Add.SupplierID;
           }
           try
           {

               return new Response<int>(Brep.AddData(new Repository.BillEntry
               {
                 BillID=Add.BillID,
                 BillNo=Add.BillNo,
                 BillDate=Add.BillDate,
                 SupBillDate=Add.SupBillDate,
                 SupBillNo=Add.SupBillNo,
                 SupplierID=Add.SupplierID,
                 CurrencyID=Add.CurrencyID,
                 department=Add.department,
                 Remarks=Add.Remarks,
                 CompanyID=Add.CompanyID,
                 Pur_Type=Add.Pur_Type,
                 Order_Type=Add.Order_Type,
                 ExchangeRate=Add.ExchangeRate,
                 Amount=Add.Amount,
                 InvoiceNo=Add.InvoiceNo,
                 IsInvoiced=Add.IsInvoiced,
                 SupplierType=Add.SupplierType,
                 CreatedBy=Add.CreatedBy

               }), Status.SUCCESS, "Added Successfully");
           }
           catch (Exception)
           {
               return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.BillEntry>> Getdata(int billid)
       {
           try
           {
               var ProductWO = Brep.Getdata(billid);

               return new Response<IQueryable<Domain.BillEntry>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.BillEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> Update(Domain.BillEntry obj)
       {
           try
           {

               return new Response<bool>(Brep.UpdateData(new Repository.BillEntry
               {
                   BillID = obj.BillID,
                   BillNo = obj.BillNo,
                   BillDate = obj.BillDate,
                   SupBillDate = obj.SupBillDate,
                   SupBillNo = obj.SupBillNo,
                   SupplierID = obj.SupplierID,
                   CurrencyID = obj.CurrencyID,
                   department = obj.department,
                   Remarks = obj.Remarks,
                   CompanyID = obj.CompanyID,
                   Pur_Type = obj.Pur_Type,
                   Order_Type = obj.Order_Type,
                   ExchangeRate = obj.ExchangeRate,
                   Amount = obj.Amount,
                   InvoiceNo = obj.InvoiceNo,
                   IsInvoiced = obj.IsInvoiced,
                   SupplierType = obj.SupplierType


               }), Status.SUCCESS, "Updated Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(true, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> Delete(int Id)
       {
           return new Response<bool>(Brep.DeleteData(Id), Status.SUCCESS, "Deleted Successfully");
       }


       public Response<IQueryable<Domain.BillEntry>> GetDataMainList(int? companyId, int? suppid, string billno, string ordtype, string fromDate, string todate, string SuppType)
       {
           try
           {
               var CurDetList = Brep.GetDataMainList(companyId, suppid, billno, ordtype, fromDate, todate, SuppType);

               return new Response<IQueryable<Domain.BillEntry>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IQueryable<Domain.BillEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IQueryable<Domain.BillEntry>> Listddldet(int? companyId)
       {
           try
           {
               var CurDetList = Brep.Listddldet(companyId);

               return new Response<IQueryable<Domain.BillEntry>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IQueryable<Domain.BillEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

    }
}
