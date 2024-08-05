using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class ColorGroup
    {
        public int ColorGroupId { get; set; }
        public string ColorGroupName { get; set; }        
        public string IsActive { get; set; }
    }
}