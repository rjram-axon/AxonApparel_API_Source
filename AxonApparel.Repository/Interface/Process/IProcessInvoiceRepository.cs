using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
   public interface IProcessInvoiceRepository
    {
       IQueryable<ProcessOrdMas> GetDataPrnRepDetails(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo, string OrderType, string ProcessorType, string FDate, string DDate);
       IQueryable<ProcessOrdMas> GetDataProcessOrdNoRepDetails(int? companyid, int? companyunitid, int? processid, string OrderType, string ProcessorType, string FDate, string DDate);
       IQueryable<ProcessOrdMas> GetDataProcessIssNoRepDetails(int? companyid, int? companyunitid, int? processid,int?ProcessOrdId, string OrderType, string ProcessorType, string FDate, string DDate);
       IList<ProcessOrdMas> GetRepPrnAddLoad(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo,string Dcno, string OrderType, string ProcessorType, string FDate, string DDate);
       IList<ProInvDc> GetRepInvPrnItemLoad(string PMasId, int? CompId, int? SuppId,int? ProcessId,int? unitid,string PType,string Otype);
       IList<ProInvDet> GetRepInvProItemLoad(string PMasId, int? CompId, int? SuppId, int? ProcessId, int? unitid, string PType, string Otype);
       IList<ProInvJobDet> GetRepInvProOrderLoad(string PMasId, string Otype);
       bool AddDetData(Process_Inv_Mas objPInvEntry, List<Process_Inv_Dc> objPDC, List<Process_Inv_Det> objPDet, List<Process_Inv_RateDiff> objPRateDiff, List<Process_Inv_JobDet> objPODet, List<Process_Inv_AddLess> objPADD);

       IQueryable<ProInvMas> GetDataPrnRepDetails(string OType, int? companyid, string FromDate, string ToDate);
       IQueryable<ProInvMas> GetDataUnitRepDetails(string OType, int? companyid, string FromDate, string ToDate);
       IQueryable<ProInvMas> GetDataProcessRepDetails(string OType, int? companyid, string FromDate, string ToDate);
       IQueryable<ProInvMas> GetDataOrderRefRepDetails(string OType, int? companyid, string FromDate, string ToDate);
       IQueryable<ProInvMas> GetDataProcessorRepDetails(string OType, int? companyid, string FromDate, string ToDate);
       IQueryable<ProInvMas> GetDataEntryNoRepDetails(string OType, int? companyid, string FromDate, string ToDate);


       IQueryable<ProInvMas> GetDataProMainRepDetails(string OrderType, int? CompanyId, string FromDate, string ToDate, int? ProcessId, int? UnitId, int? SupplierId, int? PrnMasId, int? Process_Invid, string OrdNo, string RefNo, string MultiFlag);
       IQueryable<ProInvMas> GetDataRepEditProInvDetails(int Id);
       IList<ProInvDc> GetRepEditInvPrnItemLoad(int? InvId, int? CompId, int? SuppId);
       IList<ProInvDet> GetRepProInvEditItemLoad(int? InvId, int? PrnMasId, int? CompId, int? SuppId);
       IList<ProInvJobDet> GetRepProInvEditOrdLoad(int? InvId, int? CompId, int? SuppId, int? grndetid);
       IList<ProInvAddLess> GetRepInvEditAddLessLoad(int? InvId);
       IList<ProInvRateDiff> GetRepInvEditRateDiffLoad(int? InvId);

       bool UpdateDetData(Process_Inv_Mas objEPInvEntry, List<Process_Inv_Dc> objPrE, List<Process_Inv_Det> objIE, List<Process_Inv_RateDiff> objERateDiff,List<Process_Inv_JobDet> objOE, List<Process_Inv_AddLess> objAE);
       bool DeleteDetData(Process_Inv_Mas objDInvEntry, List<Process_Inv_Dc> objPrD, List<Process_Inv_Det> objID, List<Process_Inv_JobDet> objOD, List<Process_Inv_AddLess> objAD);
       bool AddBillDetData(int billId, string EntryNo, string MType);

       IList<ProInvDc> MultiGetRepInvPrnItemLoad(string PMasId, int? CompId, int? SuppId, string ProcessId, int? unitid, string PType, string Otype);
       IList<ProInvDet> MultiGetRepInvProItemLoad(string PMasId, int? CompId, int? SuppId, string ProcessId, int? unitid, string PType, string Otype);
       IList<ProInvDc> MultiGetRepEditInvPrnItemLoad(int? InvId, int? CompId, int? SuppId);
       IQueryable<ProInvMas> GetDataBillRepDetails(int? CompanyId, int? SupplierId, string Inv_Date, int? BillId, string BOrdType, string BPurType, string IorE);
       IQueryable<ProInvMas> GetDataEditBillRepDetails(int? CompanyId, int? SupplierId, string Inv_Date, string Entry_No, string BOrdType, string BPurType);
   }
}
