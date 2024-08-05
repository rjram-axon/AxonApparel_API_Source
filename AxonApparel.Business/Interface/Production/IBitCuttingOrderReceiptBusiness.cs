using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IBitCuttingOrderReceiptBusiness
    {
        Response<IQueryable<CuttingReceipt>> GetCuttingReceiptInfo();
        Response<IQueryable<CuttingReceipt>> GetCuttingOrderDetails(int CompanyId, int CompanyUnitId, string OrdType, string refno, int styleid, string ordo, int buyerid, string jobordno, string inorext,int processid);
        Response<IQueryable<CuttingReceiptDetails>> GetCuttingDetails(int CuttingOrdId);
        Response<IQueryable<CuttingReceiptDetails>> GetCuttingGrammageDet(string OrderNo, int StyleId, string JobNo);
        Response<bool> CreateCuttingReceipt(Domain.CuttingReceipt CuttingReceiptAdd);
        Response<IList<Domain.CuttingReceipt>> GetMaindt(int ID, string OrderType, string InterExternal, string FromDate, string ToDate, int companyid, string jobordno,
            string orderno, string refno, int employeeid, int unitid,int Processid);
        Response<bool> DeleteCuttingOrderReceipt(int CuttingRecptId, int Styleid, string CuttRcptno, string OrderNo);
        Response<IQueryable<CuttingReceipt>> ReceiptHeaderInformation(int CuttingReceiptID, int CuttingOrderID);
        Response<bool> UpdateCuttingReceipt(Domain.CuttingReceipt CuttingReceiptUpd);
    }
}
