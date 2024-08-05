using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IBitCuttingOrderRepository
    {
        IQueryable<CuttingOrder> GetCuttingOrderInf();
        IQueryable<CuttingOrder> GetTrimsDetails(int CompanyId, int CompanyUnitId, string OrderType, string refno, int styleid, string ordo,int Buyerid,int processid);
        IList<CuttingOrder> GetMainData(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string cuttingordno, string jobordno, string FromDate, string ToDate,int supplierid,int processid);
        IQueryable<CuttingOrder> GetCuttingHeaderDet(string JobOrdNo);
        IList<CuttingOrder> GetInputOutputDetails(int Prodprgid, string JobOrdNo, string Ordertype);
        bool AddData(CuttingOrder objAdd);
        bool AddCuttingOrdDet(List<CuttingOrderDetail> objShipDet, string Mode, int ProdprgId);
        bool DeleteData(int id);
        int AddCuttingIssue(CuttingOrder objAdd);
        bool AddCuttingIssueDet(List<CuttingOrderDetail> objCuttingissueDet, string Mode);
        bool AddCuttingStockOutward(List<CuttingOrderDetail> objCuttingissueDet, string Mode);
        bool AddCuttingIssueStock(List<CuttingOrderDetail> objCuttingissueDet, string Mode);
        IQueryable<CuttingOrder> GetCuttingHeaderInfo(int CuttingOrdId);
        IList<CuttingOrder> GetInputOutputEdit(int CuttingOrdMasId, int Prodprgid);
        bool UpdateData(CuttingOrder objUpd);
        IQueryable<CuttingOrderStockProperties> GetItemStockInfoEditMode(int CuttingOrdId, int ItemID, int ColorID, int SizeID);
        bool MarkUpRateUpdation(int CuttingOrderId);
        IQueryable<CuttingOrderStockProperties> GetItemStockInfo(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId, int Supplierid, string processortype);

    }
}
