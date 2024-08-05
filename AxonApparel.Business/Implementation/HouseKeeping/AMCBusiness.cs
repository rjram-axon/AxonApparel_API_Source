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
    public class AMCBusiness : IAMCBusiness
    {
        IAMCRepository AMCRep = new AMCRepository();

        public Response<bool> UpdateUserdata(int dcompanyid)
        {

            var result = AMCRep.UpdateUserdata(dcompanyid);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

        }
        public Response<IEnumerable <Domain.MisSetting>> CheckUserLicence(int dcompanyid)
        {

            var result = AMCRep.CheckUserLicence(dcompanyid);

            return new Response<IEnumerable<Domain.MisSetting>>(result, Status.SUCCESS, "Fetched Successfully");

        }

        public Response<IEnumerable<Domain.MisSetting>> CheckAMC()
        {

            var result = AMCRep.CheckAMC();

            return new Response<IEnumerable<Domain.MisSetting>>(result, Status.SUCCESS, "Fetched Successfully");

        }

        public Response<IEnumerable<Domain.MisSetting>> GetCompany()
        {
            try
            {
                var detList = AMCRep.GetCompany();

                return new Response<IEnumerable<Domain.MisSetting>>(detList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.MisSetting>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
