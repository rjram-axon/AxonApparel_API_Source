//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AxonApparel.Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class MarkQuoteMas
    {
        public MarkQuoteMas()
        {
            this.MarkQuoteAcc = new HashSet<MarkQuoteAcc>();
            this.MarkQuoteCMT = new HashSet<MarkQuoteCMT>();
            this.MarkQuoteCommercial = new HashSet<MarkQuoteCommercial>();
            this.MarkQuoteFab = new HashSet<MarkQuoteFab>();
            this.MarkQuoteProcess = new HashSet<MarkQuoteProcess>();
            this.MarkQuoteYarn = new HashSet<MarkQuoteYarn>();
        }
    
        public int QuoteID { get; set; }
        public string QuoteNo { get; set; }
        public Nullable<System.DateTime> QuoteDate { get; set; }
        public string QuoteType { get; set; }
        public int Companyid { get; set; }
        public int BuyerId { get; set; }
        public Nullable<int> EnquiryId { get; set; }
        public int StyleId { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public Nullable<decimal> YarnAdd { get; set; }
        public Nullable<decimal> ProcessAdd { get; set; }
        public Nullable<decimal> AccAdd { get; set; }
        public Nullable<decimal> CMTadd { get; set; }
        public Nullable<decimal> CommercialAdd { get; set; }
        public Nullable<decimal> FabricCost { get; set; }
        public Nullable<decimal> AccessoryCost { get; set; }
        public Nullable<decimal> CMTcost { get; set; }
        public Nullable<decimal> Commercial { get; set; }
        public Nullable<decimal> TotalCost { get; set; }
        public Nullable<decimal> ProfitPercent { get; set; }
        public int CurrencyID { get; set; }
        public Nullable<decimal> ExchangeRate { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> QuotedRate { get; set; }
        public string TemplateName { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<decimal> OrderQty { get; set; }
        public string RefNo { get; set; }
        public Nullable<decimal> ProcessWastagePer { get; set; }
        public Nullable<decimal> BuyerPrice { get; set; }
        public Nullable<int> Modifiedby { get; set; }
        public Nullable<System.DateTime> Modifieddate { get; set; }
        public string PA { get; set; }
        public Nullable<int> GuomId { get; set; }
        public Nullable<decimal> SummAdd { get; set; }
    
        public virtual OrderBuyer Buyer { get; set; }
        public virtual OrderCategory Category { get; set; }
        public virtual OrderCompany Company { get; set; }
        public virtual MarkEnqMas MarkEnqMas { get; set; }
        public virtual MarkEnqMas MarkEnqMas1 { get; set; }
        public virtual ICollection<MarkQuoteAcc> MarkQuoteAcc { get; set; }
        public virtual ICollection<MarkQuoteCMT> MarkQuoteCMT { get; set; }
        public virtual ICollection<MarkQuoteCommercial> MarkQuoteCommercial { get; set; }
        public virtual ICollection<MarkQuoteFab> MarkQuoteFab { get; set; }
        public virtual ICollection<MarkQuoteProcess> MarkQuoteProcess { get; set; }
        public virtual ICollection<MarkQuoteYarn> MarkQuoteYarn { get; set; }
    }
}
