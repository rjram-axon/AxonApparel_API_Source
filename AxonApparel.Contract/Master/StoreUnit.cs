using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class StoreUnit
    {
        public int StoreUnitId { get; set; }

        public string StoreName { get; set; }

        public int ParentUnitId { get; set; }

        public string UnitName { get; set; }

        public string StoreType { get; set; }

        public string IsActive { get; set; }
        public int CountStoreId { get; set; }

        //public List<SelectListItem> UnitList { get; set; }
    }
}