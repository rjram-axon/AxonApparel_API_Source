using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IWorkOrderRepository : IBaseRepository<Domain.ProductionWorkOrder>
    {
        //int AddData(Domain.ProductionWorkOrder objAdd);
        IQueryable<Domain.ProductionWorkOrder> GetDataByOrder(int Id);
        IList<Domain.ProductionItemWOEntry> GetProdItemWO(int Id);
        IList<Domain.ProductionShipWOEntry> GetProdShipWO(int Id);
        bool DeleteData(int id);
        bool GetPlanningMasChecking(int id);
        bool AddShipWoData(List<Domain.ProductionShipWOEntry> objCDet, string Mode);
        bool AddItemWoData(List<Domain.ProductionItemWOEntry> objItemDet, string Mode);
        bool AddColorWoData(List<Domain.ProductionColorWOEntry> objItemDet, string Mode);
        bool AddProgramSummary(List<Domain.ProgramSummary> objItemDet, string Mode);
        IQueryable<Job_Ord_Mas> GetDataList();
        bool UpdateData(Domain.ProductionWorkOrder obj);
    }
}
