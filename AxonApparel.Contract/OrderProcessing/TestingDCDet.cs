using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TestingDCDet
    { 
        public int TestingDCDetId { get; set; }
        public int TestingDCId { get; set; }
        public int TestingTypeId { get; set; }
        public int SeqNo { get; set; }
        public string TestingType { get; set; }
        public int TestPcs { get; set; }
        public decimal RatePerPcs { get; set; }
        public decimal Value { get; set; }
        public decimal TaxAppVal { get; set; }
        public int StatusId { get; set; }
    }
}
