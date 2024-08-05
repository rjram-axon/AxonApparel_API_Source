using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ICuttingOrderBusiness
    {
        Response<IQueryable<CuttingOrder>> GetCuttingOrderInfo();
        Response<IQueryable<CuttingOrder>> GetCuttingOrderDetails(int CompanyId, int CompanyUnitId, string OrderType, string refno, int styleid, string ordo, int Buyerid);
        Response<IList<Domain.CuttingOrder>> GetMaindt(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string cuttingordno, string jobordno, string FromDate, string ToDate,int supplierid);
        Response<IQueryable<CuttingOrder>> GetCuttingHeaderDetails(string JobOrdNo);
        Response<IList<Domain.CuttingOrder>> GetInputOutDet(int Prodprgid, string JobOrdNo, string Ordertype);
        Response<bool> CreateCuttingOrder(Domain.CuttingOrder CuttingOrderAdd);
        Response<bool> DeleteCuttingOrder(int CuttingOrdId);
        Response<IQueryable<CuttingOrder>> GetCuttingHeaderInformation(int CuttingOrdID);
        Response<IList<Domain.CuttingOrder>> GetInputOutDetEdit(int CuttingOrdMasId, int Prodprgid);
        Response<bool> UpdateCuttingOrder(Domain.CuttingOrder CuttingOrderUpd);
        Response<IQueryable<CuttingOrderStockProperties>> GetInputItemStockInfoEditMode(int CuttingOrdId, int ItemID, int ColorID, int SizeID);

        Response<IQueryable<CuttingOrderStockProperties>> GetInputItemStockInfo(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId, int Supplierid, string Processortype);
        Response<IList<Domain.CuttingOrder>> GetAllIssueNo();
    }
}
