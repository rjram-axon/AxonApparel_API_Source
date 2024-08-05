using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPurchaseDebitBusiness
    {
        Response<IList<PurDebitMas>> ListDebAddDetails(int? companyid, int? SuppId, string DocType, string EntryType);
        Response<IList<PurDebitItemdet>> ListDebItemDetails(int? InvId, string DocType, string EntryType);
        Response<IList<DebitOrdDetails>> ListDebOrderDetails(int? GdetId, string Mode, string EType);
        Response<IList<PurDebitOthers>> ListDebRateDetails(int? InvId, string EType,string Stype);
        Response<bool> CreatePDebInvEntry(PurDebitMas PIEntry);
        Response<IQueryable<PurDebitMas>> GetDataInvDebMainDetails(int? companyid, int? supplierid, string DocType, string EntryType, string DocumentNo, string FromDate, string ToDate);
        Response<IQueryable<PurDebitMas>> GetDataMainEntDropDetails(int? companyid, int? supplierid, string DocType, string EntryType, string FromDate, string ToDate);
        Response<IQueryable<PurDebitMas>> GetDebEditDetails(int Id);
        Response<IQueryable<PurDebitMas>> LoadMailDetails(int Id);
        Response<IList<PurDebitItemdet>> ListDebEditItemDetails(int? InvId);
        Response<IList<DebitOrdDetails>> ListDebEditOrderDetails(int? Debit_id, int? GrnDetId, string Mode);
        Response<bool> UpdatePDebInvEntry(PurDebitMas PIUEntry);
        Response<bool> DeletePDebInvEntry(PurDebitMas PIDEntry);

    }
}
