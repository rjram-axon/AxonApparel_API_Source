using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IGarmentItemBusiness
    {
        Response<IEnumerable<Ord_styleTempMas>> GetOrderStyleTempLateDDL();



        Response<IQueryable<Domain.Ord_styleTempDet>> GetStyleTemp(int id);
        Response<bool> DeleteData(int id);
        Response<bool> UpdateOrderStyleTemplate(Domain.Ord_styleTempMas Ord_styleTempDet);
        Response<IQueryable<Domain.Ord_styleTempDet>> GetOrderStyleTemp(int id);
        Response<int> CreateOrderStyleTemplate(Domain.Ord_styleTempMas StyleTemp);
        Response<IQueryable<BuyOrderStyle>> GetGarmentOrderNoList(int BMasId);
        Response<IQueryable<BuyOrderStyle>> GetBuyOrderItemLoad(int buyormasid);
        Response<IQueryable<Domain.Ord_styleTempDet>> GetDataCheckPlanTempDetails(int tempid,int tempdetid);

    }
}
