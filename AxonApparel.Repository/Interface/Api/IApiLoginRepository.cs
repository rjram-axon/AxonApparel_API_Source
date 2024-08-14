using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    
    public interface IApiLoginRepository : IBaseRepository<Domain.UserName>
    {
        bool IsValid(string Username, string Password);

        IEnumerable<Domain.UserName> GetUser(string Username, string Password);
        IQueryable<Domain.MenuList> GetMenuNumber();
        IQueryable<Domain.ExchangeRates> GetRepExRates(int compid);
        bool UpdateloginUnit(string Username, string Password, int UnitId);
        bool UpdateLoginStatus(string Username, string Password, string Loginstatus, string MachineName);
        bool CheckLicenceUser();
    }
}
