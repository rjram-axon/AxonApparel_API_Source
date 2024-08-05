using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPurchaseCancelEntryBusiness
    {
        Response<IQueryable<PurchaseOrder>> ListEntryDetails(int Id);
        Response<IList<PurchaseOrderItemDet>> ListEntryCanItemDetails(int Id);
        Response<IList<PurchaseOrderDet>> ListEntryCanOrderDetails(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId);
        Response<bool> CreatePOrderCancelEntry(PurchaseOrder POEntry);
        Response<bool> UpdatePoCancelEntry(PurchaseOrder POEntry);
        Response<IQueryable<PurchaseOrder>> EditDetails(int Id);
        Response<IList<PurchaseOrderItemDet>> EditCanItemEditDetails(int Id);
        Response<IList<PurchaseOrderDet>> EdotOrderDetails(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId);
        Response<bool> DeleteCanPurchase(PurchaseOrder PoDEntry);
    }
}
