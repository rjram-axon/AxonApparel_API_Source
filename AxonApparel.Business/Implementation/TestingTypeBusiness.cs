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
    public class TestingTypeBusiness:ITestingTypeBusiness
    {
        private ITestingTypeRepository strrep = new TestingTypeRepository();

        public Response<IQueryable<AxonApparel.Domain.TestingType>> GetTestingType()
        {
            try
            {
                var strlist = strrep.GetDataList();

                return new Response<IQueryable<Domain.TestingType>>(strlist.Select(m => new Domain.TestingType
                {
                    IsActive = m.IsActive ? "Active" : "In-Active",
                    TestingTypeId = m.TestingTypeId,
                    TestingTypeName = m.TestingType1,
                    GarFab=(m.GarFab=="G"?"Garment":"Fabric"),
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.TestingType>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<int> CreateTestingType(AxonApparel.Domain.TestingType TestingTypeAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(TestingTypeAdd.TestingTypeName))
                    return new Response<int>(0, Status.ERROR, "Given Testing Type is empty");
                //if (isNameAvailableAlready(SizeAdd, "ADD"))
                //    return new Response<int>(-1, Status.ERROR, "Given Size is already available");

                return new Response<int>(strrep.AddData(new Repository.TestingType
                {
                    IsActive = TestingTypeAdd.IsActive.ToUpper() == "TRUE",
                    TestingTypeId = TestingTypeAdd.TestingTypeId,
                    TestingType1 = TestingTypeAdd.TestingTypeName,
                    GarFab = TestingTypeAdd.GarFab
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateTestingType(AxonApparel.Domain.TestingType TestingTypeUpd)
        {
            if (string.IsNullOrEmpty(TestingTypeUpd.TestingTypeName))
                return new Response<bool>(false, Status.ERROR, "Given Testing Type is empty");

            return new Response<bool>(strrep.UpdateData(new Repository.TestingType
            {
                IsActive = TestingTypeUpd.IsActive.ToUpper() == "TRUE",
                TestingTypeId = TestingTypeUpd.TestingTypeId,
                TestingType1 = TestingTypeUpd.TestingTypeName,
                GarFab = TestingTypeUpd.GarFab
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteTestingType(int TestingTypeId)
        {
            return new Response<bool>(strrep.DeleteData(TestingTypeId), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<AxonApparel.Domain.TestingType> GetTestingTypeId(int TestingTypeId)
        {
            try
            {
                var str = strrep.GetDataById(TestingTypeId);
                return new Response<Domain.TestingType>(new Domain.TestingType
                {
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    TestingTypeId = str.TestingTypeId,
                    TestingTypeName = str.TestingType1,
                    GarFab=(str.GarFab=="G"?"Garment":"Fabric")
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.TestingType>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

    }
}
