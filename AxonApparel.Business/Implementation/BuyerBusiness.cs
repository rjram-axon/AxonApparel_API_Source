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
    public class BuyerBusiness : IBuyerBusiness
    {
        private IBuyerRepository strrep = new BuyerRepository();
        public Response<IEnumerable<Domain.Buyer>> GetBuyer()
        {
            try
            {
                var strlist = strrep.GetDataListAll();

                return new Response<IEnumerable<Domain.Buyer>>(strlist.Select(m => new Domain.Buyer
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    BuyerId = m.BuyerId,
                    CityId = (int)(m.CityId == null ? 0 : m.CityId),
                    CityName = m.CityName,
                    BuyerName = m.BuyerName,
                    Address1 = (m.Address1 == null ? "" : m.Address1),//m.Address1,
                    Address2 = (m.Address2 == null ? "" : m.Address2),//m.Address2,
                    Address3 = (m.Address3 == null ? "" : m.Address3),//m.Address3,
                    Zipcode = (m.Zipcode == null ? "" : m.Zipcode),//m.Zipcode,
                    //Commission = (decimal)(m.Commission == null ? 0 : m.Commission),
                    //BankInt = (decimal)(m.BankInterest == null ? 0 : m.BankInterest),
                    //AdminExp = (decimal)(m.AdminExp == null ? 0 : m.AdminExp),
                    //MarkPrice = (decimal)(m.MarkExp == null ? 0 : m.MarkExp),
                    //CompMargin = (decimal)(m.CompMargin == null ? 0 : m.CompMargin),
                    //DisMargin = (decimal)(m.DisMargin == null ? 0 : m.DisMargin),
                    //DealerMargin = (decimal)(m.DealMargin == null ? 0 : m.DealMargin),
                    // Mobile=m.Mob_No,


                    Phone = (m.Phone == null ? "" : m.Phone),//str.Phone,
                    Designation = (m.Designation == null ? "" : m.Designation),//str.Designation,
                    LookUp = (m.LookUp == null ? "" : m.LookUp),//str.Buyer_lookup,
                    Email = (m.Email == null ? "" : m.Email),//str.E_mail,
                    ContPerson = (m.ContPerson == null ? "" : m.ContPerson),//str.Contact_person,                       
                    CountryName = m.CountryName,
                    CountryId = (int)(m.CountryId == null ? 0 : m.CountryId),
                    Commission = (decimal)(m.Commission == null ? 0 : m.Commission),
                    BankInt = (decimal)(m.BankInt == null ? 0 : m.BankInt),


                    AdminExp = (decimal)(m.AdminExp == null ? 0 : m.AdminExp),
                    MarkPrice = (decimal)(m.MarkPrice == null ? 0 : m.MarkPrice),
                    CompMargin = (decimal)(m.CompMargin == null ? 0 : m.CompMargin),
                    DisMargin = (decimal)(m.DisMargin == null ? 0 : m.DisMargin),
                    DealerMargin = (decimal)(m.DealerMargin == null ? 0 : m.DealerMargin),
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Buyer>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<Domain.Buyer> GetBuyerId(int BuyerId)
        {
            try
            {
                var str = strrep.GetDataById(BuyerId);
                return new Response<Domain.Buyer>(new Domain.Buyer
                {
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    BuyerId = str.BuyerId,
                    CityId = (int)(str.CityId == null ? 0 : str.CityId),
                    BuyerName = str.Buyer1,
                    Address1 = (str.Address1 == null ? "" : str.Address1),//m.Address1,
                    Address2 = (str.Address2 == null ? "" : str.Address2),//m.Address2,
                    Address3 = (str.Address3 == null ? "" : str.Address3),//m.Address3,               

                    Zipcode = (str.Zipcode == null ? "" : str.Zipcode),//str.Zipcode,
                    Phone = (str.Phone == null ? "" : str.Phone),//str.Phone,
                    Designation = (str.Designation == null ? "" : str.Designation),//str.Designation,
                    LookUp = (str.Buyer_lookup == null ? "" : str.Buyer_lookup),//str.Buyer_lookup,
                    Email = (str.E_mail == null ? "" : str.E_mail),//str.E_mail,
                    ContPerson = (str.Contact_person == null ? "" : str.Contact_person),//str.Contact_person,
                    //CityName = (str.City.City1 == null ? "" : str.City.City1),//City.City1,
                    ////CityName = (str.Ci == null ? "" : str.City.City1),//City.City1,
                    //CountryName = (str.Country.country1 == null ? "" : str.Country.country1),//str.Country.country1,
                    CountryId = (int)(str.CountryId == null ? 0 : str.CountryId),
                    Commission = (decimal)(str.Commission == null ? 0 : str.Commission),
                    BankInt = (decimal)(str.BankInterest == null ? 0 : str.BankInterest),


                    AdminExp = (decimal)(str.AdminExp == null ? 0 : str.AdminExp),
                    MarkPrice = (decimal)(str.MarkExp == null ? 0 : str.MarkExp),
                    CompMargin = (decimal)(str.CompMargin == null ? 0 : str.CompMargin),
                    DisMargin = (decimal)(str.DisMargin == null ? 0 : str.DisMargin),
                    DealerMargin = (decimal)(str.DealMargin == null ? 0 : str.DealMargin),

                    Currency = (int)(str.Currency == null ? 0 : str.Currency),
                    System = (int)(str.System == null ? 0 : str.System),
                    Shipment = (int)(str.Shipment == null ? 0 : str.Shipment),
                    Paymode = (int)(str.Paymode == null ? 0 : str.Paymode),
                    Manager = (int)(str.Manager == null ? 0 : str.Manager),
                    Merch = (int)(str.Merch == null ? 0 : str.Merch),
                    PortLoad = (int)(str.PortLoad == null ? 0 : str.PortLoad),
                    PortDestination = (int)(str.PortDestination == null ? 0 : str.PortDestination),
                    Allowence = (decimal)(str.Allowence == null ? 0 : str.Allowence),
                    // Mobile=str.Mob_No

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Buyer>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Common.Response<int> CreateBuyer(Domain.Buyer BuyerAdd)
        {
            try
            {



                int? CitId = 0;
                int? CoutId = 0;

                if (BuyerAdd.CityId == 0)
                {
                    CitId = null;
                }
                else
                {
                    CitId = BuyerAdd.CityId;
                }

                if (BuyerAdd.CountryId == 0)
                {
                    CoutId = null;
                }
                else
                {
                    CoutId = BuyerAdd.CountryId;
                }

                if (string.IsNullOrEmpty(BuyerAdd.BuyerName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Buyer is empty");
                if (isNameAvailableAlready(BuyerAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Mode of Buyer is already available");

                return new Response<int>(strrep.AddData(new Repository.Buyer
                {
                    IsActive = BuyerAdd.IsActive.ToUpper() == "TRUE",
                    BuyerId = BuyerAdd.BuyerId,
                    CityId = CitId,
                    Buyer1 = BuyerAdd.BuyerName,
                    Address1 = BuyerAdd.Address1,
                    Address2 = BuyerAdd.Address2,
                    Address3 = BuyerAdd.Address3,
                    Zipcode = BuyerAdd.Zipcode,
                    Phone = BuyerAdd.Phone,
                    Designation = BuyerAdd.Designation,
                    Buyer_lookup = BuyerAdd.LookUp,
                    E_mail = BuyerAdd.Email,
                    Contact_person = BuyerAdd.ContPerson,
                    CountryId = CoutId,
                    Commission = BuyerAdd.Commission,
                    BankInterest = BuyerAdd.BankInt,

                    AdminExp = BuyerAdd.AdminExp,
                    MarkExp = BuyerAdd.MarkPrice,
                    CompMargin = BuyerAdd.CompMargin,
                    DisMargin = BuyerAdd.DisMargin,
                    DealMargin = BuyerAdd.DealerMargin,
                    Currency = BuyerAdd.Currency,
                    System = BuyerAdd.System,
                    Shipment = BuyerAdd.Shipment,
                    Paymode = BuyerAdd.Paymode,
                    Manager = BuyerAdd.Manager,
                    Merch = BuyerAdd.Merch,
                    PortLoad = BuyerAdd.PortLoad,
                    PortDestination = BuyerAdd.PortDestination,
                    Allowence = BuyerAdd.Allowence,
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateBuyer(Domain.Buyer BuyerUpd)
        {
            if (string.IsNullOrEmpty(BuyerUpd.BuyerName))
                return new Response<bool>(false, Status.ERROR, "Given Name of Buyer is empty");
            if (isNameAvailableAlready(BuyerUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given name of Buyer is already available");

            int? CitId = 0;
            int? CoutId = 0;

            if (BuyerUpd.CityId == 0)
            {
                CitId = null;
            }
            else
            {
                CitId = BuyerUpd.CityId;
            }

            if (BuyerUpd.CountryId == 0)
            {
                CoutId = null;
            }
            else
            {
                CoutId = BuyerUpd.CountryId;
            }

            return new Response<bool>(strrep.UpdateData(new Repository.Buyer
            {
                IsActive = BuyerUpd.IsActive.ToUpper() == "TRUE",
                BuyerId = BuyerUpd.BuyerId,
                Buyer1 = BuyerUpd.BuyerName,
                CityId = CitId,
                Address1 = BuyerUpd.Address1,
                Address2 = BuyerUpd.Address2,
                Address3 = BuyerUpd.Address3,
                Zipcode = BuyerUpd.Zipcode,
                Phone = BuyerUpd.Phone,
                Designation = BuyerUpd.Designation,
                Buyer_lookup = BuyerUpd.LookUp,
                E_mail = BuyerUpd.Email,
                Contact_person = BuyerUpd.ContPerson,
                CountryId = CoutId,
                Commission = BuyerUpd.Commission,
                BankInterest = BuyerUpd.BankInt,

                AdminExp = BuyerUpd.AdminExp,
                MarkExp = BuyerUpd.MarkPrice,
                CompMargin = BuyerUpd.CompMargin,
                DisMargin = BuyerUpd.DisMargin,
                DealMargin = BuyerUpd.DealerMargin,
                Currency = BuyerUpd.Currency,
                System = BuyerUpd.System,
                Shipment = BuyerUpd.Shipment,
                Paymode = BuyerUpd.Paymode,
                Manager = BuyerUpd.Manager,
                Merch = BuyerUpd.Merch,
                PortLoad = BuyerUpd.PortLoad,
                PortDestination = BuyerUpd.PortDestination,
                Allowence = BuyerUpd.Allowence,
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteBuyer(int BuyerId)
        {
            return new Response<bool>(strrep.DeleteData(BuyerId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Buyer store, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetBuyer().Value.Where(c => c.BuyerName.ToUpper() == store.BuyerName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetBuyer().Value.Where(c => c.BuyerName.ToUpper() == store.BuyerName.ToUpper() && c.BuyerId != store.BuyerId).ToList().Count > 0);
            }
            return false;

        }



        public Response<IList<Domain.Buyer>> GetBuyerCheckItemDetails(int BuyerId)
        {
            try
            {
                var ProductEWO = strrep.GetRepBuyerCheckItemDetails(BuyerId);

                return new Response<IList<Domain.Buyer>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Buyer>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
