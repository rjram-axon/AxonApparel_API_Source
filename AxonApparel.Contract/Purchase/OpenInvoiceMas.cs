using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class OpenInvoiceMas
    {
        public int Open_InvID { get; set; }
        public int CompanyID { get; set; }
        public string company { get; set; }
        public int Company_UnitID { get; set; }
        public string companyunit { get; set; }
        public string EntryNo { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime EntryDate { get; set; }
        public int SupplierID { get; set; }
       public string supplier{get;set;}
        public string Order_Type { get; set; }
        public decimal Gross_amount { get; set; }
        public decimal Addless_amount { get; set; }
        public string AddLessManualOrFormula { get; set; }
        public int CurrencyID { get; set; }
        public string currency { get; set; }
        public decimal ExchangeRate { get; set; }
        public string Remarks { get; set; }
        public decimal Payment_Amt { get; set; }
        public bool paid { get; set; }
        public int passed { get; set; }
        public int ordid { get; set; }
        public string orderno { get; set; }
        public string refNo { get; set; }
        public string InOrEx { get; set; }
        public List<OpenInvoiceDet> OpeninvDet { get; set; }
        public List<OpenInvoiceAddless> Openinvadless { get; set; }
        public int CreatedBy { get; set; }
    }
}
