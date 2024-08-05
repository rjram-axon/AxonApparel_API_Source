using AxonApparel.Contract.Api;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business.Interface.Api
{
    public interface IApiBudgetApprovalBusiness
    {
        IQueryable<BudgetApproval> LoadMaingrid( string type, string ordtype, string fromdate, string todate);
        IQueryable<Domain.Cost_defn_Bom> LoadBomdet(string ordno, int styleid);
        IQueryable<ApiBudgetDetails> LoadBudgetDetails(string orderno, int styleid);
        bool UpdateBudgetDetails(BudgetApproveMaster Budget);
        bool updateitembudgetdetails(BudgetApprovedetails budget);
        bool Revertitembudgetdetails(BudgetApprovedetails budget);
        IQueryable<Commercialdetials> GetBudgetDetails(string orderno, int styleid);
        IQueryable<Budegetorderdetails> Budegetorderdetails(string orderno, int styleid);
        Budgetdetails GetAlldetials(string orderno, int styleid);

    }
}
