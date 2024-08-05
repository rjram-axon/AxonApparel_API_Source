using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class StyleGroupBusiness:IStyleGroupBusiness
    {
        private IStyleGroupRepository sgrep = new StyleGroupRepository();


        public Common.Response<IQueryable<Domain.StyleGroup>> GetStyleGroup()
        {
            try
            {
                var strlist = sgrep.GetDataList();
                return new Response<IQueryable<Domain.StyleGroup>>(strlist.Select(m => new Domain.StyleGroup
                {
                    IsActive = (bool)m.IsActive ? "TRUE" : "FALSE",
                    StyleGroupId = m.StyleGroupID,
                    StyleGroupName = m.StyleGroup,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.StyleGroup>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<Domain.StyleGroup> GetStyleGroupId(int StyleGroupId)
        {
            try
            {
                var str = sgrep.GetDataById(StyleGroupId);
                return new Response<Domain.StyleGroup>(new Domain.StyleGroup
                {
                    StyleGroupName = str.StyleGroup,
                    StyleGroupId = str.StyleGroupID,
                    IsActive = (bool)str.IsActive ? "TRUE" : "FALSE"
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.StyleGroup>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Common.Response<int> CreateStyleGroup(Domain.StyleGroup StyleGroupAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(StyleGroupAdd.StyleGroupName))
                    return new Response<int>(0, Status.ERROR, "Given Name of StyleGroup is empty");
                if (isNameAvailableAlready(StyleGroupAdd, "ADD"))
                    return new Response<int>(0, Status.ERROR, "Given Mode of StyleGroup is already available");

                return new Response<int>(sgrep.AddData(new Repository.Style_Group
                {
                    StyleGroupID = StyleGroupAdd.StyleGroupId,
                    StyleGroup = StyleGroupAdd.StyleGroupName,
                    IsActive = StyleGroupAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateStyleGroup(Domain.StyleGroup StyleGroupUpd)
        {
            if (string.IsNullOrEmpty(StyleGroupUpd.StyleGroupName))
                return new Response<bool>(false, Status.ERROR, "Given StyleGroupName  is empty");
            if (isNameAvailableAlready(StyleGroupUpd, "UPDATE"))
                return new Response<bool>(false, Status.ERROR, "Given name of StyleGroup is already available");

            return new Response<bool>(sgrep.UpdateData(new Repository.Style_Group
            {
                StyleGroup = StyleGroupUpd.StyleGroupName,
                StyleGroupID = StyleGroupUpd.StyleGroupId,
                IsActive = StyleGroupUpd.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteStyleGroup(int StyleGroupId)
        {
            return new Response<bool>(sgrep.DeleteData(StyleGroupId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.StyleGroup st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetStyleGroup().Value.Where(c => c.StyleGroupName.ToUpper() == st.StyleGroupName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetStyleGroup().Value.Where(c => c.StyleGroupName.ToUpper() == st.StyleGroupName.ToUpper() && c.StyleGroupId != st.StyleGroupId).ToList().Count > 0);
            }
            return false;

        }
    }
}
