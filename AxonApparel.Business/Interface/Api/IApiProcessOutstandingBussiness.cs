using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business.Interface.Api
{
    public interface IApiProcessOutstandingBussiness
    {
        List<string> GetProcessoutstandingdetails();
        List<string> Getoutstandingprocesswise(int supplierid);
        List<string> Getoutstandingprocesswisedetail(int supplierid, int processid);

    }
}
