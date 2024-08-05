using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Enquiry
    {
        public int EnquiryId { get; set; }
        public string EnquiryNo { get; set; }
        public DateTime EnqDate { get; set; }
        public int CompanyId { get; set; }
        public int BuyerId { get; set; }
        public int TermsId { get; set; }
        public int ShipSystemId { get; set; }
        public int ShipModeId { get; set; }
        public int SeasonId { get; set; }
        public string MyProperty { get; set; }
        public string BuyerRef { get; set; }
        public string Buyer { get; set; }
        public DateTime RefDate { get; set; }
        public DateTime DespDate { get; set; }
        public string Remarks { get; set; }
        public string Despatched_closed { get; set; }
        public string Sampling { get; set; }
        public string Ordered { get; set; }
        public string Status { get; set; }
        public string Style { get; set; }
        public int CreatedBy { get; set; }     
  
        //EnqStyle

        public int EnquiryStyleId { get; set; }    
        public int StyleId { get; set; }
        public string BuyerStyle { get; set; }
        public string StyleDesc  { get; set; }
        public int QuotaCateId { get; set; }
        public int Quantity { get; set; }
        public int GUomId { get; set; }
        public int GUomConv { get; set; }
        public string ContactPerson { get; set; }        
        public string Department { get; set; }
        public string Season { get; set; }
        public List<int> DelItemId { get; set; }
        public List<int> DelFabId { get; set; }
        public List<int> DelEmbId { get; set; }
        public List<int> DelPriId { get; set; }

        //EnquiryStyle
        public List<EnquiryStyle> EnquiryStyle { get; set; }

        //public IQueryable<EnquiryStyle> EnquiryStyle { get; set; }
        //EnquiryItem
        public List<EnquiryItem> EnquiryItem { get; set; }
        //enquiryFabric
        public List<EnquiryFabric> EnquiryFabric { get; set; }
        //enquiryemb
        public List<EnquiryEmbPrint> EnquiryEmbPrint { get; set; }
        //enquiryPrint
        public List<EnquiryPrint> EnquiryPrint { get; set; }

    }
}
