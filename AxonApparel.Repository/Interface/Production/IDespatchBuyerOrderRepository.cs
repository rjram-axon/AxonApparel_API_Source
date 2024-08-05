using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IDespatchBuyerOrderRepository
    {
        IQueryable<DespatchAddGridDetail> GetDespatchAddGridDet(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid);
        IQueryable<DespatchInnerDetail> GetDespatchInnerHeaderInfo(int ShipRowId);
        IQueryable<DespatchInnerDetail> GetDespatchInnerItemDetail(int ShipRowId, string OrderNo, string ShipNo);
        IQueryable<DespatchInnerDetail> GetDespatchInnerItemStockDetail(string OrderNo, string JobOrderNo, int itemId, int ColorId, int SizeId, int StoreUnitId);
        IList<DespatchMainGridProperty> GetMainData(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid, string ShipType);
        bool AddDespatch(Domain.DespatchMas objAdd);
        IQueryable<Domain.DespatchMas> GetDespatchHeaderInfo(int DespatchId);
        bool DeleteDespatch(int id);
        List<Domain.DespatchStock> GetDespatchStockInfo(int DespatchId);
        bool UpdateDespatch(Domain.DespatchMas objUpd);
    }
}
