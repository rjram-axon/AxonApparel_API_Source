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
    public class CurrencyBusiness:ICurrencyBusiness
    {
        ICurrencyRepository curRepo = new CurrencyRepository();

        public Common.Response<IEnumerable<Domain.Currency>> GetCurrency()
        {
            try
            {

                var currList = curRepo.GetDataListAll();

                return new Response<IEnumerable<Domain.Currency>>(currList.Select(m => new Domain.Currency
                {

   
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    CurrencyName = m.Currency1,
                    CurrencyId=m.CurrencyId,               
                    Abbreviation=m.Abbreviation,
                    Exchangerate = (decimal)m.Exchangerate,//(int)m.Exchangerate,
             
            
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Currency>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<Domain.Currency> GetDataById(int CurrencyId)
        {
            try
            {

                var currList = curRepo.GetDataById(CurrencyId);

                return new Response<Domain.Currency>(new Domain.Currency
                {
                    IsActive = currList.IsActive ? "TRUE" : "FALSE",
                    CurrencyId = currList.CurrencyId,
                    CurrencyName = currList.Currency1,
                    Decimalplace = currList.Decimalplace,
                    Abbreviation = currList.Abbreviation,
                    Euro = currList.Euro ? "TRUE" : "FALSE",
                    Exchangerate = (decimal)currList.Exchangerate,//Convert.ToInt32(currList.Exchangerate),         
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.Currency>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<int> CreateCurrency(Domain.Currency Currency)
        {
            try
            {
                if (string.IsNullOrEmpty(Currency.CurrencyName)) return new Response<int>(0, Status.ERROR, "Given Currency is empty");
                if (isNameAvailableAlready(Currency, "ADD")) return new Response<int>(-1, Status.ERROR, "Given Currency is already available");

                return new Response<int>(curRepo.AddData(new AxonApparel.Repository.Currency
                {
                    IsActive = Currency.IsActive.ToUpper() == "TRUE",
                    CurrencyId = Currency.CurrencyId,
                    Currency1 = Currency.CurrencyName,
                    Decimalplace = Convert.ToByte(Currency.Decimalplace),
                    Abbreviation = Currency.Abbreviation,
                    Euro = Currency.Euro.ToUpper() == "TRUE",
                    Exchangerate = Currency.Exchangerate,//Convert.ToInt32(Currency.Exchangerate),        
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        private bool isNameAvailableAlready(Domain.Currency cuu, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetCurrency().Value.Where(c => c.CurrencyName.ToUpper() == cuu.CurrencyName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetCurrency().Value.Where(c => c.CurrencyName.ToUpper() == cuu.CurrencyName.ToUpper() && c.CurrencyId != cuu.CurrencyId).ToList().Count > 0);
            }
            return false;
        }

        public Common.Response<bool> UpdateCurrency(Domain.Currency Currency)
        {
            if (isNameAvailableAlready(Currency, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given Currency is already available");
            return new Response<bool>(curRepo.UpdateData(new AxonApparel.Repository.Currency
            {
                IsActive = Currency.IsActive.ToUpper() == "TRUE",
                CurrencyId = Currency.CurrencyId,
                Currency1 = Currency.CurrencyName,
                Decimalplace = Convert.ToByte(Currency.Decimalplace),
                Abbreviation = Currency.Abbreviation,
               // Euro = Currency.Euro.ToUpper() == "TRUE",
                Exchangerate = Currency.Exchangerate,//Convert.ToInt32(Currency.Exchangerate),      
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteCurrency(int CurrencyId)
        {
            return new Response<bool>(curRepo.DeleteData(CurrencyId), Status.SUCCESS, "Deleted Successfully");
        }



        public Response<IList<Domain.Currency>> GetCurrencyCheckItemDetails(int CurrencyId)
        {
            try
            {
                var ProductEWO = curRepo.GetRepCurrencyCheckItemDetails(CurrencyId);

                return new Response<IList<Domain.Currency>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Currency>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
