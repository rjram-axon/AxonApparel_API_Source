using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  public class ProductionOrdStock
    {
        public int ProductionOrdStockId { get; set; }
        public int ProductionOrdJobid { get; set; }
        public string Productionorder { get; set; }
        public string jobordno { get; set; }
        public int Productionordid { get; set; }
        public int ItemStockId { get; set; }
        public decimal IssueQty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal LossQty { get; set; }
        public decimal Returnable_Qty { get; set; }
        public decimal Markup_Rate { get; set; }
        public string LotNo { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }
    }
}
