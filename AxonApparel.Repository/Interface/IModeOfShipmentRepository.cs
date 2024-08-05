using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel;
namespace AxonApparel.Repository
{
    public interface IModeOfShipmentRepository
    {
        /// <summary>
        /// This method will return mode of shipment list
        /// </summary>
        /// <returns></returns>
        IEnumerable<Mode_Of_Shipment> GetModeOfShipments();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Mode_Of_Shipment GetModeOfShipmentById(int modeOfShipmentId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modeOfShipment"></param>
        /// <returns></returns>
        int CreateModeOfShipment(Mode_Of_Shipment modeOfShipment);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modeOfShipment"></param>
        /// <returns></returns>
        bool UpdateModeOfShipment(Mode_Of_Shipment modeOfShipment);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modeOfShipmentId"></param>
        /// <returns></returns>
        bool DeleteModeOfShipment(int modeOfShipmentId);

        IList<Domain.ShipmentMode> GetRepShipModeCheckItemDetails(int modeOfShipmentId);

    }
}
