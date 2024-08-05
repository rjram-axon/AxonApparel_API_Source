using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class CourierBusiness:ICourierBusiness
    {
        private ICourierRepository crep = new CourierRepository();

        public Common.Response<IQueryable<Domain.Courier>> GetCourier()
        {
            try
            {
                var strlist = crep.GetDataList();
                return new Response<IQueryable<Domain.Courier>>(strlist.Select(m => new Domain.Courier
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    CourierId = (int)(m.CourierId == null ? 0 : m.CourierId),
                    CountryId = (int)(m.CountryId == null ? 0 : m.CountryId),
                    //CountryName = (m.CountryId == null ? "0" : m.Country.country1),
                    CountryName = (m.Country == null ? "" : m.Country.country1),//m.Country.country1,
                    CourierAddress = (m.CourierAddress == null ? "" : m.CourierAddress),// m.CourierAddress,
                    URL = (m.URL == null ? "" : m.URL),//m.URL,
                    Email = (m.Email == null ? "" : m.Email),//m.Email,
                    Phone = (m.Phone == null ? "" : m.Phone),//m.Phone,
                    Fax = (m.Fax == null ? "" : m.Fax),//m.Fax,
                    CourierName = (m.Courier1 == null ? "" : m.Courier1),//m.Courier1
                   }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Courier>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<Domain.Courier> GetCourierId(int CourierId)
        {
            try
            {
                var str = crep.GetDataById(CourierId);
                return new Response<Domain.Courier>(new Domain.Courier
                {
            
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    CourierId = (str.CourierId == null ? 0 : str.CourierId),
                    CountryId = (int)(str.CountryId == null ? 0 : str.CountryId),
                    //CountryName = (m.CountryId == null ? "0" : m.Country.country1),
                    CountryName = (str.Country == null ? "" : str.Country.country1),//m.Country.country1,
                    CourierAddress = (str.CourierAddress == null ? "" : str.CourierAddress),// m.CourierAddress,
                    URL = (str.URL == null ? "" : str.URL),//m.URL,
                    Email = (str.Email == null ? "" : str.Email),//m.Email,
                    Phone = (str.Phone == null ? "" : str.Phone),//m.Phone,
                    Fax = (str.Fax == null ? "" : str.Fax),//m.Fax,
                    CourierName = (str.Courier1 == null ? "" : str.Courier1),//m.Courier1
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Courier>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Common.Response<int> CreateCourier(Domain.Courier CourierAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(CourierAdd.CourierName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Courier is empty");
                if (isNameAvailableAlready(CourierAdd, "ADD"))
                    return new Response<int>(0, Status.ERROR, "Given Mode of Courier is already available");

                return new Response<int>(crep.AddData(new Repository.Courier
                {
                    CourierId = CourierAdd.CourierId,
                    CourierAddress=CourierAdd.CourierAddress,
                    Courier1=CourierAdd.CourierName,
                    URL=CourierAdd.URL,
                    Phone=CourierAdd.Phone,
                    Fax=CourierAdd.Fax,
                    Email=CourierAdd.Email,
                    CountryId=CourierAdd.CountryId,
                    IsActive = CourierAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateCourier(Domain.Courier CourierUpd)
        {
            if (string.IsNullOrEmpty(CourierUpd.CourierName))
                return new Response<bool>(false, Status.ERROR, "Given Courier  is empty");
            if (isNameAvailableAlready(CourierUpd, "UPDATE"))
                return new Response<bool>(false, Status.ERROR, "Given name of Courier is already available");

            return new Response<bool>(crep.UpdateData(new Repository.Courier
            {
                IsActive = CourierUpd.IsActive.ToUpper() == "TRUE",
                Courier1=CourierUpd.CourierName,
                CourierId=CourierUpd.CourierId,
                CourierAddress=CourierUpd.CourierAddress,
                Email=CourierUpd.Email,
                Fax=CourierUpd.Fax,
                Phone=CourierUpd.Phone,
                CountryId=CourierUpd.CountryId,
                URL=CourierUpd.URL
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteCourier(int CourierId)
        {
            return new Response<bool>(crep.DeleteData(CourierId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Courier ig, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetCourier().Value.Where(c => c.CourierName.ToUpper() == ig.CourierName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetCourier().Value.Where(c => c.CourierName.ToUpper() == ig.CourierName.ToUpper() && c.CourierId != ig.CourierId).ToList().Count > 0);
            }
            return false;

        }
    }
}
