using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;


namespace AxonApparel.Business
{
    public interface IHsnbusiness
    {
        Response<IEnumerable<HSNCode>> GetHSNCode();
        Response<HSNCode> GetDataById(int HSNid);
        Response<int> CreateHSNCode(HSNCode HSNCode);
        Response<bool> UpdateHSNCode(HSNCode HSNCode);
        Response<bool> DeleteHSNCode(int HSNid);
        Response<IEnumerable<HSNCode>> GetHSNCodeCheckItemDetails(int HSNid);
        Response<IEnumerable<Domain.GSTModel>> LoadGstDetail();
        Response<IEnumerable<Domain.GSTModel>> LoadIGstDetail();
    }
}
