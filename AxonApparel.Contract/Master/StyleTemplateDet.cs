using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StyleTemplateDet
    {
        public string BuyerName{get;set;}
        public string GItem { get; set; }
        public int BuyerId { get; set; }
        public int ItemId { get; set; }
        public int Sno { get; set; }
        public int TemDetId { get; set; }
        public int TemplateId { get; set; }
        public string Template { get; set; }      
        public int GItemId{get;set;}
        public string Item { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }       
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public int GColorId { get; set; }
        public int GSizeId { get; set; }
        public decimal Qty { get; set; }
        public decimal Rate { get; set; }
        public int ConvertTypeId { get; set; }
        public string ConvertTypeName { get; set; }      
        public string Color { get; set; }
        public string Size { get; set; }
        public string GColor { get; set; }
        public string GSize { get; set; }
        public string Type { get; set; }
         public string Typeval { get; set; }
    }
}
