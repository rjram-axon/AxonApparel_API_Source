using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class GenIssueDet
    {
        public int IssueDetId { get; set; }
        public int IssueID { get; set; }
        public int Itmgrpid { get; set; }
        public string Itmgrp { get; set; }
        public int ItemID { get; set; }
        public string Item { get; set; }
        public int ColorID { get; set; }
        public string color { get; set; }
        public int SizeID { get; set; }
        public string size { get; set; }
        public decimal Quantity { get; set; }
        public decimal stkqty { get; set; }
        public decimal amount { get; set; }
        public int Uomid { get; set; }
        public string uom { get; set; }
        public decimal Rate { get; set; }
        public decimal sQty { get; set; }
        public int sUomId { get; set; }
        public string suom { get; set; }
        public int slno { get; set; }

        public string transno { get; set; }
        public DateTime transdate { get; set; }
    }
}
