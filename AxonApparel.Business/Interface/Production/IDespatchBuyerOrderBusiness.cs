using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IDespatchBuyerOrderBusiness
    {
        Response<IList<DespatchAddGridDetail>> GetDespatchAddGridDet(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid);
        Response<IList<DespatchInnerDetail>> GetDespatchInnerHeaderInfo(int ShipRowId);
        Response<IList<DespatchInnerDetail>> GetDespatchInnerItemInfo(int ShipRowId, string OrderNo, string ShipNo);
        Response<IList<DespatchInnerDetail>> GetDespatchInnerItemStockInfo(string OrderNo, string JobOrderNo, int itemId, int ColorId, int SizeId, int StoreUnitId);
        Response<IList<Domain.DespatchMainGridProperty>> GetMaindt(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid, string ShipType);
        Response<bool> CreateDespatch(Domain.DespatchMas DespatAdd);
        Response<IQueryable<DespatchMas>> GetDespatchHeaderInformation(int DespatchId);
        Response<bool> DeleteDespatch(int DepatchID);
        Response<bool> UpdateDespatch(Domain.DespatchMas DespatUpd);
    }
}
