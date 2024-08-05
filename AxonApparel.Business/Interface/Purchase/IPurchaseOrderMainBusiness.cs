using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public interface IPurchaseOrderMainBusiness
    {
       Response<IQueryable<PurchaseOrder>> GetDataPirMainDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string PurIndType, string IsApproved);
       Response<IQueryable<PurchaseOrder>> GetDataPOrderDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
       Response<IList<PurchaseOrder>> GetDataOrderRefDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
       Response<IQueryable<PurchaseOrder>> GetDataStyleDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
       Response<IQueryable<PurchaseOrder>> GetDataSupplierDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
       Response<IQueryable<PurchaseOrder>> GetDataPurMainAppDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string Type, int ToApprove);
       Response<IQueryable<Domain.PurchaseOrder>> LoadMainOrderdet(int pid);
       Response<IQueryable<Domain.PurchaseOrder>> LoadPreOrderdet(int Itemid, int Sizeid, int Colorid);
       Response<IQueryable<Domain.PurchaseOrder>> GetSuppdet(int masid);
       Response<IQueryable<PurchaseOrder>> GetPoNoTrack();
       Response<IQueryable<PurchaseOrder>> GetRecNoTrack();
    }
}
