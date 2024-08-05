using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BulkOrderCancel
    {
        public string Despatch_Closed { get; set; }
        public string Buyer { get; set; }
        public string Employee { get; set; }
        public string Style { get; set; }
        public int StyleId { get; set; }
        public int CanCelled { get; set; }
        public bool OrderCancel { get; set; }
        public string COrderType { get; set; }
        public string Company { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FmDate { get; set; }
        public string COrdNo { get; set; }
        public string CRefNo { get; set; }
        public int CCompId { get; set; }
        public int CBmasId { get; set; }
        public int CBuyId { get; set; }
        public string CClose { get; set; }
    }
}
