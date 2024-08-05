using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiSplReqdetails
    {
        public int Req_id { get; set; }
        public string Spl_Req_no { get; set; }
        public string Ref_No { get; set; }

        public string OrderNo { get; set; }
        public string Job_ord_no { get; set; }
        public string OrderDate { get; set; }
        public string IsApproved { get; set; }

    }
    public class ApiSplReqeditdetails
    {
        public int Reqid { get; set; }
        public int Reqdetid { get; set; }
        public string Job_ord_no { get; set; }

        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }

        public string Unit { get; set; }
        public Decimal Quantity { get; set; }
        public Decimal AppQuantity { get; set; }
        public string PurUnit { get; set; }
        public string Mode { get; set; }
        public Decimal AppRate { get; set; }
        public string IsApproved { get; set; }

    }

}
