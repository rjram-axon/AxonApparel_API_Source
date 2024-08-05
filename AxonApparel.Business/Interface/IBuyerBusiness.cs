using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;


namespace AxonApparel.Business
{
    public interface IBuyerBusiness
    {
        Response<IEnumerable<Buyer>> GetBuyer();
        Response<Buyer> GetBuyerId(int BuyerId);
        Response<int> CreateBuyer(Buyer BuyerAdd);
        Response<bool> UpdateBuyer(Buyer BuyerUpd);
        Response<bool> DeleteBuyer(int BuyerId);
        Response<IList<Buyer>> GetBuyerCheckItemDetails(int BuyerId);

    }
}
