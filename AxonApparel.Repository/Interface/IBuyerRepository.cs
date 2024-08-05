using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public  interface IBuyerRepository:IBaseRepository<Buyer>
    {
        IList<Domain.Buyer> GetRepBuyerCheckItemDetails(int BuyerId);
        IEnumerable<Domain.Buyer> GetDataListAll();
    }
}
