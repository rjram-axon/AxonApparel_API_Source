using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ExchangeRates
    {
       
            public string Code { get; set; }
            public decimal ExchangeRate { get; set; }
            public DateTime ExchangeDate { get; set; }
        
    }
}
