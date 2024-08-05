using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class StoreSection
    {
        public int SectionId { get; set; }

        public string SectionName { get; set; }

        public string StoreName { get; set; }

        public int StoreunitId { get; set; }

        public string IsActive { get; set; }

        public string Status { get; set; }
        //public List<SelectListItem> UnitList { get; set; }
    }
}