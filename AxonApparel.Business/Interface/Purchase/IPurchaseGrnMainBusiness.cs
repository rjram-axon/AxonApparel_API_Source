using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPurchaseGrnMainBusiness
    {
        Response<IQueryable<PurchaseGrnMas>> GetDataOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        Response<int> GetPurchaseOrderId(int GrnId);
        Response<IQueryable<PurchaseGrnMas>> GetDataPoOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseGrnMas>> GetDataSuppOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseGrnMas>> GetDataDcOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseGrnMas>> GetDataGrnOrderDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        Response<IQueryable<PurchaseGrnMas>> GetDataStockGrnDetails();
        Response<IQueryable<PurchaseGrnMas>> GetDataGrnMainDetails(string OrderNo, string RefNo, string Dc_no, int? supplierid, int? companyid, int? PurOrdId, int? Grn_MasId, string pur_type, string Pur_ItemType, string FromDate, string ToDate, string PurIndType);
        Response<IQueryable<Domain.PurchaseGrnMas>> LoadMainOrderdet(int pid);
        Response<IQueryable<Domain.PurchaseGrnMas>> LoadMainOrderStkdet(int pid);
        Response<IQueryable<Domain.PurchaseGrnMas>> LoadItemstockMovement(string GrnNo);
    }
}
