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
    public class ModeOfShipmentBusiness : IModeOfShipmentBusiness
    {
        private IModeOfShipmentRepository shipRepo = new ModeOfShipmentRepository();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Response<IEnumerable<ShipmentMode>> GetModeOfShipments()
        {
            try
            {

                var mosList = shipRepo.GetModeOfShipments();
                return new Response<IEnumerable<ShipmentMode>>(mosList.Select(m => new ShipmentMode
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    ShipementMode = m.Mode_of_Shipment1,
                    ShipmentModeId = m.Mode_of_Shipmentid
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<ShipmentMode>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<ShipmentMode> GetModeOfShipmentById(int modeOfShipmentId)
        {
            try
            {
                var mos = shipRepo.GetModeOfShipmentById(modeOfShipmentId);
                return new Response<ShipmentMode>(new ShipmentMode
                {
                    ShipementMode = mos.Mode_of_Shipment1,
                    ShipmentModeId = mos.Mode_of_Shipmentid,
                    IsActive = mos.IsActive ? "TRUE" : "FALSE"
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<ShipmentMode>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateModeOfShipment(ShipmentMode modeOfShipment)
        {
            try
            {
                if (string.IsNullOrEmpty(modeOfShipment.ShipementMode)) return new Response<int>(0, Status.ERROR, "Given Shipment is empty");
                if (isNameAvailableAlready(modeOfShipment, "ADD")) return new Response<int>(-1, Status.ERROR, "Given Shipment is already available");

                return new Response<int>(shipRepo.CreateModeOfShipment(new Mode_Of_Shipment
                {
                    Mode_of_Shipment1 = modeOfShipment.ShipementMode,
                    Mode_of_Shipmentid = modeOfShipment.ShipmentModeId,
                    IsActive = modeOfShipment.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateModeOfShipment(Domain.ShipmentMode modeOfShipment)
        {
            if (string.IsNullOrEmpty(modeOfShipment.ShipementMode)) return new Response<bool>(false, Status.ERROR, "Given Shipment is empty");
            if (isNameAvailableAlready(modeOfShipment, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given Shipment is already available");

            return new Response<bool>(shipRepo.UpdateModeOfShipment(new Mode_Of_Shipment
           {
               Mode_of_Shipment1 = modeOfShipment.ShipementMode,
               Mode_of_Shipmentid = modeOfShipment.ShipmentModeId,
               IsActive = modeOfShipment.IsActive.ToUpper() == "TRUE"
           }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteModeOfShipment(int modeOfShipmentId)
        {
            return new Response<bool>(shipRepo.DeleteModeOfShipment(modeOfShipmentId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(ShipmentMode shipmentMode, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetModeOfShipments().Value.Where(c => c.ShipementMode.ToUpper() == shipmentMode.ShipementMode.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetModeOfShipments().Value.Where(c => c.ShipementMode.ToUpper() == shipmentMode.ShipementMode.ToUpper() && c.ShipmentModeId != shipmentMode.ShipmentModeId).ToList().Count > 0);
            }
            return false;

        }



        public Response<IList<ShipmentMode>> GetShipModeCheckItemDetails(int modeOfShipmentId)
        {
            try
            {
                var ProductEWO = shipRepo.GetRepShipModeCheckItemDetails(modeOfShipmentId);

                return new Response<IList<Domain.ShipmentMode>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ShipmentMode>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
