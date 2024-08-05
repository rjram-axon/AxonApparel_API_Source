using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IPurchaseGrnEntryBusiness
    {
        Response<IList<PurchaseGrnItemDet>> ListGrnItemDetails(string PoId, int? CompId, int? SuppId, string pur_type);
        Response<IList<PurchaseGrnOrder>> ListEntryOrderDetails(string MPurId, int Itemid, int ColorId, int Sizeid, int Uomid, int quantity, string pur_type);
        Response<bool> CreatePGrnEntry(PurchaseGrnMas POGEntry);
        Response<IQueryable<PurchaseGrnMas>> GetDataPurGrnEditDetails(int Id);
        Response<IList<PurchaseGrnItemDet>> GetItemGrnEditDetails(int Id, int SupId, int CompId, string pur_type);
     
        Response<IList<PurchaseGrnOrder>> ListGetEditGrnOrderDetails(string GrnMasID, int Itemid, int ColorId, int Sizeid, int Uomid, int quantity, int SupId, int CompId, string pur_type);
        Response<bool> UpdateGrnEntry(PurchaseGrnMas PEDGEntry);
        Response<bool> DeleteGrnPurchase(PurchaseGrnMas PoDEntry);
        Response<IQueryable<PurchaseGrnMas>> GetGrnNoList();
        Response<PurchaseGrnMas> GetDataByRef(string DCNo, int supplierid, string CurrYear);

        Response<IList<PurchaseGrnItemDet>> GetPurchaseItemRemarks(int Detid, string Type);
    }
}
