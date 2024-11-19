using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class PurchaseOrder
    {
        public string OrderNo { get; set; }
        public int PurOrdId { get; set; }
        public string PO_Number { get; set; }
        public string Item { get; set; }
        public string Style { get; set; }
        public string Colour { get;set; }
        public string Reference { get; set; }
        public string OrderDate { get; set; }
        public Decimal Quantity { get; set; }
        public Decimal Rate { get; set; }

        public Decimal TotalAmount { get; set; }
        //public int SupplierId { get; set; }
        public string Supplier { get; set; }
        public string IsApproved { get; set; }
    }

    public class PurchaseOuststanding
    {
        public int PurOrdId { get; set; }
        public string PO_Number { get; set; }
        public string Item { get; set; }
        public Decimal Receivedquantity { get; set; }
        public Decimal Balancequantity { get; set; }

        //public int SupplierId { get; set; }
        public string Supplier { get; set; }
    }
}
