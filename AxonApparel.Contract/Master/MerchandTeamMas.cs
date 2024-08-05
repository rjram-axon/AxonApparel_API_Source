using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class MerchandTeamMas
    {
        public int MerchandMasId { get; set; }
        public string MerchandName { get; set; }
        public List<MerchandTeamBuyer> MerchandTeamBuy { get; set; }
        public List<MerchandTeamEmployee> MerchandTeamEmp { get; set; }
    }
}
