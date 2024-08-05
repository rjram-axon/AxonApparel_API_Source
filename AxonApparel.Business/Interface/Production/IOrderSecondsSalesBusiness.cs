using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IOrderSecondsSalesBusiness
    {
        Response<IList<DespatchAddGridDetail>> GetDespatchAddGridDet(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid);
        Response<Domain.OrderSalesInvoiceMas> GetDespatchInnerHeaderInfo(int Invid);
        Response<IList<Domain.OrderSalesInvoiceDet>> GetDespatchInnerItemInfo(int Invid);
        Response<IList<Domain.OrderSalesInvoiceDet>> GetDespatchInnerItemInfoDespatch(int Invid);
        Response<IList<Domain.DespatchMainGridProperty>> GetMaindt(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid);   
        Response<IList<Domain.OrderSalesInvoiceDet>> GetAddItemDetails(string ShipRowId);
        Response<IList<Domain.OrderSalesInvoiceMas>> GetInvdet(int compid);
        Response<IList<Domain.OrderSalesInvoiceAddless>> GetAddlessDetails(int Invid);

        Response<bool> Add(Domain.OrderSalesInvoiceMas DespatAdd);
        Response<bool> Update(Domain.OrderSalesInvoiceMas DespatAdd);
        Response<bool> Delete(Domain.OrderSalesInvoiceMas DespatAdd);
    }
}
