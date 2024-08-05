using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace AxonApparel.Domain
{
    public class BulkOrderMeasurementSize
    {
        public int MeasureDetid { get; set; }
        public int MeasureMasId { get; set; }
        public int Sizeid { get; set; }
        public int MeasureSizeDetid { get; set; }
        public string IncValues { get; set; }
        public string Size { get; set; }
        public decimal Qty { get; set; }
        public int CompItemId { get; set; }
        public int ITEMID { get; set; }
    }
}





