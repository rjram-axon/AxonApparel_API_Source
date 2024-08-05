using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IPurchaseReturnRepositoryMain
    {
        IQueryable<PurchaseReturn> GetDataPurRetRepDetails(string OrderNo, string RefNo, int? SupplierID, int? CompanyID, int? Return_ID, string Ordtype, string FrmDate, string ToDate);
        IQueryable<PurchaseReturn> GetDataDropRepDetails(string Ordtype, string FrmDate, string ToDate);
    }
}
