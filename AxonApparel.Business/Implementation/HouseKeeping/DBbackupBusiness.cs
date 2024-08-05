using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public class DBbackupBusiness:IDBbackupBusiness
    {


        IDBbackupRepository repo = new DBbackupRepository();

        public Response<bool> UpdateShrink()
        {
            try
            {

                var result = repo.UpdateShrinkDetData();

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateBackUp()
        {
            try
            {


                var result = repo.UpdateBackUpDetData();

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public string UpdateBackUpLogin()
        {
            try
            {


                var result = repo.UpdateBackUpDetDataLogin();

                return result;
            }

            catch (Exception)
            {
                return "Failure";
            }
        }

    }
}
