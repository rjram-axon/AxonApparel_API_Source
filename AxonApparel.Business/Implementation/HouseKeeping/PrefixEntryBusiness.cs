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
    public class PrefixEntryBusiness:IPrefixEntryBusiness
    {
        IPrefixEntryRepository AlRep = new PrefixEntryRepository();

        public Response<IList<PrefixEntry>> ListAllItemDetails(int? PrefixId)
        {
            try
            {
                var CurGList = AlRep.GetRepPrefixLoad(PrefixId);

                return new Response<IList<PrefixEntry>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PrefixEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdatePrefixEntry(PrefixEntry AllUEntry)
        {
            try
            {

                var PrefixItmList = new List<Repository.Prefix>();

                foreach (var GItem in AllUEntry.PrefixSetUp)
                {

                    PrefixItmList.Add(new Repository.Prefix
                    {
                        DocID = GItem.DocID,
                        Document_Name = GItem.Document_Name == "" ? null : GItem.Document_Name,
                        Prefix1 = GItem.Prefix,

                    });

                }

                var result = AlRep.UpdateDetData(PrefixItmList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
