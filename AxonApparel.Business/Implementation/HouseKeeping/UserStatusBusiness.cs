using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;


namespace AxonApparel.Business
{
    public class UserStatusBusiness : IUserStatusBusiness
    {
        IUserStatusRepository userlogRep = new UserStatusRepository();

        public Response<IEnumerable<Domain.UserName>> GetListUserStatus(string Password)
        {
            try
            {
                var UserStatusList = userlogRep.GetListUserStatus(Password);

                return new Response<IEnumerable<Domain.UserName>>(UserStatusList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.UserName>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateUserStatus(Domain.UserName mainlistobj)
        {
            var UserNamelist = new List<Domain.UserName>();

            foreach (UserName Userdet in mainlistobj.UserStatusList)
            {
                UserNamelist.Add(new Domain.UserName
                {
                    UserId=Userdet.UserId,
                    Password = Userdet.Password,
                    EmployeeId = Userdet.EmployeeId,
                    GroupId = Userdet.GroupId,
                    LoginStatus = Userdet.LoginStatus,

                });
            }
            var result = userlogRep.UpdateUserStatus(UserNamelist);

            return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
        }
    }
}
