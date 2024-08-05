using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IUserStatusBusiness
    {
        Response<IEnumerable<Domain.UserName>> GetListUserStatus(string Password);
        Response<bool> UpdateUserStatus(Domain.UserName mainlistobj);
    }
}
