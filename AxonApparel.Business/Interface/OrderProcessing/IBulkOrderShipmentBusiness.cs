using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IBulkOrderShipmentBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Buy_Ord_Shipment"></param>
        /// <returns></returns>

        Response<bool> CreateBulkShipmentEntry(BuyOrdShipment BShipEnty, Domain.ProductionWorkOrder WorkOrderAdd);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Buy_Ord_Shipment"></param>
        /// <returns></returns>

        Response<bool> UpdateBulkShipmentEntry(BuyOrdShipment BShipEnty, Domain.ProductionWorkOrder WorkOrderAdd);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="BulkShipId"></param>
        /// <returns></returns>

        Response<bool> DeleteBulkShipmentEntry(int BulkShipId);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IList<BuyOrdShipPack>> GetPackType(int SNo, string PackType, int StyleRowId);
        Response<IList<BuyOrdShipPack>> GetPackSepType(int SNo, string PackType, int StyleRowId);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<BuyOrdShipment>> GetShipDetDetails(int StyleRowId);

         Response<IList<BuyOrdShipPack>> GetRepShipSepDetList(int StyleRowId);
         Response<IList<BuyOrdShipPack>> GetItemPackDetList(int StyleRowID, string orderno);

        Response<IList<BuyOrdShipment>> ShipEditDetails(int StyleRowId);
        Response<IList<BuyOrdShipPack>> GetListPackEditDetails(int ShiprowID, int StyleRowID, int SSNo);
        Response<IList<BuyOrdShipPack>> GetListPackLoadEditDetails(int StyleRowID);
        Response<bool> DeleteShip(int PID);
        Response<IQueryable<ProductionWorkOrder>> GetDataCheckPlanWorkDetails(string Workorder);
    }
}
