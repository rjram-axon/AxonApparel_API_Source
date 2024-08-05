using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AxonApparel.Domain
{
    public class ShipmentMode
    {
        public int ShipmentModeId { get; set; }

        public string ShipementMode { get; set; }

        public string IsActive { get; set; }
        public int CountShipmentModeId { get; set; }
    }
}