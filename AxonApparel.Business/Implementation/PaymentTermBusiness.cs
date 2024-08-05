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
   public class PaymentTermBusiness:IPaymentTermsBusiness
    {
       IPayTermsRepository PayRep = new PayTermsRepository();

        public Response<IEnumerable<PaymentTerms>> GetPaymentTerms()
        {
            try
            {

                var payList = PayRep.GetDataListAll();

                return new Response<IEnumerable<Domain.PaymentTerms>>(payList.Select(m => new Domain.PaymentTerms
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    PaymentTermsName = m.Pay_Term,
                    PaymentTermsId = m.Pay_Termid
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.PaymentTerms>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.PaymentTerms> GetDataById(int PaymentTermId)
        {
            try
            {

                var payList = PayRep.GetDataById(PaymentTermId);

                return new Response<Domain.PaymentTerms>(new Domain.PaymentTerms
                {
                    PaymentTermsName = payList.Pay_Term,
                    PaymentTermsId = payList.Pay_Termid,
                    IsActive = payList.IsActive ? "TRUE" : "FALSE",
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.PaymentTerms>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<TermsCondition>> GetTermsCondition()
        {
            try
            {
                var payList = PayRep.GetTermCondition();

                return new Response<IEnumerable<Domain.TermsCondition>>(payList.Select(m => new Domain.TermsCondition
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    TermName = m.TermName,
                    TermId = m.TermId
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.TermsCondition>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreatePaymentTerms(PaymentTerms PaymentTerms)
        {
            try
            {
                if (string.IsNullOrEmpty(PaymentTerms.PaymentTermsName)) return new Response<int>(0, Status.ERROR, "Given PaymentTerms is empty");
                if (isNameAvailableAlready(PaymentTerms, "ADD")) return new Response<int>(-1, Status.ERROR, "Given PaymentTerms is already available");

                return new Response<int>(PayRep.AddData(new AxonApparel.Repository.Payment_Terms
                {
                    Pay_Term = PaymentTerms.PaymentTermsName,
                    Pay_Termid = PaymentTerms.PaymentTermsId,
                    IsActive = PaymentTerms.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdatePaymentTerms(PaymentTerms PaymentTerms)
        {
            if (isNameAvailableAlready(PaymentTerms, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given PaymentTerms is already available");

            return new Response<bool>(PayRep.UpdateData(new AxonApparel.Repository.Payment_Terms
            {
                Pay_Term = PaymentTerms.PaymentTermsName,
                Pay_Termid = PaymentTerms.PaymentTermsId,
                IsActive = PaymentTerms.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeletePaymentTerms(int PaymentTermsId)
        {
            return new Response<bool>(PayRep.DeleteData(PaymentTermsId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.PaymentTerms objPay, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetPaymentTerms().Value.Where(c => c.PaymentTermsName.ToUpper() == objPay.PaymentTermsName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetPaymentTerms().Value.Where(c => c.PaymentTermsName.ToUpper() == objPay.PaymentTermsName.ToUpper() && c.PaymentTermsId != objPay.PaymentTermsId).ToList().Count > 0);
            }
            return false;

        }


        public Response<IList<PaymentTerms>> GetPayTermCheckItemDetails(int PaymentTermsId)
        {
            try
            {
                var ProductEWO = PayRep.GetRepPayTermCheckItemDetails(PaymentTermsId);

                return new Response<IList<Domain.PaymentTerms>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.PaymentTerms>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
