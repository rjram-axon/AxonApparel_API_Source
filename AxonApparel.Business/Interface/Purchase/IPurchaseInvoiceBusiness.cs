using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPurchaseInvoiceBusiness
    {
        Response<IQueryable<PurInvMas>> GetDataOrderDetails(int? companyid, int? SuppId, string OType);
        Response<IQueryable<PurInvMas>> GetDataStyleDetails(int? companyid, int? SuppId, string OType, string OrdNo);
        Response<IQueryable<PurInvMas>> GetDataGrnDetails(int? companyid, int? SuppId, string OType, string OrdNo, int? StyId);
        Response<IQueryable<PurInvMas>> GetDataPoDetails(int? companyid, int? SuppId, string OType, string OrdNo, int? StyId, int? GrnMasId);
        Response<IList<PurInvMas>> ListAddDetails(int? companyid, int? SuppId, string OType, string OrdNo, int? StyId, int? GrnMasId,int? PMasId, string FromDate, string ToDate);
        Response<IList<PurInvDc>> ListInGrnItemDetails(string GMasId, int CompId, int SuppId);
        Response<IList<PurInvDet>> ListInItemDetails(string GMasId, int CompId, int SuppId);
        Response<IList<PurInvOrdDet>> ListInOrdDetails(string GMasId, int CompId, int SuppId, int ItemId, int ColorId, int SizeId, int GrnDetId);
        Response<bool> CreatePInvEntry(PurInvMas PIEntry);
        Response<IQueryable<PurInvMas>> GetDataSuppDetails(string OType, int? company_id, string FromDate, string ToDate);
        Response<IQueryable<PurInvMas>> GetDataOrdDetails(string OType, int? company_id, int? SuppId, string FromDate, string ToDate);
        Response<IQueryable<PurInvMas>> GetDataInvDetails(string OType, int? company_id, int? SuppId,string OrdNo, string FromDate, string ToDate);
        Response<IQueryable<PurInvMas>> GetDataInvMainDetails(string OType, int? company_id, int? SuppId, string OrdNo, string InvNo, string SupDcno, string FromDate, string ToDate, string RefNo);

        Response<IQueryable<PurInvMas>> GetInvEditDetails(int Id);
        Response<IList<PurInvDc>> ListInGrnEditItemDetails(int InvId, int CompId, int SuppId);
        Response<IList<PurInvDet>> ListInEditItemDetails(int InvId,int GrnMasId, int CompId, int SuppId);

        Response<IList<PurInvOrdDet>> ListInOrdEditDetails(int InvId, int CompId, int SuppId, int ItemId, int ColorId, int SizeId, int GrnDetId);
        Response<IList<PurInvAddless>> ListInAddLessEditDetails(int InvId);
        Response<bool> UpdateInvEntry(PurInvMas InvEEntry);
        Response<bool> DeleteInvEntry(PurInvMas InvDEntry);


    }
}
