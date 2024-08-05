using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IPayTermsRepository:IBaseRepository<Payment_Terms>
    {
       IList<Domain.PaymentTerms> GetRepPayTermCheckItemDetails(int Paytermid);
       IEnumerable<TermMas> GetTermCondition();
       IEnumerable<Payment_Terms> GetDataListAll();
    }
}
