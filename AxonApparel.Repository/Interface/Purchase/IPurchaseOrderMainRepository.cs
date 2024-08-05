using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
   public  interface IPurchaseOrderMainRepository
    {
       IQueryable<PurchaseOrder> GetDataPurMainRepDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string PurIndType, string IsApproved);
       IQueryable<PurchaseOrder> GetDataPOrderRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
       IList<PurchaseOrder> GetDataOrdeRefRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
       IQueryable<PurchaseOrder> GetDataStyleRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
       IQueryable<PurchaseOrder> GetDataSupplierRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
       IQueryable<PurchaseOrder> GetDataPurMainAppDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string Type, int ToApprove);
       IQueryable<Domain.PurchaseOrder> LoadMainOrderdet(int pid);
       IQueryable<Domain.PurchaseOrder> LoadPreOrderdet(int Itemid, int Sizeid, int Colorid);
       IQueryable<Domain.PurchaseOrder> GetSuppdet(int masid);
       IQueryable<PurchaseOrder> GetPoNoTrack();
       IQueryable<PurchaseOrder> GetRecNoTrack();
    }
}
