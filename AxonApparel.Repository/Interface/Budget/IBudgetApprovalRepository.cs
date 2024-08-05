using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IBudgetApprovalRepository
    {
       IQueryable<Domain.BudgetApproval> LoadMaingrid( string type,string ordtype, string fromdate, string todate);
       IQueryable<Domain.BudgetApproval> LoadPcsWt(string ordno, int styleid);
       IQueryable<Domain.Cost_defn_Bom> LoadBomdet(string ordno, int styleid);
       IQueryable<Domain.Cost_defn_Bom> LoadProcessdet(string ordno, int styleid);
       IQueryable<Domain.Cost_defn_Bom> LoadProductndet(string ordno, int styleid);

       bool AddDetData(List<Domain.CostDefnBomFirst> objmas, List<Cost_Defn_Bom_First> objfirstmas, string Mode, int ProdId = 0);
       bool LockDetData(List<Domain.CostDefnBomFirst> objmas, List<Domain.CostDefnBomFirst> AItemlist, List<Domain.CostDefnBomFirst> PItemlist, string Mode, int ProdId = 0);

       IQueryable<Domain.Cost_defn_Bom> LoadBomdetEdit(string ordno, int styleid);
       IQueryable<Domain.Cost_defn_Bom> LoadProcessdetEdit(string ordno, int styleid);
       IQueryable<Domain.Cost_defn_Bom> LoadProductndetEdit(string ordno, int styleid);
       IQueryable<Domain.BudgetApproval> LoadChkbom(string ordno, int styleid);
       IQueryable<Domain.BudgetApproval> LoadChkProcess(string ordno, int styleid);
       IQueryable<Domain.BudgetApproval> LoadChkProdutnOrd(string ordno, int styleid);
       IQueryable<Domain.BudgetApproval> LoadChkprod(string ordno, int styleid);
       IQueryable<Domain.BudgetApproval> LoadChkCutting(string ordno, int styleid);
       IQueryable<Domain.CostDefnCom> LoadCommdet(string ordno, int styleid);
       IQueryable<Domain.CostDefnCom> LoadCommdetEdit(string ordno, int styleid);
       IQueryable<Domain.CostDefnBomFirst> LoadLockDet(string ordno, int styleid, string Type);
   }
}
