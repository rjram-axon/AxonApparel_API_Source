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
    public class ReasonBusiness:IReasonBusiness
    {
        IReasonRepository ReaRep = new ReasonRepository();

        public Response<IEnumerable<Domain.Reason>> GetReason()
        {
            try
            {

                var ReaList = ReaRep.GetDataAllList();

                return new Response<IEnumerable<Domain.Reason>>(ReaList.Select(m => new Domain.Reason
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    ReasonName = m.Reason1,
                    ReasonId = m.ReasonId
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Reason>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Reason> GetDataById(int ReasonId)
        {
            try
            {

                var reaList = ReaRep.GetDataById(ReasonId);

                return new Response<Domain.Reason>(new Domain.Reason
                {
                    ReasonName = reaList.Reason1,
                    ReasonId = reaList.ReasonId,
                    IsActive = reaList.IsActive ? "TRUE" : "FALSE",
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.Reason>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateReason(Domain.Reason Reason)
        {
            try
            {
                if (string.IsNullOrEmpty(Reason.ReasonName)) return new Response<int>(0, Status.ERROR, "Given reason is empty");
                if (isNameAvailableAlready(Reason, "ADD")) return new Response<int>(0, Status.ERROR, "Given reason is already available");

                return new Response<int>(ReaRep.AddData(new AxonApparel.Repository.Reason
                {
                    Reason1 = Reason.ReasonName,
                    ReasonId = Reason.ReasonId,
                    IsActive = Reason.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateReason(Domain.Reason Reason)
        {
            return new Response<bool>(ReaRep.UpdateData(new AxonApparel.Repository.Reason
            {
                Reason1 = Reason.ReasonName,
                ReasonId = Reason.ReasonId,
                IsActive = Reason.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteReason(int ReasonId)
        {
            return new Response<bool>(ReaRep.DeleteData(ReasonId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Reason objRes, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetReason().Value.Where(c => c.ReasonName.ToUpper() == objRes.ReasonName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetReason().Value.Where(c => c.ReasonName.ToUpper() == objRes.ReasonName.ToUpper() && c.ReasonId != objRes.ReasonId).ToList().Count > 0);
            }
            return false;

        }
    }
}
