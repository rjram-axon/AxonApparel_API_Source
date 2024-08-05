using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class MerchandTeamBuyer
    {
        public int MerchandEmpId { get; set; }
        public int TeamId { get; set; }
        public int BuyerId { get; set; }
        public string Buyer { get; set; }
        public int Sno { get; set; }
    }
}
