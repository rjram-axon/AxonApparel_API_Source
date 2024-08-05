using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class ItemGroup
    {
        public int ItemgroupId { set; get; }
        public string ItemGroupName { set; get; }
        public string CatHead1 { set; get; }
        public string CatHead2 { set; get; }
        public string CatHead3 { set; get; }
        public string IsActive { get; set; }
        public int CountItemGroupId { get; set; }
    }
}