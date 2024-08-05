using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Color
    {
        public int ColorId { get; set; }
        public int CountColorId { get; set; }
        public string ColorName { get; set; }
        public string Colors { get; set; }
        public string ColorCode { get; set; }
        public string Pantone { get; set; }
        public string Lookup { get; set; }
        public string colorgroup { get; set; }
        public int ColorGroupId { get; set; }
        public string PantOne { get; set; }
        public string ColorNo { get; set; }
        public string ColorOth { get; set; }
        public string IsActive { get; set; }
        //public List<SelectListItem> ColorGroup { get; set; }
    }
}