using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IProductionInvoiceBusiness
    {
        Response<IList<ProdInvMas>> ListPrdAddDetails(int? Companyid, int? CompanyUnitId, int? Processorid, string Processid, int? BuyerId, string OrdNo, string OrdRefNo, string OrderType, string InternalOrExternal);
        Response<IList<ProdInvDc>> ListInPrdItemDetails(string PMasId, int SuppId, int ProcessId);
        Response<IList<ProdInvDet>> ListProdEntryItemDetails(string PMasId, int SuppId, int ProcessId);
        Response<IList<ProdInvJobDet>> ListProdInOrderDetails(string PMasId, int SuppId, int ProcessId);


        Response<bool> CreateProdInvEntry(ProdInvMas PRDEntry);

        Response<IQueryable<ProdInvMas>> GetDataEntryDetails(int? companyid, string FromDate, string ToDate);
        Response<IQueryable<ProdInvMas>> GetDataUnitDetails(int? companyid, string FromDate, string ToDate);
        Response<IQueryable<ProdInvMas>> GetDataOrderRefDetails(int? companyid, string FromDate, string ToDate);
        Response<IQueryable<ProdInvMas>> GetDataWkDivDetails(int? companyid,string PType, string FromDate, string ToDate);
        Response<IQueryable<ProdInvMas>> GetDataWkOrderDetails(int? companyid, string FromDate, string ToDate);
        Response<IQueryable<ProdInvMas>> GetDataProcessDetails(int? companyid, string FromDate, string ToDate);

        Response<IQueryable<ProdInvMas>> GetDataProdInvMainDetails(string OrderType,string Ptype, int? CompanyId, string FromDate, string ToDate, int? ProcessId, int? UnitId, int? SupplierId, int? PrdMasId, string OrdNo, string RefNo,string JobNo);
        Response<IQueryable<ProdInvMas>> GetProdInvEditDetails(int Id);
        Response<IList<ProdInvDc>> ListInPrdEditItemDetails(int InvId, int CompId, int SuppId);
        Response<IList<ProdInvDet>> ListProdInEditItemDetails(int InvId, int GrnMasId, int CompId, int SuppId);
        Response<IList<ProdInvJobDet>> ListProdInOrdEditDetails(int InvId, int CompId, int SuppId,int ProdRecptDetId);
        Response<IList<ProdInvRatediff>> ListProdInRateDiffEditDetails(int InvId);
        Response<IList<ProdInvAddless>> ListProdInAddLessEditDetails(int InvId);


        Response<bool> UpdateProdInvEntry(ProdInvMas PdInvEEntry);
        Response<bool> DeleteProdInvEntry(ProdInvMas PdInvDEntry);
    }
}
