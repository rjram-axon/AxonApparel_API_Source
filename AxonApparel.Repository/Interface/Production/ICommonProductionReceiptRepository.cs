using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ICommonProductionReceiptRepository
    {
        IQueryable<CommonProdReceipt> GetCommonProductionMultipleIssueDet(int CompanyUnitId, int ProcessId, int workdivisionId, string InterorExter, string OType, string RefNo, int StyId, string OrdNo, int CompId);
        IQueryable<CommonProdReceipt> GetCommonProductionReceiptDet(string ProdIssueId);
        int AddProductionReceipt(ProdReceiptMas objAdd);
        bool AddProductionReceiptDet(List<ProdReceiptDet> objProdRecptDet, string Mode, ProdReceiptMas ProductionRecptMas);
        IList<ProductionReceiptMainDetail> GetMainData(int ID, string FromDate, string ToDate, string InterExter, string DcNo, int Recptid, string OType, string OrdNo, string Refno, int ProcessId, int processorid);
        IList<ProductionReceiptMainDetail> GetMainDatalist(int ID, string FromDate, string ToDate, string InterExter, string DcNo, int Recptid, string OType, string OrdNo, string Refno, int ProcessId, int processorid);
        IQueryable<ProdReceiptMas> GetCommProdReceptHeaderInfo(int ProdRecptId);
        IList<ProdReceiptReason> GetReceiptReasonforEditMode(int ReceiptDetId);
        IQueryable<CommonProdReceipt> GetReceiptDetforEditMode(int ReceiptId);
        //bool AddProductionReceiptReason(List<ProdReceiptReason> objProdRecptReason, string Mode);
        IQueryable<ProdReceiptReason> GetReasonDetforEditMode(int ReceiptDetId);
        bool UpdateData(ProdReceiptMas objUpd);
        bool DeleteReceipt(ProdReceiptMas objUpd);
        bool GetCommProdReceptItemstock(string ProdRecptNo);
        //bool DeleteReceipt(int id,string type);
    }
}
