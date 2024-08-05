using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IStyleApprovalTitleRepository
    {
        bool AddData(List<Repository.buyordapptitle> AppList);
        bool UpdateData(List<Repository.buyordapptitle> AppList);
        bool DeleteData(List<Repository.buyordapptitle> AppList);
        IQueryable<Domain.BuyOrderStyle> GetAppmasDetails(int Id);
        IQueryable<Domain.Approval> GetAppDDLdet(int Id);
        IQueryable<Domain.buyordapptitle> GetAppEditDetails(string Ordno,int Id);
    }
}
