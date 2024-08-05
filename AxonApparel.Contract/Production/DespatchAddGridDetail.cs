using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class DespatchAddGridDetail
    {
        public int ShipRowID { get; set; }
        public string BuyOrdShip { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Destination { get; set; }
        public string Buyer { get; set; }
        public string Style { get; set; }
        public DateTime ShipDate { get; set; }
        public decimal BalanceQty { get; set; }
        public decimal ProductionQty { get; set; }
        public string CheckLoad { get; set; }

    }
}
