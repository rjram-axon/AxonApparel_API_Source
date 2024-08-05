using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
   public interface IPurchaseCancelEntryRepository
    {

       IQueryable<PurchaseOrder> GetDataRepCanEditDetails(int Id);
       IList<PurchaseOrderItemDet> GetRepEntryCanEditItemLoad(int Id);
       IList<PurchaseOrderDet> GetRepCanEditOrderLoad(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId);
       int AddData(Pur_Cancel_Mas objPoEntry);
       bool UpdateData(Pur_Cancel_Mas objPoEEntry);
       bool AddDetData(Pur_Cancel_Mas objPoCanEntry, List<Pur_Cancel_Det> objPoDet, List<Pur_Cancel_Order> objPoOrd);
       bool UpdateDetData(Pur_Cancel_Mas objPoCanEditEntry,List<Pur_Cancel_Det> objPoDet, List<Pur_Cancel_Order> objPoOrd);
       IQueryable<PurchaseOrder> EditCanLoadRep(int Id);
       IList<PurchaseOrderItemDet> EditCanItemRep(int Id);
       IList<PurchaseOrderDet>EditCanOrderRep(int? pur_ord_id, int? ItemID, int? ColorID, int? SizeID, int? PurUomId);
       bool DeleteData(List<Pur_Cancel_Order> objPoOrd, int Id);
    }
}
