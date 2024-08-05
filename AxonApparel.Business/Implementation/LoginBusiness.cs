using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class LoginBusiness:ILoginBusiness
    {
        ILoginRepository repologin = new LoginRepository();


        public Response<IList<Domain.MenuList>> GetMenuList()
        {
            try
            {
                var MenuDt = repologin.GetMenuNumber().ToList();

                return new Response<IList<Domain.MenuList>>(MenuDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.MenuList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> IsValid(string Username, string Password)
        {
            try
            {
                bool login = false;
                login = repologin.IsValid(Username, Password);
                return new Response<bool>(login, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(repologin.IsValid(Username, Password), Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<UserName> GetDataUserDetails(string Username, string Password)
        {
            try
            {
                var CurDetList = repologin.GetUser(Username, Password);

                return new Response<UserName>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<UserName>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Common.Response<bool> UpdateloginUnit(string Username, string Password, int UnitId)
        {
            try
            {
                var CurDetList = repologin.UpdateloginUnit( Username,  Password,UnitId);
                return new Response<bool>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<bool>(repologin.UpdateloginUnit(Username, Password, UnitId), Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Common.Response<bool> UpdateLoginStatus(string Username, string Password, string LoginStatus, string MachineName)
        {
            try
            {
                bool CurDetList = false;
                CurDetList = repologin.UpdateLoginStatus(Username, Password, LoginStatus, MachineName);

                return new Response<bool>(CurDetList, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception ex)
            {
                return new Response<bool>(repologin.UpdateLoginStatus(Username, Password, LoginStatus, MachineName), Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> CheckLicenceUser()
        {
            try
            {
                bool CurDetList = false;
                CurDetList = repologin.CheckLicenceUser();

                return new Response<bool>(CurDetList, Status.SUCCESS, "Checked Successfully");
            }
            catch (Exception ex)
            {
                return new Response<bool>(repologin.CheckLicenceUser(), Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ExchangeRates>> GetDataExchangeDetails(int compid)
        {
            try
            {
                var ProdutWO = repologin.GetRepExRates(compid);

                return new Response<IQueryable<ExchangeRates>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ExchangeRates>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
