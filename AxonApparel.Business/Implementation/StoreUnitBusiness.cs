using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class StoreUnitBusiness:IStoreUnitBusiness
    {
        private IStoreUnitRepository strrep = new StoreUnitRepository();
        public Response<IEnumerable<Domain.StoreUnit>> GetStore()
        {
            try
            {
                var strlist = strrep.GetDataListAll();
                return new Response<IEnumerable<Domain.StoreUnit>>(strlist.Select(m => new Domain.StoreUnit
               {
                   IsActive = m.IsActive ? "TRUE" : "FALSE",
                   StoreUnitId = m.StoreUnitID,
                   StoreName = m.StoreName,
                   StoreType=m.StoreType,
                   ParentUnitId=m.ParentUnitID,
                   UnitName=m.ParentUnitType
               }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.StoreUnit>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }
        public Response<int> CreateStore(Domain.StoreUnit StoreAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(StoreAdd.StoreName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Store is empty");
                if (isNameAvailableAlready(StoreAdd, "ADD")) 
                    return new Response<int>(-1, Status.ERROR, "Given Mode of Store is already available");

                return new Response<int>(strrep.AddData(new Repository.StoreUnit
                {
                    StoreUnitID = StoreAdd.StoreUnitId,
                    StoreName = StoreAdd.StoreName,
                    IsActive = StoreAdd.IsActive.ToUpper() == "TRUE",
                    ParentUnitID=StoreAdd.ParentUnitId,
                    ParentUnitType=StoreAdd.UnitName,
                    StoreType=StoreAdd.StoreType
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }
        private bool isNameAvailableAlready(Domain.StoreUnit store, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetStore().Value.Where(c => c.StoreName.ToUpper() == store.StoreName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetStore().Value.Where(c => c.StoreName.ToUpper() == store.StoreName.ToUpper() && c.StoreUnitId != store.StoreUnitId).ToList().Count > 0);
            }
            return false;

        }
        public Response<bool> DeleteStore(int StoreId)
        {
            return new Response<bool>(strrep.DeleteData(StoreId), Status.SUCCESS, "Deleted Successfully");
        }
        public Response<bool> UpdateStore(Domain.StoreUnit storeupd)
        {
            if (string.IsNullOrEmpty(storeupd.StoreName)) 
                return new Response<bool>(false, Status.ERROR, "Given Store is empty");
            if (isNameAvailableAlready(storeupd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Store is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.StoreUnit
            {
                StoreName = storeupd.StoreName,
                StoreUnitID = storeupd.StoreUnitId,
                IsActive = storeupd.IsActive.ToUpper() == "TRUE",
                StoreType=storeupd.StoreType,
                ParentUnitID=storeupd.ParentUnitId,
                ParentUnitType=storeupd.UnitName
            }), Status.SUCCESS, "Updated Successfully");
        }
        public Response<Domain.StoreUnit> GetStoreId(int strid)
        {
            try{
                var str = strrep.GetDataById(strid);
                     return new Response<Domain.StoreUnit>(new Domain.StoreUnit
                {
                    StoreName = str.StoreName,
                    StoreUnitId = str.StoreUnitID,
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    ParentUnitId=str.ParentUnitID,
                    UnitName=str.ParentUnitType,
                    StoreType=str.StoreType
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.StoreUnit>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }
        

        public Response<IList<Domain.StoreUnit>> GetStoreUnitCheckItemDetails(int StoreId)
        {
            try
            {
                var ProductEWO = strrep.GetRepStoreUnitCheckItemDetails(StoreId);

                return new Response<IList<Domain.StoreUnit>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.StoreUnit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
