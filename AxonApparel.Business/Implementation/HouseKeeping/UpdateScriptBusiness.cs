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
    public class UpdateScriptBusiness : IUpdateScriptBusiness
    {
        IUpdateScriptRepository userlogRep = new UpdateScriptRepository();


        public Response<IEnumerable<Domain.UpdateScript>> Update(DateTime LastDate, DateTime entrydate)
        {
            try
            {
                var entrylogDetList = userlogRep.Update(LastDate,entrydate);

                return new Response<IEnumerable<Domain.UpdateScript>>(entrylogDetList, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.UpdateScript>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


    }
}
