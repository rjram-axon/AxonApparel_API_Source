using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ICommonProductionReceiptBusiness
    {
        Response<IList<CommonProdReceipt>> GetCommonProductionIssueDet(int CompanyUnitId, int ProcessId, int WorkDivisionId, string InterorExter, string OType, string RefNo, int StyId, string OrdNo, int CompId);
        Response<IList<CommonProdReceipt>> GetCommonProductionReceiptDet(string ProdIssueId);
        Response<int> CreateProductionReceipt(Domain.ProdReceiptMas ProductionRecptAdd);
        Response<IList<Domain.ProductionReceiptMainDetail>> GetMaindt(int CompId, string Fromdate, string Todate, string RecptType, string InterExter, string DcNo, int Recptid, string OType, string OrdNo, string Refno, int ProcessId, int processorid);
        Response<IList<Domain.ProductionReceiptMainDetail>> GetMaindtlist(int CompId, string Fromdate, string Todate, string RecptType, string InterExter, string DcNo, int Recptid, string OType, string OrdNo, string Refno, int ProcessId, int processorid);
        Response<IQueryable<ProdReceiptMas>> GetCommProdReceiptHeaderInformation(int ProdReceptId);
        Response<IList<CommonProdReceipt>> GetCommonProdReceiptForEdit(int ProdReceiptId);
        Response<IList<ProdReceiptReason>> GetCommonProdReasonForEdit(int ProdReceiptId);
        Response<bool> UpdateCommProdReceipt(Domain.ProdReceiptMas ProductionReceiptUpdate);
        Response<bool> GetCommProdReceiptItemStock(string ReceiptNo);
        Response<bool> DeleteCommProdReceipt(ProdReceiptMas Spm);
    }
}
