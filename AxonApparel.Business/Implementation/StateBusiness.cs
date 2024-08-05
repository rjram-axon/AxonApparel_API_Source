using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public class StateBusiness:IStateBusiness
    {
       private IStateRepository repo = new StateRepository();

        public Common.Response<IQueryable<Domain.State>> GetState()
        {
            try
            {
                var couList = repo.GetDataList();
                return new Response<IQueryable<Domain.State>>(couList.Select(m => new Domain.State
                {
                    isactive = m.IsActive ? "TRUE" : "FALSE",
                    state=m.State1,
                    id=m.StateId,
                    lookup=m.Lookup
                   

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.State>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Common.Response<Domain.State> GetId(int Id)
        {
            try
            {
                var cou = repo.GetDataById(Id);
                return new Response<Domain.State>(new Domain.State
                {
                   
                    isactive = cou.IsActive ? "TRUE" : "FALSE",
                    state=cou.State1,
                    id=cou.StateId,
                    lookup=cou.Lookup
                   
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.State>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Common.Response<int> Create(Domain.State Add)
        {
            try
            {
                if (string.IsNullOrEmpty(Add.state)) return new Response<int>(0, Status.ERROR, "Given State is empty");
                if (isNameAvailableAlready(Add, "ADD")) return new Response<int>(-1, Status.ERROR, "Given State is already available");

                return new Response<int>(repo.AddData(new Repository.State
                {
                   
                    IsActive = Add.isactive.ToUpper() == "TRUE",
                    StateId=Add.id,
                    Lookup=Add.lookup,
                    State1=Add.state

                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Common.Response<bool> Update(Domain.State Upd)
        {
            if (string.IsNullOrEmpty(Upd.state)) return new Response<bool>(false, Status.ERROR, "Given State is empty");
            if (isNameAvailableAlready(Upd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given State is already available");

            return new Response<bool>(repo.UpdateData(new Repository.State
            {

                IsActive = Upd.isactive.ToUpper() == "TRUE",
                State1=Upd.state,
                StateId=Upd.id,
                Lookup=Upd.lookup
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> Delete(int Id)
        {
            return new Response<bool>(repo.DeleteData(Id), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.State state, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetState().Value.Where(c => c.state.ToUpper() == state.state.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetState().Value.Where(c => c.state.ToUpper() == state.state.ToUpper() && c.id != state.id).ToList().Count > 0);
            }
            return false;
        }


        public Response<IEnumerable<Domain.State>> GetAllBusState()
        {
            try
            {
                var couList = repo.GetDataAllStateList();
                return new Response<IEnumerable<Domain.State>>(couList.Select(m => new Domain.State
                {
                    isactive = m.IsActive ? "TRUE" : "FALSE",
                    state = m.State1,
                    id = m.StateId,
                    lookup = m.Lookup


                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.State>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }
    }
}
