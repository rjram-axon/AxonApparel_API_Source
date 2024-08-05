using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IBuyerChargesBusiness
    {
        Response<int> Add(BuyerCharges obj);
        Response<IQueryable<Domain.BuyerCharges>> LoadMaingrid();
        Response<IList<BuyerCharges>> GetbyId(int BuyerId);
        Response<int> Update(BuyerCharges obj);
        Response<int> Delete(BuyerCharges obj);
        Response<BuyerCharges> ListMainGrid(int buyid);
    }
}
