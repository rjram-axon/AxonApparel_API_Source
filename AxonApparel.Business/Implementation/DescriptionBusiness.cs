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
    
    public class DescriptionBusiness : IDescriptionBusiness
    {
        IDescriptionRepository DecRep = new DescriptionRepository();
        public Response<IEnumerable<Domain.Description>> GetListMain()
        {
            try
            {
                var Mainlist = DecRep.GetDataAllList();
                return new Response<IEnumerable<Domain.Description>>(Mainlist.Select(m => new Domain.Description
                {
                    IsActive =(bool) m.IsActive ? "TRUE" : "FALSE",
                    DescriptionName = m.Description1,
                    DescriptionId = m.DescriptionId
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch
            {
                return new Response<IEnumerable<Domain.Description>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<int> CreateDesc(Domain.Description Description)
        {
            try
            {
                if (string.IsNullOrEmpty(Description.DescriptionName)) return new Response<int>(0, Status.ERROR, "Given Description is empty");
                if (isNameAvailableAlready(Description, "ADD")) return new Response<int>(0, Status.ERROR, "Given Description is already available");

                return new Response<int>(DecRep.AddData(new AxonApparel.Repository.Description
                {
                    Description1 = Description.DescriptionName,
                    DescriptionId = Description.DescriptionId,
                    IsActive = Description.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<Domain.Description> GetDataById(int DescriptionId)
        {
            try
            {

                var reaList = DecRep.GetDataById(DescriptionId);

                return new Response<Domain.Description>(new Domain.Description
                {
                    DescriptionName = reaList.Description1,
                    DescriptionId = reaList.DescriptionId,
                    IsActive = (bool)reaList.IsActive ? "TRUE" : "FALSE",
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.Description>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<bool> UpdateDescription(Domain.Description Description)
        {
            return new Response<bool>(DecRep.UpdateData(new AxonApparel.Repository.Description
            {
                Description1 = Description.DescriptionName,
                DescriptionId = Description.DescriptionId,
                IsActive = Description.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }
        public Response<bool> DeleteDescription(int DescriptionId)
        {
            return new Response<bool>(DecRep.DeleteData(DescriptionId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Description objRes, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetListMain().Value.Where(c => c.DescriptionName.ToUpper() == objRes.DescriptionName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetListMain().Value.Where(c => c.DescriptionName.ToUpper() == objRes.DescriptionName.ToUpper() && c.DescriptionId != objRes.DescriptionId).ToList().Count > 0);
            }
            return false;

        }
    }
}
