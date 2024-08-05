using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IJobOrderDetailBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<JobOrderDetList>> GetJobOrderDetail();
        Response<IQueryable<JobOrderDetList>> GetDataofJobOrder(int JobOrderNo);
        Response<IList<JobOrderShipmentlist>> GetJobOrderShipDetail(string Orderno, int StyleId);
        Response<IList<JobOrderItemlist>> GetJobOrderItemDetail(string JobOrderno);
    }
}
