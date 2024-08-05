using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class BoxConversionMas
    {
        public int BoxConMasId { get; set; }
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public int CompanyUnitId { get; set; }
        public int BMasId { get; set; }
        public int StoreId { get; set; }
        public string Store { get; set; }
        public int CreatedBy { get; set; }
        public string BoxConNo { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Remarks { get; set; }
        public DateTime BoxConDate { get; set; }
        public DateTime BoxConDcDate { get; set; }
        public int SKUMasID { get; set; }
        public string SKUNo { get; set; }
        public decimal BoxRate { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string OType { get; set; }
        public List<BoxConversionDet> BoxConDet { get; set; }
        public List<BoxConversionStock> BoxConStock { get; set; }
    }

}
