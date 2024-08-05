using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class ApiLoginBusiness : IApiLoginBusiness
    {
        ILoginBusiness lbus = new LoginBusiness();
        public UserName GetUserdetails(UserName users)
        {
            Response<UserName> result = lbus.GetDataUserDetails(users.Username, users.Password);

            if (result != null && result.Value != null)
            {
                // Assuming `Help.Encrypt` method is working as expected
                result.Value.Username = Help.Encrypt(result.Value.Username);
                result.Value.Password = Help.Encrypt(users.Password);

                // Assuming `lbus.UpdateLoginStatus` method needs to be called
                // lbus.UpdateLoginStatus(result.Value);
            }

            return result?.Value; // Return null if result is null
        }
    }
}
