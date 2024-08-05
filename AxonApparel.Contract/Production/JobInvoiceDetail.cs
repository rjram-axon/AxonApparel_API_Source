using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class JobInvoiceDetail
    {
        public int jobrecptid { get; set; }
        public int companyid { get; set; }
        public string company { get; set; }
        public int supplierid { get; set; }
        public string supplier { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvDate { get; set; }
        public string InvRefNo { get; set; }
        public string UnitorOther { get; set; }
        public string Remarks { get; set; }
        public DateTime InvRefDate { get; set; }
        public List<GrnInvDet> GrnInvDetail { get; set; }
        public List<GrnItemDet> GrnItemDetail { get; set; }
    }

    public class AddORLess
    {
        public int jobInvid { get; set; }
        public int addlessid { get; set; }
        public decimal percentage { get; set; }
        public decimal amount { get; set; }
        public string aorl { get; set; }
    }

    public class GrnInvDet
    {
        public int Sno { get; set; }
        public int jobrecptid { get; set; }
        public string DCNo { get; set; }
        public DateTime DcDate { get; set; }
        public string JobOrdNo { get; set; }
        public DateTime JobRefDate { get; set; }
        public string JobRecptNo { get; set; }
        public string JobInvRefNo { get; set; }
        public DateTime JobRecptDate { get; set; }
        public int chksel { get; set; }
        public int companyid { get; set; }
        public string Remarks { get; set; }
        public string company { get; set; }
        public int supplierid { get; set; }
        public string supplier { get; set; }
        public string UnitorOther { get; set; }
    }

    public class GrnItemDet
    {
        public int Sno { get; set; }
        public string JobOrderno { get; set; }
        public string Style { get; set; }
        public int StyleId { get; set; }
        public int JobRecptId { get; set; }
        public string Item { get; set; }
        public int ItemId { get; set; }
        public string Color { get; set; }
        public int ColorId { get; set; }
        public string Size { get; set; }
        public int SizeId { get; set; }
        public string uom { get; set; }
        public decimal RecptQty { get; set; }
        public decimal Rate { get; set; }
        public decimal RejRate { get; set; }
        public decimal BalQty { get; set; }
        public decimal RejQty { get; set; }
        public decimal InvQty { get; set; }
        public decimal Amount { get; set; }
    }
}
