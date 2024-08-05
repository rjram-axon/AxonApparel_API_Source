using AxonApparel.Contract.Api;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Interface.Api
{
    public interface IApiBudgetApprovalRepository
    {
        IQueryable<Domain.BudgetApproval> LoadMaingrid( string type, string ordtype, string fromdate, string todate);
        IQueryable<Domain.Cost_defn_Bom> LoadBomdet(string ordno, int styleid);
        IQueryable<ApiBudgetDetails> LoadBomDetails(string orderno, int styleid);
        bool UpdateBudgetDetails(BudgetApproveMaster Budget);
        bool updateitembudgetdetails(BudgetApprovedetails budget);
        bool Revertitembudgetdetails(BudgetApprovedetails budget);
        IQueryable<Commercialdetials> LoadCommericaldetails(string orderno, int styleid);
        IQueryable<Budegetorderdetails> LoadOrderdetails(string orderno, int styleid);


    }
}
