using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public class LedgerBusiness:ILedgerBusiness
    {

        private ILedgerRepository cgrep = new LedgerRepository();

        public Response<IEnumerable<Domain.Ledger>> GetLedger()
        {
            try
            {
                var strlist = cgrep.GetDataListAll();
                return new Response<IEnumerable<Domain.Ledger>>(strlist.Select(m => new Domain.Ledger
                {
                    IsActive = (bool)m.IsActive ? "TRUE" : "FALSE",
                    LedgerId = m.LedgerId,
                    LedgerName = m.Ledger1,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Ledger>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<Domain.Ledger> GetLedgerId(int LedgerId)
        {
            try
            {
                var str = cgrep.GetDataById(LedgerId);
                return new Response<Domain.Ledger>(new Domain.Ledger
                {
                    LedgerName = str.Ledger1,
                    LedgerId = str.LedgerId,
                    IsActive = (bool)str.IsActive ? "TRUE" : "FALSE"
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Ledger>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Response<int> CreateLedger(Domain.Ledger LedgerAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(LedgerAdd.LedgerName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Ledger is empty");
                if (isNameAvailableAlready(LedgerAdd, "ADD"))
                    return new Response<int>(0, Status.ERROR, "Given Mode of Ledger is already available");

                return new Response<int>(cgrep.AddData(new Repository.Ledger
                {
                    LedgerId = LedgerAdd.LedgerId,
                    Ledger1 = LedgerAdd.LedgerName,
                    IsActive = LedgerAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateLedger(Domain.Ledger LedgerUpdate)
        {
            if (string.IsNullOrEmpty(LedgerUpdate.LedgerName))
                return new Response<bool>(false, Status.ERROR, "Given Ledger  is empty");
            if (isNameAvailableAlready(LedgerUpdate, "UPDATE"))
                return new Response<bool>(false, Status.ERROR, "Given name of Ledger is already available");

            return new Response<bool>(cgrep.UpdateData(new Repository.Ledger
            {
                Ledger1 = LedgerUpdate.LedgerName,
                LedgerId = LedgerUpdate.LedgerId,
                IsActive = LedgerUpdate.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteLedger(int LedgerId)
        {
            return new Response<bool>(cgrep.DeleteData(LedgerId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Ledger st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetLedger().Value.Where(c => c.LedgerName.ToUpper() == st.LedgerName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetLedger().Value.Where(c => c.LedgerName.ToUpper() == st.LedgerName.ToUpper() && c.LedgerId != st.LedgerId).ToList().Count > 0);
            }
            return false;

        }
    }
}
