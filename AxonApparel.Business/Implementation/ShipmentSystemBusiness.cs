using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public class ShipmentSystemBusiness : IShipmentSystemBusiness
    {


        IShipmentSystemRepository shipRepo = new ShipmentSystemRepository();

        public Response<IEnumerable<Domain.ShipmentSystem>> GetShipmentSystems()
        {
            try
            {

                var shipSystemList = shipRepo.GetDataListAll();

                return new Response<IEnumerable<Domain.ShipmentSystem>>(shipSystemList.Select(m => new Domain.ShipmentSystem
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    FreeOrCharge = m.FreeorCharge,
                    System = m.System,
                    SystemId = m.SystemId
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.ShipmentSystem>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<Domain.ShipmentSystem> GetDataById(int SystemId)
        {
            try
            {
                var ShipSys = shipRepo.GetDataById(SystemId);
                return new Response<Domain.ShipmentSystem>(new Domain.ShipmentSystem
                {
                    System = ShipSys.System,
                    SystemId = ShipSys.SystemId,
                    IsActive = ShipSys.IsActive ? "TRUE" : "FALSE",
                    FreeOrCharge = ShipSys.FreeorCharge
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.ShipmentSystem>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }

        }
        public Response<int> CreateShipmentSystem(Domain.ShipmentSystem ShipSystem)
        {
            try
            {
                if (string.IsNullOrEmpty(ShipSystem.System)) return new Response<int>(0, Status.ERROR, "Given shipmentsystem is empty");
                if (isNameAvailableAlready(ShipSystem, "ADD")) return new Response<int>(-1, Status.ERROR, "Given shipmentsystem is already available");

                return new Response<int>(shipRepo.AddData(new AxonApparel.Repository.ShipmentSystem
                {
                    System = ShipSystem.System,
                    SystemId = ShipSystem.SystemId,
                    FreeorCharge = ShipSystem.FreeOrCharge,
                    IsActive = ShipSystem.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        private bool isNameAvailableAlready(Domain.ShipmentSystem ShipSystem, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetShipmentSystems().Value.Where(c => c.System.ToUpper() == ShipSystem.System.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetShipmentSystems().Value.Where(c => c.System.ToUpper() == ShipSystem.System.ToUpper() && c.SystemId != ShipSystem.SystemId).ToList().Count > 0);
            }
            return false;

        }

        public Response<bool> UpdateShipmentSystem(Domain.ShipmentSystem ShipSystem)
        {
            if (string.IsNullOrEmpty(ShipSystem.System)) return new Response<bool>(false, Status.ERROR, "Given shipment system is empty");
            if (isNameAvailableAlready(ShipSystem, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given shipment system is already available");

            return new Response<bool>(shipRepo.UpdateData(new AxonApparel.Repository.ShipmentSystem
            {
                System = ShipSystem.System,
                SystemId = ShipSystem.SystemId,
                FreeorCharge = ShipSystem.FreeOrCharge,
                IsActive = ShipSystem.IsActive.ToUpper() == "TRUE"
            }), Status.SUCCESS, "Updated Successfully");
        }
        public Response<bool> DeleteShipmentSystem(int SystemId)
        {
            return new Response<bool>(shipRepo.DeleteData(SystemId), Status.SUCCESS, "Deleted Successfully");
        }


        public Response<IList<Domain.ShipmentSystem>> GetShipSysCheckItemDetails(int SystemId)
        {
            try
            {
                var ProductEWO = shipRepo.GetRepSysCheckItemDetails(SystemId);

                return new Response<IList<Domain.ShipmentSystem>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ShipmentSystem>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
