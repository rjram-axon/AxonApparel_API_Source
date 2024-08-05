using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class BankBusiness:IBankBusiness
    {
        private IBankRepository bankrep = new BankRepository();

        public Common.Response<IQueryable<Domain.Bank>> GetBank()
        {
            try
            {
                var strlist = bankrep.GetDataList();
                return new Response<IQueryable<Domain.Bank>>(strlist.Select(m => new Domain.Bank
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    BankId = m.Id,
                    CityId = (int)(m.CityId == null ? 0 : m.CityId),
                    CityName = (m.CityId == null ? "" : m.City.City1),
                    BankLookup=m.LookUp,
                    CountryId = (int)(m.CountryId == null ? 0 : m.CountryId),
                    CountryName = (m.CountryId == null ? "" : m.Country.country1),
                    BankName = (m.Bank1 == null ? "" : m.Bank1),//m.Bank1,
                    Address1 = (m.Address1 == null ? "" : m.Address1),// m.Address1,
                    Address2 = (m.Address2 == null ? "" : m.Address2),//m.Address2,
                    Address3 = (m.Address3 == null ? "" : m.Address3),//m.Address3,
                    Zipcode = (m.Zipcode == null ? "" : m.Zipcode),//m.Zipcode,
                    Email = (m.E_Mail == null ? "" : m.E_Mail),//m.E_Mail,
                    Fax = (m.Fax == null ? "" : m.Fax),//m.Fax,
                    Telex = (m.Telex == null ? "" : m.Telex),//m.Telex,
                    shiftno = (int)(m.ShiftNo == null ? 0 : m.ShiftNo),//(int)m.ShiftNo,
                    shortcode = (m.ShortCode == null ? "" : m.ShortCode),//m.ShortCode,
                    MobNum = (long)(m.Mob_No == null ? 0 : m.Mob_No),//(long)m.Mob_No,
                    ContactName = (m.Contact_Name == null ? "" : m.Contact_Name),//m.Contact_Name
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Bank>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<Domain.Bank> GetBankId(int BankId)
        {
            try
            {
                var str = bankrep.GetDataById(BankId);
                return new Response<Domain.Bank>(new Domain.Bank
                {
                
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    BankId = str.Id,
                    CityId = (int)(str.CityId == null ? 0 : str.CityId),
                    CityName = (str.CityId == null ? "" : str.City.City1),
                    BankLookup = str.LookUp,
                    CountryId = (int)(str.CountryId == null ? 0 : str.CountryId),
                    CountryName = (str.CountryId == null ? "" : str.Country.country1),
                    BankName = (str.Bank1 == null ? "" : str.Bank1),//m.Bank1,
                    Address1 = (str.Address1 == null ? "" : str.Address1),// m.Address1,
                    Address2 = (str.Address2 == null ? "" : str.Address2),//m.Address2,
                    Address3 = (str.Address3 == null ? "" : str.Address3),//m.Address3,
                    Zipcode = (str.Zipcode == null ? "" : str.Zipcode),//m.Zipcode,
                    Email = (str.E_Mail == null ? "" : str.E_Mail),//m.E_Mail,
                    Fax = (str.Fax == null ? "" : str.Fax),//m.Fax,
                    Telex = (str.Telex == null ? "" : str.Telex),//m.Telex,
                    shiftno = (int)(str.ShiftNo == null ? 0 : str.ShiftNo),//(int)m.ShiftNo,
                    shortcode = (str.ShortCode == null ? "" : str.ShortCode),//m.ShortCode,
                    MobNum = (long)(str.Mob_No == null ? 0 : str.Mob_No),//(long)m.Mob_No,
                    ContactName = (str.Contact_Name == null ? "" : str.Contact_Name),//m.Contact_Name

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Bank>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Common.Response<int> CreateBank(Domain.Bank BankAdd)
        {
            try
            {
                int? CitId = 0;
                int? CouId = 0;

                if (BankAdd.CityId == 0)
                {
                    CitId = null;
                }
                else
                {
                    CitId = BankAdd.CityId;
                }

          

                if (BankAdd.CountryId == 0)
                {
                    CouId = null;
                }
                else
                {
                    CouId = BankAdd.CountryId;
                }

                if (string.IsNullOrEmpty(BankAdd.BankName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Bank is empty");
                if (isNameAvailableAlready(BankAdd, "ADD"))
                    return new Response<int>(0, Status.ERROR, "Given Mode of Bank is already available");

                return new Response<int>(bankrep.AddData(new Repository.Bank
                {
                    IsActive = BankAdd.IsActive.ToUpper() == "TRUE",
                    Bank1 = BankAdd.BankName,
                    Id = BankAdd.BankId,
                    LookUp=BankAdd.BankLookup,
                    Address1 = BankAdd.Address1,
                    Address2 = BankAdd.Address2,
                    Address3 = BankAdd.Address3,
                    CityId = CitId,
                    Zipcode = BankAdd.Zipcode,
                    Mob_No = BankAdd.MobNum,
                    CountryId = CouId,
                    Contact_Name = BankAdd.ContactName,
                    Fax=BankAdd.Fax,
                    Telex=BankAdd.Telex,
                    ShiftNo=BankAdd.shiftno,
                    ShortCode=BankAdd.shortcode,
                    E_Mail=BankAdd.Email
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateBank(Domain.Bank BankUpd)
        {

            int? CitId = 0;
            int? CouId = 0;

            if (BankUpd.CityId == 0)
            {
                CitId = null;
            }
            else
            {
                CitId = BankUpd.CityId;
            }



            if (BankUpd.CountryId == 0)
            {
                CouId = null;
            }
            else
            {
                CouId = BankUpd.CountryId;
            }

            if (string.IsNullOrEmpty(BankUpd.BankName))
                return new Response<bool>(false, Status.ERROR, "Given Name of Bank is empty");
            if (isNameAvailableAlready(BankUpd, "UPDATE"))
                return new Response<bool>(false, Status.ERROR, "Given name of Bank is already available");

            return new Response<bool>(bankrep.UpdateData(new Repository.Bank
            {
                IsActive = BankUpd.IsActive.ToUpper() == "TRUE",
                Bank1 = BankUpd.BankName,
                Id = BankUpd.BankId,
                LookUp = BankUpd.BankLookup,
                Address1 = BankUpd.Address1,
                Address2 = BankUpd.Address2,
                Address3 = BankUpd.Address3,
                CityId = CitId,
                Zipcode = BankUpd.Zipcode,
                Mob_No = BankUpd.MobNum,
                CountryId = CouId,
                Contact_Name = BankUpd.ContactName,
                Fax = BankUpd.Fax,
                Telex = BankUpd.Telex,
                ShiftNo = BankUpd.shiftno,
                ShortCode = BankUpd.shortcode,
                E_Mail=BankUpd.Email
                
                }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteBank(int BankId)
        {
            return new Response<bool>(bankrep.DeleteData(BankId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Bank st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetBank().Value.Where(c => c.BankName.ToUpper() == st.BankName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetBank().Value.Where(c => c.BankName.ToUpper() == st.BankName.ToUpper() && c.BankId != st.BankId).ToList().Count > 0);
            }
            return false;

        }
    }
}
