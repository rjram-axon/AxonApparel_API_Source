using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AxonApparel.Domain 
{
    public class ShipmentSystem
    {
        /// <summary>
        /// 
        /// </summary>
        public int SystemId {get;set;}
        public int CountSystemId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string System { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string FreeOrCharge { get; set; }                

        /// <summary>
        /// 
        /// </summary>
        public string IsActive { get; set; }
    }
}
