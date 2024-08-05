using System;
using System.Collections.Generic;
using System.Linq;  
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IJobOrderDetailRepository
    {
        IQueryable<Domain.JobOrderDetList> GetJobOrderDet();
        IQueryable<Domain.JobOrderDetList> GetDataofJobOrderDet(int JobOrderNo);
        IList<Domain.JobOrderShipmentlist> GetJobOrderShip(string Orderno, int StyleId);
        IList<Domain.JobOrderItemlist> GetJobOrderItem(string JobOrderno);
    }
}
