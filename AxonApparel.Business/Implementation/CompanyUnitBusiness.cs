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
    public class CompanyUnitBusiness:ICompanyUnitBusiness
    {
        private ICompanyUnitRepository compRepo = new CompanyUnitRepository();

        public Response<IEnumerable<Domain.CompanyUnit>> GetCompanyUnit()
        {
            try
            {
                var couList = compRepo.GetDataListAll();
                return new Response<IEnumerable<Domain.CompanyUnit>>(couList.Select(m => new Domain.CompanyUnit
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    CompanyUnitName = m.CompanyUnit1,
                    CompanyUnitLookup = m.CUnitLookup,
                    CityId =(int) m.CityId,
                    Id=m.Id,
                    Address1=m.Address1,
                    Address2 = m.Address2,
                    Address3 = m.Address3,
                    ZipCode=m.Zipcode,
                    IssueType=m.IssueType,
                    CompanyId=m.CompanyId,
                    //WastageCut = (decimal)m.WastageCut,
                    //WastagePro = (decimal)m.WastageProc,
                    //OfficeExp = (decimal)m.OfficeExpense,
                    //OrderOverHead = (decimal)m.OrderOverHeads,
                    //QuoteOverHead = (decimal)m.QuoteOverHeads,
                    WastageCut = (decimal)(m.WastageCut == null ? 0 : m.WastageCut),//CompanyUnitAdd.WastageCut,
                    WastagePro = (decimal)(m.WastageProc == null ? 0 : m.WastageProc),//CompanyUnitAdd.WastagePro,
                    OfficeExp = (decimal)(m.OfficeExpense == null ? 0 : m.OfficeExpense),//CompanyUnitAdd.OfficeExp,
                    OrderOverHead = (decimal)(m.OrderOverHeads == null ? 0 : m.OrderOverHeads),// CompanyUnitAdd.OrderOverHead,
                    QuoteOverHead = (decimal)(m.QuoteOverHeads == null ? 0 : m.QuoteOverHeads),//CompanyUnitAdd.QuoteOverHead,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.CompanyUnit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.CompanyUnit> GetCompanyUnitId(int CUnitId)
        {
            try
            {
                var cou = compRepo.GetDataById(CUnitId);
                return new Response<Domain.CompanyUnit>(new Domain.CompanyUnit
                {
                    Id=cou.Id,
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",
                    CompanyUnitName = cou.CompanyUnit1,
                    CompanyUnitLookup = cou.CUnitLookup,
                    CityId = (int)cou.CityId,
                    CompanyId = cou.CompanyId,
                    Address1 = cou.Address1,
                    Address2 = cou.Address2,
                    Address3 = cou.Address3,
                    ZipCode = cou.Zipcode,
                    IssueType = cou.IssueType,
                    //WastageCut = (decimal)cou.WastageCut,
                    //WastagePro = (decimal)cou.WastageProc,
                    //OfficeExp = (decimal)cou.OfficeExpense,
                    //OrderOverHead = (decimal)cou.OrderOverHeads,
                    //QuoteOverHead = (decimal)cou.QuoteOverHeads,
                    WastageCut = (decimal)(cou.WastageCut == null ? 0 : cou.WastageCut),//CompanyUnitAdd.WastageCut,
                    WastagePro = (decimal)(cou.WastageProc == null ? 0 : cou.WastageProc),//CompanyUnitAdd.WastagePro,
                    OfficeExp = (decimal)(cou.OfficeExpense == null ? 0 : cou.OfficeExpense),//CompanyUnitAdd.OfficeExp,
                    OrderOverHead = (decimal)(cou.OrderOverHeads == null ? 0 : cou.OrderOverHeads),// CompanyUnitAdd.OrderOverHead,
                    QuoteOverHead = (decimal)(cou.QuoteOverHeads == null ? 0 : cou.QuoteOverHeads),//CompanyUnitAdd.QuoteOverHead,
                    //CompanyId = cou.CompanyId,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.CompanyUnit>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateCompanyUnit(Domain.CompanyUnit CompanyUnitAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(CompanyUnitAdd.CompanyUnitName)) return new Response<int>(0, Status.ERROR, "Given CompanyUnit is empty");
                if (isNameAvailableAlready(CompanyUnitAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given CompanyUnit is already available");

                return new Response<int>(compRepo.AddData(new Repository.CompanyUnit
                {
                    Id = CompanyUnitAdd.Id,
                    IsActive = CompanyUnitAdd.IsActive.ToUpper() == "TRUE",
                    CompanyUnit1 = CompanyUnitAdd.CompanyUnitName,
                    CUnitLookup = CompanyUnitAdd.CompanyUnitLookup,
                    CityId = (int)CompanyUnitAdd.CityId,
                    Address1 = CompanyUnitAdd.Address1,
                    Address2 = CompanyUnitAdd.Address2,
                    Address3 = CompanyUnitAdd.Address3,
                    Zipcode = CompanyUnitAdd.ZipCode,
                    IssueType = CompanyUnitAdd.IssueType,
                    CompanyId = CompanyUnitAdd.CompanyId,
                    WastageCut = CompanyUnitAdd.WastageCut,
                    WastageProc = CompanyUnitAdd.WastagePro,
                    OfficeExpense = CompanyUnitAdd.OfficeExp,
                    OrderOverHeads = CompanyUnitAdd.OrderOverHead,
                    QuoteOverHeads = CompanyUnitAdd.QuoteOverHead,
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateCompanyUnit(Domain.CompanyUnit CompUpd)
        {
            if (string.IsNullOrEmpty(CompUpd.CompanyUnitName)) return new Response<bool>(false, Status.ERROR, "Given CompanyUnit of Company is empty");
            if (isNameAvailableAlready(CompUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given CompanyUnit is already available");

            return new Response<bool>(compRepo.UpdateData(new Repository.CompanyUnit
            {
                Id = CompUpd.Id,
                IsActive = CompUpd.IsActive.ToUpper() == "TRUE",
                CompanyUnit1 = CompUpd.CompanyUnitName,
                CUnitLookup = (CompUpd.CompanyUnitLookup == null ? "" : CompUpd.CompanyUnitLookup),//CompUpd.CompanyUnitLookup,
                CityId = (int)CompUpd.CityId,
                Address1 = (CompUpd.Address1 == null ? "" : CompUpd.Address1),//CompUpd.Address1,
                Address2 = (CompUpd.Address2 == null ? "" : CompUpd.Address2),//CompUpd.Address2,
                Address3 = (CompUpd.Address3 == null ? "" : CompUpd.Address3),//CompUpd.Address3,
                Zipcode = (CompUpd.ZipCode == null ? "" : CompUpd.ZipCode),//CompUpd.ZipCode,
                IssueType = CompUpd.IssueType,
                CompanyId = CompUpd.CompanyId,
                WastageCut = CompUpd.WastageCut,
                WastageProc = CompUpd.WastagePro,
                OfficeExpense = CompUpd.OfficeExp,
                OrderOverHeads = CompUpd.OrderOverHead,
                QuoteOverHeads = CompUpd.QuoteOverHead,
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteCompanyUnit(int CompanyUnitId)
        {
            return new Response<bool>(compRepo.DeleteData(CompanyUnitId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(Domain.CompanyUnit comp, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetCompanyUnit().Value.Where(c => c.CompanyUnitName.ToUpper() == comp.CompanyUnitName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetCompanyUnit().Value.Where(c => c.CompanyUnitName.ToUpper() == comp.CompanyUnitName.ToUpper() && c.Id != comp.Id).ToList().Count > 0);
            }
            return false;
        }


        public Response<IList<Domain.CompanyUnit>> GetCompUnitCheckItemDetails(int CompanyUnitId)
        {
            try
            {
                var ProductEWO = compRepo.GetRepCompUnitCheckItemDetails(CompanyUnitId);

                return new Response<IList<Domain.CompanyUnit>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.CompanyUnit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
