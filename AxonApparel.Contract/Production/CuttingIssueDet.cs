using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class CuttingIssueDet
    {
        public int CuttingIssueId { get; set; }
        public int ItemId { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public int Issueqty { get; set; }
    }
}
