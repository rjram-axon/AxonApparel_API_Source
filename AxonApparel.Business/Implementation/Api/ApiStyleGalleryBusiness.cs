using AxonApparel.Business.Interface.Api;
using AxonApparel.Domain;
using AxonApparel.Repository;
using AxonApparel.Repository.Implementation.Api;
using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AxonApparel.Business.Implementation.Api
{
    public class ApiStyleGalleryBusiness : IApiStyleGalleryBusiness
    {
        IApiStyleGalleryRepository Apistyle = new ApiStyleGalleryRepository();
        public string GetStyledetails(int styleid)
        {
            var result = Apistyle.GetStyledetails(styleid).ToList();
            return JsonConvert.SerializeObject(result);
        }

        public IQueryable<BuyOrdImg> GetStyleimagelist()
        {
            return Apistyle.GetStyleimagelist();
        }
    }
}
