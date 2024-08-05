using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public interface IPurchaseOrderBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="AddlesId"></param>
        /// <returns></returns>

       Response<IList<PurchaseOrder>> ListDetails(int? companyId, int? BuyId, string BMasId, string RefNo, string StyId, string OType, string PType, string LocalImport, string PurIndType, string Itype, string Igroup);
       Response<IList<PurchaseOrder>> ListIndentOrdDetails(int? companyId, int? BuyId, string BMasId, string RefNo, int? StyId, string OType, string PType, string LocalImport, string PurIndType);
       Response<IList<PurchaseOrder>> ListSRDetails(int? companyId, int? BuyId, string OrdNo, string RefNo, int? StyId, string OType, string PType);
       Response<IList<PurchaseOrderItemDet>> ListEntryItemDetails(string StyleRowId, string OType, string Purchase_ItemType, string LocalImport, string IGId, string PurIndType, int supplierid,string UserName);
       Response<IList<PurchaseOrderDet>> ListEntryOrderDetails(string StyleRowId, int Itemid, int ColorId, int Sizeid, int Uomid, int quantity, string OType, string LocalImport, string PurIndType);
       Response<bool> CreatePOrderEntry(PurchaseOrder POEntry);
       Response<IQueryable<PurchaseOrder>> GetDataPurEditDetails(int Id);
       Response<IList<PurchaseOrderItemDet>> GetItemEditDetails(int Id, string OType, string LocalImport, string PurIndType);
       Response<IList<PurchaseOrderAccount>> ListGetEditAddlessDetails(int Id);
       Response<IList<PurchaseOrderDet>> ListGetEditOrderDetails(string PurOrdId, int Itemid, int ColorId, int Sizeid, int Uomid, int quantity, string OType, string LocalImport, string PurIndType);
       Response<bool> UpdatePoEntry(PurchaseOrder PoEEntry);
       Response<bool> DeletePurchase(PurchaseOrder PoDEntry);
       Response<IQueryable<PurchaseOrder>> GetPoOrderNoList();
       Response<IQueryable<PurchaseOrder>> GetDataOrderDetails(int? companyid, string OType);
       Response<IQueryable<PurchaseOrder>> GetDataStyleDetails(int? companyid, string OType);
       Response<IQueryable<PurchaseOrder>> GetDataPurNomDetails(string StyleRowId, string IGId);
       Response<IList<TermsCondition>> GetTermEditDetails(int Id);
       Response<IList<TermsCondition>> GetLoadTerms(int Termdetid);
       Response<IQueryable<Domain.TermDet>> GetTermDesc(int Termdetid);

       Response<IQueryable<Domain.PurchaseOrder>> GetStateGST(int Supplierid, int Companyid);

    }
}
