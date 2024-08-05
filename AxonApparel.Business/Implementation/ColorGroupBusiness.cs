using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;


namespace AxonApparel.Business
{
    public class ColorGroupBusiness:IColorGroupBusiness
    {
        private IColorGroupRepository cgrep = new ColorGroupRepository();


        public Response<IQueryable<Domain.ColorGroup>> GetColorGroup()
        {
            try
            {
                var strlist = cgrep.GetDataList();
                return new Response<IQueryable<Domain.ColorGroup>>(strlist.Select(m => new Domain.ColorGroup
                {
                    IsActive = (bool)m.IsActive ? "TRUE" : "FALSE",
                    ColorGroupId = m.ColorGroupID,
                    ColorGroupName = m.ColorGroup1,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.ColorGroup>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<Domain.ColorGroup> GetColorGroupId(int ColorGroupId)
        {
            try
            {
                var str = cgrep.GetDataById(ColorGroupId);
                return new Response<Domain.ColorGroup>(new Domain.ColorGroup
                {
                    ColorGroupName = str.ColorGroup1,
                    ColorGroupId = str.ColorGroupID,
                    IsActive = (bool)str.IsActive ? "TRUE" : "FALSE"
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.ColorGroup>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Response<int> CreateColorGroup(Domain.ColorGroup ColorGroupAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(ColorGroupAdd.ColorGroupName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Colorgroup is empty");
                if (isNameAvailableAlready(ColorGroupAdd, "ADD"))
                    return new Response<int>(0, Status.ERROR, "Given Mode of Colorgroup is already available");

                return new Response<int>(cgrep.AddData(new Repository.ColorGroup
                {
                    ColorGroupID = ColorGroupAdd.ColorGroupId,
                    ColorGroup1 = ColorGroupAdd.ColorGroupName,
                    IsActive = ColorGroupAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateColorGroup(Domain.ColorGroup ColorGroupUpd)
        {
            if (string.IsNullOrEmpty(ColorGroupUpd.ColorGroupName))
                return new Response<bool>(false, Status.ERROR, "Given ColorGroupName  is empty");
            if (isNameAvailableAlready(ColorGroupUpd, "UPDATE"))
                return new Response<bool>(false, Status.ERROR, "Given name of ColorGroup is already available");

            return new Response<bool>(cgrep.UpdateData(new Repository.ColorGroup
            {
                ColorGroup1 = ColorGroupUpd.ColorGroupName,
                ColorGroupID = ColorGroupUpd.ColorGroupId,
                IsActive = ColorGroupUpd.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteColorGroup(int ColorGroupId)
        {
            return new Response<bool>(cgrep.DeleteData(ColorGroupId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.ColorGroup st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetColorGroup().Value.Where(c => c.ColorGroupName.ToUpper() == st.ColorGroupName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetColorGroup().Value.Where(c => c.ColorGroupName.ToUpper() == st.ColorGroupName.ToUpper() && c.ColorGroupId != st.ColorGroupId).ToList().Count > 0);
            }
            return false;

        }
    }
}
