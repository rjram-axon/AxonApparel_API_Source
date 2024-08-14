using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface IApiLoginBusiness
    {
        Response<bool> IsValid(string Username, string Password);
        //Response<UserName> GetDataUserDetails(string Username, string Password);
        Response<IQueryable<ExchangeRates>> GetDataExchangeDetails(int compid);
        Response<IList<Domain.MenuList>> GetMenuList();
        Response<bool> UpdateLoginStatus(string Username, string Password, string Loginstatus, string MachineName);
        Response<bool> CheckLicenceUser();
        Response<bool> UpdateloginUnit(string Username, string Password, int UnitId);
    }
}
