using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IPurchaseQualityBusiness
    {
        Response<IQueryable<PurchaseGrnMas>> GetDataQltyDetails(int Id);
        Response<IList<PurQltyDet>> GetQltyEntryItemDetails(int GrnId);
        Response<IList<PurQltyOrder>> GetQltyEntryOrderDetails(int GrnDetId);
        Response<IList<PurQltyOrder>> GetQltyEntryOrderSaveDetails(int GrnId);
        Response<bool> CreateQltyEntry(PurchaseGrnMas QEntry);
        Response<IQueryable<PurchaseGrnMas>> GetDataQltyEditDetails(int Id);
        Response<IList<PurQltyDet>> GetQltyEntryEditItemDetails(int GrnId);
        Response<IList<PurQltyDet>> GetQltyEntryCheckEditItemDetails(string TransNo);
        Response<IList<PurQltyOrder>> GetQltyEntryOrderEditDetails(int GrnDetId);
        Response<IList<PurQltyOrder>> GetQltyEntryEditOrderSaveDetails(int GrnId);
        Response<bool> UpdateQltyEntry(PurchaseGrnMas QEditEntry);
        Response<bool> DeleteQltyEntry(PurchaseGrnMas QDelEntry);
    }
}
