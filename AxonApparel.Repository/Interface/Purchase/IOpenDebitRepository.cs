using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;


namespace AxonApparel.Repository
{
    public interface IOpenDebitRepository
    {
        //int AddData(OpenDebitMas objReOpEntry);
        //bool AddDetData(List<OpenDebitItemDet> objOpeDet);
        bool AddDetAccData(OpenDebitMas objReOpEntry,List<OpenDebitItemDet> objOpeDet,List<Open_Debit_Addless> objOpAddDet);
        IQueryable<OpenDebit> GetDataMainOpDebRepDetails(int? Companyid, int? Partyid, int? Processid, string OrderType, string DebitOrCredit, string FromDate, string ToDate);
        IQueryable<OpenDebit> GetDataMainOpProcessRepDetails(int? Companyid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate);
        IQueryable<OpenDebit> GetDataMainOpSuppRepDetails(int? Companyid, int? Processid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate);
        IQueryable<OpenDebit> GetDataDebitMainRepDetails(int? Companyid, int? Processid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate, string orderno, string refno);
        IQueryable<OpenDebit> GetDataRepEditDebitDetails(int Id);
        IQueryable<OpenDebit> LoadmailDetails(int Id);
        IList<OpenDebitDet> GetDataDebRepEditItemDetails(int Debtid);
        IList<OpenDebitAddless> GetDataDebRepEditAddlessDetails(int Debtid);
        //bool UpdateData(OpenDebitMas objReEOpEntry);
        //bool UpdateDetData(List<OpenDebitItemDet> objOpeEDet,int Id);
        bool UpdateDetAccData(OpenDebitMas objReEOpEntry,List<OpenDebitItemDet> objOpeEDet,List<Open_Debit_Addless> objOpAddEDet, int Id);
        bool DeleteDetAccData(OpenDebitMas objReEOpEntry, List<OpenDebitItemDet> objOpeEDet, List<Open_Debit_Addless> objOpAddEDet, int Id);
    }
}
