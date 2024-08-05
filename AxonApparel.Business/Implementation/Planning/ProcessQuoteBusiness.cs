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
   public  class ProcessQuoteBusiness:IProcessQuoteBusiness
    {


       IProcessQuoteRepository proRep = new ProcessQuoteRepository();


        public Response<IQueryable<ProcessQuote>> MainGetProcessQuote(int? companyId, string orderNo, string RefNo, string EntryNo, int? Supplierid, string fromDate, string toDate, string OType)
        {
            try
            {
                var CurDetList = proRep.GetDataMainList(companyId, orderNo, RefNo, EntryNo, Supplierid, fromDate, toDate, OType);

                return new Response<IQueryable<ProcessQuote>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<ProcessQuote>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProcessQuote>> GetOrderNoList()
        {
            try
            {
                var OrdList = proRep.GetDataList();
                return new Response<IQueryable<ProcessQuote>>(OrdList.Select(m => new ProcessQuote
                {
                    Process_QuoteNo = m.Process_QuoteNo,

                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessQuote>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeletePQ(int ID)
        {
            return new Response<bool>(proRep.DeleteData(ID), Status.SUCCESS, "Deleted Successfully");
        }
        public Response<IQueryable<ProcessQuote>> GetJobNo()
        {
            try
            {
                var couList = proRep.GetDataList();
                return new Response<IQueryable<ProcessQuote>>(couList.Select(m => new ProcessQuote
                {
                    //IsActive = m.IsActive ? "TRUE" : "FALSE",
                    //CountryId = m.CountryId,
                    //CityName = m.City1,
                    //CountryName = m.Country.country1,
                    //CityId = m.Id
                   // JobNo=m.jo
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<ProcessQuote>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
