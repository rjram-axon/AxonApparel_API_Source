using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
   public interface IPurchaseGrnAddRepository
    {
       IList<PurchaseGrnMas> GetDataGrnOrderRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string OrderNo, string RefNo, int? SupplierId, int? companyid, string PurIndType);
       IQueryable<PurchaseGrnMas> GetDataGrnOrderDropRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType);
       IQueryable<PurchaseGrnMas> GetDataGrnRefDropRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType);
       IQueryable<PurchaseGrnMas> LoadMainOrderdet(int pid);

       IEnumerable<Domain.PurchaseGrnMas> GetDataGrnOrderRepDetails_Barcode(string LocalImport, string Purchase_Type, string Purchase_ItemType, string OrderNo, string RefNo, int? SupplierId, int? companyid, string PurIndType);
   }
}
