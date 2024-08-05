using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public  class VendorBusiness:IVendorBusiness
    {
       IVendorRepository venRep = new VendorRepository();

       public Response<IQueryable<Vendor>> MainGetVendor(int? companyId, string orderNo, string RefNo, string EntryNo, int? Supplierid, string fromDate, string toDate, string OType)
        {
            try
            {
                var CurDetList = venRep.GetDataMainList(companyId, orderNo, RefNo, EntryNo, Supplierid, fromDate, toDate,OType);

                return new Response<IQueryable<Vendor>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Vendor>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
       public Response<IQueryable<Vendor>> GetOrderNoList()
       {
           try
           {
               var OrdList = venRep.GetDataList();
               return new Response<IQueryable<Vendor>>(OrdList.Select(m => new Vendor
               {
                   EntryNo = m.EntryNo,
               
               }), Status.SUCCESS, "Fetched Successfully");

           }
           catch (Exception)
           {
               return new Response<IQueryable<Vendor>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
       public Response<bool> DeleteVen(int ID)
       {
           return new Response<bool>(venRep.DeleteData(ID), Status.SUCCESS, "Deleted Successfully");
       }
    }
}
