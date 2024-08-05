using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IShipmentSystemBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<ShipmentSystem>> GetShipmentSystems();
        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="SystemId"></param>
        /// <returns></returns>
        Response<ShipmentSystem> GetDataById(int SystemId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ShipSystem"></param>
        /// <returns></returns>
        Response<int> CreateShipmentSystem(ShipmentSystem ShipSystem);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ShipSystem"></param>
        /// <returns></returns>
        Response<bool> UpdateShipmentSystem(ShipmentSystem ShipSystem);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="SystemId"></param>
        /// <returns></returns>
        Response<bool> DeleteShipmentSystem(int SystemId);
        Response<IList<ShipmentSystem>> GetShipSysCheckItemDetails(int SystemId);
    }
}
