using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class PortOfLoadingBusiness : IPortOfLoadingBusiness
    {
        private PortOfLoadingRepository PortofLoadrepo = new PortOfLoadingRepository();

        public Response<IEnumerable<Domain.PortOfLoading>> GetPortOfLoading()
        {
            try
            {
                var PortofLoadList = PortofLoadrepo.GetDataListAll();
                return new Response<IEnumerable<Domain.PortOfLoading>>(PortofLoadList.Select(m => new Domain.PortOfLoading
                    {
                        IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",// m.IsActive ? "TRUE" : "FALSE",
                        PortOfLoading1 = (m.PortOfLoading1 == null ? "" : m.PortOfLoading1),//m.PortOfLoading1,
                        PortOfLoadingId = (int)(m.PortOfLoadingId == null ? 0 : m.PortOfLoadingId),//(int)m.PortOfLoadingId,
                        CountryId = (int)(m.CountryId == null ? 0 : m.CountryId),//(int)m.Countryid,
                        //Country =(m.Country == null ? "" : m.Country.country1),//m.Country.country1,
                        Country = (m.Country == null ? "" : m.Country),
                        PortCode = (m.PortCode == null ? "" : m.PortCode)//m.PortCode,
                    }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.PortOfLoading>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.PortOfLoading> GetPortOfLoadingId(int PortofLoadingId)
        {
            try
            {
                var Port = PortofLoadrepo.GetDataById(PortofLoadingId);
                return new Response<Domain.PortOfLoading>(new Domain.PortOfLoading
                {
                   
                    IsActive = Port.IsActive ? "TRUE" : "FALSE",
                    PortOfLoading1 = (Port.PortOfLoading1 == null ? "" : Port.PortOfLoading1),//m.PortOfLoading1,
                    PortOfLoadingId = (Port.PortOfLoadingId == null ? 0 : Port.PortOfLoadingId),//(int)m.PortOfLoadingId,
                    CountryId = (int)(Port.Countryid == null ? 0 : Port.Countryid),//(int)m.Countryid,
                    Country = "TEST",//(Port.Country == null ? "" : Port.Country.country1),//m.Country.country1,
                    PortCode = (Port.PortCode == null ? "" : Port.PortCode)//m.PortCode,
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception ex)
            {
                return new Response<Domain.PortOfLoading>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreatePortOfLoading(Domain.PortOfLoading PortOfLoadingAdd)
        {
            try
            {
                int? CoutId = 0;

                if (PortOfLoadingAdd.CountryId == 0)
                {
                    CoutId = null;
                }
                else
                {
                    CoutId = PortOfLoadingAdd.CountryId;
                }

                if (string.IsNullOrEmpty(PortOfLoadingAdd.PortOfLoading1)) return new Response<int>(0, Status.ERROR, "Given PortofLoading is empty");
                if (isNameAvailableAlready(PortOfLoadingAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given PortofLoading is already available");

                return new Response<int>(PortofLoadrepo.AddData(new Repository.PortofLoading
                {
                    PortOfLoading1 = PortOfLoadingAdd.PortOfLoading1,
                    PortOfLoadingId = PortOfLoadingAdd.PortOfLoadingId,
                    PortCode = PortOfLoadingAdd.PortCode,
                    Countryid = CoutId,//PortOfLoadingAdd.CountryId,
                    IsActive = PortOfLoadingAdd.IsActive.ToUpper() == "TRUE",
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdatePortOfLoading(Domain.PortOfLoading PortOfLoadingUpd)
        {


            int? CoutId = 0;

            if (PortOfLoadingUpd.CountryId == 0)
            {
                CoutId = null;
            }
            else
            {
                CoutId = PortOfLoadingUpd.CountryId;
            }
            if (string.IsNullOrEmpty(PortOfLoadingUpd.PortOfLoading1)) return new Response<bool>(false, Status.ERROR, "Given PortofLoading is empty");
            if (isNameAvailableAlready(PortOfLoadingUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given PortofLoading is already available");

            return new Response<bool>(PortofLoadrepo.UpdateData(new Repository.PortofLoading
            {
                PortOfLoading1 = PortOfLoadingUpd.PortOfLoading1,
                PortOfLoadingId = PortOfLoadingUpd.PortOfLoadingId,
                PortCode = PortOfLoadingUpd.PortCode,
                Countryid = CoutId,//PortOfLoadingUpd.CountryId,
                IsActive = PortOfLoadingUpd.IsActive.ToUpper() == "TRUE",
            }), Status.SUCCESS, "Updated Successfully");

        }

        public Response<bool> DeletePortOfLoading(int PortofLoadingId)
        {
            return new Response<bool>(PortofLoadrepo.DeleteData(PortofLoadingId), Status.SUCCESS, "Deleted Successfully");
        }


        private bool isNameAvailableAlready(Domain.PortOfLoading Port, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetPortOfLoading().Value.Where(c => c.PortOfLoading1.ToUpper() == Port.PortOfLoading1.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetPortOfLoading().Value.Where(c => c.PortOfLoading1.ToUpper() == Port.PortOfLoading1.ToUpper() && c.PortOfLoadingId != Port.PortOfLoadingId).ToList().Count > 0);
            }
            return false;
        }


        public Response<IList<Domain.PortOfLoading>> GetPortOfLoadingCheckItemDetails(int PortofLoadingId)
        {
            try
            {
                var ProductEWO = PortofLoadrepo.GetRepPortCheckItemDetails(PortofLoadingId);

                return new Response<IList<Domain.PortOfLoading>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.PortOfLoading>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
