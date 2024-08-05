using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class AgentBusiness : IAgentBusiness
    {
        private IAgentRepository strrep = new AgentRepository();
        public Response<IEnumerable<Domain.Agent>> GetAgent()
        {
            try
            {
                var strlist = strrep.GetDataListAll();
                return new Response<IEnumerable<Domain.Agent>>(strlist.Select(m => new Domain.Agent
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    AgentId = m.AgentId,
                    CityId = (int)(m.CityId == null ? 0 : m.CityId),
                    CityName = m.CityName,
                    CountryId = (int)(m.CountryId == null ? 0 : m.CountryId),
                    CountryName = m.CountryName,
                    AgentName = m.AgentName,
                    Address1 = (m.Address1 == null ? "0" : m.Address1),//m.Address1,
                    Address2 = (m.Address2 == null ? "0" : m.Address2),//m.Address2,
                    Address3 = (m.Address3 == null ? "0" : m.Address3),//m.Address3,
                    Zipcode = (m.Zipcode == null ? "0" : m.Zipcode),
                    Phone = (m.Phone == null ? "0" : m.Phone),
                    Type = m.Type,
                    ContactName = m.ContactName,

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Agent>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }
        public Response<IEnumerable<Domain.Agent>> GetSAgent()
        {
            try
            {
                var strlist = strrep.SGetDataList();
                return new Response<IEnumerable<Domain.Agent>>(strlist.Select(m => new Domain.Agent
                {
                    IsActive = m.IsActive == "1" ? "TRUE" : "FALSE",
                    AgentId = m.AgentId,
                    CityId = (int)(m.CityId == null ? 0 : m.CityId),
                    CityName = m.CityName,
                    CountryId = (int)(m.CountryId == null ? 0 : m.CountryId),
                    CountryName = m.CountryName,
                    AgentName = m.AgentName,
                    Address1 = (m.Address1 == null ? "0" : m.Address1),//m.Address1,
                    Address2 = (m.Address2 == null ? "0" : m.Address2),//m.Address2,
                    Address3 = (m.Address3 == null ? "0" : m.Address3),//m.Address3,
                    Zipcode = (m.Zipcode == null ? "0" : m.Zipcode),
                    Phone = (m.Phone == null ? "0" : m.Phone),
                    Type = m.Type,
                    ContactName = m.ContactName,

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Agent>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }
        public Response<Domain.Agent> GetAgentId(int AgentId)
        {
            try
            {
                var str = strrep.GetDataById(AgentId);
                return new Response<Domain.Agent>(new Domain.Agent
                {

                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    AgentId = str.AgentId,
                    CityId = (int)(str.CityId == null ? 0 : str.CityId),
                    CityName = "",//(str.CityId == null ? "" : str.City.City1),
                    CountryName = "",//(str.Country == null ? "" : str.Country.country1),//str.Country.country1,
                    CountryId = (int)(str.CountryId == null ? 0 : str.CountryId),
                    AgentName = (str.Agent1 == null ? "" : str.Agent1),//m.Agent1,
                    Address1 = (str.Address1 == null ? "" : str.Address1),//m.Address1,
                    Address2 = (str.Address2 == null ? "" : str.Address2),//m.Address2,
                    Address3 = (str.Address3 == null ? "" : str.Address3),//m.Address3,
                    Zipcode = (str.Zipcode == null ? "" : str.Zipcode),
                    MobNo = (str.Mob_No == 0 ? 0 : str.Mob_No),
                    Type = str.Type,
                    ContactName = str.Contact_Name,

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Agent>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }


        public Response<int> CreateAgent(Domain.Agent AgentAdd)
        {
            try
            {


                int? CitId = 0;

                if (AgentAdd.CityId == 0)
                {
                    CitId = null;
                }
                else
                {
                    CitId = AgentAdd.CityId;
                }




                if (string.IsNullOrEmpty(AgentAdd.AgentName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Agent is empty");
                if (isNameAvailableAlready(AgentAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Mode of Agent is already available");

                return new Response<int>(strrep.AddData(new Repository.Agent
                {
                    IsActive = AgentAdd.IsActive.ToUpper() == "TRUE",
                    AgentId = AgentAdd.AgentId,
                    Agent1 = AgentAdd.AgentName,
                    Address1 = AgentAdd.Address1,
                    Address2 = AgentAdd.Address2,
                    Address3 = AgentAdd.Address3,
                    CityId = CitId,
                    CountryId = AgentAdd.CountryId,
                    Zipcode = AgentAdd.Zipcode,
                    Phone = AgentAdd.Phone,
                    Mob_No = AgentAdd.MobNo,
                    Type = AgentAdd.Type,
                    Contact_Name = AgentAdd.ContactName,
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateAgent(Domain.Agent AgentUpd)
        {


            int? CitId = 0;

            if (AgentUpd.CityId == 0)
            {
                CitId = null;
            }
            else
            {
                CitId = AgentUpd.CityId;
            }
            if (string.IsNullOrEmpty(AgentUpd.AgentName))
                return new Response<bool>(false, Status.ERROR, "Given Name of Agent is empty");
            if (isNameAvailableAlready(AgentUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given name of Agent is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.Agent
            {
                IsActive = AgentUpd.IsActive.ToUpper() == "TRUE",
                AgentId = AgentUpd.AgentId,
                Agent1 = AgentUpd.AgentName,
                Address1 = AgentUpd.Address1,
                Address2 = AgentUpd.Address2,
                Address3 = AgentUpd.Address3,
                CityId = CitId,
                CountryId = AgentUpd.CountryId,
                Zipcode = AgentUpd.Zipcode,
                Phone = AgentUpd.Phone,
                Mob_No = AgentUpd.MobNo,
                Type = AgentUpd.Type,
                Contact_Name = AgentUpd.ContactName,
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteAgent(int AgentId)
        {
            return new Response<bool>(strrep.DeleteData(AgentId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Agent store, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetAgent().Value.Where(c => c.AgentName.ToUpper() == store.AgentName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetAgent().Value.Where(c => c.AgentName.ToUpper() == store.AgentName.ToUpper() && c.AgentId != store.AgentId).ToList().Count > 0);
            }
            return false;

        }



        public Response<IEnumerable<Domain.Agent>> GetBAgent()
        {
            try
            {
                var strlist = strrep.BGetDataList();
                return new Response<IEnumerable<Domain.Agent>>(strlist.Select(m => new Domain.Agent
                {
                    IsActive = m.IsActive == "1" ? "TRUE" : "FALSE",
                    AgentId = m.AgentId,
                    CityId = (int)(m.CityId == null ? 0 : m.CityId),
                    CityName = m.CityName,
                    CountryId = (int)(m.CountryId == null ? 0 : m.CountryId),
                    CountryName = m.CountryName,
                    AgentName = m.AgentName,
                    Address1 = (m.Address1 == null ? "0" : m.Address1),//m.Address1,
                    Address2 = (m.Address2 == null ? "0" : m.Address2),//m.Address2,
                    Address3 = (m.Address3 == null ? "0" : m.Address3),//m.Address3,
                    Zipcode = (m.Zipcode == null ? "0" : m.Zipcode),
                    Phone = (m.Phone == null ? "0" : m.Phone),
                    Type = m.Type,
                    ContactName = m.ContactName,

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Agent>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }


        public Response<IList<Domain.Agent>> GetAgentCheckItemDetails(int AgentId)
        {
            try
            {
                var ProductEWO = strrep.GetRepAgentCheckItemDetails(AgentId);

                return new Response<IList<Domain.Agent>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Agent>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
