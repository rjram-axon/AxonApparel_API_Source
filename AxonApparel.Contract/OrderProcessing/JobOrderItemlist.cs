using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class JobOrderItemlist
    {
        public string JobOrderNo { get; set; }
        public string BuyOrdShip { get; set; }
        public decimal JobQuantity { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int ColorId { get; set; }
        public int ColorRowId { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public int SizeRowId { get; set; }
        public string Size { get; set; }
        public int ItemId { get; set; }
        public int ItemRowId { get; set; }
        public string Item { get; set; }
        public decimal JQuantity { get; set; }
        public decimal OldJQuantity { get; set; }
        public decimal ActualJobQuantity { get; set; }
        public decimal Balance { get; set; }
        public decimal Rate { get; set; }
        public decimal ExQty { get; set; }
        public int StyRowId { get; set; }
        public int ShipRowId { get; set; }
        public int BuyOrdDetId { get; set; }
    }
}
