    using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;


namespace AxonApparel.Business
{
   public  class ItemGroupBusiness:IItemGroupBusiness
    {
        private IItemGroupRepository igrep = new ItemGroupRepository();


        public Common.Response<IEnumerable<Domain.ItemGroup>> GetItemGroup()
        {
            try
            {
                var strlist = igrep.GetDataListAll();
                return new Response<IEnumerable<Domain.ItemGroup>>(strlist.Select(m => new Domain.ItemGroup
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    ItemgroupId = m.Id,
                    ItemGroupName = m.ItemGroup1,
                    CatHead1=m.Category1,
                    CatHead2=m.Category2,
                    CatHead3=m.Category3
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.ItemGroup>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<Domain.ItemGroup> GetItemGroupId(int ItemGroupId)
        {
            try
            {
                var str = igrep.GetDataById(ItemGroupId);
                return new Response<Domain.ItemGroup>(new Domain.ItemGroup
                {
                    ItemGroupName = str.ItemGroup1,
                    ItemgroupId = str.Id,
                    CatHead1=str.Category1,
                    CatHead2=str.Category2,
                    CatHead3=str.Category3,
                    IsActive = str.IsActive ? "TRUE" : "FALSE"
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.ItemGroup>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Common.Response<int> CreateItemGroup(Domain.ItemGroup ItemGroupAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(ItemGroupAdd.ItemGroupName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Itemgroup is empty");
                if (isNameAvailableAlready(ItemGroupAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Mode of Itemgroup is already available");

                return new Response<int>(igrep.AddData(new Repository.ItemGroup
                {
                    Id = ItemGroupAdd.ItemgroupId,
                    ItemGroup1 = ItemGroupAdd.ItemGroupName,
                    Category1=ItemGroupAdd.CatHead1,
                    Category2=ItemGroupAdd.CatHead2,
                    Category3=ItemGroupAdd.CatHead3,
                    IsActive = ItemGroupAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateItemGroup(Domain.ItemGroup ItemGroupUpd)
        {
            if (string.IsNullOrEmpty(ItemGroupUpd.ItemGroupName))
                return new Response<bool>(false, Status.ERROR, "Given Itemgroup is empty");
            if (isNameAvailableAlready(ItemGroupUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Itemgroup is already available");

            return new Response<bool>(igrep.UpdateData(new Repository.ItemGroup
            {
                ItemGroup1 = ItemGroupUpd.ItemGroupName,
                Id = ItemGroupUpd.ItemgroupId,
                Category1=ItemGroupUpd.CatHead1,
                Category2=ItemGroupUpd.CatHead2,
                Category3=ItemGroupUpd.CatHead3,
                IsActive = ItemGroupUpd.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteItemGroup(int ItemGroupId)
        {
            return new Response<bool>(igrep.DeleteData(ItemGroupId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.ItemGroup ig, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetItemGroup().Value.Where(c => c.ItemGroupName.ToUpper() == ig.ItemGroupName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetItemGroup().Value.Where(c => c.ItemGroupName.ToUpper() == ig.ItemGroupName.ToUpper() && c.ItemgroupId != ig.ItemgroupId).ToList().Count > 0);
            }
            return false;

        }


        public Response<IList<Domain.ItemGroup>> GetItemGroupCheckItemDetails(int ItemGroupId)
        {
            try
            {
                var ProductEWO = igrep.GetRepItemGroupCheckItemDetails(ItemGroupId);

                return new Response<IList<Domain.ItemGroup>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ItemGroup>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

       
    }
}
