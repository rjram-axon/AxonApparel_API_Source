using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Size
    {
        public int SizeId { get; set; }
        public int CountSizeId { get; set; }
        public string SizeName { get; set; }
        public string ItemType { get; set; }
        public string Lookup { get; set; }        
        public string IsActive { get; set; }
        public int Seqno { get; set; }
        public int ActualSize { get; set; }
        //public List<SelectListItem>  ItemTypelist { get; set; }
    }
}