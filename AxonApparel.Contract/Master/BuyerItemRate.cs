using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BuyerItemRate
    {
        public int BuyerId { get; set; }
        public string BuyerName { get; set; }
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int Rate { get; set; }
        public int SupplierId { get; set; }
        public string Supplier { get; set; }
        public List<BuyerItemRate> BuyerItemRateList { get; set; }
       
    }
}



