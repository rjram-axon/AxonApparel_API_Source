using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BuyOrdShipment
    {
        public int ShipRowId { get; set; }
        public string Buy_Ord_Ship { get; set; }
        public string Order_No { get; set; }
        public int Buy_Ord_MasId { get; set; }
        public int StyleId { get; set; }
        public int Dest_Code { get; set; }
        public string Dest { get; set; }
        public int UomID { get; set; }
        public string UOM { get; set; }
        public int PTypeID { get; set; }
        public string PType { get; set; }
        public int Quantity { get; set; }
        public int Job_Qty { get; set; }
        public int StyleRowid { get; set; }
        public int Finish_Qty { get; set; }
        public int ProductionQty { get; set; }
        public int Despatch_Qty { get; set; }
        public int PortOfLoadingId { get; set; }
        public string PortOfLoading { get; set; }
        public int CreatedBy { get; set; }
        public string Lotno { get; set; }
        public string ShipAmend { get; set; }
        public string Despatch_Closed { get; set; }
        public DateTime Ship_Date { get; set; }
        public DateTime DelDate { get; set; }
        public int AllowancePer { get; set; }
        //public decimal ProdQty { get; set; }
        public string ItemMode { get; set; }
        public string ItemModeType { get; set; }
        public int SLNo { get; set; }
        public string shipno { get; set; }
        public string PA { get; set; }
        // public List<Buy_Ord_Shipment> CourierItem { get; set; }
        public List<BuyOrdShipment> BuyOrdShipItem { get; set; }
        public List<BuyOrdShipPack> BuyOrdShipratio { get; set; }
        public List<BuyOrdShipPack> BuyOrdShipquan { get; set; }
    }

}
