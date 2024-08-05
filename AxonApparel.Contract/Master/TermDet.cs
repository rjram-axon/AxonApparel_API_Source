using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class TermDet
    {
        public int Sno { get; set; }
        public int TermsId { get; set; }
        public string Terms { get; set; }
        public int TermDetId { get; set; }
        public string TemplateName { get; set; }
        public int TemplateNameId { get; set; }
        public string TermDesc { get; set; }
    }
}
