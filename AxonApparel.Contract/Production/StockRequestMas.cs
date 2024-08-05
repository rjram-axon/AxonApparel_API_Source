using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StockRequestMas
    {
        public int StockReqMasID { get; set; }
        public string EntryNo { get; set; }
        public DateTime EntryDate { get; set; }
        public int CompanyID { get; set; }
        public int SupplierID { get; set; }
    }
}
