using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface ICourierBusiness
    {
        Response<IQueryable<Courier>> GetCourier();
        Response<Courier> GetCourierId(int CourierId);
        Response<int> CreateCourier(Courier CourierAdd);
        Response<bool> UpdateCourier(Courier CourierUpd);
        Response<bool> DeleteCourier(int CourierId);
    
    }
}
