using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StyleTemplateMas
    {
        public int TemplateId { get; set; }
        public string Template { get; set; }
        public int BuyerId { get; set; }
        public int ItemId { get; set; }
        public List<StyleTemplateDet> StyleTempDet { get; set; }
        
        
    }
}
