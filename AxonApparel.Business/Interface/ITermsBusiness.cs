using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;
namespace AxonApparel.Business
{
    public interface ITermsBusiness
    {
        Response<IEnumerable<Terms>> GetTrm();
        Response<Terms> GetTrmId(int trmId);
        Response<int> CreateTrm(Terms trmAdd);
        Response<bool> UpdateTrm(Terms trmUpd);
        Response<bool> DeleteTrm(int trmId);
    }
}
