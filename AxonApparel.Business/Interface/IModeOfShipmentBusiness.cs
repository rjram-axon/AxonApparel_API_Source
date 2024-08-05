using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public interface IModeOfShipmentBusiness
    {
        /// <summary>
        /// This method will return mode of shipment list
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<ShipmentMode>> GetModeOfShipments();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<ShipmentMode> GetModeOfShipmentById(int modeOfShipmentId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modeOfShipment"></param>
        /// <returns></returns>
        Response<int> CreateModeOfShipment(ShipmentMode modeOfShipment);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modeOfShipment"></param>
        /// <returns></returns>
        Response<bool> UpdateModeOfShipment(ShipmentMode modeOfShipment);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modeOfShipmentId"></param>
        /// <returns></returns>
        Response<bool> DeleteModeOfShipment(int modeOfShipmentId);
        Response<IList<ShipmentMode>> GetShipModeCheckItemDetails(int modeOfShipmentId);
    }
}
