using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Item
    {
        public int Itemid { set; get; }
        public int CountItemId { get; set; }
        public string ItemName { set; get; }
        public string UomName { set; get; }
        public int UomId { set; get; }
        public int ItemGroupId { set; get; }
        public string ItemGroupName { set; get; }
        public string ItemTypeName { set; get; }
        public string IsActive { get; set; }
        public string MajorComp { get; set; }
        public string Description { get; set; }
        public decimal CGST { get; set; }
        public decimal SGST { get; set; }
        public decimal IGST { get; set; }
        public string HSNCODE { get; set; }
        public string HSNCODEDesc { get; set; }
        public decimal rate { get; set; }
       
        public Nullable<int> BasicUnit { get; set; }
        public Nullable<int> SecUnit { get; set; }
        public Nullable<int> PurUnit { get; set; }

        public string itemcat { get; set; }
        public string lookup { get; set; }
        public string color0th { get; set; }
        public decimal convfactor { get; set; }
        public string percentage { get; set; }
        public decimal allowvalue { get; set; }
        public string colornum { get; set; }
        public string GSTtaxcode { get; set; }
        public string IGSTtaxcode { get; set; }
        public decimal MinQty { get; set; }
        public decimal MaxQty { get; set; }
    }
}