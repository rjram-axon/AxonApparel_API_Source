using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Style
    {
        public int StyleId { get; set; }
        public int CountStyleId { get; set; }
        public string StyleName { get; set; }
        public string ArticleNo { get; set; }
        public string Season { get; set; }
        public string DesignName { get; set; }
        public List<StyleDetail> StyleDet { get; set; }
        public string IsActive { get; set; }
        public int itemid { get; set; }
        public string orderno { get; set; }
        public int Stylerowid { get; set; }
        
    }
}