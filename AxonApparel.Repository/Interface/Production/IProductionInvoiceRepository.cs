using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IProductionInvoiceRepository
    {
        IList<ProdInvMas> GetRepPrdAddLoad(int? Companyid, int? CompanyUnitId, int? Processorid, string Processid, int? BuyerId, string OrdNo, string OrdRefNo, string OrderType, string InternalOrExternal);
        IList<ProdInvDc> GetRepInvPrdItemLoad(string PMasId, int? SuppId, int? ProcessId);
        IList<ProdInvDet> GetRepInvPrdEntryItemLoad(string PMasId, int? SuppId, int? ProcessId);
        IList<ProdInvJobDet> GetRepInvPrdEntryOrderLoad(string PMasId, int? SuppId, int? ProcessId);

        bool AddDetData(ProductionInvoiceMas objPDInvEntry, List<ProductionInvoiceDc> objPDDC, List<ProductionInvoiceDet> objPDDet, List<ProductionInvoiceRateDiff> objPDRateDiff, List<ProductionInvoiceOrdDet> objPDODet, List<ProductionInvoiceAddless> objPDADD);

        IQueryable<ProdInvMas> GetDataEntryRepDetails(int? companyid, string FromDate, string ToDate);
        IQueryable<ProdInvMas> GetDataUnitRepDetails(int? companyid, string FromDate, string ToDate);
        IQueryable<ProdInvMas> GetDataOrderRefRepDetails(int? companyid, string FromDate, string ToDate);
        IQueryable<ProdInvMas> GetDataWkDivRepDetails(int? companyid,string PType, string FromDate, string ToDate);
        IQueryable<ProdInvMas> GetDataWkOrderRepDetails(int? companyid, string FromDate, string ToDate);
        IQueryable<ProdInvMas> GetDataProcessRepDetails(int? companyid, string FromDate, string ToDate);

        IQueryable<ProdInvMas> GetDataProdMainRepDetails(string OrderType, string PType,int? CompanyId, string FromDate, string ToDate, int? ProcessId, int? UnitId, int? SupplierId, int? PrdMasId, string OrdNo, string RefNo,string JobNo);

        IQueryable<ProdInvMas> GetDataRepEditProdInvDetails(int Id);
        IList<ProdInvDc> GetRepEditInvItemLoad(int? InvId, int? CompId, int? SuppId);

        IList<ProdInvDet> GetRepInvPrdEntryEditItemLoad(int InvId, int? GrnMasId, int? CompId, int? SuppId);
        IList<ProdInvJobDet> GetRepInvPrdEntryEditOrderLoad(int InvId, int? CompId, int? SuppId, int? ProdRecptDetId);
        IList<ProdInvRatediff> GetRepInvPrdEntryEditRateDiffLoad(int InvId);
        IList<ProdInvAddless> GetRepInvPrdEntryEditAddlessLoad(int InvId);

        bool UpdateDetData(ProductionInvoiceMas objPDEInvEntry, List<ProductionInvoiceDc> objEPDDC, List<ProductionInvoiceDet> objEPDDet, List<ProductionInvoiceRateDiff> objEPDRateDiff, List<ProductionInvoiceOrdDet> objEPDODet, List<ProductionInvoiceAddless> objEPDADD);

        bool DeleteDetData(ProductionInvoiceMas objDPDInvEntry, List<ProductionInvoiceDc> objDPDDC, List<ProductionInvoiceDet> objDPDDet, List<ProductionInvoiceRateDiff> objDPDRateDiff, List<ProductionInvoiceOrdDet> objDPDODet, List<ProductionInvoiceAddless> objDPDADD);


    }
}
