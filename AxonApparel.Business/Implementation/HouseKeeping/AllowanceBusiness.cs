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
    public class AllowanceBusiness : IAllowanceBusiness
    {
        IAllowanceRepository AlRep = new AllowanceRepository();

        public Response<IList<AllowanceSetup>> ListAllItemDetails(int? ItemGroupId, int? ItemId)
        {
            try
            {
                var CurGList = AlRep.GetRepAllowanceLoad(ItemGroupId, ItemId);

                return new Response<IList<AllowanceSetup>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<AllowanceSetup>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<AllowanceSetup>> ListAllItemCDetails(int? ItemId)
        {
            try
            {
                var CurGList = AlRep.GetRepAllowanceCLoad(ItemId);

                return new Response<IList<AllowanceSetup>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<AllowanceSetup>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateAllowEntry(AllowanceSetup AllUEntry)
        {
            try
            {

                var AllowItmList = new List<Repository.Item>();

                foreach (var GItem in AllUEntry.AllowSetUp)
                {

                    AllowItmList.Add(new Repository.Item
                    {
                        ItemId = GItem.ItemId,
                        Percentage = GItem.Percentage==""?null:GItem.Percentage,
                        Allow_Value = GItem.Quantity,

                    });

                }

                var result = AlRep.UpdateDetData(AllowItmList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
                
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<AllowanceSetup>> ListAllProcessDetails(int? ProcessId)
        {
            try
            {
                var CurGList = AlRep.GetRepProcessAllowanceLoad(ProcessId);

                return new Response<IList<AllowanceSetup>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<AllowanceSetup>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateProcessAllowEntry(AllowanceSetup AllUPEntry)
        {
            try
            {

                var PAllowItmList = new List<Process_Tolerance>();

                foreach (var PItem in AllUPEntry.AllowSetUp)
                {

                    PAllowItmList.Add(new Process_Tolerance
                    {
                        
                        ProcessId = PItem.ProcessId,
                        Quantity = PItem.PQuantity,
                        Percentage=PItem.ProPercentage,
                        ToleranceId=PItem.TolerId,

                    });

                }

                var result = AlRep.UpdateProcessDetData(PAllowItmList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
