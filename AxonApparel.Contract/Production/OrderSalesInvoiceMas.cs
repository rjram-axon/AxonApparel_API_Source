using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class OrderSalesInvoiceMas
    {
        public int Invid { get; set; }
        public Nullable<int> companyid { get; set; }
        public Nullable<int> buyerid { get; set; }
        public Nullable<int> conssigneeid { get; set; }
        public Nullable<int> notify { get; set; }
        public string InvoiceNo { get; set; }
        public Nullable<System.DateTime> invoicedate { get; set; }
        public string refno { get; set; }
        public Nullable<System.DateTime> refdate { get; set; }
        public Nullable<int> portofloading { get; set; }
        public Nullable<int> destination { get; set; }
        public Nullable<int> portofdischarge { get; set; }
        public Nullable<int> shipmode { get; set; }
        public Nullable<int> systemid { get; set; }
        public Nullable<int> payment { get; set; }
        public string Precarriage { get; set; }
        public Nullable<int> placeofrecpt { get; set; }
        public string Vesselno { get; set; }
        public string MarksNos { get; set; }
        public Nullable<decimal> Totalcartons { get; set; }
        public Nullable<decimal> Totalgrosswgt { get; set; }
        public Nullable<decimal> Totalnetwgt { get; set; }
        public Nullable<int> currencyid { get; set; }
        public Nullable<decimal> Exrate { get; set; }
        public string SBillNo { get; set; }
        public Nullable<System.DateTime> SBillDate { get; set; }
        public string CTDNo { get; set; }
        public Nullable<System.DateTime> CTDDate { get; set; }
        public string LCNo { get; set; }
        public Nullable<System.DateTime> LCDate { get; set; }
        public string LCtype { get; set; }
        public string Statement { get; set; }
        public string StatementCode { get; set; }
        public string StatementType { get; set; }
        public string SchemeCode { get; set; }
        public string ContainerNo { get; set; }

        public List<OrderSalesInvoiceDet> Detlist { get; set; }
        public List<OrderSalesInvoiceAddless> Acclist { get; set; }
    }
}
