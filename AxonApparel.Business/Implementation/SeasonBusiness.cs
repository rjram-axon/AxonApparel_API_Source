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
   public class SeasonBusiness:ISeasonBusiness
    {
       
       ISeasonRepository SeaRep = new SeasonRepository();

        public Response<IEnumerable<Domain.Season>> GetSeason()
        {
            try
            {

                var seaList = SeaRep.GetDataListAll();

                return new Response<IEnumerable<Domain.Season>>(seaList.Select(m => new Domain.Season
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",           
                    SeasonName = m.Season1,
                    SeasonId = m.SeasonId
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Season>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Season> GetDataById(int SeasonId)
        {
            try
            {          

                var seaList = SeaRep.GetDataById(SeasonId);

                return new Response<Domain.Season>(new Domain.Season
                {
                    SeasonName = seaList.Season1,
                    SeasonId = seaList.SeasonId,
                    IsActive = seaList.IsActive ? "TRUE" : "FALSE",         
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.Season>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateSeason(Domain.Season obSea)
        {
            try
            {
                if (string.IsNullOrEmpty(obSea.SeasonName)) return new Response<int>(0, Status.ERROR, "Given season is empty");
                if (isNameAvailableAlready(obSea, "ADD")) return new Response<int>(-1, Status.ERROR, "Given season is already available");

                return new Response<int>(SeaRep.AddData(new AxonApparel.Repository.Season
                {
                    Season1 = obSea.SeasonName,
                    SeasonId = obSea.SeasonId,
                    IsActive = obSea.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateSeason(Domain.Season obSea)
        {
            //if (string.IsNullOrEmpty(obSea.SeasonName)) return new Response<bool>(false, Status.ERROR, "Given Season is empty");
            if (isNameAvailableAlready(obSea, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given Season is already available");

            return new Response<bool>(SeaRep.UpdateData(new AxonApparel.Repository.Season
            {
                Season1 = obSea.SeasonName,
                SeasonId = obSea.SeasonId,
                IsActive = obSea.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteSeason(int SeasonId)
        {
            return new Response<bool>(SeaRep.DeleteData(SeasonId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Season objSystem, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetSeason().Value.Where(c => c.SeasonName.ToUpper() == objSystem.SeasonName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetSeason().Value.Where(c => c.SeasonName.ToUpper() == objSystem.SeasonName.ToUpper() && c.SeasonId != objSystem.SeasonId).ToList().Count > 0);
            }
            return false;

        }
    }
}
