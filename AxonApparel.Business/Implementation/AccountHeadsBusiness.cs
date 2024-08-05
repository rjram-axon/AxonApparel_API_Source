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
    public class AccountHeadsBusiness:IAccountHeadsBusiness
    {
        IAccountHeadsRepository acchRep = new AccountHeadsRepository();

        public Common.Response<IEnumerable<Domain.AccountHeads>> GetAccountHeads()
        {
            try
            {

                var accheList = acchRep.GetDataListAll();

                return new Response<IEnumerable<Domain.AccountHeads>>(accheList.Select(m => new Domain.AccountHeads
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    addless = m.Addless1,
                    addlessid = m.AddlessId,
                    per = (int)m.Per,
                    AddlessType=m.AddlessType,
                    amount = (int)m.Amount,
                    Lookup=m.Lookup,
                    //groupnameid=(int)m.GroupNameID,
                    //locked=(bool)m.Locked,
                    //invoice=(bool)m.ISINVOICE,
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.AccountHeads>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<Domain.AccountHeads> GetDataById(int addlessid)
        {
            try
            {

                var accheList = acchRep.GetDataById(addlessid);

                return new Response<Domain.AccountHeads>(new Domain.AccountHeads
                {
                    addless = accheList.Addless1,
                    IsActive = accheList.IsActive ? "TRUE" : "FALSE",               
                    addlessid = accheList.AddlessId,
                    per = (int)accheList.Per,
                    AddlessType = accheList.AddlessType,
                    amount = (int)accheList.Amount,
                    Lookup = accheList.Lookup,
                    //groupnameid = (int)accheList.GroupNameID,
                    //locked = (bool)accheList.Locked,
                    //invoice = (bool)accheList.ISINVOICE,
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.AccountHeads>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<int> CreateAccountHeads(Domain.AccountHeads AccHead)
        {
            try
            {
                if (string.IsNullOrEmpty(AccHead.addless)) return new Response<int>(0, Status.ERROR, "Given AccountHeads is empty");
                if (isNameAvailableAlready(AccHead, "ADD")) return new Response<int>(-1, Status.ERROR, "Given AccountHeads is already available");

                return new Response<int>(acchRep.AddData(new AxonApparel.Repository.AddLess
                {
                    Addless1 = AccHead.addless,
                    IsActive = AccHead.IsActive.ToUpper() == "TRUE",
                    AddlessId = AccHead.addlessid,
                    Per = (int)AccHead.per,
                    AddlessType = AccHead.AddlessType,
                    Amount = (int)AccHead.amount,
                    Lookup = AccHead.Lookup,
                   //GroupNameID=AccHead.groupnameid,
                   //ISINVOICE=AccHead.invoice,
                   //Locked=AccHead.locked
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> UpdateAccountHeads(Domain.AccountHeads AccHead)
        {
            if (isNameAvailableAlready(AccHead, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given AccountHeads is already available");

            return new Response<bool>(acchRep.UpdateData(new AxonApparel.Repository.AddLess
            {
                Addless1 = AccHead.addless,
                IsActive = AccHead.IsActive.ToUpper() == "TRUE",
                AddlessId = AccHead.addlessid,
                Per = (int)AccHead.per,
                AddlessType = AccHead.AddlessType,
                Amount = (int)AccHead.amount,
                Lookup = AccHead.Lookup,
                //GroupNameID = AccHead.groupnameid,
                //ISINVOICE = AccHead.invoice,
                //Locked = AccHead.locked
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteAccountHeads(int addlessid)
        {
            return new Response<bool>(acchRep.DeleteData(addlessid), Status.SUCCESS, "Deleted Successfully");
        }


        public Response<IList<AccountHeads>> GetAccountHeadsCheckItemDetails(int addlessid)
        {
            try
            {
                var ProductEWO = acchRep.GetRepAccountCheckItemDetails(addlessid);

                return new Response<IList<Domain.AccountHeads>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.AccountHeads>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        private bool isNameAvailableAlready(Domain.AccountHeads ovh, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetAccountHeads().Value.Where(c => c.addless.ToUpper() == ovh.addless.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetAccountHeads().Value.Where(c => c.addless.ToUpper() == ovh.addless.ToUpper() && c.addlessid != ovh.addlessid).ToList().Count > 0);
            }
            return false;
        }
    }
}
