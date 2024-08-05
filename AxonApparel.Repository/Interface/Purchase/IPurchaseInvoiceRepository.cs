using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPurchaseInvoiceRepository
    {
        IQueryable<PurInvMas> GetDataOrderRepDetails(int? CompId, int? SuppId, string OType);
        IQueryable<PurInvMas> GetDataStyleRepDetails(int? CompId, int? SuppId, string OType, string OrdNo);
        IQueryable<PurInvMas> GetDataGrnRepDetails(int? CompId, int? SuppId, string OType, string OrdNo, int? StyId);
        IQueryable<PurInvMas> GetDataPoRepDetails(int? CompId, int? SuppId, string OType, string OrdNo, int? StyId, int? GrnMasId);
        IList<PurInvMas> GetRepAddLoad(int? CompId, int? SuppId, string OType, string OrdNo, int? StyId, int? GrnMasId, int? PMasId, string FDate, string ToDate);
        IList<PurInvDc> GetRepInvGrnItemLoad(string GMasId, int? CompId, int? SuppId);
        IList<PurInvDet> GetRepInvItemLoad(string GMasId, int? CompId, int? SuppId);
        IList<PurInvOrdDet> GetRepInvOrdLoad(string GMasId, int? CompId, int? SuppId, int? itemid, int? colorid, int? sizeid, int? grndetid);
        bool AddDetData(Pur_Inv_Mas objInvEntry, List<Pur_Inv_Dc> objPIDC, List<Pur_Inv_Det> objPIDet, List<Pur_Inv_Ord_det> objPIOrDet, List<Pur_Inv_Addless> objPIAdd, Pur_Inv_Debit_Credit objInvDebCreEntry);
        IQueryable<PurInvMas> GetDataSuppRepDetails(string OType, int? company_id, string FromDate, string ToDate);
        IQueryable<PurInvMas> GetDataOrderRepDetails(string OType, int? company_id, int? SuppId, string FromDate, string ToDate);
        IQueryable<PurInvMas> GetDataInvRepDetails(string OType, int? company_id, int? SuppId, string OrdNo, string FromDate, string ToDate);
        IQueryable<PurInvMas> GetDataMainRepDetails(string OType, int? company_id, int? SuppId, string OrdNo, string InvNo, string SupDcno, string FromDate, string ToDate, string RefNo);
        IQueryable<PurInvMas> GetDataRepEditInvDetails(int Id);
        IList<PurInvDc> GetRepInvGrnEditItemLoad(int? InvId, int? CompId, int? SuppId);
        IList<PurInvDet> GetRepInvEditItemLoad(int? InvId, int? GrnmasId, int? CompId, int? SuppId);
        IList<PurInvOrdDet> GetRepInvEditOrdLoad(int? InvId, int? CompId, int? SuppId, int? itemid, int? colorid, int? sizeid, int? grndetid);
        IList<PurInvAddless> GetRepInvEditAddLessLoad(int? InvId);
        bool UpdateDetData(Pur_Inv_Mas objEInvEntry, List<Pur_Inv_Dc> objPEIDC, List<Pur_Inv_Det> objPEIDet, List<Pur_Inv_Ord_det> objPEIOrDet, List<Pur_Inv_Addless> objPEIAdd, Pur_Inv_Debit_Credit objEInvDebCreEntry);
        bool DeleteDetData(Pur_Inv_Mas objDInvEntry, List<Pur_Inv_Dc> objPDIDC, List<Pur_Inv_Det> objPDIDet, List<Pur_Inv_Ord_det> objPDIOrDet, List<Pur_Inv_Addless> objPDIAdd, Pur_Inv_Debit_Credit objDInvDebCreEntry);
    }
}
