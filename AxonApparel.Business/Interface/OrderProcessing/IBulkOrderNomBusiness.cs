using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
   public interface IBulkOrderNomBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="BulkOrder"></param>
        /// <returns></returns>

        Response<int> CreateNomSupBulkOrder(BulkOrder BulOrd);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<BulkOrder>> GetNomSupp();
    }
}
