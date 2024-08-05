using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
  
    public interface ISalesInvoiceBusiness
    {
        Response<bool> CreateEntry(Domain.Sales_Inv_mas MEntry);
        Response<bool> UpdateEntry(Domain.Sales_Inv_mas MEntry);
        Response<bool> DeleteEntry(Domain.Sales_Inv_mas MEntry);
        Response<IQueryable<Domain.Sales_Inv_mas>> GetInvMasDetails(int Id);
        Response<IQueryable<Domain.Sales_Inv_Det>> GetInvDetails(int Id);
        Response<IQueryable<Domain.Sales_Inv_mas>> GetInvMainDetails(int? CompanyID, int? Order_No, int? Ref_no, int? StyleID, string frmDate, string ToDate, int? Entryid, string Jobno);
        Response<IQueryable<Domain.Sales_Inv_mas>> GetMainDDL();
    }
}
