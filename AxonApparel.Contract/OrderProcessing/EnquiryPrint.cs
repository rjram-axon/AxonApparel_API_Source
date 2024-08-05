using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class EnquiryPrint
    {
        public int MarkEnqEmbPrintId { get; set; }
        public string PrnDesc { get; set; }
        public int EnquiryID { get; set; }
        public string EmbDesc { get; set; }
        public int EmbColors { get; set; }
        public int EmbStiches { get; set; }
        public string EmbSize { get; set; }
        public string EmbPlacement { get; set; }
        public string EmbType { get; set; }
        public string PrnSize { get; set; }
        public string PrnPlacement { get; set; }
        public string EmbNo { get; set; }
        public string PrnNo { get; set; }
        public string EmbImage { get; set; }
        public string PrintImage { get; set; }
        public int PrnColors { get; set; }
        public int PrnType { get; set; }
        public int PrnQlty { get; set; }
        public string Emb_or_Prn { get; set; }
    }
}
