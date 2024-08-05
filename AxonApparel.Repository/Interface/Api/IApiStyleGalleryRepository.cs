using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Interface.Api
{
    public interface IApiStyleGalleryRepository
    {
        IQueryable<BuyOrdImg> GetStyleimagelist();
        IQueryable<Proc_GetStyleDetails_Result> GetStyledetails(int styleid);
        
    }
}
