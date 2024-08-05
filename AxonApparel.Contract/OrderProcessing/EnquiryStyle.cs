using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class EnquiryStyle
    {
        public int EnquiryStyleId { get; set; }
        public int EnquiryId { get; set; }
        public int StyleId { get; set; }
        public string BuyerStyle { get; set; }
        public string StyleDesc { get; set; }
        public int QuotaCateId { get; set; }
        public int Quantity { get; set; }
        public int GUomId { get; set; }
        public int GUomConv { get; set; }
        public string ContactPerson { get; set; }
        public string Department { get; set; }
        public string Season { get; set; }
        public string SeasonId { get; set; }
        public int ShipmentModeId { get; set; }
    }
}
