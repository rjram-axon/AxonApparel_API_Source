using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BuyOrdShipPack
    {
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int ItemId { get; set; }
        public string Item { get; set; }
        public string Buy_Ord_Ship { get; set; }
        public decimal Ratio { get; set; }
        public int Quantity { get; set; }
        public int Job_Qty { get; set; }
        public int Finish_Qty { get; set; }
        public int StyleRow { get; set; }
        public int ShipRow { get; set; }
        public int SizeRow { get; set; }
        public string Order_no { get; set; }
        public decimal Rate { get; set; }
        public int ComboId { get; set; }
        public string ComboColor { get; set; }
        public string Color { get; set; }
        public int ColorId { get; set; }
        public int Despatch_Qty { get; set; }
        public int ComboRow { get; set; }
        public int Packed_Qty { get; set; }
        public int AllowQty { get; set; }
        public int Qty { get; set; }
        public int PQty { get; set; }
        public int SSNO { get; set; }
        public int Buy_Ord_OrderDetId { get; set; }
        public int Buy_Ord_DetId { get; set; }
        public long snumb { get; set; }
        public string shipno { get; set; }
        public string itemmode { get; set; }
        public int ItemRatio { get; set; }
    }
}
