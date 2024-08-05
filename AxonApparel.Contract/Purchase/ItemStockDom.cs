using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ItemStockDom
    {
        public int StockId { get; set; }
        public string Transno { get; set; }
        public int companyid { get; set; }
        public string Remarks { get; set; }
        public int StoreUnitID { get; set; }
        public int CreBy { get; set; }
        public DateTime transdate { get; set; }
        public DateTime StockDate { get; set; }
        public int CompanyunitId { get; set; }
       
        public List<ItmStkDet> ItemStk { get; set; }
        public List<OpeningStock> OpStk { get; set; }
    }
}
