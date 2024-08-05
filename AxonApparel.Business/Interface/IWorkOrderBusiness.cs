using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IWorkOrderBusiness
    {
        //Response<IQueryable<WorkOrder>> GetWorkOrder();
        //Response<WorkOrder> GetId(int Id);
        Response<int> CreateWorkOrder(ProductionWorkOrder WorkOrderAdd);
        Response<bool> UpdateWorkOrder(ProductionWorkOrder WorkOrderUpd);
        Response<bool> DeleteWorkOrder(int Id);
        Response<bool> GetPlanningChecking(int StyleRowId);
        Response<IQueryable<Domain.ProductionWorkOrder>> GetDataByWorkOrder(int Id);
        Response<IList<Domain.ProductionItemWOEntry>> GetProdItemWO(int Id);
        Response<IList<Domain.ProductionShipWOEntry>> GetProdShipWO(int Id);
        Response<IQueryable<ProductionWorkOrder>> GetWorkOrderNoList();
    }
}
