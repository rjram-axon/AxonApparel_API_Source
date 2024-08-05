using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class BulkOrderMeasurement
    {
        public int MeasureMasId { get; set; }
        public string OrderNo { get; set; }
        public int BuyMasId { get; set; }
        public int StyleRowid { get; set; }
        public int Buy_Ord_MasId { get; set; }
        public DateTime MeasureDate { get; set; }
        public DateTime OrderDate { get; set; }
        public string Remarks { get; set; }
        public string TemplateName { get; set; }
        public string Buyer { get; set; }
        public string Style { get; set; }
        public string RefNo { get; set; }
        public string AMEND { get; set; }
        public string inchORcms { get; set; }
        public string ChkIns { get; set; }
        public List<BulkOrderMeasurementItemDet> BulkMeaDet { get; set; }
        public List<BulkOrderMeasurementSize> BulkMeaSizeDet { get; set; }

        public List<BuyOrdImg> OrderMesurmentImage { get; set; }
    }
}









