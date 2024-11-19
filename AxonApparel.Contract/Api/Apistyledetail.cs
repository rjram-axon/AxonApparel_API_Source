using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class Apistyledetail
    {
        
            public string Buyer { get; set; }
            public string OrderNo { get; set; }
            public string RefNo { get; set; }
            public string Style { get; set; }
            public decimal Quantity { get; set; }
            public string Description { get; set; }
            public string Color { get; set; }
            public string Size { get; set; }
            public decimal OrderQty { get; set; }
            public decimal ProductionQty { get; set; }
            public decimal DespQty { get; set; }
            public string Imgpath { get; set; }
        

    }
}
