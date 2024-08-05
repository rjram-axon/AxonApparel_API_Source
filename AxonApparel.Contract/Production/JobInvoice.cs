using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class JobInvoice
    {
        public int jobrecptid { get; set; }
        public string recptno { get; set; }
        public int cmpid { get; set; }
        public string cmp { get; set; }
        public int suppid { get; set; }
        public string supp { get; set; }
        public int bmasid { get; set; }
        public string ordno { get; set; }
        public string refno { get; set; }
        public int jmasid { get; set; }
        public string jobordno { get; set; }
        public DateTime jobrepctdate { get; set; }
        public string dcno { get; set; }
        public DateTime dcdate { get; set; }
        public int jobchk { get; set; }
        public string UnitorOther { get; set; }
    }

    public class JobInvoiceMas
    {
        public int JobInvId { get; set; }
        public string Job_Inv_No { get; set; }
        public string Sup_Inv_No { get; set; }
        public DateTime Job_Inv_Date { get; set; }
        public DateTime Sup_Inv_Date { get; set; }
        public int SupplierId { get; set; }
        public string Supplier { get; set; }
        public string JobOrdNo { get; set; }
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public string Unit_or_Other { get; set; }
        public int Passed { get; set; }
        public string Remarks { get; set; }
        public string JobRefNo { get; set; }
        public decimal Gross_Amount { get; set; }
        public decimal Addless_Amount { get; set; }
        public decimal Invoice_value { get; set; }
        public decimal Payment_Amt { get; set; }
        public int CreatedBy { get; set; }
        public List<JobInvoiceDet> JobinvDet { get; set; }
        public List<AddorLess> JobinvAorL { get; set; }
    }

    public class JobInvoiceDet
    {
        public int JobInvId { get; set; }
        public int Job_InvDetId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal InvQty { get; set; }
        public decimal Amount { get; set; }
        public int JobRecptId { get; set; }
        public decimal rejRate { get; set; }
        public decimal rejqty { get; set; }
    }

    public class AddorLess
    {
        public int JobInvId { get; set; }
        public int AddLessId { get; set; }
        public decimal Percentage { get; set; }
        public decimal Amount { get; set; }
        public string AOrL { get; set; }
        public string Addless { get; set; }
        public string PlusOrMinus { get; set; }
    }
}
