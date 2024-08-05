using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StoresDeliveryOrder
    {
        public int IssueOrdID { get; set; }
        public int IssueID { get; set; }
        public int IssueDetID { get; set; }
        public int UnitStockId { get; set; }
        public int RejectStockId { get; set; }
        public string OrderNo { get; set; }
        public string WorkOrd { get; set; }
        public decimal IssueQty { get; set; }
        public decimal ReceivedQty { get; set; }
        public decimal RejectedQty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal ExcessQty { get; set; }
        public decimal BalQty { get; set; }
        public int OItemid { get; set; }
        public int OColorid { get; set; }
        public int OSizeid { get; set; }
        public int OUomid { get; set; }
        public int SoNo { get; set; }
        public int JoMasId { get; set; }
        public int ISno { get; set; }
        public decimal AllowValue { get; set; }

        public int Plansizeid { get; set; }
        public string Plansize { get; set; }
        public string RefNo { get; set; }
     
    }
}
