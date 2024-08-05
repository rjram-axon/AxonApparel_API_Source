using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace AxonApparel.Domain
{
    public class BulkOrderMeasurementItemDet
    {
        public int MeasureMasId { get; set; }
        public string MeasureName { get; set; }
        public int MeasureDetid { get; set; }
        public int CompItemId { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public string Lookup { get; set; }
        public int ITEMID { get; set; }
        public string GarmentItem { get; set; }
        public decimal Increment { get; set; }
        public decimal Tolerance { get; set; }
        public decimal Qty { get; set; }
    }
}









