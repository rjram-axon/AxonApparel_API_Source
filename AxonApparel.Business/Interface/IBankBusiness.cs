using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface IBankBusiness
    {

        Response<IQueryable<Bank>> GetBank();
        Response<Bank> GetBankId(int BankId);
        Response<int> CreateBank(Bank BankAdd);
        Response<bool> UpdateBank(Bank BankUpd);
        Response<bool> DeleteBank(int BankId);
    
    }
}
