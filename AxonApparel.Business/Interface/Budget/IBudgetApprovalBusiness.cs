using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IBudgetApprovalBusiness
    {
        Response<IQueryable<Domain.BudgetApproval>> LoadMaingrid( string type,string ordtype, string fromdate, string todate);
        Response<IQueryable<Domain.BudgetApproval>> LoadPcsWt(string ordno, int styleid);
        Response<IQueryable<Domain.Cost_defn_Bom>> LoadBomdet(string ordno, int styleid);
        Response<IQueryable<Domain.Cost_defn_Bom>> LoadProcessdet(string ordno, int styleid);
        Response<IQueryable<Domain.Cost_defn_Bom>> LoadProductndet(string ordno, int styleid);
        Response<bool> CreateUnitEntry(Domain.Cost_Defn_Mas MasEntry);
        Response<IQueryable<Domain.Cost_defn_Bom>> LoadBomdetEdit(string ordno, int styleid);
        Response<IQueryable<Domain.Cost_defn_Bom>> LoadProcessdetEdit(string ordno, int styleid);
        Response<IQueryable<Domain.Cost_defn_Bom>> LoadProductndetEdit(string ordno, int styleid);
        Response<IQueryable<Domain.BudgetApproval>> LoadChkbom(string ordno, int styleid);
        Response<IQueryable<Domain.BudgetApproval>> LoadChkProcess(string ordno, int styleid);
        Response<IQueryable<Domain.BudgetApproval>> LoadChkProdutnOrd(string ordno, int styleid);
        Response<IQueryable<Domain.BudgetApproval>> LoadChkprod(string ordno, int styleid);
        Response<IQueryable<Domain.BudgetApproval>> LoadChkCutting(string ordno, int styleid);
        Response<bool> UpdateData(Domain.Cost_Defn_Mas objupd);
        Response<bool> RevertData(Domain.Cost_Defn_Mas objrvt);
        Response<bool> LockData(Domain.Cost_Defn_Mas objupd);
        Response<IQueryable<Domain.CostDefnCom>> LoadCommdet(string ordno, int styleid);
       Response<IQueryable<Domain.CostDefnCom>> LoadCommdetEdit(string ordno, int styleid);
       Response<IQueryable<Domain.CostDefnBomFirst>> LoadLockDet(string ordno, int styleid,string Type);
    }
}
