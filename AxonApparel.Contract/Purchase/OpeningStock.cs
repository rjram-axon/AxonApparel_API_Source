using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public  class OpeningStock
    {
        public int OpStkId { get; set; }
        public int Companyid { get; set; }
        public int Stockid { get; set; }
        public string Op_Stock_No { get; set; }
        public string Remarks { get; set; }
        public int StoreUnitID { get; set; }
        public int CreatedBy { get; set; }
        public int CompanyunitId { get; set; }
    }
}
