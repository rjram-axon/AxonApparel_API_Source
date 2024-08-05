using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace AxonApparel.Domain
{
    public class StyleDetail
    {
        public int Id { get; set; }
        public int StyleId { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int Qty { get; set; }
        public string IsActive { get; set; }
    }
}
