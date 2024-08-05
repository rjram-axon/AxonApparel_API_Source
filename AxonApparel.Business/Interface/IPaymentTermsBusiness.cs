using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IPaymentTermsBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<PaymentTerms>> GetPaymentTerms();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="PaymentTermId"></param>
        /// <returns></returns>

        Response<PaymentTerms> GetDataById(int PaymentTermId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="PaymentTerms"></param>
        /// <returns></returns>

        Response<int> CreatePaymentTerms(PaymentTerms PaymentTerms);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="PaymentTerms"></param>
        /// <returns></returns>

        Response<bool> UpdatePaymentTerms(PaymentTerms PaymentTerms);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="PaymentTermsId"></param>
        /// <returns></returns>

        Response<bool> DeletePaymentTerms(int PaymentTermsId);
        Response<IList<PaymentTerms>> GetPayTermCheckItemDetails(int PaymentTermsId);
        Response<IEnumerable<TermsCondition>> GetTermsCondition();
    }
}
