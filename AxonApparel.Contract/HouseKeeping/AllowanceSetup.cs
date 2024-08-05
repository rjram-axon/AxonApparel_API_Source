using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  public class AllowanceSetup
    {
        public int ItemGroupId { get; set; }
        public int ItemId { get; set; }
        public string ItemGroup { get; set; }
        public string Item { get; set; }
        public int UomId { get; set; }
        public string Uom { get; set; }
        public bool CheckPer { get; set; }
        public string Percentage { get; set; }
        public decimal ProPercentage { get; set; }
        public decimal PQuantity { get; set; }
        public decimal Quantity { get; set; }
        public int ProcessId { get; set; }
        public string Process { get; set; }
        public int TolerId { get; set; }
        public List<AllowanceSetup> AllowSetUp { get; set; }
    }
}
