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
    public class CityBusiness : ICityBusiness
    {
        private ICityRepository cityRepo = new CityRepository();

        public Response<IEnumerable<Domain.City>> GetCity()
        {
            try
            {
                var couList = cityRepo.GetDataListAll();
                return new Response<IEnumerable<Domain.City>>(couList.Select(m => new Domain.City
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    CountryId = m.CountryId,
                    CityName = m.CityName,
                    CountryName = (m.CountryName == null ? "" : m.CountryName),
                    StateId = (int)(m.StateId == null ? 0 : m.StateId),
                    CityId = m.CityId

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.City>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<Domain.City> GetCityId(int cityId)
        {
            try
            {
                var cou = cityRepo.GetDataById(cityId);
                return new Response<Domain.City>(new Domain.City
                {
                    CityName = cou.City1,
                    CountryId = cou.CountryId,
                    StateId = (int)(cou.StateId == null ? 0 : cou.StateId),
                    CountryName = "TEST",//(cou.Country.country1 == null ? "" : cou.Country.country1),
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",
                    CityId = cou.Id,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.City>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateCity(Domain.City CityAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(CityAdd.CityName)) return new Response<int>(0, Status.ERROR, "Given City is empty");
                if (isNameAvailableAlready(CityAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given City is already available");

                return new Response<int>(cityRepo.AddData(new Repository.City
                {
                    Id = CityAdd.CityId,
                    City1 = CityAdd.CityName,
                    CountryId = CityAdd.CountryId,
                    StateId = (int)(CityAdd.StateId == null ? 0 : CityAdd.StateId),
                    IsActive = CityAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateCity(Domain.City CityUpd)
        {
            if (string.IsNullOrEmpty(CityUpd.CityName)) return new Response<bool>(false, Status.ERROR, "Given City is empty");
            if (isNameAvailableAlready(CityUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given City is already available");

            return new Response<bool>(cityRepo.UpdateData(new Repository.City
            {
                City1 = CityUpd.CityName,
                Id = CityUpd.CityId,
                CountryId = CityUpd.CountryId,
                StateId = (int)(CityUpd.StateId == null ? 0 : CityUpd.StateId),
                IsActive = CityUpd.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteCity(int CityId)
        {
            return new Response<bool>(cityRepo.DeleteData(CityId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(Domain.City city, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetCity().Value.Where(c => c.CityName.ToUpper() == city.CityName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetCity().Value.Where(c => c.CityName.ToUpper() == city.CityName.ToUpper() && c.CityId != city.CityId).ToList().Count > 0);
            }
            return false;
        }


        public Response<IList<Domain.City>> GetCityCheckItemDetails(int CityId)
        {
            try
            {
                var ProductEWO = cityRepo.GetRepCityCheckItemDetails(CityId);

                return new Response<IList<Domain.City>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.City>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
