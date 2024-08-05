using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IProcessQuoteEntryBusiness
    {
        Response<bool> CreatePQuoteEntry(ProcessQuote PQEnt);
        Response<IQueryable<ProcessQuote>> GetDataPQEditBusDetails(int PQMId);
        Response<IList<ProProcessQuote>> GetEditPQPRDetList(int MasId);
        Response<IList<ProProcessQuote>> GetOrdPQPRDetList(string JobOrdNo);
        Response<IList<ProcessQuoteDet>> GetOrdItemList(string JobOrdNo, int ProId);
        Response<IList<ProcessQuoteDet>> GetProcessQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid, int Processid, int Compid);

        Response<IList<ProcessQuoteDet>> GetEditPQIDetList(int MasId);
        Response<IList<ProcessQuote>> GetEditOrderList(int MasId);
        Response<bool> UpdatePQEntry(ProcessQuote ObjUPend);
        Response<IQueryable<ProcessQuote>> GetDataOrdDetails(int Id);
        /// <summary>
        /// This method will return City list
        /// </summary>
        /// <returns></returns>
       // Response<IQueryable<ProcessQuote>> GetJobNo();

    }
}
