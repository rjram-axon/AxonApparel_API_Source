using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class MarkQuoteMas
    {
        public int QuoteID { get; set; }
        public string QuoteNo { get; set; }
        public DateTime QuoteDate { get; set; }
        public string QuoteType { get; set; }
        public int Companyid { get; set; }
        public string company { get; set; }
        public int BuyerId { get; set; }
        public string buyer { get; set; }
        public int EnquiryId { get; set; }
        public string enquiryno { get; set; }
        public int StyleId { get; set; }
        public string style { get; set; }
        public int CategoryId { get; set; }
        public decimal YarnAdd { get; set; }
        public decimal ProcessAdd { get; set; }
        public decimal AccAdd { get; set; }
        public int Guomid { get; set; }
        public decimal CMTadd { get; set; }
        public decimal CommercialAdd { get; set; }
        public decimal FabricCost { get; set; }
        public decimal AccessoryCost { get; set; }
        public decimal CMTcost { get; set; }
        public decimal Commercial { get; set; }
        public decimal TotalCost { get; set; }
        public decimal ProfitPercent { get; set; }
        public int CurrencyID { get; set; }
        public decimal ExchangeRate { get; set; }
        public string Remarks { get; set; }
        public decimal QuotedRate { get; set; }
        public string TemplateName { get; set; }
        public int CreatedBy { get; set; }
        public decimal OrderQty { get; set; }
        public string RefNo { get; set; }
        public decimal WastagePer { get; set; }
        public decimal BuyerPrice { get; set; }
        public DateTime ModifyDate { get; set; }
        public int ModifyBy { get; set; }
        public string PA { get; set; }

        public string buyerref { get; set; }
        public string buyerstyle { get; set; }

        public int RecID { get; set; }
        public string RecQuoteNo { get; set; }

        public string EnqRef { get; set; }
        public string RefStyle { get; set; }

        public decimal SummaryAdd { get; set; }

        public List<MarkQuoteAcc> AccDetails { get; set; }
        public List<MarkQuoteCMT> CmtDetails { get; set; }
        public List<MarkQuoteCommercial> CommDetails { get; set; }
        public List<MarkQuoteFab> FabDetails { get; set; }
        public List<MarkQuoteProcess> ProcessDetails { get; set; }
        public List<MarkQuoteYarn> YarnDetails { get; set; }
       
    }
}
