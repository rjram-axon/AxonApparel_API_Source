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
    public class CountryBusiness : ICountryBusiness
    {
        private ICountryRepository countryRepo = new CountryRepository();



        public Response<IEnumerable<Domain.Country>> GetCountry()
        {
            try
            {
                var couList = countryRepo.GetAllCountry();
                return new Response<IEnumerable<Domain.Country>>(couList.Select(m => new Domain.Country
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    CountryId = m.countryid,
                    CountryName = m.country1,
                    Lookup=m.lookup,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Country>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Country> GetCountryId(int countryId)
        {
            try
            {
                var cou = countryRepo.GetDataById(countryId);
                return new Response<Domain.Country>(new Domain.Country
                {
                    CountryName = cou.country1,
                    CountryId = cou.countryid,
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",
                    Lookup=cou.lookup,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Country>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateCountry(Domain.Country CountryAdd)
        {            
            try
            {
                if (string.IsNullOrEmpty(CountryAdd.CountryName)) return new Response<int>(0, Status.ERROR, "Given Country is empty");
                if (isNameAvailableAlready(CountryAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given Country is already available");

                return new Response<int>(countryRepo.AddData(new Repository.Country
                {
                    countryid = CountryAdd.CountryId,
                    country1= CountryAdd.CountryName,
                    lookup=CountryAdd.Lookup,
                    IsActive = CountryAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateCountry(Domain.Country CountryUpd)
        {
            if (string.IsNullOrEmpty(CountryUpd.CountryName)) return new Response<bool>(false, Status.ERROR, "Given Country of Country is empty");
            if (isNameAvailableAlready(CountryUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given Country is already available");

            return new Response<bool>(countryRepo.UpdateData(new Repository.Country
            {
                country1 = CountryUpd.CountryName,
                countryid = CountryUpd.CountryId,
                lookup=CountryUpd.Lookup,
                IsActive = CountryUpd.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteCountry(int CountryId)
        {
            return new Response<bool>(countryRepo.DeleteData(CountryId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(Domain.Country country, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetCountry().Value.Where(c => c.CountryName.ToUpper() == country.CountryName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetCountry().Value.Where(c => c.CountryName.ToUpper() == country.CountryName.ToUpper() && c.CountryId != country.CountryId).ToList().Count > 0);
            }
            return false;

        }


        public Response<IList<Domain.Country>> GetCountryCheckItemDetails(int CountryId)
        {
            try
            {
                var ProductEWO = countryRepo.GetRepCountryCheckItemDetails(CountryId);

                return new Response<IList<Domain.Country>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Country>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IEnumerable<Domain.Country>> GetAllBusCountry()
        {
            try
            {
                var couList = countryRepo.GetAllCountry();
                return new Response<IEnumerable<Domain.Country>>(couList.Select(m => new Domain.Country
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    CountryId = m.countryid,
                    CountryName = m.country1,
                    Lookup = m.lookup,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Country>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
