using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IPurchaseOrderRepository 
    {
        IList<PurchaseOrder> GetRepLoad(int? companyId, int? BuyId, string BMasId, string RefNo, string StyId, string OType, string PType, string LocalImport, string PurIndType, string Itype, string Igroup);
        IList<PurchaseOrder> GetRepLoadIndentord(int? companyId, int? BuyId, string BMasId, string RefNo, int? StyId, string OType, string PType, string LocalImport, string PurIndType);       
        IList<PurchaseOrder> GetSRRepLoad(int? companyId, int? BuyId, string OrdNo, string RefNo, int? StyId, string OType, string PType);
        IList<PurchaseOrderItemDet> GetRepEntryItemLoad(string StyleRowId, string OType, string Purchase_ItemType, string LocalImport, string IGId, string PurIndType, int supplierid, string UserName);
        IList<PurchaseOrderDet> GetRepEntryOrderLoad(string StyleRowId, int ItemId, int ColorId, int SizeId, int Uomid, int quantity, string OType, string LocalImport, string PurIndType);
        int AddData(Pur_Ord_Mas objPoEntry);
        bool AddDetData(Pur_Ord_Mas objPoEntry, List<Pur_Ord_Det> objPoDet, List<Pur_Ord_BuyJob> objPoOrd, List<Pur_Ord_AddLess> objPoAddDet, string OType, List<TermsCondition> objPoTerm,string PurIndType);
        bool AddDetAccData(List<Pur_Ord_AddLess> objPoAddDet);
        IQueryable<PurchaseOrder> GetDataRepEditDetails(int Id);
        IList<PurchaseOrderItemDet> GetRepEntryEditItemLoad(int Id, string OType, string LocalImport, string PurIndType);
        IList<PurchaseOrderDet> GetRepEditOrderLoad(string PurOrdId, int ItemId, int ColorId, int SizeId, int Uomid, int quantity, string OType, string LocalImport, string PurIndType);
        //bool UpdateData(Pur_Ord_Mas objPoEEntry);
        bool UpdateDetData(Pur_Ord_Mas objPoEEntry, List<Pur_Ord_Det> objPoEDet, List<Pur_Ord_BuyJob> objPoEOrd, List<Pur_Ord_AddLess> objPoEADet, string OType, string PurIndType);
        bool UpdateAccData(List<Pur_Ord_AddLess> objPoEADet);
        IList<PurchaseOrderAccount> GetRepEditAccLoad(int Id);
        bool DeleteData(List<Pur_Ord_BuyJob> objPoOrd, int Id, string OType, string PurIndType);
        IQueryable<Pur_Ord_Mas> GetDataList();
        IQueryable<PurchaseOrder> GetDataOrderRepDetails(int? CompId, string OType);
        IQueryable<PurchaseOrder> GetDataStyleRepDetails(int? CompId, string OType);
        IQueryable<PurchaseOrder> GetRepDataPurNomDetails(string StyrowId,string IgId);
        IList<TermsCondition> GetTermsCondLoad(int Id);
        IList<TermsCondition> GetLoadTerms(int Termdetid);
        IQueryable<Domain.TermDet> GetTermDesc(int Termdetid);

        IQueryable<Domain.PurchaseOrder> GetStateGST(int Supplierid, int Companyid);
    }
}
