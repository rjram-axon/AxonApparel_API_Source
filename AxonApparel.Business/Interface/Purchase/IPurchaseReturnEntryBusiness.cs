using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IPurchaseReturnEntryBusiness
    {
        Response<IQueryable<PurchaseOrder>> GetDataSuppDetails(int? companyid);
        Response<IQueryable<PurchaseOrder>> GetDataGrnDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType);
        Response<IQueryable<PurchaseOrder>> GetDataPoDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType);
        Response<IQueryable<PurchaseOrder>> GetDataWrkDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id);
        Response<IQueryable<PurchaseOrder>> GetDataOrdDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, int? pur_ord_id);
        Response<IQueryable<PurchaseOrder>> GetDataStyleDetails(int? companyid, int? SupplierId, string Purchase_Type, string EType, string OrderNo, string job_ord_no);
        Response<IQueryable<PurchaseOrder>> GetDataGrnDcDetails(int? GrnMasId, string Purchase_Type);
        Response<IList<PurchaseReturnDet>> ListGetRetDetails(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string OType, string EType);
        Response<bool> CreatePReturnEntry(PurchaseReturn POGEntry);
        Response<IQueryable<PurchaseReturn>> GetDataPurRetEditDetails(int Id);
        Response<IList<PurchaseReturnDet>> ListGetEditRetDetails(int? CompanyID, int? SupplierID, int? storeid, string PurOrGrnNo, string OType, string EType,int? Return_ID);
        Response<bool> UpdatePoREntry(PurchaseReturn PoEEntry);
        Response<bool> DeletePoREntry(PurchaseReturn PoDEntry);
    }
}
