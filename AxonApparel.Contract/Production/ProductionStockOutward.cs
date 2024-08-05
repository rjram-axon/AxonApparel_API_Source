using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionStockOutward
    {
        public int RecId { get; set; }
        public int ItemStockId { get; set; }
        public DateTime OutwardDate { get; set; }
        public string TransNo { get; set; }
        public string TransType { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public string JobOrdNo { get; set; }
        public int ProdIssDetId { get; set; }
        public string UnitorOther { get; set; }
    }
}
