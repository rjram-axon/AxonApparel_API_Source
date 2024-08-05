using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IProcessInvoiceBusiness
    {
        Response<IQueryable<ProcessOrdMas>> GetDataPrnDetails(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo, string OrderType, string ProcessorType, string FDate, string DDate);
        Response<IQueryable<ProcessOrdMas>> GetDataProcOrdNoDetails(int? companyid, int? companyunitid, int? processid,string OrderType, string ProcessorType, string FDate, string DDate);
        Response<IQueryable<ProcessOrdMas>> GetDataProcIssDetails(int? companyid, int? companyunitid, int? processid,int?ProcessOrdId, string OrderType, string ProcessorType, string FDate, string DDate);
        Response<IList<ProcessOrdMas>> ListPrnAddDetails(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo,string Dcno,string OrderType, string ProcessorType, string FDate, string DDate);
        Response<IList<ProInvDc>> ListInPrnItemDetails(string PMasId, int CompId, int SuppId,int ProcessId,int Unitid,string Ptype,string Otype);
        Response<IList<ProInvDet>> ListProInItemDetails(string PMasId, int CompId, int SuppId, int ProcessId, int Unitid, string Ptype, string Otype);
        Response<IList<ProInvJobDet>> ListProInOrderDetails(string PMasId, string Otype);

        Response<bool> CreateProInvEntry(ProInvMas PREntry);

        Response<IQueryable<ProInvMas>> GetDataPrnDetails(string OType, int? companyid, string FromDate, string ToDate);
        Response<IQueryable<ProInvMas>> GetDataUnitDetails(string OType, int? companyid, string FromDate, string ToDate);
        Response<IQueryable<ProInvMas>> GetDataProcessDetails(string OType, int? companyid, string FromDate, string ToDate);
        Response<IQueryable<ProInvMas>> GetDataOrderRefDetails(string OType, int? companyid, string FromDate, string ToDate);
        Response<IQueryable<ProInvMas>> GetDataProcessorDetails(string OType, int? companyid, string FromDate, string ToDate);
        Response<IQueryable<ProInvMas>> GetDataEntryNoDetails(string OType, int? companyid, string FromDate, string ToDate);

        Response<IQueryable<ProInvMas>> GetDataProInvMainDetails(string OrderType, int? CompanyId, string FromDate, string ToDate, int? ProcessId, int? UnitId, int? SupplierId, int? PrnMasId, int? Process_Invid, string OrdNo, string RefNo, string MultiFlag);

        Response<IQueryable<ProInvMas>> GetProInvEditDetails(int Id);
        Response<IList<ProInvDc>> ListInPrnEditItemDetails(int InvId, int CompId, int SuppId);
        Response<IList<ProInvDet>> ListProInEditItemDetails(int InvId, int PrnMasId, int CompId, int SuppId);
        Response<IList<ProInvJobDet>> ListProInOrdEditDetails(int InvId, int CompId, int SuppId, int GrnDetId);
        Response<IList<ProInvAddLess>> ListProInAddLessEditDetails(int InvId);
        Response<IList<ProInvRateDiff>> ListProInRateDiffEditDetails(int InvId);

        Response<bool> UpdateProInvEntry(ProInvMas PInvEEntry);
        Response<bool> DeleteProInvEntry(ProInvMas PInvDEntry);
        Response<bool> BillAddInvEntry(int billId, string EntryNo, string MType);

        Response<IList<ProInvDc>> MultiListInPrnItemDetails(string PMasId, int CompId, int SuppId, string ProcessId, int Unitid, string Ptype, string Otype);
        Response<IList<ProInvDet>> MultiListProInItemDetails(string PMasId, int CompId, int SuppId, string ProcessId, int Unitid, string Ptype, string Otype);
        Response<IList<ProInvDc>> MultiListInPrnEditItemDetails(int InvId, int CompId, int SuppId);


        Response<IQueryable<ProInvMas>> GetDataBillDetails(int? CompanyId, int? SupplierId, string Inv_Date, int? BillId, string BOrdType, string BPurType, string IorE);
        Response<IQueryable<ProInvMas>> GetDataEditBillDetails(int? CompanyId, int? SupplierId, string Inv_Date, string Entry_No, string BOrdType, string BPurType);
    }
}
