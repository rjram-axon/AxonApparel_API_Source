using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public interface IPurchaseGrnAddBusiness
    {
       Response<IList<PurchaseGrnMas>> GetDataOrderDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string OrderNo, string RefNo, int? SupplierId, int? companyid, string PurIndType);
       Response<IQueryable<PurchaseGrnMas>> GetDataOrderDropDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType);
       Response<IQueryable<PurchaseGrnMas>> GetDataRefDropDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType);
       Response<IQueryable<PurchaseGrnMas>> LoadMainOrderdet(int pid);

       Response<IEnumerable<Domain.PurchaseGrnMas>> GetDataOrderDetails_Barcode(string LocalImport, string Purchase_Type, string Purchase_ItemType, string OrderNo, string RefNo, int? SupplierId, int? companyid, string PurIndType);
    }
}
