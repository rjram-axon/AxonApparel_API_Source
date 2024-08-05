using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IOrderItemDetailsBusiness
    {
        Response<IQueryable<Domain.Ord_styleTempMas>> GetOrderStyleTempLateDDL();
        Response<IQueryable<Domain.Ord_styleTempDet>> GetStyleTemp(int id);
        Response<bool> DeleteData(int id);
        Response<bool> UpdateOrderStyleTemplate(Domain.OrdCons_Mas Ord_styleTempDet);

        
        Response<IQueryable<Domain.Ord_styleTempDet>> GetOrderStyleTemp(int id);
        Response<bool> CreateOrderStyleTemplate(Domain.OrdCons_Mas StyleTemp);


        Response<IQueryable<Domain.OrdCons_Mas>> GetGarmentOrderNoList(int BMasId);
        Response<IQueryable<Domain.OrdCons_ProcSeq>> processdet(int conmasid);
        Response<IQueryable<Domain.OrdCons_YarnFab>> yarnfabdet(int conmasid);

        Response<IQueryable<BuyOrderStyle>> GetBuyOrderItemLoad(int buyormasid);
        Response<IQueryable<Domain.Ord_styleTempDet>> GetDataCheckPlanTempDetails(int tempid, int tempdetid);

    }
}
