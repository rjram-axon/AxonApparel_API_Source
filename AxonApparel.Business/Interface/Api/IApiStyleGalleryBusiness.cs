using AxonApparel.Domain;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business.Interface.Api
{
    public interface IApiStyleGalleryBusiness
    {
        IQueryable<BuyOrdImg> GetStyleimagelist();
        string GetStyledetails(int styleid);
    }
}
