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
    public class StoreSectionBusiness:IStoreSectionBusiness
    {
        private IStoreSectionRepository strrep = new StoreSectionRepository();        

        public Response<IEnumerable<Domain.StoreSection>> GetSection()
        {
            try
            {
                var strlist = strrep.GetDataListAll();
                return new Response<IEnumerable<Domain.StoreSection>>(strlist.Select(m => new Domain.StoreSection
                {
                    Status = m.Status ? "TRUE" : "FALSE",
                    StoreunitId = m.StoreunitId,
                    SectionName = m.SectionName,
                    StoreName = "",
                    SectionId = m.SectionId

                }), Status.SUCCESS, "Fetched Successfully");
            }

            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.StoreSection>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<Domain.StoreSection> GetSectionId(int SectionId)
        {
            try
            {
                var cou = strrep.GetDataById(SectionId);
                return new Response<Domain.StoreSection>(new Domain.StoreSection
                {
                    SectionName = cou.SectionName,
                    StoreunitId = cou.StoreunitId,
                    Status = cou.Status ? "TRUE" : "FALSE",
                    SectionId = cou.SectionId,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.StoreSection>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        
        }

        public Common.Response<int> CreateSection(Domain.StoreSection SectionAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(SectionAdd.SectionName)) return new Response<int>(0, Status.ERROR, "Given Section is empty");
                if (isNameAvailableAlready(SectionAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given Section is already available");

                return new Response<int>(strrep.AddData(new Repository.StoreSection
                {
                    SectionId = SectionAdd.SectionId,
                    SectionName = SectionAdd.SectionName,
                    StoreunitId = SectionAdd.StoreunitId,
                    Status = SectionAdd.Status.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        
        }

        public Common.Response<bool> UpdateSection(Domain.StoreSection SectionUpd)
        {
            if (string.IsNullOrEmpty(SectionUpd.SectionName)) return new Response<bool>(false, Status.ERROR, "Given Section is empty");
            if (isNameAvailableAlready(SectionUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given StoreSection is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.StoreSection
            {
                SectionName = SectionUpd.SectionName,
                SectionId = SectionUpd.SectionId,
                StoreunitId = SectionUpd.StoreunitId,
                Status = SectionUpd.Status.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        
        }

        public Common.Response<bool> DeleteSection(int SectionId)
        {
            return new Response<bool>(strrep.DeleteData(SectionId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.StoreSection city, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetSection().Value.Where(c => c.SectionName.ToUpper() == city.SectionName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetSection().Value.Where(c => c.SectionName.ToUpper() == city.SectionName.ToUpper() && c.SectionId != city.SectionId).ToList().Count > 0);
            }
            return false;
        }
    }
}
