using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IUserStatusRepository
    {
        IEnumerable<Domain.UserName> GetListUserStatus(string Password);
        bool UpdateUserStatus(List<Domain.UserName> UserStatusList);
    }
}
