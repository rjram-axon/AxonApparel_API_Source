using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ISalesInvoiceRepository
    {
        bool AddDetData(Sales_Inv_mas masEntry, List<Sales_Inv_Det> Det);
        bool UpdateDetData(Sales_Inv_mas masEntry, List<Sales_Inv_Det> Det);
        bool DeleteDetData(Sales_Inv_mas masEntry, List<Sales_Inv_Det> Det);

        IQueryable<Domain.Sales_Inv_mas> GetInvMasDetails(int Id);
        IQueryable<Domain.Sales_Inv_Det> GetInvDetails(int Id);
        IQueryable<Domain.Sales_Inv_mas> GetInvMainDetails(int? CompanyID, int? Order_No, int? Ref_no, int? StyleID, string frmDate, string ToDate, int? Entryid, string Jobno);
        IQueryable<Domain.Sales_Inv_mas> GetMainDDL();
    }
}
