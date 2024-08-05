using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IOrderSecondsSalesRepository
    {
        IQueryable<DespatchAddGridDetail> GetDespatchAddGridDet(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid);
        Domain.OrderSalesInvoiceMas GetDespatchInnerHeaderInfo(int Invid);
        IQueryable<Domain.OrderSalesInvoiceDet> GetDespatchInnerItemDetail(int Invid );
        IQueryable<Domain.OrderSalesInvoiceDet> GetDespatchInnerItemDetailDespatch(int Invid);
        IList<DespatchMainGridProperty> GetMainData(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid);
        IQueryable<Domain.OrderSalesInvoiceDet> GetAddItemDetails(string ShipRowId);
        IList<Domain.OrderSalesInvoiceMas> GetInvdet(int compid);
        IQueryable<Domain.OrderSalesInvoiceAddless> GetAddlessDetails(int Invid);

        bool Add(OrderSalesInvoiceMas obj, List<OrderSalesInvoiceDet> objdet, List<OrderSalesInvoiceAddless> Accobj);
        bool Update(OrderSalesInvoiceMas obj, List<OrderSalesInvoiceDet> objdet, List<OrderSalesInvoiceAddless> Accobj);
        bool Delete(OrderSalesInvoiceMas obj, List<OrderSalesInvoiceDet> objdet, List<OrderSalesInvoiceAddless> Accobj);
    }
}
