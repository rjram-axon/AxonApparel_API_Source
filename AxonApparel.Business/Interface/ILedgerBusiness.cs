using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public interface ILedgerBusiness
    {
       Response<IEnumerable<Ledger>> GetLedger();
        Response<Ledger> GetLedgerId(int LedgerId);
        Response<int> CreateLedger(Ledger LedgerAdd);
        Response<bool> UpdateLedger(Ledger LedgerUpdate);
        Response<bool> DeleteLedger(int LedgerId);
    }
}
