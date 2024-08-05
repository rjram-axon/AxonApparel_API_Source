using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IProcessQuoteEntryRepository
    {
        int AddData(Process_Quote objCmas);

        bool AddDetPrData(List<Process_QuotePro> objCDet, List<Process_Quote_Det> objCPDet);
        IQueryable<ProcessQuote> GetDataEditRepDetails(int PQMasId);
        IList<ProProcessQuote> GetEditPQPRRepDetList(int PQMasId);
        IList<ProProcessQuote> GetOrdPQPRRepDetList(string JobNo);
        IList<ProcessQuoteDet> GetOrdItemDet(string JobNo, int ProcessId);
        IList<ProcessQuoteDet> GetProcessQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid, int Processid, int Compid);

        IList<ProcessQuoteDet> GetDataEditPQIRepDetails(int PQMasId);
        IList<ProcessQuote> GetRepOrdDetails(int PQMasId);
        bool UpdateData(Process_Quote objAd);
        bool UpdateDetData(List<Process_QuotePro> deldetprolist, List<Process_QuotePro> objAdDet);
        bool UpdateItemDetData(List<Process_Quote_Det> DelDetItemList,List<Process_Quote_Det> objAdItemDet);
        IQueryable<ProcessQuote> GetDataOrdDetails(int Id);
        //Job_Ord_Mas GetDataList();
    }
}
