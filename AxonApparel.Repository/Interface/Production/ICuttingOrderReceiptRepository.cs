using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ICuttingOrderReceiptRepository
    {
        IQueryable<CuttingReceipt> GetCuttingReceiptInf();
        IQueryable<CuttingReceipt> GetCuttingRecptDetails(int CompanyId, int CompanyUnitId, string OrdType, string refno, int styleid, string ordo, int buyerid, string jobordno, string inorext);
        IQueryable<CuttingReceiptDetails> GetCuttingRcptDet(int CuttingOrdId);
        IQueryable<CuttingReceiptDetails> GetCuttingGrammagePer(string OrdNo, int StyleId, string JobNo);
        bool AddData(CuttingReceipt objAdd);
        bool AddCuttingReceiptDet(List<CuttingReceiptDetails> objCuttingreceiptDet, string Mode);
        bool AddCuttingBundle(List<CuttingBundle> objCuttingbundle, string Mode);
        bool UpdateStockTable(CuttingReceipt objAdd, string Mode);
        IList<CuttingReceipt> GetMainData(int Id, string OrderType, string InterExternal, string Fromdate, string Todate, int companyid, string jobordno,
            string orderno, string refno, int employeeid, int unitid);
        bool DeleteData(int id, int Styleid, string CuttRcptno, string OrderNo);
        IQueryable<CuttingReceipt> GetCuttingReceiptHeaderInfo(int ReceiptID, int CuttingOrderID);
        List<CuttingReceiptDetails> GetCuttingRcptDetForEdit(int CuttingReceiptId, int CuttingOrderID);
        bool UpdateData(CuttingReceipt objUpd);
        bool UpdateMarkUpRate(int CuttingOrderId);
    }
}
