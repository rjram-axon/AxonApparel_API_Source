using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public interface IOpenDebitBusiness
    {
       Response<bool> CreateDebitEntry(OpenDebit DebEntry);
       Response<IQueryable<OpenDebit>> GetDataMainDebitDetails(int? Companyid, int? Partyid, int? Processid, string OrderType, string DebitOrCredit, string FromDate, string ToDate);
       Response<IQueryable<OpenDebit>> GetMainDebProcess(int? Companyid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate);
       Response<IQueryable<OpenDebit>> GetMainDebBussSupl(int? Companyid, int? Processid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate);
       Response<IQueryable<OpenDebit>> GetDataDebitMainDetails(int? Companyid, int? Processid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate, string orderno, string refno);
       Response<IQueryable<OpenDebit>> GetDebitEditDetails(int Id);
       Response<IQueryable<OpenDebit>> LoadmailDetails(int Id);
       Response<IList<OpenDebitDet>> GetStoresDebEntryItemEdit(int Id);
       Response<IList<OpenDebitAddless>> GetStoresDebEntryAddlessEdit(int Id);
       Response<bool> UpdateDebitEntry(OpenDebit PDUEntry);
       Response<bool> DeleteDebitEntry(OpenDebit PDDEntry);
    }
}
