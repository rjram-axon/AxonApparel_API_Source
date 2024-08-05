using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public interface IBulkOrderShipmentRepository
    {
        //bool AddDetData(List<Buy_Ord_Ship> objCDet);
        //bool AddPackData(List<Buy_Ord_Ship> objCDet, List<Buy_Ord_OrderDet> objPDet, List<Buy_Ord_OrderDet> objquanDet);
        bool AddPackData(List<Buy_Ord_Ship> objCDet, List<Buy_Ord_OrderDet> SepobjPDet, List<Buy_Ord_OrderDet> objPDet, ProductionWorkOrder objAdd, BuyOrdShipment BShipEnty);
        bool AmendData(List<Buy_Ord_Ship> objCDet, List<Buy_Ord_OrderDet> SepobjPDet, List<Buy_Ord_OrderDet> objPDet, ProductionWorkOrder objAdd, BuyOrdShipment BShipEnty,string Mode);

        IList<BuyOrdShipPack> GetDataList(int SNo, string PackType, int StyleRowId);
        IList<BuyOrdShipPack> GetDataSepList(int SNo, string PackType, int StyleRowId);
        IQueryable<BuyOrdShipment> GetDataDetList(int StyRowID);
        IList<BuyOrdShipment> GetRepShipDetList(int StyleRowId);
        IList<BuyOrdShipPack> GetRepPackDetList(int ShiprowID, int StyleRowID, int SSNo);

        IList<BuyOrdShipPack> GetRepShipSepDetList(int StyleRowId);
        IList<BuyOrdShipPack> GetItemPackDetList( int StyleRowID, string orderno);

        IList<BuyOrdShipPack> GetRepPackLoadDetList(int StyleRowID);
        bool DeleteData(int Id);

        //bool UpdateMasData(List<Buy_Ord_Ship> objAdMas);
        //bool UpdateDetData(List<Buy_Ord_OrderDet> objAdDet, List<Buy_Ord_OrderDet> objquanDet);
        bool UpdateDetData(List<Buy_Ord_Ship> objAdMas, List<Buy_Ord_OrderDet> objAdsepDet, List<Buy_Ord_Det> objAdDet, Domain.ProductionWorkOrder WorkOrderUpd, List<Buy_Ord_Ship> objECDet, List<Buy_Ord_OrderDet> SepobjEPDet, List<Buy_Ord_Det> objEPDet, ProductionWorkOrder objEAdd, BuyOrdShipment EBShipEnty);
        //bool AddDetLossData(List<Yarn_Plan_ProLoss> objPLossDet1, List<Yarn_Plan_Det> objPDet1);
        //bool EAddPackData(List<Buy_Ord_Ship> objECDet, List<Buy_Ord_OrderDet> objEPDet, List<Buy_Ord_OrderDet> objquanDet);
        IQueryable<ProductionWorkOrder> GetDataRepCheckPlanWorkDetails(string Workorder);
    }
}
