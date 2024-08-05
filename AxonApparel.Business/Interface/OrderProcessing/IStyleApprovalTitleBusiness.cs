using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IStyleApprovalTitleBusiness
    {
        Response<bool> CreateEntry(buyordapptitle MEntry);
        Response<bool> UpdateEntry(buyordapptitle MEntry);
        Response<bool> DeleteEntry(buyordapptitle MEntry);
        Response<IQueryable<Domain.BuyOrderStyle>> GetAppmasDetails(int Id);
        Response<IQueryable<Domain.Approval>> GetAppDDLdet(int Id);
        Response<IQueryable<Domain.buyordapptitle>> GetAppEditDetails(string Ordno,int Id);
    }
}
