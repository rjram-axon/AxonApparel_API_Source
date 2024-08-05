using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class ColorCode
    {
        public int ColorCodeId { get; set; }
        public string ColorCodenam { get; set; }
        public int SupplierID { get; set; }
        public int ColorID { get; set; }
        public string Color { get; set; }        
        public string ColorShade { get; set; }        
        public string Supplier { get; set; }        
        public string IsActive { get; set; }
        //public List<SelectListItem> SupplierList { get; set; }
        //public List<SelectListItem> ColorList { get; set; }
    }
}