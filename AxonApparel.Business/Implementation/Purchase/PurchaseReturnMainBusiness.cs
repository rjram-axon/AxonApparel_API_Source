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
    public class PurchaseReturnMainBusiness:IPurchaseReturnMainBusiness
    {

        IPurchaseReturnRepositoryMain PRRep = new PurchaseReturnMainRepository();


        public Response<IQueryable<PurchaseReturn>> RetBussDetails(string OrderNo, string RefNo, int? SupplierID, int? CompanyID, int? Return_ID, string Ordtype, string FrmDate, string ToDate)
        {
            try
            {
                var PWO = PRRep.GetDataPurRetRepDetails(OrderNo, RefNo, SupplierID, CompanyID, Return_ID, Ordtype, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseReturn>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PurchaseReturn>> GetDataDropDetails(string Ordtype, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = PRRep.GetDataDropRepDetails(Ordtype, FrmDate, ToDate);

                return new Response<IQueryable<PurchaseReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
