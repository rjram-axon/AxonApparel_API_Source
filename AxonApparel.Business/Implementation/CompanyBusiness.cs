using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public class CompanyBusiness : ICompanyBusiness
    {
        private ICompanyRepository comprep = new CompanyRepository();

        public Response<IEnumerable<Domain.Company>> GetCompany()
        {
            try
            {
                var strlist = comprep.GetDataAllList();
                // int CityId = 0;
                //  int countryid=0;
                return new Response<IEnumerable<Domain.Company>>(strlist.Select(m => new Domain.Company
                {
                    //IsActive = m.IsActive == "1" ? "TRUE" : "FALSE",
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    CompanyId = m.CompanyId,
                    CityId = (int)(m.CityId == null ? 0 : m.CityId),
                    CityName = m.CityName,
                    CountryId = (int)(m.CountryId == null ? 0 : m.CountryId),
                    CountryName = m.CountryName,
                    CompanyName = m.CompanyName,
                    Address1 = m.Address1,
                    Address2 = m.Address2,
                    Address3 = m.Address3,
                    Zipcode = (int)m.Zipcode,
                    Complookup = m.Complookup,
                    ContactName = m.ContactName,
                    MobNo = (long)m.MobNo,
                    cstno = (int)m.cstno,
                    cstdate = (DateTime)m.cstdate,
                    TinNo = (int)m.TinNo,
                    TinDate = (DateTime)m.TinDate,
                    Email = m.Email,
                    Fax = m.Fax,
                    Telex = m.Telex,
                    Rbi_code_num = (int)m.Rbi_code_num,
                    Prefix = m.Prefix,
                    LogoName = m.LogoName,
                    RCMC_No = (int)m.RCMC_No,
                    EAN_No = (int)m.EAN_No,
                    Range = m.Range,
                    Division = m.Division,
                    AEPC_No = (int)m.AEPC_No,
                    AEPC_Date = (DateTime)m.AEPC_Date,
                    IEC_No = (int)m.IEC_No,
                    IE_code = m.IE_code,
                    TNGST_No = (int)m.TNGST_No,
                    GSTNo = m.GSTNo == null ? "" : m.GSTNo,
                    RexNo = m.RexNo == null ? "" : m.RexNo,
                    PANno = m.PANno == null ? "" : m.PANno

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Company>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<Domain.Company> GetCompanyId(int CompanyId)
        {
            try
            {
                var st = comprep.GetDataById(CompanyId);
                return new Response<Domain.Company>(new Domain.Company
                {
                    IsActive = st.IsActive ? "TRUE" : "FALSE",
                    CompanyId = st.CompanyId,
                    CompanyName = st.Company1,
                    Complookup = st.Company_Lookup,
                    Address1 = st.Address1,
                    Address2 = st.Address2,
                    Address3 = st.Address3,
                    CityId = (int)st.CityId,
                    CountryId = (int)(st.CountryId == null ? 0 : st.CountryId),//(int)st.CountryId,
                    CountryName = "",
                    Zipcode = (int)st.Zipcode,
                    MobNo = (long)st.Mob_No,
                    cstno = (int)st.Cst_No,
                    cstdate = (DateTime)st.Cst_Date,
                    TinNo = (int)st.Tin_no,
                    TinDate = (DateTime)st.Tin_Date,
                    Fax = st.Fax,
                    Email = st.E_mail,
                    Telex = st.Telex,
                    Rbi_code_num = (int)st.RBI_CODE_No,
                    Prefix = st.Prefix,
                    LogoName = st.LogoName,
                    RCMC_No = (int)st.RCMCNO,
                    EAN_No = (int)st.EANNo,
                    Range = st.C_Range,
                    Division = st.C_Division,
                    AEPC_No = (int)st.Aepc_No,
                    AEPC_Date = (DateTime)st.Aepc_Date,
                    IEC_No = (int)st.IECNo,
                    IE_code = (decimal)st.IEcode,
                    TNGST_No = (int)st.Tngst_No,
                    ContactName = st.ContactName,
                    GSTNo=st.GSTNo,
                    Imgpath=st.Imgpath,
                    RexNo=st.RexNo,
                    PANno = st.PANno,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Company>(null, Status.ERROR, "OOPS error occured...Please try again");
            }

        }

        public Response<int> CreateCompany(Domain.Company CompanyAdd)
        {
            try
            {

                int? BcurrID = 0;

                if (CompanyAdd.BCurrencyId == 0)
                {
                    BcurrID = null;
                }
                else
                {
                    BcurrID = CompanyAdd.BCurrencyId;
                }

                if (string.IsNullOrEmpty(CompanyAdd.CompanyName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Company is empty");
                if (isNameAvailableAlready(CompanyAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Name of Company is already available");

                return new Response<int>(comprep.AddData(new Repository.Company
                {
                    IsActive = CompanyAdd.IsActive.ToUpper() == "TRUE",
                    CompanyId = CompanyAdd.CompanyId,
                    Company1 = CompanyAdd.CompanyName,
                    Company_Lookup = CompanyAdd.Complookup,
                    Address1 = CompanyAdd.Address1,
                    Address2 = CompanyAdd.Address2,
                    Address3 = CompanyAdd.Address3,
                    CityId = CompanyAdd.CityId,
                    CountryId = CompanyAdd.CountryId,
                    E_mail = CompanyAdd.Email,
                    Fax = CompanyAdd.Fax,
                    Telex = CompanyAdd.Telex,
                    Zipcode = CompanyAdd.Zipcode,
                    Mob_No = CompanyAdd.MobNo,
                    Cst_No = CompanyAdd.cstno,
                    Cst_Date = CompanyAdd.cstdate,
                    Tin_no = CompanyAdd.TinNo,
                    Tin_Date = CompanyAdd.TinDate,
                    C_Range = CompanyAdd.Range,
                    C_Division = CompanyAdd.Division,
                    Prefix = CompanyAdd.Prefix,
                    LogoName = CompanyAdd.LogoName,
                    RBI_CODE_No = CompanyAdd.Rbi_code_num,
                    Aepc_No = CompanyAdd.AEPC_No,
                    Aepc_Date = CompanyAdd.AEPC_Date,
                    RCMCNO = CompanyAdd.RCMC_No,
                    EANNo = CompanyAdd.EAN_No,
                    IECNo = CompanyAdd.IEC_No,
                    IEcode = CompanyAdd.IE_code,
                    Tngst_No = CompanyAdd.TNGST_No,
                    ContactName = CompanyAdd.ContactName,
                    BaseCurrencyId = BcurrID,
                    GSTNo=CompanyAdd.GSTNo,
                    Imgpath=CompanyAdd.Imgpath,
                    RexNo = CompanyAdd.RexNo,
                    PANno = CompanyAdd.PANno,
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateCompany(Domain.Company CompanyUpd)
        {
            if (string.IsNullOrEmpty(CompanyUpd.CompanyName))
                return new Response<bool>(false, Status.ERROR, "Given Name of Company is empty");
            if (isNameAvailableAlready(CompanyUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Name of Company is already available");


            int? BcurrID = 0;

            if (CompanyUpd.BCurrencyId == 0)
            {
                BcurrID = null;
            }
            else
            {
                BcurrID = CompanyUpd.BCurrencyId;
            }

            return new Response<bool>(comprep.UpdateData(new Repository.Company
            {
                IsActive = CompanyUpd.IsActive.ToUpper() == "TRUE",
                CompanyId = CompanyUpd.CompanyId,
                Company1 = CompanyUpd.CompanyName,
                Company_Lookup = CompanyUpd.Complookup,
                Address1 = CompanyUpd.Address1,
                Address2 = CompanyUpd.Address2,
                Address3 = CompanyUpd.Address3,
                E_mail = CompanyUpd.Email,
                Fax = CompanyUpd.Fax,
                Telex = CompanyUpd.Telex,
                Zipcode = CompanyUpd.Zipcode,
                Mob_No = CompanyUpd.MobNo,
                Cst_No = CompanyUpd.cstno,
                Cst_Date = CompanyUpd.cstdate,
                Tin_no = CompanyUpd.TinNo,
                Tin_Date = CompanyUpd.TinDate,
                C_Range = CompanyUpd.Range,
                C_Division = CompanyUpd.Division,
                Prefix = CompanyUpd.Prefix,
                LogoName = CompanyUpd.LogoName,
                RBI_CODE_No = CompanyUpd.Rbi_code_num,
                Aepc_No = CompanyUpd.AEPC_No,
                Aepc_Date = CompanyUpd.AEPC_Date,
                RCMCNO = CompanyUpd.RCMC_No,
                EANNo = CompanyUpd.EAN_No,
                IECNo = CompanyUpd.IEC_No,
                IEcode = CompanyUpd.IE_code,
                Tngst_No = CompanyUpd.TNGST_No,
                ContactName = CompanyUpd.ContactName,
                CityId = CompanyUpd.CityId,
                CountryId = CompanyUpd.CountryId,
                BaseCurrencyId = BcurrID,
                GSTNo=CompanyUpd.GSTNo,
                Imgpath =CompanyUpd.Imgpath,
                RexNo = CompanyUpd.RexNo,
                PANno = CompanyUpd.PANno,
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteCompany(int CompanyId)
        {
            return new Response<bool>(comprep.DeleteData(CompanyId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Company comp, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetCompany().Value.Where(c => c.CompanyName.ToUpper() == comp.CompanyName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetCompany().Value.Where(c => c.CompanyName.ToUpper() == comp.CompanyName.ToUpper() && c.CompanyId != comp.CompanyId).ToList().Count > 0);
            }
            return false;
        }



        public Response<IQueryable<Domain.Company>> GetDataCountDetails(int Id)
        {
            try
            {
                var ProductWO = comprep.GetDataRepCountDetails(Id);

                return new Response<IQueryable<Domain.Company>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Company>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.Company>> GetCompCheckItemDetails(int CompanyId)
        {
            try
            {
                var ProductEWO = comprep.GetRepCompCheckItemDetails(CompanyId);

                return new Response<IList<Domain.Company>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Company>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
