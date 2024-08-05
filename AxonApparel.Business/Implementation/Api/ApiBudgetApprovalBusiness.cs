
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Business.Interface.Api;
using AxonApparel.Repository.Interface.Api;
using AxonApparel.Domain;
using AxonApparel.Repository.Implementation.Api;
using AxonApparel.Contract.Api;

namespace AxonApparel.Business.Implementation.Api
{
    public class ApiBudgetApprovalBusiness : IApiBudgetApprovalBusiness
    {
        IApiBudgetApprovalRepository ApiBuget = new ApiBudgetApprovalRepository();    

        public IQueryable<BudgetApproval> LoadMaingrid( string type, string ordtype, string fromdate, string todate)
        {
            return ApiBuget.LoadMaingrid( type,  ordtype,  fromdate, todate);
        }
        public IQueryable<Cost_defn_Bom> LoadBomdet(string ordno, int styleid)
        {
            return ApiBuget.LoadBomdet(ordno, styleid);
        }

        public bool UpdateBudgetDetails(BudgetApproveMaster Budget)
        {
            return ApiBuget.UpdateBudgetDetails(Budget);
        }

        public bool updateitembudgetdetails(BudgetApprovedetails budget)
        {
            return ApiBuget.updateitembudgetdetails(budget);
        }

        public bool Revertitembudgetdetails(BudgetApprovedetails budget)
        {
            return ApiBuget.Revertitembudgetdetails(budget);
        }

        public IQueryable<ApiBudgetDetails> LoadBudgetDetails(string orderno, int styleid)
        {
            return ApiBuget.LoadBomDetails(orderno, styleid);

        }

        public IQueryable<Commercialdetials> GetBudgetDetails(string orderno, int styleid)
        {
            return ApiBuget.LoadCommericaldetails(orderno, styleid);            
        }

        public IQueryable<Budegetorderdetails> Budegetorderdetails(string orderno, int styleid)
        {
            return ApiBuget.LoadOrderdetails(orderno, styleid);
        }

        public Budgetdetails GetAlldetials(string orderno, int styleid)
        {
            try
            {
                
                Budgetdetails budget = new Budgetdetails();
                var data = ApiBuget.LoadOrderdetails(orderno, styleid);
                budget.orderdetails = data;
                budget.budget = ApiBuget.LoadBomDetails(orderno, styleid);
                budget.commerical = ApiBuget.LoadCommericaldetails(orderno, styleid);

                //IQueryable<Budgetdetails> budget1 = (IQueryable<Budgetdetails>)budget;
                return budget;
            }
            catch (Exception ex)
            {
                var data =  ex.Message;
                throw new NotImplementedException();
            }
       







        }
    }
}
