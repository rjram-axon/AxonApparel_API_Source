using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;
 
namespace AxonApparel.Business
{
    public class SampleTypeBusiness:ISampleTypeBusiness
    {
        private ISampleTypeRepository strrep = new SampleTypeRepository();

        public Response<IQueryable<AxonApparel.Domain.SampleTypeMas>> GetSampleType()
        {
            try
            {
                var strlist = strrep.GetDataList();

                return new Response<IQueryable<Domain.SampleTypeMas>>(strlist.Select(m => new Domain.SampleTypeMas
                {
                    IsActive =m.IsActive ? "TRUE" : "FALSE",
                    SampleTypeId=m.SampleTypeId,
                    SampleType=m.SampleType
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.SampleTypeMas>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<int> CreateSampleType(AxonApparel.Domain.SampleTypeMas SampleTypeAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(SampleTypeAdd.SampleType))
                    return new Response<int>(0, Status.ERROR, "Given Sample Type is empty");
                //if (isNameAvailableAlready(SizeAdd, "ADD"))
                //    return new Response<int>(-1, Status.ERROR, "Given Size is already available");

                return new Response<int>(strrep.AddData(new Repository.SampleTypeMaster
                {
                    IsActive = SampleTypeAdd.IsActive.ToUpper() == "TRUE",
                    SampleTypeId = SampleTypeAdd.SampleTypeId,
                    SampleType = SampleTypeAdd.SampleType,                    
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateSampleType(AxonApparel.Domain.SampleTypeMas SampleTypeUpd)
        {
            if (string.IsNullOrEmpty(SampleTypeUpd.SampleType))
                return new Response<bool>(false, Status.ERROR, "Given Sample Type is empty");

            return new Response<bool>(strrep.UpdateData(new Repository.SampleTypeMaster
            {
                IsActive = SampleTypeUpd.IsActive.ToUpper() == "TRUE",
                SampleTypeId = SampleTypeUpd.SampleTypeId,
                SampleType = SampleTypeUpd.SampleType,               
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteSampleType(int SampleTypeId)
        {
            return new Response<bool>(strrep.DeleteData(SampleTypeId), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<AxonApparel.Domain.SampleTypeMas> GetSampleTypeId(int SampleTypeId)
        {
            try
            {
                var str = strrep.GetDataById(SampleTypeId);
                return new Response<Domain.SampleTypeMas>(new Domain.SampleTypeMas
                {
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    SampleTypeId = str.SampleTypeId,                    
                    SampleType = str.SampleType,                    
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.SampleTypeMas>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }
    }
}
