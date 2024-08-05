using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IApiLoginBusiness
    {
        UserName GetUserdetails(UserName users);
    }
}
