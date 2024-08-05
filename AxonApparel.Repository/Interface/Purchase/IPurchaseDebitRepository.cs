using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPurchaseDebitRepository
    {
        IList<PurDebitMas> GetRepAddDebLoad(int? CompId, int? SuppId, string DocType, string EntryType);
        IList<PurDebitItemdet> GetRepItemDebLoad(int? InvId, string DocType, string EntryType);
        IList<DebitOrdDetails> GetRepOrdDebLoad(int? GdetId, string Mode, string EType);
        IList<PurDebitOthers> GetRepRateDebLoad(int? InvId, string EType,string Stype);
        bool AddDetData(Pur_Debit_Mas objInvDebEntry, List<Pur_Debit_ItemDet> objPID, List<DebitOrderDetail> objPODet, List<Pur_Debit_Others> objPIOt);
        IQueryable<PurDebitMas> GetDataMainDebRepDetails(int? companyid, int? supplierid, string DocType, string EntryType, string DocumentNo, string FromDate, string ToDate);
        IQueryable<PurDebitMas> GetDataMainDebEntryRepDetails(int? companyid, int? supplierid, string DocType, string EntryType, string FromDate, string ToDate);
        IQueryable<PurDebitMas> GetDataRepEditDebDetails(int Id);
        IQueryable<PurDebitMas> LoadMailDetails(int Id);
        IList<PurDebitItemdet> GetRepEditItemDebLoad(int? InvId);
        IList<DebitOrdDetails> GetRepEditOrdDebLoad(int? Debit_id, int? GrnDetId, string Mode);
        bool UpdateDetData(Pur_Debit_Mas objInvDebEEntry, List<Pur_Debit_ItemDet> objPEID, List<DebitOrderDetail> objPEODet, List<Pur_Debit_Others> objPIEOt);
        bool DeleteDetData(Pur_Debit_Mas objInvDebDEntry, List<Pur_Debit_ItemDet> objPDID, List<DebitOrderDetail> objPDODet, List<Pur_Debit_Others> objPIDOt);
    }
}
