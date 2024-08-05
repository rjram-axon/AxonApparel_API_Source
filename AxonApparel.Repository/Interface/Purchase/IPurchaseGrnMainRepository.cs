using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPurchaseGrnMainRepository
    {
        IQueryable<PurchaseGrnMas> GetDataOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        IQueryable<PurchaseGrnMas> GetDataPoOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        int GetPurid(int grnid);
        IQueryable<PurchaseGrnMas> GetDataSuppOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        IQueryable<PurchaseGrnMas> GetDataDcOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        IQueryable<PurchaseGrnMas> GetDataGrnOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        IQueryable<PurchaseGrnMas> GetDataStkGrnOrderRepDetails();
        IQueryable<PurchaseGrnMas> GetDataPurGrnMainRepDetails(string OrderNo, string RefNo, string Dc_no, int? supplierid, int? companyid, int? PurOrdId, int? Grn_MasId, string pur_type, string Pur_ItemType, string FromDate, string ToDate, string PurIndType);
        IQueryable<Domain.PurchaseGrnMas> LoadMainOrderdet(int pid);
        IQueryable<Domain.PurchaseGrnMas> LoadMainOrderStkdet(int pid);
        IQueryable<Domain.PurchaseGrnMas> LoadItemstockMovement(string GrnNo);
    }
}
