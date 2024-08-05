using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPurchaseGrnEntryRepository
    {
        IList<PurchaseGrnItemDet> GetRepGrnItemLoad(string PoId, int? CompId, int? SuppId,string pur_type);
        IList<PurchaseGrnOrder> GetRepEntryGrnOrderLoad(string MPurId, int ItemId, int ColorId, int SizeId, int Uomid, int quantity,string pur_type);
        //int AddData(Pur_Grn_Mas objPoEntry);
        bool AddDetData(Pur_Grn_Mas objPoEntry,List<Pur_Grn_Det> objPoDet, List<Pur_Grn_Order> objPoOrd);
        IQueryable<PurchaseGrnMas> GetDataRepGrnEditDetails(int Id);
        IList<PurchaseGrnItemDet> GetRepGrnEntryEditItemLoad(int Id, int SupId, int CompId, string pur_type);
        IList<PurchaseGrnOrder> GetRepGrnEditOrderLoad(string GrnMasId, int ItemId, int ColorId, int SizeId, int Uomid, int quantity, int SupId, int CompId, string pur_type);
        bool UpdateData(Pur_Grn_Mas objPoEEntry);
        bool UpdateDetData(Pur_Grn_Mas objPoEEntry,List<Pur_Grn_Det> objPoEDet, List<Pur_Grn_Order> objPoEOrd);
        bool DeleteData(List<Pur_Grn_Order> objPoOrd, int Id);
        IQueryable<Pur_Grn_Mas> GetDataList();
        Pur_Grn_Mas CheckRefRep(string DCNo, int supplierid, string CurrYear);
        IList<PurchaseGrnItemDet> GetPurchaseItemRemarks(int Detid, string Type);
    } 
}
