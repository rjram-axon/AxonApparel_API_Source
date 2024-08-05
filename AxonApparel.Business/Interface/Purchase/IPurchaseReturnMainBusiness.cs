using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
  public  interface IPurchaseReturnMainBusiness
    {
      Response<IQueryable<PurchaseReturn>> RetBussDetails(string OrderNo, string RefNo, int? SupplierID, int? CompanyID, int? Return_ID, string Ordtype, string FrmDate, string ToDate);
      Response<IQueryable<PurchaseReturn>> GetDataDropDetails(string Ordtype, string FrmDate, string ToDate);
    }
}
