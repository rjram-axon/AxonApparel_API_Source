using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TestingDCReceiptDet
    {
        public int DCReceiptId { get; set; }
        public int TestingDCReceiptId { get; set; }
        public int DCReceiptDetId { get; set; }
        public int TestingTypeId { get; set; }
        public int SeqNo { get; set; }
        public string TestingType { get; set; }
        public int TestPcs { get; set; }
        public decimal RatePerPcs { get; set; }
        public decimal Value { get; set; }
        public int StatusId { get; set; }
    }
}
