using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class OrderSalesInvoiceDet
    {
        public int Invdetid { get; set; }
        public Nullable<int> Invid { get; set; }
        public Nullable<int> Itemid { get; set; }
        public string OrderNo { get; set; }
        public string Articleno { get; set; }
        public string HsCode { get; set; }
        public Nullable<int> description { get; set; }
        public Nullable<decimal> qty { get; set; }
        public Nullable<decimal> rate { get; set; }
        public Nullable<decimal> amount { get; set; }
        public Nullable<int> Fcarton { get; set; }
        public Nullable<int> Tcarton { get; set; }
        public Nullable<int> Totcarton { get; set; }

        public Nullable<int> CompanyId { get; set; }
        public string Order_No { get; set; }
        public string Buyer_Ref_No { get; set; }
        public int ShipRowId { get; set; }
        public Nullable<int> BuyerId { get; set; }
        public int Destination { get; set; }
        public Nullable<int> PortOfLoadingId { get; set; }
        public Nullable<int> shipmode { get; set; }
        public Nullable<int> System { get; set; }
        public Nullable<int> Paymentmode { get; set; }
        public string item { get; set; }
        public string OrderRefno { get; set; }
        public int Styleid { get; set; }
        public string Style { get; set; }
        public decimal Ordqty { get; set; }
        public decimal Prodqty { get; set; }
        public decimal balqty { get; set; }
        public Nullable<int> currencyid { get; set; }
        public Nullable<decimal> Exrate { get; set; }
        public string Shipno { get; set; }
        public int Sno { get; set; }
        public Nullable<decimal> GRwgt { get; set; }
        public Nullable<decimal> NETwgt { get; set; }
    }
}
