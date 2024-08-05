using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CuttingBundle
    {
        public int BundleId { get; set; }
        public int CuttingRecptId { get; set; }
        public int CuttingRecptDetId { get; set; }
        public string BundleNo { get; set; }
        public decimal Bundleqty { get; set; }
        public int EmployeeId { get; set; }
        public string Employee { get; set; }
        public int CuttingOrddetid { get; set; }

    }
}
