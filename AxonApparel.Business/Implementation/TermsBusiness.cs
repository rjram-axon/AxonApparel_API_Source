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
    public class TermsBusiness:ITermsBusiness
    {
        private ITermsRepository trmRepo = new TermsRepository();

        public Response<IEnumerable<Terms>> GetTrm()
        {
            try
            {
                var couList = trmRepo.GetDataListAll();
                return new Response<IEnumerable<Terms>>(couList.Select(m => new Domain.Terms
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    TermsId = m.TermId,
                    TermsName = m.TermName,                   
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Terms>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Terms> GetTrmId(int trmId)
        {
            try
            {
                var cou = trmRepo.GetDataById(trmId);
                return new Response<Terms>(new Domain.Terms
                {
                    TermsName = cou.TermName,
                    TermsId = cou.TermId,
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",                   
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Terms>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateTrm(Terms trmAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(trmAdd.TermsName)) return new Response<int>(0, Status.ERROR, "Given Terms is empty");
                if (isNameAvailableAlready(trmAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given Terms is already available");

                return new Response<int>(trmRepo.AddData(new Repository.TermMas
                {
                    TermName = trmAdd.TermsName,
                    TermId = trmAdd.TermsId,
                    IsActive = trmAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateTrm(Terms trmUpd)
        {
            if (string.IsNullOrEmpty(trmUpd.TermsName)) return new Response<bool>(false, Status.ERROR, "Given Country of Country is empty");
            if (isNameAvailableAlready(trmUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given Country is already available");

            return new Response<bool>(trmRepo.UpdateData(new Repository.TermMas
            {
                TermName = trmUpd.TermsName,
                TermId = trmUpd.TermsId,              
                IsActive = trmUpd.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteTrm(int trmId)
        {
            return new Response<bool>(trmRepo.DeleteData(trmId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(Domain.Terms trm, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetTrm().Value.Where(c => c.TermsName.ToUpper() == trm.TermsName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetTrm().Value.Where(c => c.TermsName.ToUpper() == trm.TermsName.ToUpper() && c.TermsId != trm.TermsId).ToList().Count > 0);
            }
            return false;

        }
    }
}
