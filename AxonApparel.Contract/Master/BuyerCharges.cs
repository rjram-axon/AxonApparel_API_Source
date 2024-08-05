using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class BuyerCharges
    {
        public int BuyerchargesId { get; set; }
        public int BuyerId { get; set; }
        public string Buyer { get; set; }
        public decimal FromQuantity { get; set; }
        public decimal ToQuantity { get; set; }
        public decimal ShippingExpense { get; set; }
        public decimal CIFExpense { get; set; }
        public decimal BankExpense { get; set; }
        public long Slno { get; set; }

        public List<BuyerCharges> ListDetails { get; set; }
    }
}
